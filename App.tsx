import React, { useEffect, useMemo, useState } from 'react';
import { APP, LOGOS, SECTIONS, HOME_CARDS, PRINCIPLES, TOOLS, FAQ, VIDEOS, SectionId } from './data';
import { Icon, NAV_ICON, useToast, Badges } from './ui';
import { ESSENTIALS, ESSENTIALS_QUIZ, CHAMPION_LAB, USE_CASE_LABS, LabStep } from './labs';
import { StepView, Quiz, UiMock } from './Lab';

/* ---------- Home ---------- */
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
        {HOME_CARDS.map((c) => {
          const inner = (<>
            <div className="top"><span className="icon"><Icon n={c.icon} /></span><Badges items={c.badges} /></div>
            <h3>{c.title}</h3><p>{c.text}</p>
            <span className="btn btn-p" style={{ width: '100%' }}>{c.cta} <Icon n={c.id === 'open' ? 'open' : 'arrow'} s={16} /></span></>);
          return c.id === 'open'
            ? <a key={c.id} className="card" href={APP.starterNotebookUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
            : <button key={c.id} className="card" onClick={() => go(c.id as SectionId)}>{inner}</button>;
        })}
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

/* ---------- Discover ---------- */
function Discover({ go }: { go: (s: SectionId) => void }) {
  return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Discover</span><h2>What is NotebookLM?</h2>
        <p>A place where a chosen set of documents can be questioned, and where every answer points back to the page it came from.</p></div>
      {APP.videoUrl
        ? <video src={APP.videoUrl} controls style={{ width: '100%', borderRadius: 12, border: '1px solid var(--line-soft)' }} />
        : <div className="video"><div><div className="play"><Icon n="play" s={30} /></div><b>NotebookLM in 5 minutes</b><span>Video Overview generated with NotebookLM from the Starter Notebook</span></div></div>}
      <UiMock zone="all" caption="A notebook: your sources, the chat, and the Studio" />
      <div className="ph"><h2 style={{ fontSize: 20 }}>Three tools, three questions</h2><p>Each tool has its own job. Pick the one that matches your question.</p></div>
      <div className="grid3">
        {TOOLS.map((t) => (
          <div key={t.name} className={`tile ${t.highlight ? 'hl' : ''}`} style={{ gap: 8 }}>
            <span className="label" style={{ color: t.highlight ? 'var(--blue)' : 'var(--text)' }}>{t.name}</span>
            <span className="q">{t.question}</span><span>{t.job}</span>
          </div>
        ))}
      </div>
      <div className="panel soft" style={{ textAlign: 'center', fontSize: 15 }}>
        Maia helps you do the work. <b style={{ fontWeight: 500, color: 'var(--blue)' }}>NotebookLM helps you check it against the source.</b>
      </div>
      <div className="pager"><span className="note">Next: NotebookLM Essentials, 25 minutes</span>
        <button className="btn btn-p" onClick={() => go('learn')}>Start learning <Icon n="arrow" s={16} /></button></div>
    </div>
  );
}

/* ---------- Generic runner ---------- */
function Runner({ steps, step, setStep, markDone, toast, header, onFinish, finishLabel }: {
  steps: LabStep[]; step: number; setStep: (n: number) => void; markDone: (n: number) => void; toast: (m: string) => void;
  header?: React.ReactNode; onFinish: () => void; finishLabel: string;
}) {
  const s = steps[step];
  return <StepView key={step} s={s} index={step} total={steps.length} toast={toast} header={step === 0 ? header : undefined}
    onBack={() => setStep(step - 1)}
    onNext={() => { markDone(step); if (step === steps.length - 1) onFinish(); else setStep(step + 1); window.scrollTo({ top: 0 }); }}
    nextLabel={step === steps.length - 1 ? finishLabel : 'Mark as done & continue'} />;
}

function Done({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="wrap"><div className="panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', padding: 36 }}>
      <span className="badge b-green">Completed</span><h2>{title}</h2>
      <p style={{ margin: 0, color: 'var(--text-2)', maxWidth: 520 }}>{text}</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 6 }}>{children}</div>
    </div></div>
  );
}

