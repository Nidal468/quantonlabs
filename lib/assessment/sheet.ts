// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment record (Google Sheet): header-name access only

/**
 * Every read and write locates its column by header name, never by a fixed index.
 * Header cells are matched after normalising (lowercase, non-alphanumerics to "_"),
 * so "Submission ID" and "submission_id" are the same column. A key with no column
 * gets a new header appended to the right of row 1. All writes use RAW so respondent
 * text is never evaluated as a formula.
 */

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const API = "https://sheets.googleapis.com/v4/spreadsheets";

export const TAB_NAMES = {
  qualified: "Qualified",
  below_threshold: "Below_Threshold",
  above_segment: "Above_Segment",
} as const;
export type ClosingVariant = keyof typeof TAB_NAMES;

export type Cell = string | number | boolean | null | undefined;
export type RecordRow = Record<string, string>;

export const normaliseHeader = (h: string) => h.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

function colLetter(i: number): string {
  let s = "";
  let n = i + 1;
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const cellValue = (v: Cell): string | number | boolean => (v === null || v === undefined ? "" : v);

export async function getAccessToken(): Promise<string> {
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!privateKeyRaw || !clientEmail) throw new Error("Missing Google credentials.");

  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: clientEmail, scope: SHEETS_SCOPE, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now };
  const pemBody = privateKeyRaw
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "")
    .replace(/\s/g, "");
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(pemBody, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const input = `${header}.${body}`;
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, Buffer.from(input));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${Buffer.from(sig).toString("base64url")}` }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  return (await res.json()).access_token;
}

function sheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("Missing GOOGLE_SHEET_ID.");
  return id;
}

async function readValues(token: string, range: string): Promise<string[][]> {
  const res = await fetch(`${API}/${sheetId()}/values/${encodeURIComponent(range)}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Sheet read failed (${range}): ${await res.text()}`);
  return (await res.json()).values ?? [];
}

async function writeValues(token: string, range: string, values: (string | number | boolean)[][]): Promise<void> {
  const res = await fetch(`${API}/${sheetId()}/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values }),
  });
  if (!res.ok) throw new Error(`Sheet write failed (${range}): ${await res.text()}`);
}

/** Header row of a tab, extended with any keys it does not yet have. Returns normalised headers in column order. */
async function ensureHeaders(token: string, tab: string, keys: string[]): Promise<string[]> {
  const [row = []] = await readValues(token, `${tab}!1:1`);
  const norm = row.map(normaliseHeader);
  const missing = keys.filter((k) => !norm.includes(normaliseHeader(k)));
  if (missing.length) {
    const start = row.length;
    await writeValues(token, `${tab}!${colLetter(start)}1:${colLetter(start + missing.length - 1)}1`, [missing]);
    norm.push(...missing.map(normaliseHeader));
  }
  return norm;
}

/** Append one record to a tab; columns located by header. */
export async function appendRecord(tab: string, record: Record<string, Cell>): Promise<void> {
  const token = await getAccessToken();
  const headers = await ensureHeaders(token, tab, Object.keys(record));
  const line = headers.map(() => "" as string | number | boolean);
  for (const [k, v] of Object.entries(record)) line[headers.indexOf(normaliseHeader(k))] = cellValue(v);
  const res = await fetch(`${API}/${sheetId()}/values/${encodeURIComponent(`${tab}!A1`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [line] }),
  });
  if (!res.ok) throw new Error(`Sheet append failed: ${await res.text()}`);
}

export interface FoundRecord {
  tab: string;
  variant: ClosingVariant;
  rowNumber: number; // 1-based sheet row
  record: RecordRow; // normalised header -> value
}

/** Find a submission by submission_id across the three tabs. */
export async function findSubmission(submissionId: string): Promise<FoundRecord | null> {
  if (!submissionId) return null;
  const token = await getAccessToken();
  for (const [variant, tab] of Object.entries(TAB_NAMES) as [ClosingVariant, string][]) {
    let rows: string[][];
    try {
      rows = await readValues(token, `${tab}!A:ZZ`);
    } catch {
      continue;
    }
    if (!rows.length) continue;
    const headers = rows[0].map(normaliseHeader);
    const idCol = headers.indexOf("submission_id");
    if (idCol < 0) continue;
    const i = rows.findIndex((r, n) => n > 0 && r[idCol] === submissionId);
    if (i < 0) continue;
    const record: RecordRow = {};
    headers.forEach((h, c) => { if (h) record[h] = rows[i][c] ?? ""; });
    return { tab, variant, rowNumber: i + 1, record };
  }
  return null;
}

/** Update named fields on an existing row; new keys get new header columns to the right. */
export async function updateRecord(found: Pick<FoundRecord, "tab" | "rowNumber">, fields: Record<string, Cell>): Promise<void> {
  const token = await getAccessToken();
  const headers = await ensureHeaders(token, found.tab, Object.keys(fields));
  const writes = Object.entries(fields).map(([k, v]) => {
    const col = colLetter(headers.indexOf(normaliseHeader(k)));
    return { range: `${found.tab}!${col}${found.rowNumber}`, values: [[cellValue(v)]] };
  });
  const res = await fetch(`${API}/${sheetId()}/values:batchUpdate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ valueInputOption: "RAW", data: writes }),
  });
  if (!res.ok) throw new Error(`Sheet update failed: ${await res.text()}`);
}

/** Stage 2 opens only for qualified and above-segment submissions that exist in the record. */
export const stage2Eligible = (f: FoundRecord | null): f is FoundRecord => !!f && (f.variant === "qualified" || f.variant === "above_segment");
