import React, { useEffect, useMemo, useState } from 'react';
import {
  APP, LOGOS, SECTIONS, HOME_CARDS, PRINCIPLES, TOOLS, MODULES, FORMATS, STUDIO, QUIZ, STARTER_QUESTIONS, TRY_NOW,
  STARTER_SOURCES, ROLES, PAINS, SOURCE_TYPES, PUBLISH_CHECKLIST, FAQ, VIDEOS, SectionId, Module,
} from './data';
import { generateBlueprint, Blueprint } from './blueprint';

/* ---------------- icons ---------------- */
const P: Record<string, string> = {
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
const Icon = ({ n, s = 20 }: { n: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={P[n]} /></svg>
);
const NAV_ICON: Record<SectionId, string> = { home: 'home', discover: 'spark', learn: 'school', starter: 'book', usecases: 'compass', build: 'build', help: 'help' };

/* ---------------- helpers ---------------- */
let toastTimer: any;
function useToast() {
  const [msg, setMsg] = useState('');
  const show = (m: string) => { setMsg(m); clearTimeout(toastTimer); toastTimer = setTimeout(() => setMsg(''), 1800); };
  return { msg, show };
}
async function copyText(text: string, done: () => void) {
  try { await navigator.clipboard.writeText(text); done(); }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch { /* ignore */ } document.body.removeChild(ta);
  }
}

const Badges = ({ items }: { items: { text: string; tone: string }[] }) => (
  <div className="badges">{items.map((b) => <span key={b.text} className={`badge b-${b.tone}`}>{b.text}</span>)}</div>
);

function Hint({ text }: { text: string }) {
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

function CopyBlock({ label = 'Try this prompt', text, onCopy }: { label?: string; text: string; onCopy: (m: string) => void }) {
  return (
    <div className="codebox">
      <div className="h"><span>{label}</span>
        <button onClick={() => copyText(text, () => onCopy('Copied to clipboard'))}><Icon n="copy" s={14} /> Copy</button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

function Expected({ text }: { text: string }) {
  return (
    <div className="expected">
      <div className="t"><Icon n="bulb" s={16} /> Expected observation</div>
      <p>{text}</p>
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const r = 7, c = 2 * Math.PI * r;
  return (
    <svg className="ring" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--line)" strokeWidth="2" />
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--blue)" strokeWidth="2" strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform="rotate(-90 9 9)" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- sections ---------------- */
function Home({ go }: { go: (s: SectionId) => void }) {
  return (
    <div className="wrap" style={{ maxWidth: 1040 }}>
      <div className="hero">
        <h1>Welcome to NotebookLM</h1>
        <p>Work with the documents you trust. Get answers you can verify.</p>
        <span className="pill-g"><Icon n="spark" s={14} /> Powered by Google Gemini</span>
      </div>
      <h2 style={{ fontSize: 18, textAlign: 'center' }}>What would you like to do?</h2>
      <div className="cards">
        {HOME_CARDS.map((c) => (
          <button key={c.id} className="card" onClick={() => go(c.id)}>
            <div className="top"><span className="icon"><Icon n={c.icon} /></span><Badges items={c.badges} /></div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <span className="btn btn-p" style={{ width: '100%' }}>{c.cta} <Icon n="arrow" s={16} /></span>
          </button>
        ))}
      </div>
      <div className="principles">
        {PRINCIPLES.map((p, i) => (
          <div className="principle" key={p.title}><Icon n={['doc', 'cite', 'shield'][i]} /><div><b>{p.title}</b><span>{p.text}</span></div></div>
        ))}
      </div>
      <p className="quote">“Nobody should start from scratch. Your first notebook is already waiting for you.”</p>
    </div>
  );
}

function Discover({ go }: { go: (s: SectionId) => void }) {
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Discover</span><h2>What is NotebookLM?</h2>
        <p>A place where a chosen set of documents can be questioned, and where every answer points back to the page it came from.</p></div>
      <div className="video">
        <div><div className="play"><Icon n="play" s={30} /></div><b>NotebookLM in 90 seconds</b><span>Generated with NotebookLM’s Video Overview · coming soon</span></div>
      </div>
      <div className="ph"><h2 style={{ fontSize: 20 }}>Three tools, three questions</h2>
        <p>Each tool has its own job. Pick the one that matches your question.</p></div>
      <div className="grid3">
        {TOOLS.map((t) => (
          <div key={t.name} className={`tile ${t.highlight ? 'hl' : ''}`} style={{ gap: 8 }}>
            <span className="label" style={{ color: t.highlight ? 'var(--blue)' : 'var(--text)' }}>{t.name}</span>
            <span className="q">{t.question}</span>
            <span>{t.job}</span>
          </div>
        ))}
      </div>
      <div className="panel soft" style={{ textAlign: 'center', fontSize: 15 }}>
        Maia helps you do the work. <b style={{ fontWeight: 500, color: 'var(--blue)' }}>NotebookLM helps you check it against the source.</b>
      </div>
      <div className="pager"><span className="note">Next: learn the essentials in 10 minutes</span>
        <button className="btn btn-p" onClick={() => go('learn')}>Start learning <Icon n="arrow" s={16} /></button></div>
    </div>
  );
}

function ModuleVisual({ m }: { m: Module }) {
  if (m.visual === 'flow') return (
    <div className="flow">
      <div className="n"><b>Your sources</b><span>PDF, Word, links…</span></div><span className="arr"><Icon n="arrow" /></span>
      <div className="n mid"><b>NotebookLM</b><span>reads only these</span></div><span className="arr"><Icon n="arrow" /></span>
      <div className="n"><b>Answer + citation</b><span>click to verify</span></div>
    </div>
  );
  if (m.visual === 'formats') return <div className="chips">{FORMATS.map((f) => <span key={f} className="chip">{f}</span>)}</div>;
  if (m.visual === 'compare') return (
    <div className="cmp">
      <div className="c weak"><div className="k"><Icon n="x" s={14} /> Too vague</div><p>Tell me about dangerous goods.</p></div>
      <div className="c good"><div className="k"><Icon n="check" s={14} /> Precise</div><p>According to these sources, what documentation is required to ship a Class 3 product? Cite the relevant section.</p></div>
    </div>
  );
  if (m.visual === 'studio') return <div className="grid4">{STUDIO.map((s) => <div key={s.name} className="tile"><b>{s.name}</b><span>{s.text}</span></div>)}</div>;
  return null;
}

function Learn({ step, setStep, done, markDone, go, toast }: {
  step: number; setStep: (n: number) => void; done: Set<number>; markDone: (n: number) => void; go: (s: SectionId) => void; toast: (m: string) => void;
}) {
  const total = MODULES.length + 1;
  if (step === MODULES.length) return <Quiz onBack={() => setStep(step - 1)} onFinish={() => markDone(MODULES.length)} go={go} />;
  const m = MODULES[step];
  return (
    <div className="wrap">
      <div className="stephead">
        <span className="badge b-amber">Hands-on · {m.duration}</span>
        <span className="stepcount">STEP {step + 1} OF {total} <Ring value={(step + 1) / total} /></span>
      </div>
      <div className="ph"><span className="eyebrow">Module {step + 1}</span><h2>{m.title}</h2></div>
      <div className="lead">{m.intro.map((t) => <p key={t}>{t}</p>)}</div>
      <ModuleVisual m={m} />
      {m.tip && <div className="tip"><Icon n="bulb" s={18} /><span>{m.tip}</span></div>}
      <div className="panel">
        <div className="label" style={{ marginBottom: 14 }}>Your turn — try it in NotebookLM</div>
        <ul className="steps">
          {m.steps.map((s) => (
            <li key={s.text}><div><div>{s.text}</div>
              {s.copy && <CopyBlock text={s.copy} onCopy={toast} />}
              {s.hint && <Hint text={s.hint} />}</div></li>
          ))}
        </ul>
      </div>
      <Expected text={m.expected} />
      <div className="pager">
        <button className="btn btn-o" disabled={step === 0} onClick={() => setStep(step - 1)}><Icon n="back" s={16} /> Back</button>
        <button className="btn btn-p" onClick={() => { markDone(step); setStep(step + 1); window.scrollTo({ top: 0 }); }}>
          {step === MODULES.length - 1 ? 'Take the quiz' : 'Mark as done & continue'} <Icon n="arrow" s={16} />
        </button>
      </div>
    </div>
  );
}

function Quiz({ onBack, onFinish, go }: { onBack: () => void; onFinish: () => void; go: (s: SectionId) => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);
  const q = QUIZ[i];
  if (end) return (
    <div className="wrap">
      <div className="panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', padding: 36 }}>
        <span className="badge b-green">Completed</span>
        <div className="score">{score}/{QUIZ.length}</div>
        <h2>You’re ready.</h2>
        <p style={{ margin: 0, color: 'var(--text-2)' }}>You know how to add sources, ask precise questions and verify every answer.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <button className="btn btn-o" onClick={() => { setI(0); setPicked(null); setScore(0); setEnd(false); }}>Retake quiz</button>
          <button className="btn btn-p" onClick={() => go('build')}>Build your first notebook <Icon n="arrow" s={16} /></button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="wrap">
      <div className="stephead"><span className="badge b-blue">Quiz · question {i + 1} of {QUIZ.length}</span>
        <span className="stepcount">STEP {MODULES.length + 1} OF {MODULES.length + 1} <Ring value={1} /></span></div>
      <div className="ph"><span className="eyebrow">Check your knowledge</span><h2>{q.q}</h2></div>
      <div className="opts">
        {q.options.map((o, k) => {
          const cls = picked === null ? '' : k === q.answer ? 'ok' : k === picked ? 'ko' : '';
          return (
            <button key={o} className={`opt ${cls}`} disabled={picked !== null}
              onClick={() => { setPicked(k); if (k === q.answer) setScore(score + 1); }}>
              {cls === 'ok' && <Icon n="check" s={18} />}{cls === 'ko' && <Icon n="x" s={18} />}{o}
            </button>
          );
        })}
      </div>
      {picked !== null && <div className={`fb ${picked === q.answer ? 'ok' : 'ko'}`}>{picked === q.answer ? 'Correct. ' : 'Not quite. '}{q.why}</div>}
      <div className="pager">
        <button className="btn btn-o" onClick={() => (i === 0 ? onBack() : (setI(i - 1), setPicked(null)))}><Icon n="back" s={16} /> Back</button>
        <button className="btn btn-p" disabled={picked === null}
          onClick={() => { if (i === QUIZ.length - 1) { setEnd(true); onFinish(); } else { setI(i + 1); setPicked(null); } }}>
          {i === QUIZ.length - 1 ? 'See my score' : 'Next question'} <Icon n="arrow" s={16} />
        </button>
      </div>
    </div>
  );
}

function Starter({ toast }: { toast: (m: string) => void }) {
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Starter Notebook</span><h2>Learn NotebookLM… with NotebookLM.</h2>
        <p>Your first notebook is already waiting for you. It contains the guides, FAQ and tips you need. Ask it anything.</p></div>
      <div className="panel" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="icon" style={{ color: 'var(--blue)', background: 'var(--blue-soft)', width: 48, height: 48, borderRadius: 12, display: 'grid', placeItems: 'center' }}><Icon n="book" s={26} /></span>
        <div style={{ flex: 1, minWidth: 200 }}><b style={{ fontWeight: 500, fontSize: 16 }}>Start here: NotebookLM @ CMA CGM</b>
          <div className="note">Shared with every licensed user · view only · owner: your NotebookLM champion</div></div>
        <a className="btn btn-p" href={APP.starterNotebookUrl} target="_blank" rel="noreferrer">Open the Starter Notebook <Icon n="open" s={16} /></a>
      </div>
      <div>
        <div className="label" style={{ marginBottom: 10 }}>Suggested questions</div>
        <div className="chips">
          {STARTER_QUESTIONS.map((q) => (
            <button key={q} className="chip" onClick={() => copyText(q, () => toast('Question copied'))} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              {q} <span style={{ color: 'var(--blue)', display: 'inline-flex' }}><Icon n="copy" s={14} /></span>
            </button>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="label" style={{ marginBottom: 12 }}>Try it now</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TRY_NOW.map((t, i) => <CopyBlock key={t} label={`Prompt ${i + 1}`} text={t} onCopy={toast} />)}
        </div>
      </div>
      <div className="panel soft">
        <div className="stephead" style={{ marginBottom: 12 }}><div className="label">For champions · how this notebook is built</div><span className="badge b-amber">Admins & champions</span></div>
        <div className="grid2">
          {STARTER_SOURCES.map((s, i) => (
            <div key={s.name} className="tile" style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums', fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</span>
              <div><b style={{ fontSize: 13.5 }}>{s.name}</b><span style={{ display: 'block' }}>{s.owner}</span></div>
            </div>
          ))}
        </div>
        <p className="note" style={{ margin: '12px 0 0' }}>Share it view-only with the group of licensed users. Name one owner, and review the sources every 60 days.</p>
      </div>
    </div>
  );
}

function UseCases({ go, toast, prefill }: { go: (s: SectionId) => void; toast: (m: string) => void; prefill: (goal: string) => void }) {
  const [role, setRole] = useState<string | null>('dg');
  const [pain, setPain] = useState<string | null>('rule');
  const r = ROLES.find((x) => x.id === role);
  const p = PAINS.find((x) => x.id === pain);
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Use Case Finder</span><h2>What can NotebookLM do for my job?</h2>
        <p>Two clicks. You get a notebook idea for your team and a first question to try.</p></div>
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div><div className="label" style={{ marginBottom: 10 }}>1 · Where do you work?</div>
          <div className="chips">{ROLES.map((x) => <button key={x.id} className={`chip ${role === x.id ? 'sel' : ''}`} aria-pressed={role === x.id} onClick={() => setRole(x.id)}>{x.label}</button>)}</div></div>
        <div><div className="label" style={{ marginBottom: 10 }}>2 · What takes most of your time?</div>
          <div className="chips">{PAINS.map((x) => <button key={x.id} className={`chip ${pain === x.id ? 'sel' : ''}`} aria-pressed={pain === x.id} onClick={() => setPain(x.id)}>{x.label}</button>)}</div></div>
      </div>
      {r && p && (
        <div className="panel" style={{ borderColor: 'var(--blue-line)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="stephead"><span className="eyebrow">NotebookLM could help you with…</span><span className="badge b-green">Recommended</span></div>
          <div className="bp">
            <div className="row"><span className="k">Your notebook</span><span className="name">{r.notebook}</span></div>
            <div className="row"><span className="k">Put inside</span><span>{r.inside}</span></div>
            <div className="row"><span className="k">Why NotebookLM</span><span>{r.why}</span></div>
            <div className="row"><span className="k">Try asking</span><div><CopyBlock label="First question" text={p.prompt} onCopy={toast} /></div></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-p" onClick={() => { prefill(`Create a "${r.notebook}" for the ${r.label} team: ${r.why.toLowerCase()}`); go('build'); }}>Build this notebook <Icon n="arrow" s={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

function blueprintText(b: Blueprint) {
  return [
    `NOTEBOOK BLUEPRINT — ${b.name}`, '', `Purpose: ${b.purpose}`, `Audience: ${b.audience}`, '',
    'Recommended sources:', ...b.recommended_sources.map((s) => `- ${s}`), '',
    'Avoid:', ...b.sources_to_avoid.map((s) => `- ${s}`), '',
    'Starter questions:', ...b.starter_questions.map((s) => `- ${s}`), '',
    `Sharing: ${b.sharing}`, `Review cadence: ${b.review_cadence}`, '',
    'Before publishing:', ...PUBLISH_CHECKLIST.map((s) => `[ ] ${s}`),
  ].join('\n');
}

function Build({ goal, setGoal, toast }: { goal: string; setGoal: (s: string) => void; toast: (m: string) => void }) {
  const [audience, setAudience] = useState('Operations team, Marseille');
  const [sources, setSources] = useState<string[]>(['Procedures', 'Regulations', 'Training material']);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<{ blueprint: Blueprint; source: 'gemini' | 'template' } | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (s: string) => setSources(sources.includes(s) ? sources.filter((x) => x !== s) : [...sources, s]);
  const run = async () => {
    setLoading(true); setChecked(new Set());
    try { setRes(await generateBlueprint({ goal, audience, sources })); } finally { setLoading(false); }
  };
  const b = res?.blueprint;
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Notebook Builder</span><h2>Build my first notebook</h2>
        <p>Describe a business need. Gemini turns it into a blueprint you can build in NotebookLM in minutes.</p></div>
      <form className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={(e) => { e.preventDefault(); if (goal.trim()) run(); }}>
        <div className="field"><label htmlFor="goal">What are you trying to achieve?</label>
          <textarea id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Help my team answer questions about dangerous goods procedures" /></div>
        <div className="field"><label htmlFor="aud">Who will use this notebook?</label>
          <input id="aud" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Operations team, Marseille" /></div>
        <div className="field"><label>What sources do you have?</label>
          <div className="checks">{SOURCE_TYPES.map((s) => <button type="button" key={s} className={`chip ${sources.includes(s) ? 'sel' : ''}`} aria-pressed={sources.includes(s)} onClick={() => toggle(s)}>{sources.includes(s) && '✓ '}{s}</button>)}</div></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="pill-g"><Icon n="spark" s={14} /> Powered by Google Gemini</span>
          <button className="btn btn-p" type="submit" disabled={loading || !goal.trim()}>{loading ? <><span className="spin" /> Generating…</> : <>Generate my blueprint <Icon n="spark" s={16} /></>}</button>
        </div>
      </form>
      {b && (
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="stephead"><span className="eyebrow">Your notebook blueprint</span>
            <span className={`badge ${res?.source === 'gemini' ? 'b-green' : 'b-grey'}`}>{res?.source === 'gemini' ? 'Generated with Gemini' : 'Example template'}</span></div>
          <div className="bp">
            <div className="row"><span className="k">Suggested name</span><span className="name">{b.name}</span></div>
            <div className="row"><span className="k">Purpose</span><span>{b.purpose}</span></div>
            <div className="row"><span className="k">Audience</span><span>{b.audience}</span></div>
            <div className="row"><span className="k">Recommended sources</span><ul>{b.recommended_sources.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div className="row"><span className="k">Avoid</span><ul>{b.sources_to_avoid.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div className="row"><span className="k">Starter questions</span><div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>{b.starter_questions.map((q, i) => <CopyBlock key={q} label={`Question ${i + 1}`} text={q} onCopy={toast} />)}</div></div>
            <div className="row"><span className="k">Sharing</span><span>{b.sharing}</span></div>
            <div className="row"><span className="k">Review cadence</span><span>{b.review_cadence}</span></div>
          </div>
          <div className="expected" style={{ background: 'var(--surface)' }}>
            <div className="t"><Icon n="check" s={16} /> Before publishing · {checked.size}/{PUBLISH_CHECKLIST.length}</div>
            <div className="cl">{PUBLISH_CHECKLIST.map((c, i) => (
              <label key={c}><input type="checkbox" id={`cl-${i}`} checked={checked.has(i)} onChange={() => { const n = new Set(checked); n.has(i) ? n.delete(i) : n.add(i); setChecked(n); }} />{c}</label>
            ))}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-o" onClick={() => { setRes(null); setGoal(''); }}>Start over</button>
            <button className="btn btn-p" onClick={() => copyText(blueprintText(b), () => toast('Blueprint copied'))}><Icon n="copy" s={16} /> Copy my blueprint</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Help() {
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Help & resources</span><h2>Need help?</h2><p>Answers to common questions, short videos and the people who can help you.</p></div>
      <div className="faq">{FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      <div><div className="label" style={{ marginBottom: 10 }}>How-to videos</div>
        <div className="grid4">{VIDEOS.map((v) => (
          <div key={v} className="tile"><div className="vthumb"><Icon n="play" s={28} /></div><b style={{ fontSize: 13.5, marginTop: 6 }}>{v}</b><span>Coming soon</span></div>
        ))}</div></div>
      <div className="grid2">
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="label">Your champions</div>
          {['Champion name — Team', 'Champion name — Team'].map((c, i) => <div key={i} className="person"><span className="avatar"><Icon n="people" s={20} /></span><div><b style={{ fontWeight: 500 }}>{c.split(' — ')[0]}</b><div className="note">{c.split(' — ')[1]}</div></div></div>)}
        </div>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="stephead"><div className="label">NotebookLM Lab</div><span className="badge b-blue">2 hours</span></div>
          <p style={{ margin: 0, color: 'var(--text-2)' }}>A hands-on session for one team. You bring your documents, you leave with your first notebook built, tested and shared.</p>
          <button className="btn btn-p" style={{ alignSelf: 'flex-start' }} onClick={(e) => e.preventDefault()}>Book a NotebookLM Lab for my team</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- app ---------------- */
export default function App() {
  const [section, setSection] = useState<SectionId>('home');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [visited, setVisited] = useState<Set<SectionId>>(new Set());
  const [goal, setGoal] = useState('Help my team answer questions about dangerous goods procedures');
  const { msg, show } = useToast();

  const go = (s: SectionId) => { setSection(s); setVisited((v) => new Set(v).add(s)); window.scrollTo({ top: 0 }); };
  const markDone = (n: number) => setDone((d) => new Set(d).add(n));
  const progress = useMemo(() => Math.round((done.size / (MODULES.length + 1)) * 100), [done]);
  useEffect(() => { document.title = APP.title; }, []);

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => go('home')}><b>{APP.title}</b><span>{APP.subtitle}</span></button>
        <div className="grow" />
        <span className="proto">Prototype · for discussion</span>
        <div className="progress" title="Learning progress"><span>Progress {progress}%</span><span className="bar"><i style={{ width: `${progress}%` }} /></span></div>
        <div className="logos">
          {LOGOS.client ? <img src={LOGOS.client} alt="CMA CGM" /> : <span className="txt">CMA CGM</span>}
          <span className="x">×</span>
          {LOGOS.google ? <img src={LOGOS.google} alt="Google" /> : <span className="txt" style={{ letterSpacing: 0, fontWeight: 500 }}>Google</span>}
        </div>
      </header>
      <div className="shell">
        <nav className="side" aria-label="Sections">
          <button className={`nav ${section === 'home' ? 'on' : ''}`} onClick={() => go('home')}><Icon n="home" s={18} /><span><span className="lbl">Home</span></span></button>
          <div className="grp">Your journey</div>
          {SECTIONS.map((s) => (
            <React.Fragment key={s.id}>
              <button className={`nav ${section === s.id ? 'on' : ''}`} onClick={() => go(s.id)} aria-current={section === s.id ? 'page' : undefined}>
                {visited.has(s.id) && section !== s.id ? <span style={{ color: 'var(--green)', display: 'inline-flex' }}><Icon n="check" s={18} /></span> : <Icon n={NAV_ICON[s.id]} s={18} />}
                <span><span className="lbl">{s.label}</span><span className="sub" style={{ display: 'block' }}>{s.hint}</span></span>
              </button>
              {s.id === 'learn' && section === 'learn' && [...MODULES.map((m) => m.title), 'Quiz'].map((t, i) => (
                <button key={t} className={`substep ${done.has(i) ? 'done' : ''} ${step === i ? 'cur' : ''}`} onClick={() => setStep(i)}>
                  {done.has(i) ? <Icon n="check" s={14} /> : <span style={{ width: 14, textAlign: 'center' }}>·</span>}{t}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <main>
          {section === 'home' && <Home go={go} />}
          {section === 'discover' && <Discover go={go} />}
          {section === 'learn' && <Learn step={step} setStep={setStep} done={done} markDone={markDone} go={go} toast={show} />}
          {section === 'starter' && <Starter toast={show} />}
          {section === 'usecases' && <UseCases go={go} toast={show} prefill={setGoal} />}
          {section === 'build' && <Build goal={goal} setGoal={setGoal} toast={show} />}
          {section === 'help' && <Help />}
        </main>
      </div>
      {msg && <div className="toast" role="status">{msg}</div>}
    </>
  );
}