const IntroCard = ({ eyebrow, title, text, badges }: { eyebrow: string; title: string; text: string; badges: { text: string; tone: string }[] }) => (
  <div className="panel soft" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <span className="eyebrow">{eyebrow}</span><h2 style={{ fontSize: 22 }}>{title}</h2>
    <p style={{ margin: 0, color: 'var(--text-2)' }}>{text}</p>
    <div className="badges" style={{ justifyContent: 'flex-start', marginTop: 4 }}>{badges.map((b) => <span key={b.text} className={`badge b-${b.tone}`}>{b.text}</span>)}</div>
  </div>
);

/* ---------- Use Case Labs ---------- */
function Labs({ labId, setLabId, step, setStep, done, markDone, toast }: {
  labId: string | null; setLabId: (s: string | null) => void; step: number; setStep: (n: number) => void; done: Set<string>; markDone: (k: string) => void; toast: (m: string) => void;
}) {
  const lab = USE_CASE_LABS.find((l) => l.id === labId);
  if (!lab) return (
    <div className="wrap">
      <div className="ph"><span className="eyebrow">Use Case Labs</span><h2>Build a real notebook for your team</h2>
        <p>Four hands-on labs, one per starting use case. Each one takes you from the right sources to a configured, tested and shared notebook.</p></div>
      <div className="grid2">
        {USE_CASE_LABS.map((l) => (
          <button key={l.id} className="labcard" onClick={() => { setLabId(l.id); setStep(0); }}>
            <div className="stephead"><span className="eyebrow">{l.team}</span><Badges items={l.badges} /></div>
            <h3>{l.title}</h3><p>{l.subtitle}</p>
            <div className="tile" style={{ background: 'var(--surface)', borderColor: 'transparent' }}><b style={{ fontSize: 12 }}>What you get</b><span>{l.outcome}</span></div>
            <span className="btn btn-p" style={{ alignSelf: 'flex-start' }}>{done.has(l.id) ? 'Open again' : 'Start the lab'} <Icon n="arrow" s={16} /></span>
          </button>
        ))}
      </div>
    </div>
  );
  if (step >= lab.steps.length) return <Done title={`${lab.title} is ready.`} text="Your team has a configured, tested and shared notebook. Review the sources on the date you set, and collect new questions from the team.">
    <button className="btn btn-o" onClick={() => setLabId(null)}>Back to all labs</button></Done>;
  return <Runner steps={lab.steps} step={step} setStep={setStep} markDone={() => {}} toast={toast} onFinish={() => { markDone(lab.id); setStep(lab.steps.length); }} finishLabel="Finish the lab"
    header={<>
      <button className="btn btn-t" style={{ alignSelf: 'flex-start' }} onClick={() => setLabId(null)}><Icon n="back" s={16} /> All labs</button>
      <IntroCard eyebrow={`Use Case Lab · ${lab.team}`} title={lab.title} text={lab.why} badges={lab.badges} />
    </>} />;
}

/* ---------- Help ---------- */
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
          {[0, 1].map((i) => <div key={i} className="person"><span className="avatar"><Icon n="people" s={20} /></span><div><b style={{ fontWeight: 500 }}>Champion name</b><div className="note">Team</div></div></div>)}
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

