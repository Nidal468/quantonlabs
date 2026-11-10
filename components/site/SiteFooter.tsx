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
