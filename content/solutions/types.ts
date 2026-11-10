/** Data contract for one Solutions page. All copy is third person. */
export type Gate = "fa" | "sa" | "hb" | "ga" | "held";

export interface SolutionData {
  slug: string;
  name: string;
  meta: { title: string; description: string };
  hero: {
    h1: string;
    lead: string;
    builtFor: string;
    photo: { src: string; alt: string; credit: string };
  };
  /** What leadership gets in this industry: label and governed outcome. */
  gets: [string, string][];
  breaks: {
    h2: string;
    lead: string;
    /** [from, to, figure, finding, consequence, source] */
    cards: [string, string, string, string, string, string][];
  };
  proof?: {
    eyebrow: string;
    h2: string;
    lead: string;
    /** [figure, label] */
    figures: [string, string][];
    /** Optional list of what the deployment puts in place: [bold lead, rest]. */
    itemsHead?: string;
    items?: [string, string][];
    note: string;
  };
  trace: {
    h2: string;
    lead: string;
    /** Lowercase noun for the section label, e.g. "order". */
    noun: string;
    unit: string; // "Order SO-2841"
    what: string; // "400 bracket assemblies"
    /** Fields on the job card; each step may change some of them. */
    fields: string[];
    start: Record<string, string>;
    steps: {
      dept: string;
      act: string;
      gate: Gate;
      gateLabel?: string;
      note?: string;
      set?: Record<string, string>;
    }[];
    /** Shown before the first step. */
    idle: string;
    end: string;
  };
  /** cards: [capability, what leadership gets from it] */
  adds: { h2: string; cards: [string, string][]; partner?: string };
  sources: { text: string; href: string; host: string }[];
}
