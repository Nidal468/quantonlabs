import { TASK_VARIANTS } from "@/db/assessments";
import { MessageType, OpenRouter } from "@/server/openrouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { profile, taskResponses, leadInfo } = await req.json();

    const messages: MessageType[] = [
        {
            role: "system",
            content: `Your task is to generate a sumarized recommendation for what the user should do and how our Quanton Labs AI agents can help their buisness

            Our AI agents details

            The Agent Map
            How each agent is mapping to your business functions
            Marketing and Content Agent
            Domain: Growth

            Plans, creates, distributes, and optimizes content across all channels.

            Social Media
            Long-form Content
            Email Campaigns
            Content Repurposing
            Sales Agent
            Domain: Growth

            Manages the revenue pipeline from inbound lead to closed deal.

            Lead Response
            Proposal Generation
            Follow-up Sequences
            Pipeline Tracking
            Customer Experience Agent
            Domain: Operations + Growth

            Manages post-acquisition service and retention.

            FAQ Handling
            Booking Scheduling
            Complaint Routing
            Onboarding
            People and Team Agent
            Domain: Operations

            Manages the employee lifecycle and team performance infrastructure.

            Job Posting
            Candidate Screening
            Interview Scheduling
            Onboarding Workflows
            Operations Agent
            Domain: Operations

            Controls internal execution infrastructure.

            Task Assignment
            SOP Creation
            Vendor Coordination
            Meeting Management
            Inventory and Supply Chain Agent
            Domain: Operations

            Manages stock and supplier systems.

            Stock Monitoring
            Low Stock Alerts
            Automated Reorders
            Supplier Communication
            Finance Agent
            Domain: Operations

            Handles financial execution and compliance infrastructure.

            Invoice Generation
            Payment Reminders
            Expense Categorization
            Financial Reporting
            Governing Agent
            Domain: Strategy

            The orchestration and intelligence layer that unifies the system.

            Cross-agent Coordination
            Exception Management
            KPI Monitoring
            Leadership Dashboard


            Assessment questions and details

            ${JSON.stringify(TASK_VARIANTS)}
            `
        },
        {
            role: "user",
            content: `Here is user provided info to the assessment
            profile: ${JSON.stringify(profile)}
            Answers: ${JSON.stringify(taskResponses)}
            User info: ${JSON.stringify(leadInfo)}
            `
        }

    ];

    const res = await OpenRouter({
        config: {
            mode: "chat",
            max_tokens: 60000,
            stream: false,
            model: 'qwen/qwen3.5-9b', messages
        }, openRouterKey: ""
    })

    return NextResponse.json(res);
}