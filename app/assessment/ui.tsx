"use client";
// Property of Remington Enterprises LLC
// Quanton OS Proprietary Orchestration Layer
// Assessment - shared form controls (Stage 1 and Stage 2)

import { useEffect, useRef, useState } from "react";

export function Dots({ n }: { n: number }) {
  return (
    <span className="as-dots" aria-label={`${n} of 5`}>
      {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < n ? "on" : undefined} />)}
    </span>
  );
}

export function Choice({ name, label, checked, onChange, multi }: { name: string; label: string; checked: boolean; onChange: () => void; multi?: boolean }) {
  return (
    <label className={`as-opt${checked ? " on" : ""}`}>
      <input type={multi ? "checkbox" : "radio"} name={name} checked={checked} onChange={onChange} />
      <span className="mk" aria-hidden="true" />
      <span className="tx">{label}</span>
    </label>
  );
}

export function Err({ msg }: { msg: string | null }) {
  return msg ? <p className="as-err" role="alert">{msg}</p> : null;
}


/** The site denies framing by URL, so the report is fetched and shown through srcdoc, sized to its content. */
export function ReportFrame({ url, title = "Structural Pattern Report" }: { url: string; title?: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    fetch(url).then((r) => (r.ok ? r.text() : null)).then(setHtml).catch(() => setHtml(null));
  }, [url]);
  const fit = () => {
    const f = ref.current;
    const doc = f?.contentDocument;
    if (!f || !doc?.body) return;
    f.style.height = "0px"; // measure content, not the previous frame height
    f.style.height = `${doc.documentElement.scrollHeight + 4}px`;
  };
  const onLoad = () => {
    fit();
    ref.current?.contentDocument?.fonts?.ready.then(fit);
    window.setTimeout(fit, 600);
  };
  useEffect(() => {
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  });
  if (!html) return <p className="as-sub"><a href={url} target="_blank" rel="noopener">Open the report in a new tab</a></p>;
  return <iframe ref={ref} className="as-report" srcDoc={html} title={title} sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" onLoad={onLoad} />;
}

