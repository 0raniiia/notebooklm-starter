import React, { useState } from 'react';
import { Icon, CopyBlock, Expected, Ring, copyText } from './ui';
import { LabStep, Zone } from './labs';
import { STARTER_SOURCE_TEXTS } from './championSources';

/* ---------- Annotated NotebookLM interface schematic ---------- */
const STUDIO_TILES = ['Audio Overview', 'Video Overview', 'Mind map', 'Reports', 'Flashcards', 'Quiz', 'Infographic', 'Slide deck'];
const SRC = ['Quick start guide', 'Which tool for what?', 'FAQ', 'Prompt library', 'Blueprint method'];

export function UiMock({ zone, caption, compact }: { zone: Zone; caption?: string; compact?: boolean }) {
  const on = (z: Zone[]) => zone === 'all' || z.includes(zone);
  const cls = (z: Zone[]) => `mk-col ${on(z) ? 'mk-on' : 'mk-dim'}`;
  const num = (n: number, z: Zone[]) => (on(z) ? <span className="mk-num">{n}</span> : null);
  return (
    <figure className={`mock ${compact ? 'mock-sm' : ''}`}>
      <div className="mk-frame" aria-hidden="true">
        <div className="mk-top">
          <span className="mk-logo" />
          <b>Start here: NotebookLM @ CMA CGM</b>
          <span className="grow" />
          <span className={`mk-share ${zone === 'share' ? 'mk-hl' : ''}`}>{zone === 'share' && <span className="mk-num">1</span>}Share</span>
        </div>
        <div className="mk-body">
          <div className={cls(['sources', 'add'])} style={{ position: 'relative' }}>
            {num(1, ['sources', 'add'])}
            <div className="mk-h">Sources</div>
            <div className={`mk-add ${zone === 'add' ? 'mk-hl' : ''}`}>+ Add sources</div>
            <div className="mk-row"><span className={`mk-cb ${zone === 'sources' ? 'mk-hl' : ''}`}>✓</span> Select all sources</div>
            {SRC.map((s, i) => (
              <div key={s} className="mk-row"><span className="mk-doc" /> <span className="mk-t">{s}</span>
                <span className={`mk-cb ${zone === 'sources' && i !== 1 ? 'mk-off' : ''}`}>{zone === 'sources' && i !== 1 ? '' : '✓'}</span></div>
            ))}
          </div>
          <div className={cls(['chat', 'citation', 'config'])} style={{ position: 'relative' }}>
            {num(zone === 'all' ? 2 : 1, ['chat', 'citation', 'config'])}
            <div className="mk-h">Chat <span className="grow" /><span className={`mk-ico ${zone === 'config' ? 'mk-hl' : ''}`} title="Configure chat">⚙</span></div>
            <div className="mk-q">How do I verify an answer?</div>
            <div className="mk-a">Open the numbered citation next to each statement <span className={`mk-cite ${zone === 'citation' ? 'mk-hl' : ''}`}>1</span>. If the sources don’t contain the answer, NotebookLM says so <span className="mk-cite">2</span>.
              <div className="mk-save">📌 Save to note</div></div>
            <div className="mk-input">Start typing…</div>
            {zone === 'citation' && <div className="mk-pop"><div className="mk-pt">Quick start guide</div>…Don’t stop at the answer: <mark>open the citation. Check that the passage really says what the answer says</mark>, especially before you act…</div>}
            {zone === 'config' && <div className="mk-pop mk-dialog"><div className="mk-pt">Configure chat</div><div className="mk-chips"><span className="mk-chip sel">Custom goal</span><span className="mk-chip">Default</span></div><div className="mk-ta">You are a NotebookLM coach for CMA CGM employees. Answer in short, practical steps…</div><div className="mk-btn">Save</div></div>}
            {zone === 'mindmap' && <div className="mk-pop mk-mm"><span className="mm c">NotebookLM</span><span className="mm a">Sources</span><span className="mm b mk-hl">Citations</span><span className="mm d">Studio</span><span className="mm e">Sharing</span></div>}
          </div>
          <div className={cls(['studio', 'audio', 'mindmap'])} style={{ position: 'relative' }}>
            {num(zone === 'all' ? 3 : 1, ['studio', 'audio', 'mindmap'])}
            <div className="mk-h">Studio</div>
            <div className="mk-grid">{STUDIO_TILES.map((t) => <span key={t} className={`mk-tile ${(zone === 'audio' && t === 'Audio Overview') || (zone === 'mindmap' && t === 'Mind map') ? 'mk-hl' : ''}`}>{t}</span>)}</div>
            {zone === 'audio' && <div className="mk-pop mk-dialog" style={{ right: 6, left: 6 }}><div className="mk-pt">Customize Audio Overview</div><div className="mk-chips"><span className="mk-chip">Deep dive</span><span className="mk-chip sel">Brief</span><span className="mk-chip">Critique</span><span className="mk-chip">Debate</span></div><div className="mk-ta">For a CMA CGM employee in their first week…</div><div className="mk-btn">Generate</div></div>}
            {zone === 'share' && <div className="mk-pop mk-dialog" style={{ right: 6, left: 6, top: 8 }}><div className="mk-pt">Share notebook</div><div className="mk-ta" style={{ minHeight: 0 }}>notebooklm-users@…</div><div className="mk-chips"><span className="mk-chip sel">Viewer</span><span className="mk-chip">Editor</span></div><div className="mk-btn">Send</div></div>}
          </div>
        </div>
      </div>
      {caption && <figcaption>{caption} <span className="note">· Illustration, the interface may differ slightly</span></figcaption>}
    </figure>
  );
}

