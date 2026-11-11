// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - Gmail send through domain-wide delegation

const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.send";

/** Sender and reply-to for every assessment email (DEVELOPER BRIEF ASSESSMENT, section 4). */
export const SENDER = "growth@quantonlabs.com";

async function gmailToken(): Promise<string> {
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  const iss = process.env.GOOGLE_CLIENT_EMAIL;
  const sub = process.env.GMAIL_SEND_AS ?? SENDER;
  if (!raw || !iss) throw new Error("Missing Gmail credentials.");
  const now = Math.floor(Date.now() / 1000);
  const pem = raw.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, "").replace(/\\n/g, "").replace(/\s/g, "");
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(pem, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const head = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ iss, sub, scope: GMAIL_SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })).toString("base64url");
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, Buffer.from(`${head}.${body}`));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${body}.${Buffer.from(sig).toString("base64url")}` }),
  });
  if (!res.ok) throw new Error(`Gmail token exchange failed: ${await res.text()}`);
  return (await res.json()).access_token;
}

/** RFC 2047 encoded word, so a non-ASCII company name survives the subject line. */
const encodeHeader = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s).toString("base64")}?=`);
const wrap76 = (b64: string) => b64.replace(/.{76}/g, "$&\r\n");

export interface Mail {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachment?: { filename: string; contentType: string; data: Buffer };
}

export function buildMime(m: Mail): string {
  const from = process.env.GMAIL_SEND_AS ?? SENDER;
  const alt = `alt_${crypto.randomUUID()}`;
  const mix = `mix_${crypto.randomUUID()}`;
  const altPart = [
    `Content-Type: multipart/alternative; boundary="${alt}"`,
    "",
    `--${alt}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(Buffer.from(m.text).toString("base64")),
    ...(m.html
      ? [`--${alt}`, "Content-Type: text/html; charset=utf-8", "Content-Transfer-Encoding: base64", "", wrap76(Buffer.from(m.html).toString("base64"))]
      : []),
    `--${alt}--`,
  ];
  const headers = [
    `From: Quanton Labs <${from}>`,
    `Reply-To: ${SENDER}`,
    `To: ${m.to}`,
    `Subject: ${encodeHeader(m.subject)}`,
    "MIME-Version: 1.0",
  ];
  const lines = m.attachment
    ? [
        ...headers,
        `Content-Type: multipart/mixed; boundary="${mix}"`,
        "",
        `--${mix}`,
        ...altPart,
        `--${mix}`,
        `Content-Type: ${m.attachment.contentType}; name="${m.attachment.filename}"`,
        `Content-Disposition: attachment; filename="${m.attachment.filename}"`,
        "Content-Transfer-Encoding: base64",
        "",
        wrap76(m.attachment.data.toString("base64")),
        `--${mix}--`,
      ]
    : [...headers, ...altPart];
  return Buffer.from(lines.join("\r\n")).toString("base64url");
}

export async function sendMail(m: Mail): Promise<void> {
  const token = await gmailToken();
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: buildMime(m) }),
  });
  if (!res.ok) throw new Error(`Gmail send failed: ${await res.text()}`);
}

export function escHtml(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/**
 * Email logo: the site's transparent ink logo (2x file, shown at 109 x 30).
 * Always from quantonlabs.com: it loads once the redesign is live there.
 */
export const EMAIL_LOGO_URL = "https://quantonlabs.com/images/site/logo-ink@2x.png";

/** Standard signature per the BRAND GUIDE email signature spec. */
export const SIGNATURE_TEXT = ["Quanton Labs", "growth@quantonlabs.com | (929) 298-2162 | quantonlabs.com"].join("\n");
export const SIGNATURE_HTML = `
  <div style="font-family:Manrope,Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#2B60EB;">Quanton Labs</div>
  <div style="font-family:Manrope,Arial,Helvetica,sans-serif;font-size:14px;color:#6B7280;padding-top:2px;">
    <a href="mailto:growth@quantonlabs.com" style="color:#6B7280;text-decoration:none;">growth@quantonlabs.com</a> | (929) 298-2162 |
    <a href="https://quantonlabs.com" style="color:#6B7280;text-decoration:none;">quantonlabs.com</a>
  </div>`;
