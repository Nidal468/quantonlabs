"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useUser } from "../context/user";
import { UserDocument } from "@/model/user";
import { CompanyDocument } from "@/model/company";

interface DashboardContextType {
  user: UserDocument;
  companies: CompanyDocument[];
  activeCompanyId: string | null;
  setActiveCompanyId: (id: string) => void;
  activeCompany: CompanyDocument | null;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [userCompanies, setUserCompanies] = useState<CompanyDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const activeCompany = userCompanies.find((c) => c._id.toString() === activeCompanyId) || null;

  useEffect(() => {
    const get = async () => {
      const res = await fetch('/api/company', {
        method: "GET",
        cache: "no-store"
      });
      if (res.ok) {
        const result: CompanyDocument[] = await res.json();
        setUserCompanies(result)
        setActiveCompanyId(result.length > 0 ? result[0]._id.toString() : null)
      }
    };
    get()
  }, [])

  if (!user) return null;

  return (
    <DashboardContext.Provider
      value={{
        user: user,
        companies: userCompanies,
        activeCompanyId,
        setActiveCompanyId,
        activeCompany,
        isLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
