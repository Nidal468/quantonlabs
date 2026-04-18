// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer

import { computeAssessmentMetrics } from "@/lib/result_calculation";
import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAccessToken(): Promise<string> {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("Missing Google service account credentials in environment variables.");
  }

  const jwt = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  const token = await jwt.authorize();
  if (!token.access_token) throw new Error("Failed to obtain access token.");
  return token.access_token;
}

async function appendToSheet(values: (string | number)[]): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID environment variable.");

  const accessToken = await getAccessToken();
  const range = "Sheet1!A1";

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [values],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google Sheets API error: ${error}`);
  }
}

export async function POST(req: NextRequest) {
  const { leadInfo, profile, taskResponses } = await req.json();

  const metrics = computeAssessmentMetrics(taskResponses);

  // Non-blocking sheet write — assessment result always returns to client
  try {
    const row: (string | number)[] = [
      new Date().toISOString(),
      leadInfo?.full_name ?? "",
      leadInfo?.email ?? "",
      leadInfo?.company_name ?? "",
      leadInfo?.role_title ?? "",
      leadInfo?.open_text ?? "",
      profile?.industry_vertical ?? "",
      profile?.company_size ?? "",
      profile?.revenue_range ?? "",
      profile?.ai_usage_level ?? "",
      profile?.primary_pain_point ?? "",
      metrics.coveragePercentage ?? 0,
      metrics.totalTasks ?? 0,
      metrics.notDoing ?? 0,
      metrics.manual ?? 0,
      metrics.looseAI ?? 0,
      metrics.structured ?? 0,
      metrics.estimatedHoursLow ?? 0,
      metrics.estimatedHoursHigh ?? 0,
    ];

    await appendToSheet(row);
  } catch (err) {
    // Log but do not block the response
    console.error("[Sheet write failed]", err);
  }

  return NextResponse.json(metrics);
}