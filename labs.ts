// Content of Learn (NotebookLM Essentials), the Champion Lab and the Use Case Labs.
export type Zone = 'all' | 'sources' | 'chat' | 'studio' | 'citation' | 'config' | 'share' | 'audio' | 'mindmap' | 'add';
export type Activity = { text: string; hint?: string; show?: Zone; copy?: string; copyLabel?: string };
export type LabStep = {
  phase: string; title: string; duration: string; intro: string[]; visual?: Zone; visualCaption?: string;
  tips?: string[]; activities: Activity[]; expected: string; sources?: boolean; checklist?: string[];
};
export type Lab = { id: string; title: string; subtitle: string; badges: { text: string; tone: string }[]; steps: LabStep[] };

/* ------------------------------------------------------------------ */
/* LEARN — NotebookLM Essentials                                       */
/* ------------------------------------------------------------------ */
export const ESSENTIALS: LabStep[] = [
  {
    phase: 'Module 1', title: 'Find your way around', duration: '3 min',
    intro: ['A notebook has three panels. Sources on the left: the documents NotebookLM is allowed to read. Chat in the middle: where you ask questions. Studio on the right: where you turn your sources into audio, video, mind maps and reports.'],
    visual: 'all', visualCaption: 'The three panels of a notebook',
    tips: [
      'Your chat history is saved automatically, and it stays private to you, even in a notebook shared with your whole team.',
      'Everything you generate in Studio is kept in the Studio list, so you can come back to an audio or a report later.',
      'You can collapse the Sources or Studio panel to give the chat the full width when you read long answers.',
    ],
    activities: [
      { text: 'Open the notebook “Start here: NotebookLM @ CMA CGM”.', hint: 'The link is in your welcome email and on the NotebookLM intranet page.' },
      { text: 'Find the three panels: Sources, Chat and Studio.', hint: 'Sources on the left, chat in the middle, Studio on the right.', show: 'all' },
    ],
    expected: 'You can point to the list of sources, the chat box and the Studio panel.',
  },
  {
    phase: 'Module 2', title: 'Sources that give good answers', duration: '4 min',
    intro: ['The quality of the answers depends on the sources. NotebookLM accepts PDF, Word, PowerPoint, Excel, Google Docs and Slides, web links, YouTube videos and pasted text.', 'A good source is current, approved and focused on the notebook’s topic.'],
    visual: 'sources', visualCaption: 'Tick or untick sources to control what the chat reads',
    tips: [
      'Untick sources to scope a question. With only two documents ticked, the answer comes only from those two. Useful to compare two versions of a procedure.',
      'Click a source to open its source guide: a short summary and its key topics. A quick way to check you added the right file.',
      'Split very long references along their own structure (one file per chapter or per class), never every 100 pages. Answers become more precise.',
      'Scanned PDFs without a text layer can’t be read properly. Ask for a searchable version first.',
      'When a procedure changes, delete the old source and add the new one. Never keep two versions in the same notebook.',
    ],
    activities: [
      { text: 'Untick all sources except “Maia, Copilot, NotebookLM: which tool for what?”.', show: 'sources', hint: 'Each source has a checkbox. There is also a “select all” box at the top of the list.' },
      { text: 'Ask:', copy: 'Which tool should I use to prove what our procedure says?', copyLabel: 'Prompt' },
      { text: 'Tick all sources again.' },
    ],
    expected: 'Every citation in the answer points to the one-pager only, because it was the only ticked source.',
  },
  {
    phase: 'Module 3', title: 'Ask like an expert', duration: '4 min',
    intro: ['Precise questions get precise answers. Describe the situation, ask for the source, and say what format you want.'],
    visual: 'chat', visualCaption: 'The chat: ask, follow up, save what matters',
    tips: [
      'Ask for a format: “as a table”, “as a checklist”, “in 5 bullet points”, “as an email I can send”.',
      'Follow up in the same chat: “Now only for Class 3”, “Shorter”, “Explain it to a new joiner”.',
      'Ask in French or any other language: NotebookLM answers in your language, whatever the language of the sources.',
      'Save a useful answer as a note. Notes stay in the notebook, and you can turn a note into a source to build on it.',
      'Ask what is missing: “Which questions can’t these sources answer?” helps an owner find gaps.',
    ],
    activities: [
      { text: 'Ask a question and request a format:', copy: 'According to these sources, what should I do in my first week with NotebookLM? Answer as a checklist.', copyLabel: 'Prompt 1' },
      { text: 'Follow up in the same chat:', copy: 'Now make it a 3-line message I can send to a colleague.', copyLabel: 'Prompt 2' },
      { text: 'Save the answer as a note.', hint: 'Look for the save-to-note option under the answer.', show: 'chat' },
    ],
    expected: 'You get a checklist with citations, then a short message, and the note appears in the notebook.',
  },
  {
    phase: 'Module 4', title: 'Configure the chat', duration: '4 min',
    intro: ['This is the feature most people miss. From the configuration icon of the chat, you can give the notebook a goal, a role and a style. Every answer then follows it.'],
    visual: 'config', visualCaption: 'The chat configuration: give the notebook a goal and a role',
    tips: [
      'A good configuration says who the notebook is for, how it should answer and what it must do when the sources are silent.',
      'For compliance topics, ask it to always quote the rule and to say “not in the sources” rather than approximate.',
      'For training, ask it to explain with examples and to end each answer with one quiz question.',
      'In a team notebook, the owner sets the configuration once, so everyone gets consistent answers.',
    ],
    activities: [
      { text: 'Open the chat configuration and paste this goal:', show: 'config', copyLabel: 'Chat configuration', copy: 'You are a NotebookLM coach for CMA CGM employees. Answer in short, practical steps. Always cite the source. If the answer is not in the sources, say so clearly and suggest who to ask. End each answer with one tip the user may not know.' },
      { text: 'Ask again:', copy: 'How do I verify an answer?', copyLabel: 'Prompt' },
    ],
    expected: 'The answer is shorter, structured in steps, cited, and ends with a tip. Same notebook, different behaviour.',
  },
  {
    phase: 'Module 5', title: 'Verify before you act', duration: '3 min',
    intro: ['Don’t stop at the answer. Open the citation. It shows the exact passage in the original document.', 'When the sources don’t contain the answer, NotebookLM says so instead of guessing.'],
    visual: 'citation', visualCaption: 'Click a citation number to see the passage it comes from',
    tips: [
      'Read a few lines around the highlighted passage: context matters, especially for exceptions.',
      'For customs, dangerous goods or contractual questions, open at least one citation before you act or forward the answer.',
      'Test the limits on purpose: ask something the sources don’t cover and check that NotebookLM says so.',
    ],
    activities: [
      { text: 'Click one numbered citation in your last answer.', show: 'citation', hint: 'The numbers appear inside the answer text.' },
      { text: 'Ask a question the sources don’t cover:', copy: 'What is the current freight rate from Shanghai to Marseille?', copyLabel: 'Out-of-scope test' },
    ],
    expected: 'The source opens at the highlighted passage. For the freight rate, NotebookLM says the sources don’t contain it.',
  },
  {
    phase: 'Module 6', title: 'Create with Studio', duration: '5 min',
    intro: ['Studio turns a notebook into formats people actually use: Audio Overviews, Video Overviews, mind maps, reports, flashcards and quizzes, infographics and slide decks.'],
    visual: 'studio', visualCaption: 'The Studio panel',
    tips: [
      'Audio Overview has several formats: a deep-dive conversation, a brief summary, a critique or a debate. You can also choose the length.',
      'Always customize before generating: say who the audience is and what to focus on. The result is far better than the default.',
      'In interactive mode you can join the audio conversation and ask the hosts a question.',
      'Click a topic in the mind map: NotebookLM asks the chat about it for you.',
      'Reports include briefing documents and study guides, and you can write your own report instructions.',
      'Flashcards and quizzes remember your progress. Ideal for training.',
      'You can also create an audio, a video or a report straight from a chat answer.',
    ],
    activities: [
      { text: 'In Studio, open the Audio Overview options, choose the brief format and paste:', show: 'audio', copyLabel: 'Audio customization', copy: 'For a CMA CGM employee in their first week with NotebookLM. Focus on citations and on the difference with Maia. Practical, no hype.' },
      { text: 'Generate a mind map, then click one of its topics.', show: 'mindmap', hint: 'Clicking a topic sends a question about it to the chat.' },
    ],
    expected: 'A short audio briefing is being generated, and clicking a mind map topic produces a cited answer in the chat.',
  },
  {
    phase: 'Module 7', title: 'Share and keep it alive', duration: '3 min',
    intro: ['A notebook becomes valuable when a whole team uses it, and stays valuable when its sources are kept current.'],
    visual: 'share', visualCaption: 'Share a notebook as viewer or editor',
    tips: [
      'Viewer: reads and asks. Editor: changes sources. Give editor access to the owner and one backup only.',
      'Share with a group rather than with individuals: new team members get access automatically.',
      'Write the owner and the next review date in the notebook description.',
      'Review sources every 60 days, every 30 days for compliance content. Remove an outdated source, don’t just flag it.',
    ],
    activities: [
      { text: 'Open the share settings of a notebook you own and look at the viewer and editor options.', show: 'share' },
    ],
    expected: 'You know how to give read-only access to a team and who should keep edit rights.',
  },
];

