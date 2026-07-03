"use client";

import { useState } from "react";
import { AgentSkillData } from "./SkillCard";
import SkillCard from "./SkillCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const domainFilters = ["All", "Growth", "Operations", "Strategy", "Operations + Growth"];

interface SkillTreeProps {
  skills: AgentSkillData[];
  activeSkills?: string[]; // skill names that are currently active
  onToggleActive?: (skillName: string) => void;
}

export default function SkillTree({ skills, activeSkills = [], onToggleActive }: SkillTreeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "cost" | "power">("cost");

  const activeCount = activeSkills.length;
  const isMaxReached = activeCount >= 5;

  const filteredSkills = skills
    .filter((skill) => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = domainFilter === "All" || skill.domain === domainFilter;
      return matchesSearch && matchesDomain;
    })
    .sort((a, b) => {
      if (sortBy === "cost") return b.cost - a.cost;
      if (sortBy === "power") return b.stats.power - a.stats.power;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-4">
      {/* Active Skills Counter */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`text-xs ${isMaxReached ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800" : ""}`}>
          {activeCount}/5 skills active
        </Badge>
        <span className="text-xs text-neutral-500">{filteredSkills.length} of {skills.length} skills</span>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-neutral-200"
          />
        </div>
        <div className="flex gap-2">
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-[160px] border-neutral-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              {domainFilters.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-[160px] border-neutral-200">
              <ChevronDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cost">Cost (High → Low)</SelectItem>
              <SelectItem value="power">Power (High → Low)</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-neutral-500">No skills found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, i) => {
            const isActive = activeSkills.includes(skill.name);
            return (
              <SkillCard
                key={i}
                skill={skill}
                isActive={isActive}
                isDisabled={isMaxReached && !isActive}
                onToggleActive={(name) => onToggleActive?.(name)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}