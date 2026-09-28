export const CSS = `
:root{
  --bg:#ffffff; --surface:#f8f9fa; --surface-2:#f1f3f4; --line:#dadce0; --line-soft:#e8eaed;
  --text:#202124; --text-2:#5f6368; --text-3:#80868b;
  --blue:#1a73e8; --blue-ink:#174ea6; --blue-soft:#e8f0fe; --blue-line:#d2e3fc;
  --green:#188038; --green-soft:#e6f4ea; --amber:#b06000; --amber-soft:#fef7e0; --red:#d93025; --red-soft:#fce8e6;
  --code-bg:#f8f9fa; --shadow:0 1px 2px rgba(60,64,67,.12),0 1px 3px 1px rgba(60,64,67,.08);
  --shadow-hover:0 1px 3px rgba(60,64,67,.2),0 4px 8px 3px rgba(60,64,67,.1);
  --font:"Google Sans","Google Sans Text",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:"Roboto Mono","Google Sans Mono",ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  color-scheme:dark; --bg:#1f1f1f; --surface:#28292a; --surface-2:#303134; --line:#3c4043; --line-soft:#303134;
  --text:#e8eaed; --text-2:#bdc1c6; --text-3:#9aa0a6; --blue:#8ab4f8; --blue-ink:#aecbfa; --blue-soft:#1f2c40; --blue-line:#2c3e57;
  --green:#81c995; --green-soft:#1e3325; --amber:#fdd663; --amber-soft:#3a3120; --red:#f28b82; --red-soft:#3b2322; --code-bg:#28292a;
  --shadow:0 1px 2px rgba(0,0,0,.4); --shadow-hover:0 2px 8px rgba(0,0,0,.5);
}}
:root[data-theme="dark"]{
  color-scheme:dark; --bg:#1f1f1f; --surface:#28292a; --surface-2:#303134; --line:#3c4043; --line-soft:#303134;
  --text:#e8eaed; --text-2:#bdc1c6; --text-3:#9aa0a6; --blue:#8ab4f8; --blue-ink:#aecbfa; --blue-soft:#1f2c40; --blue-line:#2c3e57;
  --green:#81c995; --green-soft:#1e3325; --amber:#fdd663; --amber-soft:#3a3120; --red:#f28b82; --red-soft:#3b2322; --code-bg:#28292a;
  --shadow:0 1px 2px rgba(0,0,0,.4); --shadow-hover:0 2px 8px rgba(0,0,0,.5);
}
*{box-sizing:border-box}
html,body{background:var(--bg)}
body{margin:0;font-family:var(--font);color:var(--text);font-size:14px;line-height:1.55;-webkit-font-smoothing:antialiased}
button{font:inherit;cursor:pointer}
:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:6px}
h1,h2,h3{text-wrap:balance;margin:0;font-weight:500;letter-spacing:-.01em}

/* top bar */
.topbar{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:var(--bg);border-bottom:1px solid var(--line-soft);
  display:flex;align-items:center;gap:16px;padding:10px 20px;min-height:56px}
.brand{display:flex;flex-direction:column;min-width:0;cursor:pointer;background:none;border:0;padding:0;text-align:left;color:inherit}
.brand b{font-size:15px;font-weight:500}
.brand span{font-size:11px;color:var(--text-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topbar .grow{flex:1}
.progress{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text-2)}
.progress .bar{width:120px;height:4px;background:var(--line-soft);border-radius:4px;overflow:hidden}
.progress .bar i{display:block;height:100%;background:var(--blue);transition:width .3s}
.logos{display:flex;align-items:center;gap:10px;padding-left:14px;border-left:1px solid var(--line-soft)}
.logos img{height:22px;width:auto;display:block}
.logos .txt{font-weight:700;font-size:13px;letter-spacing:.06em;color:var(--text)}
.logos .x{color:var(--text-3);font-size:12px}
.proto{font-size:11px;color:var(--text-2);border:1px solid var(--line);border-radius:999px;padding:2px 10px;white-space:nowrap}

/* layout */
.shell{display:grid;grid-template-columns:248px minmax(0,1fr);min-height:calc(100vh - 57px)}
.side{border-right:1px solid var(--line-soft);padding:16px 10px;position:sticky;top:57px;align-self:start;max-height:calc(100vh - 57px);overflow:auto}
.side .grp{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);padding:12px 12px 6px}
.nav{display:flex;align-items:flex-start;gap:10px;width:100%;border:0;background:none;text-align:left;padding:8px 12px;border-radius:0 20px 20px 0;color:var(--text);margin-left:-10px;padding-left:22px}
.nav:hover{background:var(--surface-2)}
.nav.on{background:var(--blue-soft);color:var(--blue-ink)}
.nav .lbl{font-weight:500;font-size:13px}
.nav .sub{font-size:11px;color:var(--text-2)}
.nav.on .sub{color:var(--blue-ink);opacity:.8}
.nav svg{flex:none;margin-top:1px}
.substep{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--text-2);padding:4px 12px 4px 34px;border:0;background:none;width:100%;text-align:left}
.substep.done{color:var(--green)}
.substep.cur{color:var(--blue);font-weight:500}
main{padding:28px 32px 64px;min-width:0}
.wrap{max-width:880px;margin:0 auto;display:flex;flex-direction:column;gap:24px}

/* home */
.hero{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;padding:28px 0 8px}
.hero h1{font-size:34px;font-weight:400}
.hero p{margin:0;color:var(--text-2);font-size:16px;max-width:560px}
.pill-g{display:inline-flex;align-items:center;gap:6px;background:var(--blue-soft);color:var(--blue-ink);font-size:12px;font-weight:500;border-radius:999px;padding:4px 12px}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.card{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:10px;text-align:left;color:inherit;transition:box-shadow .15s,border-color .15s}
.card:hover{box-shadow:var(--shadow-hover);border-color:transparent}
.card .top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.card .icon{color:var(--blue);display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--blue-soft)}
.badges{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.badge{font-size:11px;font-weight:500;border-radius:999px;padding:2px 8px;white-space:nowrap}
.b-blue{background:var(--blue-soft);color:var(--blue-ink)} .b-green{background:var(--green-soft);color:var(--green)}
.b-amber{background:var(--amber-soft);color:var(--amber)} .b-grey{background:var(--surface-2);color:var(--text-2)}
.card h3{font-size:18px;font-weight:500}
.card p{margin:0;color:var(--text-2);font-size:13px;flex:1}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:6px;padding:9px 18px;font-weight:500;font-size:13px;border:1px solid transparent;text-decoration:none}
.btn-p{background:var(--blue);color:var(--bg)}
.btn-p:hover{filter:brightness(1.07);box-shadow:var(--shadow)}
.btn-o{background:var(--bg);color:var(--blue);border-color:var(--line)}
.btn-o:hover{background:var(--blue-soft)}
.btn-t{background:none;color:var(--blue);padding:6px 8px}
.btn:disabled{opacity:.5;cursor:not-allowed}
.principles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;border-top:1px solid var(--line-soft);padding-top:22px}
.principle{display:flex;gap:10px}
.principle svg{color:var(--blue);flex:none;margin-top:2px}
.principle b{display:block;font-weight:500;font-size:14px}
.principle span{color:var(--text-2);font-size:13px}
.quote{text-align:center;color:var(--text-2);font-style:italic;font-size:13px;border-top:1px solid var(--line-soft);padding-top:16px}

/* page headers */
.eyebrow{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);font-weight:500}
.ph{display:flex;flex-direction:column;gap:6px}
.ph h2{font-size:26px;font-weight:400}
.ph p{margin:0;color:var(--text-2);max-width:640px;font-size:15px}
.stephead{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.stepcount{font-size:12px;font-weight:500;color:var(--blue);letter-spacing:.04em;display:flex;align-items:center;gap:8px}
.ring{width:18px;height:18px}
.label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text);font-weight:700}
.panel{border:1px solid var(--line);border-radius:12px;padding:20px;background:var(--bg)}
.panel.soft{background:var(--surface);border-color:var(--line-soft)}
.lead p{margin:0 0 6px;font-size:15px}
.lead p:first-child{font-size:17px}

/* steps */
.steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px}
.steps li{display:grid;grid-template-columns:14px 1fr;gap:10px}
.steps li:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--blue);margin-top:8px}
.hint{margin-top:4px}
.hint button{background:none;border:0;color:var(--blue);font-size:12px;padding:0;display:inline-flex;align-items:center;gap:4px}
.hint p{margin:6px 0 0;padding:6px 12px;border-left:2px solid var(--line);color:var(--text-2);font-size:13px;font-style:italic}
.codebox{border:1px solid var(--line);border-radius:8px;overflow:hidden;margin-top:8px;background:var(--bg)}
.codebox .h{display:flex;justify-content:space-between;align-items:center;padding:6px 12px;border-bottom:1px solid var(--line-soft);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-2);font-weight:500}
.codebox .h button{background:none;border:0;color:var(--blue);font-size:12px;display:inline-flex;gap:4px;align-items:center;text-transform:none;letter-spacing:0}
.codebox pre{margin:0;padding:12px;font-family:var(--mono);font-size:13px;white-space:pre-wrap;word-break:break-word;background:var(--code-bg)}
.expected{background:var(--surface);border-radius:8px;padding:14px 16px;display:flex;flex-direction:column;gap:6px}
.expected .t{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);font-weight:500;display:flex;gap:6px;align-items:center}
.expected p{margin:0;font-family:var(--mono);font-size:12.5px;color:var(--text)}
.tip{display:flex;gap:10px;background:var(--amber-soft);border-radius:8px;padding:12px 14px;font-size:13px}
.tip svg{color:var(--amber);flex:none}
.pager{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid var(--line-soft);padding-top:18px}

/* visuals */
.flow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;padding:8px 0}
.flow .n{border:1px solid var(--line);border-radius:10px;padding:12px 16px;text-align:center;min-width:130px;background:var(--bg)}
.flow .n b{display:block;font-weight:500}
.flow .n span{font-size:12px;color:var(--text-2)}
.flow .n.mid{background:var(--blue-soft);border-color:var(--blue-line);color:var(--blue-ink)}
.flow .n.mid span{color:var(--blue-ink)}
.flow .arr{color:var(--text-3)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid var(--line);border-radius:8px;padding:6px 12px;font-size:13px;background:var(--bg);color:var(--text)}
.chip.sel{background:var(--blue-soft);border-color:var(--blue-line);color:var(--blue-ink);font-weight:500}
button.chip:hover{background:var(--surface-2)}
button.chip.sel:hover{background:var(--blue-soft)}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cmp .c{border-radius:10px;padding:14px;border:1px solid var(--line)}
.cmp .c .k{font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;display:flex;gap:6px;align-items:center;margin-bottom:6px}
.cmp .weak .k{color:var(--red)} .cmp .good .k{color:var(--green)}
.cmp .weak{background:var(--red-soft);border-color:transparent} .cmp .good{background:var(--green-soft);border-color:transparent}
.cmp .c p{margin:0;font-family:var(--mono);font-size:13px}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.tile{border:1px solid var(--line);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:4px;background:var(--bg)}
.tile b{font-weight:500}
.tile span{font-size:12.5px;color:var(--text-2)}
.tile.hl{border-color:var(--blue);box-shadow:inset 0 0 0 1px var(--blue)}
.tile .q{font-size:13.5px;color:var(--text);font-style:italic}

/* video */
.video{aspect-ratio:16/9;max-width:100%;border-radius:12px;background:linear-gradient(135deg,var(--blue-soft),var(--surface));border:1px solid var(--line-soft);display:grid;place-items:center;text-align:center}
.video .play{width:64px;height:64px;border-radius:50%;background:var(--blue);color:var(--bg);display:grid;place-items:center;margin:0 auto 10px;box-shadow:var(--shadow)}
.video b{display:block;font-weight:500;font-size:16px}
.video span{font-size:12px;color:var(--text-2)}
.vthumb{aspect-ratio:16/9;border-radius:8px;background:var(--surface-2);display:grid;place-items:center;color:var(--text-2)}

/* quiz */
.opts{display:flex;flex-direction:column;gap:8px}
.opt{border:1px solid var(--line);border-radius:8px;padding:12px 14px;background:var(--bg);text-align:left;color:var(--text);display:flex;gap:10px;align-items:center}
.opt:hover:not(:disabled){background:var(--surface-2)}
.opt.ok{border-color:var(--green);background:var(--green-soft)}
.opt.ko{border-color:var(--red);background:var(--red-soft)}
.opt:disabled{cursor:default}
.fb{font-size:13px;padding:10px 12px;border-radius:8px}
.fb.ok{background:var(--green-soft);color:var(--green)} .fb.ko{background:var(--red-soft);color:var(--red)}
.score{font-size:48px;font-weight:400;color:var(--blue);font-variant-numeric:tabular-nums}

/* forms */
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-weight:500;font-size:13px}
.field textarea,.field input{font:inherit;border:1px solid var(--line);border-radius:8px;padding:10px 12px;background:var(--bg);color:var(--text);width:100%}
.field textarea{min-height:80px;resize:vertical}
.field textarea:focus,.field input:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 1px var(--blue)}
.checks{display:flex;flex-wrap:wrap;gap:8px}
.bp{display:flex;flex-direction:column;gap:16px}
.bp .row{display:grid;grid-template-columns:170px 1fr;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--line-soft)}
.bp .row:last-child{border-bottom:0;padding-bottom:0}
.bp .row .k{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-2);font-weight:500;padding-top:2px}
.bp ul{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px}
.bp .name{font-size:20px;font-weight:500}
.cl{display:flex;flex-direction:column;gap:8px}
.cl label{display:flex;gap:10px;align-items:center;font-size:13.5px}
.cl input{width:16px;height:16px;accent-color:var(--blue)}
.spin{width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:sp .8s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}

/* faq */
.faq{border:1px solid var(--line);border-radius:12px;overflow:hidden}
.faq details{border-bottom:1px solid var(--line-soft)}
.faq details:last-child{border-bottom:0}
.faq summary{padding:14px 18px;cursor:pointer;font-weight:500;list-style:none;display:flex;justify-content:space-between;gap:10px}
.faq summary::-webkit-details-marker{display:none}
.faq summary:after{content:"+";color:var(--blue);font-size:18px;line-height:1}
.faq details[open] summary:after{content:"−"}
.faq details p{margin:0;padding:0 18px 16px;color:var(--text-2)}
.person{display:flex;gap:12px;align-items:center}
.avatar{width:40px;height:40px;border-radius:50%;background:var(--blue-soft);color:var(--blue-ink);display:grid;place-items:center;font-weight:500}
.toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:#323232;color:#fff;padding:10px 18px;border-radius:6px;font-size:13px;z-index:50;box-shadow:var(--shadow-hover)}
.note{font-size:12px;color:var(--text-3)}
.src{font-size:11px;border-radius:999px;padding:2px 8px}

@media (max-width:980px){
  .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
  .grid4{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:760px){
  .shell{grid-template-columns:1fr}
  .side{position:static;max-height:none;border-right:0;border-bottom:1px solid var(--line-soft);display:flex;overflow-x:auto;gap:4px;padding:8px 12px}
  .side .grp,.side .substep,.nav .sub{display:none}
  .nav{margin:0;padding:8px 12px;border-radius:999px;white-space:nowrap;width:auto}
  main{padding:20px 16px 48px}
  .cards,.principles,.grid2,.grid3,.cmp{grid-template-columns:1fr}
  .progress,.proto{display:none}
  .bp .row{grid-template-columns:1fr;gap:4px}
  .hero h1{font-size:28px}
}

/* annotated interface schematic */
.mock{margin:0;display:flex;flex-direction:column;gap:8px;max-width:100%}
.mock figcaption{font-size:12.5px;color:var(--text-2);text-align:center}
.mk-frame{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface);font-size:11px;color:var(--text);box-shadow:var(--shadow)}
.mk-top{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg);border-bottom:1px solid var(--line-soft);position:relative}
.mk-top b{font-weight:500;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mk-top .grow{flex:1}
.mk-logo{width:16px;height:16px;border-radius:50%;background:var(--text);flex:none}
.mk-share{border:1px solid var(--line);border-radius:999px;padding:3px 10px;position:relative;display:inline-flex;gap:6px;align-items:center}
.mk-body{display:grid;grid-template-columns:1fr 1.6fr 1.1fr;gap:8px;padding:8px;min-height:220px}
.mk-col{background:var(--bg);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;transition:opacity .2s;border:1px solid var(--line-soft);overflow:hidden}
.mk-dim{opacity:.4}
.mk-on{border-color:var(--blue);box-shadow:0 0 0 2px var(--blue-line)}
.mk-h{font-weight:500;font-size:12px;display:flex;align-items:center;gap:6px}
.mk-h .grow{flex:1}
.mk-add{border:1px dashed var(--line);border-radius:999px;padding:4px 8px;text-align:center;color:var(--text-2)}
.mk-row{display:flex;align-items:center;gap:6px;color:var(--text-2)}
.mk-row .mk-t{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mk-doc{width:10px;height:12px;border-radius:2px;background:var(--red-soft);border:1px solid var(--red);flex:none;opacity:.7}
.mk-cb{width:13px;height:13px;border-radius:3px;background:var(--blue);color:var(--bg);display:grid;place-items:center;font-size:9px;flex:none}
.mk-cb.mk-off{background:var(--bg);border:1px solid var(--line)}
.mk-ico{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;color:var(--text-2)}
.mk-q{align-self:flex-end;background:var(--blue-soft);color:var(--blue-ink);border-radius:10px;padding:5px 8px;max-width:80%}
.mk-a{color:var(--text);line-height:1.5}
.mk-cite{display:inline-grid;place-items:center;width:15px;height:15px;border-radius:50%;background:var(--surface-2);font-size:9px;color:var(--text-2);vertical-align:middle}
.mk-save{margin-top:4px;color:var(--text-2);font-size:10px}
.mk-input{margin-top:auto;border:1px solid var(--line);border-radius:999px;padding:5px 10px;color:var(--text-3)}
.mk-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.mk-tile{border:1px solid var(--line-soft);background:var(--surface);border-radius:8px;padding:6px;font-size:10px;line-height:1.25}
.mk-hl{outline:2px solid var(--blue);outline-offset:1px;background:var(--blue-soft)!important;color:var(--blue-ink)!important;border-radius:6px}
.mk-num{position:absolute;top:-1px;right:-1px;width:20px;height:20px;border-radius:0 9px 0 9px;background:var(--blue);color:var(--bg);font-weight:700;font-size:11px;display:grid;place-items:center;z-index:2}
.mk-share .mk-num{position:static;border-radius:50%;width:16px;height:16px;font-size:10px}
.mk-pop{position:absolute;left:10px;right:10px;bottom:10px;background:var(--bg);border:1px solid var(--blue);border-radius:10px;padding:8px 10px;box-shadow:var(--shadow-hover);z-index:3;line-height:1.45}
.mk-pop mark{background:var(--amber-soft);color:var(--text);padding:0 2px}
.mk-pt{font-weight:500;font-size:11px;margin-bottom:4px;color:var(--blue-ink)}
.mk-dialog{top:30px;bottom:auto;display:flex;flex-direction:column;gap:6px}
.mk-chips{display:flex;gap:4px;flex-wrap:wrap}
.mk-chip{border:1px solid var(--line);border-radius:999px;padding:2px 8px;font-size:10px}
.mk-chip.sel{background:var(--blue-soft);border-color:var(--blue-line);color:var(--blue-ink);font-weight:500}
.mk-ta{border:1px solid var(--line);border-radius:6px;padding:5px 7px;color:var(--text-2);min-height:34px;font-size:10px}
.mk-btn{align-self:flex-end;background:var(--blue);color:var(--bg);border-radius:6px;padding:3px 10px;font-size:10px}
.mk-mm{top:34px;bottom:auto;height:120px}
.mk-mm .mm{position:absolute;border:1px solid var(--line);border-radius:6px;padding:2px 7px;font-size:10px;background:var(--bg)}
.mk-mm .c{left:8px;top:50px;font-weight:500}.mk-mm .a{left:48%;top:8px}.mk-mm .b{left:48%;top:38px}.mk-mm .d{left:48%;top:68px}.mk-mm .e{left:48%;top:96px}
.mock-sm .mk-body{min-height:190px}
.protips{border:1px solid var(--blue-line);background:var(--blue-soft);border-radius:10px;padding:14px 16px}
.protips .t{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--blue-ink);font-weight:700;display:flex;gap:6px;align-items:center;margin-bottom:8px}
.protips ul{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;color:var(--text)}
.labcard{display:flex;flex-direction:column;gap:10px;text-align:left;color:inherit;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:20px;transition:box-shadow .15s}
.labcard:hover{box-shadow:var(--shadow-hover);border-color:transparent}
.labcard h3{font-size:18px;font-weight:500}
.labcard p{margin:0;color:var(--text-2);font-size:13px}
@media (max-width:760px){.mk-body{grid-template-columns:1fr}.mk-dim{display:none}}

@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;
