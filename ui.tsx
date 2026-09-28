import React, { useState } from 'react';
import { SectionId } from './data';

/* ---------------- icons ---------------- */
export const P: Record<string, string> = {
  check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
  spark: 'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12z',
  school: 'M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z',
  book: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
  compass: 'M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z',
  build: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
  help: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  play: 'M8 5v14l11-7z',
  bulb: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
  shield: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
  doc: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  cite: 'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z',
  arrow: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  x: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  expand: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z',
  people: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  open: 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
};
export const Icon = ({ n, s = 20 }: { n: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={P[n]} /></svg>
);
export const NAV_ICON: Record<SectionId, string> = { home: 'home', discover: 'spark', learn: 'school', labs: 'compass', champion: 'people', help: 'help' };

/* ---------------- helpers ---------------- */
let toastTimer: any;
export function useToast() {
  const [msg, setMsg] = useState('');
  const show = (m: string) => { setMsg(m); clearTimeout(toastTimer); toastTimer = setTimeout(() => setMsg(''), 1800); };
  return { msg, show };
}
export async function copyText(text: string, done: () => void) {
  try { await navigator.clipboard.writeText(text); done(); }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch { /* ignore */ } document.body.removeChild(ta);
  }
}

export const Badges = ({ items }: { items: { text: string; tone: string }[] }) => (
  <div className="badges">{items.map((b) => <span key={b.text} className={`badge b-${b.tone}`}>{b.text}</span>)}</div>
);

export function Hint({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="hint">
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none' }}><Icon n="expand" s={16} /></span>
        {open ? 'Hide hint' : 'Need a hint?'}
      </button>
      {open && <p>{text}</p>}
    </div>
  );
}

export function CopyBlock({ label = 'Try this prompt', text, onCopy }: { label?: string; text: string; onCopy: (m: string) => void }) {
  return (
    <div className="codebox">
      <div className="h"><span>{label}</span>
        <button onClick={() => copyText(text, () => onCopy('Copied to clipboard'))}><Icon n="copy" s={14} /> Copy</button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

export function Expected({ text }: { text: string }) {
  return (
    <div className="expected">
      <div className="t"><Icon n="bulb" s={16} /> Expected observation</div>
      <p>{text}</p>
    </div>
  );
}

export function Ring({ value }: { value: number }) {
  const r = 7, c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--line)" strokeWidth="2" />
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--blue)" strokeWidth="2" strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform="rotate(-90 9 9)" strokeLinecap="round" />
    </svg>
  );
}

