// lib/mock-data.ts
export type CompanyPlan = "standard" | "premium" | "enterprise";
export type CompanyRole = "member" | "developer" | "admin";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "unpaid" | "incomplete" | "incomplete_expired";

export interface Company {
  id: string;
  name: string;
  plan: CompanyPlan;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  monthlyTokenLimit: number;
  monthlyTokenUsed: number;
  members: { id: string; name: string; email: string; role: CompanyRole; avatar: string }[];
  agents: { id: string; name: string; status: "active" | "idle" | "error"; lastActive: string }[];
}

export const MOCK_COMPANIES: Company[] = [
  {
    id: "cmp_1",
    name: "Acme Corp",
    plan: "premium",
    subscriptionStatus: "active",
    subscriptionEndsAt: "2024-12-31",
    monthlyTokenLimit: 50000,
    monthlyTokenUsed: 12450,
    members: [
      { id: "mem_1", name: "Sarah Jones", email: "sarah@acme.com", role: "admin", avatar: "/images/assets/avatars/sarah.png" },
      { id: "mem_2", name: "Mike Ross", email: "mike@acme.com", role: "developer", avatar: "/images/assets/avatars/mike.png" },
    ],
    agents: [
      { id: "agt_1", name: "Support Bot", status: "active", lastActive: "2 mins ago" },
      { id: "agt_2", name: "Sales Assistant", status: "idle", lastActive: "1 hour ago" },
    ],
  },
  {
    id: "cmp_2",
    name: "Globex Inc",
    plan: "standard",
    subscriptionStatus: "trialing",
    trialEndsAt: "2024-08-15",
    monthlyTokenLimit: 10000,
    monthlyTokenUsed: 8900,
    members: [
      { id: "mem_3", name: "John Doe", email: "john@globex.com", role: "admin", avatar: "/images/assets/avatars/john.png" },
    ],
    agents: [
      { id: "agt_3", name: "Data Scraper", status: "active", lastActive: "5 mins ago" },
    ],
  },
];
