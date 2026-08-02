// /api/openrouter/usage

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key") || req.nextUrl.searchParams.get("key");

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    // Fetch credits/usage data from OpenRouter
    const res = await fetch("https://openrouter.ai/api/v1/credits", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Failed to fetch usage data: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return usage data with relevant info
    return NextResponse.json({
      usage: {
        total_credits: data.data?.total_credits || 0,
        total_usage: data.data?.total_usage || 0,
        remaining_credits: data.data?.remaining_credits || 0,
        usage_limit: data.data?.usage_limit || null,
        billing_period: {
          start: data.data?.billing_period?.start || null,
          end: data.data?.billing_period?.end || null,
        },
        daily_usage: data.data?.daily_usage || [],
        weekly_usage: data.data?.weekly_usage || [],
        monthly_usage: data.data?.monthly_usage || [],
      },
      raw: data, // Include raw response for debugging
    });
  } catch (error) {
    console.error("OpenRouter usage error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}