export const ESSENTIALS_QUIZ = [
  { q: 'You want to compare two versions of a procedure only. What do you do?', options: ['Create a new notebook', 'Untick all other sources before asking', 'Ask the question twice'], answer: 1, why: 'Ticked sources define what the chat reads. Untick the others to scope the question.' },
  { q: 'Where do you give the notebook a role like “always quote the rule”?', options: ['In the chat configuration', 'In the source guide', 'In the share settings'], answer: 0, why: 'The chat configuration sets a goal, a role and a style for every answer.' },
  { q: 'A 900-page regulation is too long. How do you split it?', options: ['Every 100 pages', 'Along its own structure, by chapter or class', 'You can’t use it'], answer: 1, why: 'Splitting along the document’s structure keeps each part coherent, so answers are more precise.' },
  { q: 'Is your chat history visible to others in a shared notebook?', options: ['Yes, to all viewers', 'Only to the owner', 'No, it stays private to you'], answer: 2, why: 'Conversations are saved and private to each user.' },
  { q: 'Which Audio Overview format fits a 3-minute update before a shift?', options: ['Brief', 'Debate', 'Critique'], answer: 0, why: 'The brief format gives a short summary.' },
  { q: 'What happens when you click a topic in a mind map?', options: ['It deletes the topic', 'It asks the chat about that topic', 'It opens the source'], answer: 1, why: 'Clicking a topic sends a question about it to the chat.' },
  { q: 'Before forwarding a customs answer to a colleague, you…', options: ['Open at least one citation', 'Ask Maia to confirm', 'Forward it as is'], answer: 0, why: 'Citations show the exact passage. Check it before you act.' },
  { q: 'A procedure changed. What do you do with the old source?', options: ['Keep both versions', 'Rename the old one', 'Delete it and add the new version'], answer: 2, why: 'Two versions in one notebook can produce conflicting answers.' },
];

