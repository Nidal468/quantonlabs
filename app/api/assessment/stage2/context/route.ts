// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 2 - Stage 1 Context Lookup

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get("id");

    if (!submissionId) {
      return NextResponse.json({ error: "Missing submission ID." }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: "Missing sheet config." }, { status: 500 });
    }

    const accessToken = await getAccessToken();
    const tabs = ["Qualified", "Above_Segment"];

    for (const tab of tabs) {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab + "!A:AZ")}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const rows: string[][] = data.values ?? [];
      const rowIndex = rows.findIndex((r) => r[0] === submissionId);
      if (rowIndex === -1) continue;

      const row = rows[rowIndex];

      return NextResponse.json({
        top_os: row[24] ?? "operations",
        second_os: row[26] ?? "growth",
        first_name: row[3] ?? "",
        work_email: row[5] ?? "",
      });
    }

    return NextResponse.json({
      top_os: "operations",
      second_os: "growth",
      first_name: "",
      work_email: "",
    });
  } catch (err) {
    console.error("[Stage 2 context lookup failed]", err);
    return NextResponse.json({
      top_os: "operations",
      second_os: "growth",
      first_name: "",
      work_email: "",
    });
  }
}

async function getAccessToken(): Promise<string> {
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!privateKeyRaw || !clientEmail) throw new Error("Missing Google credentials.");

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const pemBody = privateKeyRaw
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "")
    .replace(/\n/g, "")
    .replace(/\r/g, "")
    .replace(/\s/g, "");

  const keyBuffer = Buffer.from(pemBody, "base64");
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signingInput = `${header}.${body}`;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, Buffer.from(signingInput));
  const signedJwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
  const { access_token } = await tokenRes.json();
  return access_token;
}