export function HintShow({ text, show }: { text?: string; show?: Zone }) {
  const [open, setOpen] = useState(false);
  if (!text && !show) return null;
  return (
    <div className="hint">
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none' }}><Icon n="expand" s={16} /></span>
        {open ? 'Hide hint' : show ? 'Show me where' : 'Need a hint?'}
      </button>
      {open && <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>{text && <p style={{ margin: 0 }}>{text}</p>}{show && <UiMock zone={show} compact />}</div>}
    </div>
  );
}

function SourceList({ toast }: { toast: (m: string) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="panel soft" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="stephead"><div className="label">The 5 sources</div><span className="badge b-blue">Ready to paste</span></div>
      {STARTER_SOURCE_TEXTS.map((s, i) => (
        <div key={s.file} className="tile" style={{ gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-3)', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
              <div><b style={{ fontSize: 13.5 }}>{s.title}</b><span style={{ display: 'block' }}>{s.file}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-t" onClick={() => setOpen(open === i ? null : i)}>{open === i ? 'Hide text' : 'Show text'}</button>
              <button className="btn btn-o" onClick={() => copyText(s.text, () => toast('Source text copied'))}><Icon n="copy" s={14} /> Copy text</button>
            </div>
          </div>
          {open === i && <div className="codebox" style={{ marginTop: 0 }}><pre style={{ maxHeight: 280, overflow: 'auto' }}>{s.text}</pre></div>}
        </div>
      ))}
    </div>
  );
}

/* ---------- One step ---------- */
export function StepView({ s, index, total, toast, onBack, onNext, nextLabel, header }: {
  s: LabStep; index: number; total: number; toast: (m: string) => void; onBack: () => void; onNext: () => void; nextLabel: string; header?: React.ReactNode;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  return (
    <div className="wrap">
      {header}
      <div className="stephead">
        <span className="badge b-amber">{s.phase} · {s.duration}</span>
        <span className="stepcount">STEP {index + 1} OF {total} <Ring value={(index + 1) / total} /></span>
      </div>
      <div className="ph"><h2>{s.title}</h2></div>
      <div className="lead">{s.intro.map((t) => <p key={t}>{t}</p>)}</div>
      {s.visual && <UiMock zone={s.visual} caption={s.visualCaption} />}
      {s.tips && (
        <div className="protips">
          <div className="t"><Icon n="spark" s={16} /> Pro tips</div>
          <ul>{s.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      <div className="panel">
        <div className="label" style={{ marginBottom: 14 }}>Your turn — follow the steps below in NotebookLM</div>
        <ul className="steps">
          {s.activities.map((a, i) => (
            <li key={i}><div><div>{a.text}</div>
              {a.copy && <CopyBlock label={a.copyLabel} text={a.copy} onCopy={toast} />}
              <HintShow text={a.hint} show={a.show} /></div></li>
          ))}
        </ul>
      </div>
      {s.sources && <SourceList toast={toast} />}
      <Expected text={s.expected} />
      {s.checklist && (
        <div className="expected">
          <div className="t"><Icon n="check" s={16} /> Checklist · {checked.size}/{s.checklist.length}</div>
          <div className="cl">{s.checklist.map((c, i) => (
            <label key={c}><input type="checkbox" id={`ck-${index}-${i}`} checked={checked.has(i)} onChange={() => { const n = new Set(checked); n.has(i) ? n.delete(i) : n.add(i); setChecked(n); }} />{c}</label>
          ))}</div>
        </div>
      )}
      <div className="pager">
        <button className="btn btn-o" disabled={index === 0} onClick={onBack}><Icon n="back" s={16} /> Back</button>
        <button className="btn btn-p" onClick={onNext}>{nextLabel} <Icon n="arrow" s={16} /></button>
      </div>
    </div>
  );
}

/* ---------- Generic quiz ---------- */
export function Quiz({ items, onBack, onFinish, endCta }: {
  items: { q: string; options: string[]; answer: number; why: string }[]; onBack: () => void; onFinish: () => void; endCta?: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);
  const q = items[i];
  if (end) return (
    <div className="wrap">
      <div className="panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', padding: 36 }}>
        <span className="badge b-green">Completed</span>
        <div className="score">{score}/{items.length}</div>
        <h2>{score >= items.length - 1 ? 'You’re ready.' : 'Almost there.'}</h2>
        <p style={{ margin: 0, color: 'var(--text-2)' }}>{score >= items.length - 1 ? 'You know the features most users never discover.' : 'Review the modules where you hesitated, then try again.'}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <button className="btn btn-o" onClick={() => { setI(0); setPicked(null); setScore(0); setEnd(false); }}>Retake quiz</button>
          {endCta}
        </div>
      </div>
    </div>
  );
  return (
    <div className="wrap">
      <div className="stephead"><span className="badge b-blue">Quiz · question {i + 1} of {items.length}</span></div>
      <div className="ph"><span className="eyebrow">Check your knowledge</span><h2>{q.q}</h2></div>
      <div className="opts">
        {q.options.map((o, k) => {
          const c = picked === null ? '' : k === q.answer ? 'ok' : k === picked ? 'ko' : '';
          return <button key={o} className={`opt ${c}`} disabled={picked !== null} onClick={() => { setPicked(k); if (k === q.answer) setScore(score + 1); }}>
            {c === 'ok' && <Icon n="check" s={18} />}{c === 'ko' && <Icon n="x" s={18} />}{o}</button>;
        })}
      </div>
      {picked !== null && <div className={`fb ${picked === q.answer ? 'ok' : 'ko'}`}>{picked === q.answer ? 'Correct. ' : 'Not quite. '}{q.why}</div>}
      <div className="pager">
        <button className="btn btn-o" onClick={() => (i === 0 ? onBack() : (setI(i - 1), setPicked(null)))}><Icon n="back" s={16} /> Back</button>
        <button className="btn btn-p" disabled={picked === null} onClick={() => { if (i === items.length - 1) { setEnd(true); onFinish(); } else { setI(i + 1); setPicked(null); } }}>
          {i === items.length - 1 ? 'See my score' : 'Next question'} <Icon n="arrow" s={16} /></button>
      </div>
    </div>
  );
}