/* ------------------------------------------------------------------ */
/* CHAMPION LAB                                                        */
/* ------------------------------------------------------------------ */
const VIDEO_PROMPT = `Create a professional product walkthrough for CMA CGM employees who have never used NotebookLM. This is corporate onboarding, not social media content.
Visual style: clean and minimal, white backgrounds, calm corporate tone, no cartoon characters, no flashy transitions. Use the real interface screenshots from the source "NotebookLM interface walkthrough" whenever possible.
Structure (about 5 minutes):
1. The problem: every operation at CMA CGM depends on documents; the hard part is finding the right page at the right moment.
2. What NotebookLM is: it answers only from the documents you choose, with a citation for every answer. Show the Sources, Chat and Studio panels.
3. Citations: show an answer and the exact passage highlighted in the source. If the answer isn't in the sources, NotebookLM says so.
4. How it fits with Maia: Maia helps you do the work; NotebookLM helps you check it against the source. Stay respectful of Maia.
5. The Studio: Audio Overviews, Video Overviews, mind maps, reports.
6. Sharing: view-only for the team, only the owner changes sources.
7. Your first 5 minutes: open the "Start here" notebook, ask a real question, click a citation.
Rules: only facts from the sources. No statistics, no invented features, no hype words.`;

export const CHAMPION_LAB: Lab = {
  id: 'champion', title: 'Champion Lab: build the Starter Notebook',
  subtitle: 'Rebuild the “Start here” notebook in your own CMA CGM environment, test every key feature, and share it with all licensed users.',
  badges: [{ text: '45 min', tone: 'blue' }, { text: 'Champions & admins', tone: 'amber' }, { text: '8 steps', tone: 'grey' }],
  steps: [
    {
      phase: 'Prepare', title: 'Before you start', duration: '3 min',
      intro: ['In this lab you build the first notebook every NotebookLM user at CMA CGM opens, test the features you will later teach, and share it.'],
      activities: [
        { text: 'Check that you can create notebooks in NotebookLM.', hint: 'If you can’t, ask your admin for the NotebookLM user role.' },
        { text: 'Get the CMA CGM AI usage policy as a PDF or Word file. It will be the sixth source.' },
        { text: 'Ask your admin for the email group of all licensed NotebookLM users.', hint: 'Sharing with a group means new users get access automatically.' },
        { text: 'Optional: prepare a short Google Slides or PDF with 5 annotated screenshots of NotebookLM, titled “NotebookLM interface walkthrough”. The Video Overview will reuse them.' },
      ],
      expected: 'You have NotebookLM access, the AI usage policy file and the name of the licensed-users group.',
    },
    {
      phase: 'Prepare', title: 'Adapt the 5 sources', duration: '5 min',
      intro: ['Five source documents are ready. Add them as Word files, or copy the text below and paste it into NotebookLM as a copied-text source.'],
      activities: [
        { text: 'Replace the placeholders in square brackets: [champion name, team], [support contact], [NotebookLM programme team].', hint: 'Search for “[” in each document.' },
        { text: 'Remove any FAQ answer your IT or legal team has not validated yet.' },
      ],
      sources: true,
      expected: 'Five sources adapted to CMA CGM, with no remaining placeholders.',
    },
    {
      phase: 'Build', title: 'Create the notebook', duration: '5 min',
      intro: ['One notebook, six sources, one clear name.'],
      visual: 'add', visualCaption: 'Add sources from the Sources panel',
      activities: [
        { text: 'Create a new notebook and name it:', copy: 'Start here: NotebookLM @ CMA CGM', copyLabel: 'Notebook name' },
        { text: 'Add the five sources and the CMA CGM AI usage policy.', show: 'add', hint: 'Use the add button at the top of the Sources panel. For copied text, paste one document at a time.' },
        { text: 'Click one source to check its source guide.', hint: 'The source guide shows a summary and key topics.' },
      ],
      expected: 'The Sources panel lists six sources, each with a short summary.',
    },
    {
      phase: 'Build', title: 'Configure the chat', duration: '3 min',
      intro: ['Give the notebook a coach role, so every new user gets short, practical, cited answers.'],
      visual: 'config', visualCaption: 'The chat configuration',
      activities: [
        { text: 'Open the chat configuration and paste:', show: 'config', copyLabel: 'Chat configuration', copy: 'You are the NotebookLM coach for CMA CGM employees who are new to the tool. Answer in short, practical steps. Always cite the source. If the answer is not in the sources, say so and suggest contacting a NotebookLM champion. When asked to help plan a notebook, follow the Notebook Blueprint method template. End each answer with one tip the user may not know.' },
      ],
      expected: 'The configuration is saved for the notebook.',
    },
    {
      phase: 'Build', title: 'Test the notebook', duration: '5 min',
      intro: ['Ask the questions a new user will ask, and open the citations.'],
      activities: [
        { text: 'Ask:', copy: 'What is NotebookLM and when should I use it instead of Maia?', copyLabel: 'Test 1' },
        { text: 'Ask:', copy: 'How do I share a notebook without letting others edit it?', copyLabel: 'Test 2' },
        { text: 'Test the built-in notebook planner:', copy: 'Help me prepare a blueprint for a notebook about dangerous goods procedures for the Marseille operations team.', copyLabel: 'Test 3' },
        { text: 'Test the limits:', copy: 'What is the current freight rate from Shanghai to Marseille?', copyLabel: 'Test 4' },
      ],
      expected: 'Tests 1–3 give short, cited, step-by-step answers ending with a tip; test 3 follows the blueprint template. Test 4: NotebookLM says the sources don’t contain the answer.',
    },
    {
      phase: 'Generate', title: 'Create the welcome content', duration: '10 min + generation',
      intro: ['Generate the content that will make people want to open the notebook. Everything runs in the background.'],
      visual: 'studio', visualCaption: 'The Studio panel',
      tips: ['Customize every output before generating: audience, focus, tone.', 'Avoid the most “cinematic” visual options for corporate onboarding: a sober style looks more credible.', 'Watch or read every output before sharing it.'],
      activities: [
        { text: 'Video Overview: choose the explainer format, a sober visual style, and paste:', copy: VIDEO_PROMPT, copyLabel: 'Video Overview prompt' },
        { text: 'Audio Overview: choose the deep-dive format and paste:', show: 'audio', copyLabel: 'Audio Overview prompt', copy: 'For CMA CGM employees on their first day with NotebookLM. Under 8 minutes, practical and friendly. Cover: what it is, how it differs from Maia, the first 5 minutes, how to verify a citation, and two examples (dangerous goods, bill of lading). No statistics, no hype.' },
        { text: 'Infographic: choose the professional style and paste:', copyLabel: 'Infographic prompt', copy: 'One simple infographic: "Which AI tool for which question?" Three columns: Maia (I need to get something done), Microsoft Copilot (I\'m working in Outlook, Word, Excel or Teams), NotebookLM (I need to prove what our reference documents say). Add the line: "Maia helps you do the work. NotebookLM helps you check it against the source."' },
        { text: 'Mind map: generate it. No prompt needed.', show: 'mindmap' },
        { text: 'Quiz: generate a short quiz so new users can test themselves.' },
      ],
      expected: 'A walkthrough video, an audio briefing, an infographic, a mind map and a quiz are listed in Studio.',
    },
    {
      phase: 'Share', title: 'Share with every licensed user', duration: '3 min',
      intro: ['Everyone can read and ask. Only the owner and a backup can change sources.'],
      visual: 'share', visualCaption: 'Share settings',
      activities: [
        { text: 'Share the notebook with the licensed-users group as Viewer.', show: 'share' },
        { text: 'Give Editor access to one backup champion only.' },
        { text: 'Add the owner and review date to the notebook description:', copy: 'Owner: [name, team] · Last review: [date] · Next review: [date + 60 days]', copyLabel: 'Notebook description' },
      ],
      expected: 'A colleague from another team can open the notebook and ask a question, but can’t change the sources.',
    },
    {
      phase: 'Launch', title: 'Put the link everywhere', duration: '5 min',
      intro: ['The notebook only helps if people land in it on day one.'],
      activities: [
        { text: 'Copy the notebook link and paste it in the welcome email, the Teams launch post and the intranet page.' },
        { text: 'Download the video and the infographic and add them to the intranet page and the Teams post.' },
      ],
      expected: 'A new user who receives the welcome email reaches the Starter Notebook in one click.',
      checklist: ['Six sources added, no placeholders left', 'Chat configured as a coach', 'Four tests passed, citations checked', 'Video, audio, infographic, mind map and quiz reviewed', 'Shared as Viewer with the licensed-users group', 'Owner, backup and review date set', 'Link in the email, on Teams and on the intranet'],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* USE CASE LABS                                                       */
/* ------------------------------------------------------------------ */
const ucShare = (group: string, cadence: string): LabStep => ({
  phase: 'Share', title: 'Share and keep it current', duration: '3 min',
  intro: ['Share read-only with the team, and set the review rhythm now, not later.'],
  visual: 'share', visualCaption: 'Share settings',
  activities: [
    { text: `Share as Viewer with ${group}. Give Editor access to the owner and one backup only.`, show: 'share' },
    { text: 'Write the owner and next review date in the notebook description.', copy: `Owner: [name] · Backup: [name] · Review: ${cadence} · Next review: [date]`, copyLabel: 'Description' },
  ],
  expected: 'The team can ask questions; only the owner and backup can change sources; the review date is visible to everyone.',
});

export const USE_CASE_LABS: (Lab & { team: string; why: string; outcome: string })[] = [
  {
    id: 'doc', title: 'BL & SI Rules Navigator', team: 'Documentation desk',
    subtitle: 'Answer bill of lading and shipping instruction questions from the SOP in force, with the section attached.',
    why: 'Documentation teams answer the same rule questions every day, under time pressure. The answer must come from the procedure in force, not from memory.',
    outcome: 'A documentation officer gets the applicable rule with its section in seconds, and new joiners learn the SOPs faster.',
    badges: [{ text: '40 min', tone: 'blue' }, { text: 'Documentation', tone: 'grey' }],
    steps: [
      { phase: 'Frame', title: 'Frame the notebook', duration: '5 min', intro: ['One notebook for the BL and SI rules of one scope (a region or a trade), with a named owner from the documentation desk.'],
        tips: ['Start with one scope. A focused notebook gives better answers than one covering every region.', 'Choose an owner who already maintains the SOPs.'],
        activities: [{ text: 'Name the notebook:', copy: 'BL & SI Rules Navigator – [scope] – owner [name]', copyLabel: 'Notebook name' }, { text: 'Collect 10 real questions from the team’s inbox or chat. They will be your test set.' }],
        expected: 'A notebook name, an owner and 10 real questions.' },
      { phase: 'Sources', title: 'Gather and prepare the sources', duration: '10 min', intro: ['Only documents in force, approved by the owner.'], visual: 'add', visualCaption: 'Add sources',
        tips: ['Add customer-specific requirements as separate sources, so you can untick them when the question is generic.', 'Remove superseded SOP versions before adding the new one.'],
        activities: [{ text: 'Add: BL and SI SOPs in force, approved templates and checklists, customer-specific documentation requirements, documentation training material.', show: 'add' }],
        expected: 'Only current, approved documents are listed.' },
      { phase: 'Configure', title: 'Configure the chat', duration: '3 min', intro: ['Make every answer operational and traceable.'], visual: 'config', visualCaption: 'Chat configuration',
        activities: [{ text: 'Paste in the chat configuration:', show: 'config', copyLabel: 'Chat configuration', copy: 'You support the CMA CGM documentation desk. Answer only from the SOPs in the sources. Start with the rule in one sentence, then the steps, then the section reference. If a customer-specific requirement applies, say so. If the sources don’t cover the case, say "Not covered by the SOPs in this notebook" and suggest escalating to the notebook owner.' }],
        expected: 'The configuration is saved.' },
      { phase: 'Test', title: 'Test with real questions', duration: '10 min', intro: ['Use your 10 real questions. Here are five to start.'],
        activities: [
          { text: 'Test 1:', copy: 'According to the SOP, what must appear on the BL when the shipper requests a switch BL? Cite the section.', copyLabel: 'Test 1' },
          { text: 'Test 2:', copy: 'What should I check in a shipping instruction before issuing the BL? Answer as a checklist.', copyLabel: 'Test 2' },
          { text: 'Test 3 (untick generic SOPs first):', copy: 'What are this customer’s specific requirements for the consignee field?', copyLabel: 'Test 3' },
          { text: 'Test 4:', copy: 'How do I handle an amendment request after the BL is issued?', copyLabel: 'Test 4' },
          { text: 'Test 5 (limits):', copy: 'What is the freight rate for this booking?', copyLabel: 'Test 5' },
        ],
        expected: 'Answers start with the rule, list the steps and cite the SOP section. Test 5 is answered “not covered”.' },
      { phase: 'Studio', title: 'Create team content', duration: '5 min', intro: ['Turn the SOPs into content new joiners actually use.'], visual: 'studio', visualCaption: 'Studio',
        activities: [
          { text: 'Report (custom):', copyLabel: 'Report instructions', copy: 'Create a one-page cheat sheet of the 10 most frequent BL and SI rules, each with its SOP section.' },
          { text: 'Quiz:', copyLabel: 'Quiz focus', copy: 'Focus on the checks to perform on a shipping instruction before issuing a BL.' },
        ],
        expected: 'A cheat sheet and a quiz ready for new joiners.' },
      ucShare('the documentation desk group', 'every 60 days'),
    ],
  },
  {
    id: 'dg', title: 'DG & Customs Reference', team: 'Customs & Dangerous Goods',
    subtitle: 'Classification and compliance questions answered with the rule and the circular attached.',
    why: 'The most sensitive use case: a citation is mandatory, and an outdated rule is a real risk. NotebookLM only reads the approved texts you put in it.',
    outcome: 'Experts spend less time on repetitive questions, and every answer points to the rule it relies on.',
    badges: [{ text: '45 min', tone: 'blue' }, { text: 'Compliance', tone: 'amber' }],
    steps: [
      { phase: 'Frame', title: 'Frame the notebook', duration: '5 min', intro: ['A compliance notebook needs a named expert owner and a 30-day review cycle from day one.'],
        tips: ['Keep dangerous goods and customs in two notebooks if the owners are different.', 'Decide who answers when the notebook says “not in the sources”.'],
        activities: [{ text: 'Name the notebook:', copy: 'DG Reference – [scope] – owner [name] – reviewed [date]', copyLabel: 'Notebook name' }],
        expected: 'An owner, a backup and a review date.' },
      { phase: 'Sources', title: 'Gather and prepare the sources', duration: '15 min', intro: ['Regulatory texts are long. Preparing them well is what makes answers precise.'], visual: 'sources', visualCaption: 'Sources, split by class',
        tips: ['The consolidated dangerous goods code is too long for one source. Split it along its own structure: one file per class or per part. Never every 100 pages.', 'Check that PDFs have a text layer. Scanned circulars must be converted first.', 'Name each file clearly: “IMDG – Class 3 – [edition]”.'],
        activities: [{ text: 'Add: approved regulation extracts split by class or part, internal DG procedures, approved circulars, customs filing guidance.', show: 'sources' }],
        expected: 'Each source covers one class or one topic, and every file is searchable.' },
      { phase: 'Configure', title: 'Configure the chat', duration: '3 min', intro: ['No approximation allowed.'], visual: 'config', visualCaption: 'Chat configuration',
        activities: [{ text: 'Paste in the chat configuration:', show: 'config', copyLabel: 'Chat configuration', copy: 'You are a dangerous goods and customs compliance checker for CMA CGM. Answer only from the sources. Always quote the exact rule and give its reference (class, part, section or circular). Never approximate or combine rules that are not explicitly linked in the sources. If the sources do not cover the case, answer "Not covered by the approved sources" and recommend contacting the DG expert.' }],
        expected: 'The configuration is saved.' },
      { phase: 'Test', title: 'Test with real questions', duration: '10 min', intro: ['Ask the expert to validate each answer.'],
        activities: [
          { text: 'Test 1:', copy: 'What documentation is required to ship a Class 3 product? Quote the rule.', copyLabel: 'Test 1' },
          { text: 'Test 2:', copy: 'Which segregation rules apply between Class 3 and Class 8? Answer as a table.', copyLabel: 'Test 2' },
          { text: 'Test 3:', copy: 'What must be checked before accepting a dangerous goods booking?', copyLabel: 'Test 3' },
          { text: 'Test 4:', copy: 'What changed in the latest circular compared with the previous one?', copyLabel: 'Test 4' },
          { text: 'Test 5 (limits):', copy: 'Can I ship this product next week?', copyLabel: 'Test 5' },
        ],
        expected: 'Every answer quotes the rule with its reference. Test 5 is answered “not covered” and points to the expert.' },
      { phase: 'Studio', title: 'Create team content', duration: '5 min', intro: ['Short formats for operational teams.'], visual: 'audio', visualCaption: 'Audio Overview options',
        activities: [
          { text: 'Audio Overview, brief format:', show: 'audio', copyLabel: 'Audio customization', copy: 'A 3-minute briefing for operations staff before their shift: the key checks for dangerous goods bookings, with no approximations.' },
          { text: 'Report (briefing document):', copyLabel: 'Report instructions', copy: 'Summarize what changed in the latest circulars, with references, for team leaders.' },
        ],
        expected: 'A short audio briefing and a change summary, both validated by the expert.' },
      ucShare('the DG and customs teams', 'every 30 days'),
    ],
  },
  {
    id: 'ct', title: 'Customer SOP Navigator', team: 'CEVA Control Tower',
    subtitle: 'One notebook per customer, so the right rules are always in front of you and never mixed up.',
    why: 'Control tower operators handle several customers with different procedures. Mixing one customer’s rules with another’s is the main risk.',
    outcome: 'Operators check the customer’s procedure in seconds during an exception, and new operators ramp up faster on each account.',
    badges: [{ text: '35 min', tone: 'blue' }, { text: 'Logistics', tone: 'grey' }],
    steps: [
      { phase: 'Frame', title: 'Frame the notebook', duration: '5 min', intro: ['The rule: one notebook per customer. Never several customers in one notebook.'],
        tips: ['Start with the customer that generates the most exceptions.', 'Use the same naming pattern for every customer notebook.'],
        activities: [{ text: 'Name the notebook:', copy: 'SOP – [customer] – owner [name]', copyLabel: 'Notebook name' }],
        expected: 'One customer, one owner, one notebook.' },
      { phase: 'Sources', title: 'Gather the customer’s sources', duration: '10 min', intro: ['Only this customer’s approved documents.'], visual: 'add', visualCaption: 'Add sources',
        activities: [{ text: 'Add: the customer’s SOPs, operating instructions, escalation matrix, service commitments, recent approved process changes.', show: 'add' }],
        expected: 'Only this customer’s documents are in the notebook.' },
      { phase: 'Configure', title: 'Configure the chat', duration: '3 min', intro: ['Answers must be usable during an exception.'], visual: 'config', visualCaption: 'Chat configuration',
        activities: [{ text: 'Paste in the chat configuration:', show: 'config', copyLabel: 'Chat configuration', copy: 'You support CEVA control tower operators for this customer only. Answer from this customer’s SOPs. Give the action to take first, then who to notify and within what time, then the SOP reference. Highlight any difference with the standard process. If the SOP does not cover the case, say so and recommend escalating to the account owner.' }],
        expected: 'The configuration is saved.' },
      { phase: 'Test', title: 'Test with real exceptions', duration: '10 min', intro: ['Use real exceptions from the last month.'],
        activities: [
          { text: 'Test 1:', copy: 'A delivery is delayed by 24 hours. What do I do, and who must be notified?', copyLabel: 'Test 1' },
          { text: 'Test 2:', copy: 'What are this customer’s cut-off times?', copyLabel: 'Test 2' },
          { text: 'Test 3:', copy: 'What is different in this customer’s process compared with our standard process?', copyLabel: 'Test 3' },
          { text: 'Test 4:', copy: 'Summarize the escalation matrix as a table.', copyLabel: 'Test 4' },
        ],
        expected: 'Answers give the action first, the contacts and the SOP reference.' },
      { phase: 'Studio', title: 'Create onboarding content', duration: '5 min', intro: ['Help a new operator learn a new account.'], visual: 'studio', visualCaption: 'Studio',
        activities: [
          { text: 'Report (study guide):', copyLabel: 'Report instructions', copy: 'Create an onboarding guide for an operator joining this account: key contacts, cut-offs, exceptions and escalation.' },
          { text: 'Mind map: generate it to see the whole account at a glance.', show: 'mindmap' },
        ],
        expected: 'An account onboarding guide and a mind map.' },
      ucShare('the operators of this account', 'every 60 days'),
    ],
  },
  {
    id: 'learn', title: 'TANGRAM Course Companion', team: 'Learning & Enablement (TANGRAM)',
    subtitle: 'Turn course material into audio briefings, study guides and quizzes people actually finish.',
    why: 'Training content already exists and is approved. NotebookLM turns it into formats learners use, and the team builds the model other teams will reuse.',
    outcome: 'Learners get a companion for each course; trainers get quizzes and briefings without extra production work.',
    badges: [{ text: '35 min', tone: 'blue' }, { text: 'Training', tone: 'green' }],
    steps: [
      { phase: 'Frame', title: 'Frame the notebook', duration: '5 min', intro: ['One notebook per course or programme, for example the AI programme of the academy.'],
        activities: [{ text: 'Name the notebook:', copy: 'Course companion – [course name] – owner [trainer]', copyLabel: 'Notebook name' }],
        expected: 'One course, one owner.' },
      { phase: 'Sources', title: 'Gather the course material', duration: '5 min', intro: ['Slides, handbooks, exercises, session transcripts.'], visual: 'add', visualCaption: 'Add sources',
        tips: ['Session recordings on YouTube or transcripts can be added as sources.'],
        activities: [{ text: 'Add: course slides, handbook, exercises, and session transcripts if available.', show: 'add' }],
        expected: 'The full course material is in the notebook.' },
      { phase: 'Configure', title: 'Configure the chat', duration: '3 min', intro: ['Make the notebook a tutor.'], visual: 'config', visualCaption: 'Chat configuration',
        activities: [{ text: 'Paste in the chat configuration:', show: 'config', copyLabel: 'Chat configuration', copy: 'You are a patient tutor for this course. Explain with simple examples from shipping and logistics. Keep answers short. End each answer with one question to check understanding. Only use the course material.' }],
        expected: 'The configuration is saved.' },
      { phase: 'Test', title: 'Test as a learner', duration: '7 min', intro: ['Ask the questions a learner would ask.'],
        activities: [
          { text: 'Test 1:', copy: 'What are the 5 key ideas of this course?', copyLabel: 'Test 1' },
          { text: 'Test 2:', copy: 'Explain [concept] with a simple example.', copyLabel: 'Test 2' },
          { text: 'Test 3:', copy: 'I have 10 minutes before the session. What should I review?', copyLabel: 'Test 3' },
        ],
        expected: 'Short, cited explanations ending with a check question.' },
      { phase: 'Studio', title: 'Create the learning content', duration: '10 min', intro: ['This is where this use case shines.'], visual: 'studio', visualCaption: 'Studio',
        tips: ['Flashcards and quizzes save learners’ progress between sessions.', 'Use the interactive audio mode to let learners ask the hosts questions.'],
        activities: [
          { text: 'Audio Overview, deep-dive format:', show: 'audio', copyLabel: 'Audio customization', copy: 'A 10-minute pre-session briefing for learners with no background. Use concrete examples from shipping and logistics.' },
          { text: 'Flashcards and a quiz:', copyLabel: 'Quiz focus', copy: 'Focus on the concepts learners most often confuse.' },
          { text: 'Report (study guide) with a glossary.' },
        ],
        expected: 'An audio briefing, flashcards, a quiz and a study guide for the course.' },
      ucShare('the learners of the course', 'at each new course edition'),
    ],
  },
];
