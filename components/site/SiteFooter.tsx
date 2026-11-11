import Link from "next/link";
import { SOLUTIONS } from "./SiteNav";
import "./site.css";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Architecture", href: "/architecture" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
  { label: "Insights", href: "/insights" },
  { label: "Modular Agent Program", href: "/modular-agent-program" },
];
const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

export default function SiteFooter({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  return (
    <footer className={`qx qx-foot${dark ? " dark" : ""}`}>
      <div className="qx-wrap">
        <div className="g">
          <div className="b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dark ? "/images/site/logo-white@2x.png" : "/images/site/logo-ink@2x.png"} width={dark ? 100 : 109} height={30} alt="Quanton Labs" />
            <p>Quanton OS runs the company so its leadership can lead it.</p>
            <a href="mailto:growth@quantonlabs.com">growth@quantonlabs.com</a>
            <div className="soc">
              <a href="https://www.linkedin.com/company/quanton-labs" target="_blank" rel="noopener noreferrer" aria-label="Quanton Labs on LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
              </a>
              <a href="https://www.youtube.com/@QuantonLabsOfficial" target="_blank" rel="noopener noreferrer" aria-label="Quanton Labs on YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              </a>
            </div>
          </div>
          <div><div className="k">Solutions</div><ul>{SOLUTIONS.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul></div>
          <div><div className="k">Company</div><ul>{COMPANY.map((s) => <li key={s.label}><Link href={s.href}>{s.label}</Link></li>)}</ul></div>
          <div><div className="k">Legal</div><ul>{LEGAL.map((s) => <li key={s.label}><Link href={s.href}>{s.label}</Link></li>)}</ul></div>
        </div>
        <div className="bar"><span>&copy; {new Date().getFullYear()} Quanton Labs. All rights reserved.</span><span>Quanton OS and Quanton Labs are trademarks of Quanton Labs.</span></div>
      </div>
    </footer>
  );
}

export function CloseBox({ eyebrow = "Quanton Labs", title = "See where the operation stands.", body = "A short assessment of how the business runs today, with a structural read of where operating and managing are consuming the people who should be leading." }: { eyebrow?: string; title?: string; body?: string }) {
  return (
    <section className="qx qx-dark qx-close">
      <div className="qx-wrap">
        <div className="box">
          <div>
            <div className="qx-ey">{eyebrow}</div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta">
            <Link className="qx-btn p" href="/assessment">Start the assessment</Link>
            <a className="qx-btn g" href="https://calendly.com/quantonlabs/30min" target="_blank" rel="noreferrer">Book a discovery call</a>
          </div>
        </div>
      </div>
    </section>
  );
}
