// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Stage 1 save and return - shared constants and types

/** The saved session expires 72 hours after the last activity. */
export const DRAFT_TTL_MS = 72 * 3600 * 1000;
/** One resume email, 15 minutes after the session goes quiet. */
export const DRAFT_QUIET_MS = 15 * 60 * 1000;

export interface Draft {
  email: string;
  first_name: string;
  payload: unknown; // wizard state: section_a, section_b, section_c, section_d
  created_at: string;
  updated_at: string;
  sent_at: string | null;
}
