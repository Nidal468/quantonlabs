// app/dashboard/company/page.tsx
"use client";

import { useDashboard } from "@/lib/hook/use-dashboard-context";
import { CompanySettings } from "./company-settings";

export default function CompanyPage() {
  const { activeCompany } = useDashboard();
  if (!activeCompany) return null;
  return <CompanySettings company={activeCompany} />;
}
