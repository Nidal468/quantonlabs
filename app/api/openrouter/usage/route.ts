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

    // Fetch key/usage data from OpenRouter
    const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
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
        // Total usage
        usage: data.data?.usage || 0,
        usage_daily: data.data?.usage_daily || 0,
        usage_weekly: data.data?.usage_weekly || 0,
        usage_monthly: data.data?.usage_monthly || 0,
        
        // BYOK usage
        byok_usage: data.data?.byok_usage || 0,
        byok_usage_daily: data.data?.byok_usage_daily || 0,
        byok_usage_weekly: data.data?.byok_usage_weekly || 0,
        byok_usage_monthly: data.data?.byok_usage_monthly || 0,
        
        // Account info
        limit: data.data?.limit || null,
        limit_remaining: data.data?.limit_remaining || null,
        limit_reset: data.data?.limit_reset || null,
        is_free_tier: data.data?.is_free_tier || false,
        expires_at: data.data?.expires_at || null,
        is_management_key: data.data?.is_management_key || false,
        is_provisioning_key: data.data?.is_provisioning_key || false,
        label: data.data?.label || "",
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