/* ---------- App ---------- */
export default function App() {
  const [section, setSection] = useState<SectionId>('home');
  const [lStep, setLStep] = useState(0);
  const [lDone, setLDone] = useState<Set<number>>(new Set());
  const [cStep, setCStep] = useState(0);
  const [cDone, setCDone] = useState<Set<number>>(new Set());
  const [labId, setLabId] = useState<string | null>(null);
  const [labStep, setLabStep] = useState(0);
  const [labsDone, setLabsDone] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<SectionId>>(new Set());
  const { msg, show } = useToast();

  const go = (s: SectionId) => { setSection(s); setVisited((v) => new Set(v).add(s)); window.scrollTo({ top: 0 }); };
  const progress = useMemo(() => Math.round((lDone.size / (ESSENTIALS.length + 1)) * 100), [lDone]);
  useEffect(() => { document.title = APP.title; }, []);

  const subSteps = (titles: string[], cur: number, done: Set<number>, set: (n: number) => void) => titles.map((t, i) => (
    <button key={t + i} className={`substep ${done.has(i) ? 'done' : ''} ${cur === i ? 'cur' : ''}`} onClick={() => set(i)}>
      {done.has(i) ? <Icon n="check" s={14} /> : <span style={{ width: 14, textAlign: 'center' }}>·</span>}{t}
    </button>));
  const lab = USE_CASE_LABS.find((l) => l.id === labId);

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => go('home')}><b>{APP.title}</b><span>{APP.subtitle}</span></button>
        <div className="grow" />
        <span className="proto">Prototype · for discussion</span>
        <div className="progress" title="NotebookLM Essentials progress"><span>Progress {progress}%</span><span className="bar"><i style={{ width: `${progress}%` }} /></span></div>
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
              {s.id === 'learn' && section === 'learn' && subSteps([...ESSENTIALS.map((m) => m.title), 'Quiz'], lStep, lDone, setLStep)}
              {s.id === 'labs' && section === 'labs' && lab && subSteps(lab.steps.map((m) => m.title), labStep, new Set(), setLabStep)}
            </React.Fragment>
          ))}
          <div className="grp">For champions</div>
          <button className={`nav ${section === 'champion' ? 'on' : ''}`} onClick={() => go('champion')}>
            <Icon n="people" s={18} /><span><span className="lbl">Champion Lab</span><span className="sub" style={{ display: 'block' }}>Build & share the Starter Notebook</span></span>
          </button>
          {section === 'champion' && subSteps(CHAMPION_LAB.steps.map((m) => m.title), cStep, cDone, setCStep)}
        </nav>
        <main>
          {section === 'home' && <Home go={go} />}
          {section === 'discover' && <Discover go={go} />}
          {section === 'learn' && (lStep < ESSENTIALS.length
            ? <Runner steps={ESSENTIALS} step={lStep} setStep={setLStep} markDone={(n) => setLDone((d) => new Set(d).add(n))} toast={show} onFinish={() => setLStep(ESSENTIALS.length)} finishLabel="Take the quiz"
                header={<IntroCard eyebrow="NotebookLM Essentials" title="Learn NotebookLM properly, in 25 minutes" text="Seven short hands-on modules. Keep NotebookLM open next to this page and do each exercise as you go." badges={[{ text: '25 min', tone: 'blue' }, { text: '7 modules + quiz', tone: 'grey' }, { text: 'Hands-on', tone: 'amber' }]} />} />
            : <Quiz items={ESSENTIALS_QUIZ} onBack={() => setLStep(ESSENTIALS.length - 1)} onFinish={() => setLDone((d) => new Set(d).add(ESSENTIALS.length))}
                endCta={<button className="btn btn-p" onClick={() => go('labs')}>Build a notebook for my team <Icon n="arrow" s={16} /></button>} />)}
          {section === 'labs' && <Labs labId={labId} setLabId={setLabId} step={labStep} setStep={setLabStep} done={labsDone} markDone={(k) => setLabsDone((d) => new Set(d).add(k))} toast={show} />}
          {section === 'champion' && (cStep < CHAMPION_LAB.steps.length
            ? <Runner steps={CHAMPION_LAB.steps} step={cStep} setStep={setCStep} markDone={(n) => setCDone((d) => new Set(d).add(n))} toast={show} onFinish={() => setCStep(CHAMPION_LAB.steps.length)} finishLabel="Finish the lab"
                header={<IntroCard eyebrow="For champions" title={CHAMPION_LAB.title} text={CHAMPION_LAB.subtitle} badges={CHAMPION_LAB.badges} />} />
            : <Done title="Your Starter Notebook is live." text="Every licensed user can open it on day one. Next: run a Use Case Lab with your team.">
                <button className="btn btn-o" onClick={() => setCStep(0)}>Back to step 1</button>
                <button className="btn btn-p" onClick={() => go('labs')}>Use Case Labs <Icon n="arrow" s={16} /></button></Done>)}
          {section === 'help' && <Help />}
        </main>
      </div>
      {msg && <div className="toast" role="status">{msg}</div>}
    </>
  );
}
