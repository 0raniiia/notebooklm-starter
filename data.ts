// All static content of the Starter Hub lives here, so it is easy to edit.

// ---- Logos: paste an image URL or a data: URI here. Empty = text fallback. ----
export const LOGOS = {
  client: '', // CMA CGM logo
  google: '', // Google logo
};

export const APP = {
  title: 'NotebookLM Starter Hub',
  subtitle: 'CMA CGM · Your first steps with NotebookLM',
  starterNotebookUrl: '#', // provided by the champion / admin
};

export type SectionId = 'home' | 'discover' | 'learn' | 'starter' | 'usecases' | 'build' | 'help';

export const SECTIONS: { id: SectionId; label: string; hint: string }[] = [
  { id: 'discover', label: 'Discover NotebookLM', hint: 'What it is, when to use it' },
  { id: 'learn', label: 'Learn in 10 minutes', hint: '5 modules + quiz' },
  { id: 'starter', label: 'Starter Notebook', hint: 'Learn it inside NotebookLM' },
  { id: 'usecases', label: 'Use cases', hint: 'Ideas for your role' },
  { id: 'build', label: 'Build my notebook', hint: 'Get a ready-to-build blueprint' },
  { id: 'help', label: 'Help & resources', hint: 'FAQ, videos, champions' },
];

export type Badge = { text: string; tone: 'blue' | 'green' | 'amber' | 'grey' };

export const HOME_CARDS: { id: SectionId; title: string; text: string; badges: Badge[]; icon: string; cta: string }[] = [
  { id: 'discover', icon: 'spark', title: 'Discover NotebookLM', text: 'Understand what it is, and where it fits next to Maia and Copilot.', badges: [{ text: '2 min', tone: 'blue' }, { text: 'Everyone', tone: 'grey' }], cta: 'Discover' },
  { id: 'learn', icon: 'school', title: 'Learn in 10 minutes', text: 'Five short hands-on modules and a quiz. Everything you need for day one.', badges: [{ text: '10 min', tone: 'blue' }, { text: 'Beginner', tone: 'amber' }, { text: 'Start here', tone: 'green' }], cta: 'Start learning' },
  { id: 'starter', icon: 'book', title: 'Open the Starter Notebook', text: 'Learn NotebookLM directly inside NotebookLM. Ask it anything about itself.', badges: [{ text: '5 min', tone: 'blue' }, { text: 'Everyone', tone: 'grey' }], cta: 'Open' },
  { id: 'usecases', icon: 'compass', title: 'Explore my use cases', text: 'Pick your team and your daily pain point. Get a notebook idea and a first question.', badges: [{ text: '3 min', tone: 'blue' }, { text: 'By role', tone: 'grey' }], cta: 'Explore' },
  { id: 'build', icon: 'build', title: 'Build my first notebook', text: 'Describe a business need. Gemini turns it into a notebook blueprint you can build.', badges: [{ text: '5 min', tone: 'blue' }, { text: 'Champions', tone: 'amber' }, { text: 'Powered by Gemini', tone: 'green' }], cta: 'Build' },
  { id: 'help', icon: 'help', title: 'Get help', text: 'FAQ, how-to videos, your champions and team workshops.', badges: [{ text: 'Anytime', tone: 'grey' }], cta: 'Get help' },
];

export const PRINCIPLES = [
  { title: 'Your documents only', text: 'It answers from the sources you choose, nothing else.' },
  { title: 'Every answer cited', text: 'Click a citation to see the exact passage.' },
  { title: 'Stays inside CMA CGM', text: 'Your content is never used to train AI models.' },
];

export const TOOLS = [
  { name: 'Maia', question: '“I need to get something done.”', job: 'Drafts, translates, summarises and acts.' },
  { name: 'Enterprise search', question: '“I don’t know where the document is.”', job: 'Finds the file across the company.' },
  { name: 'NotebookLM', question: '“I know which documents are the reference, and I need to prove what they say.”', job: 'Answers only from the sources you chose, with citations.', highlight: true },
];

export type Step = { text: string; hint?: string; copy?: string };
export type Module = {
  id: string; title: string; duration: string; intro: string[]; visual?: 'flow' | 'formats' | 'compare' | 'studio';
  tip?: string; steps: Step[]; expected: string;
};

export const MODULES: Module[] = [
  {
    id: 'm1', title: 'What is NotebookLM?', duration: '2 min',
    intro: ['NotebookLM helps you understand a specific set of trusted sources.', 'You choose the documents. It reads only those, and every answer points back to the passage it came from.'],
    visual: 'flow',
    steps: [
      { text: 'Open the Starter Notebook shared by your champion.', hint: 'You will find the link on the Starter Notebook page of this hub.' },
      { text: 'Ask your first question:', copy: 'What is NotebookLM and when should I use it?' },
    ],
    expected: 'The answer appears with small numbered citations. Each one points to a passage in the notebook’s guides.',
  },
  {
    id: 'm2', title: 'Add sources', duration: '2 min',
    intro: ['A notebook starts with sources: the documents NotebookLM is allowed to read.'],
    visual: 'formats',
    tip: 'Good sources are current, approved and focused. Ten relevant documents beat a hundred loosely related ones.',
    steps: [
      { text: 'Create a new notebook.', hint: 'From the NotebookLM home page, create a notebook and give it a clear name.' },
      { text: 'Add one document your team uses often, such as a procedure or a guide.', hint: 'Use the add source button in the Sources panel on the left.' },
    ],
    expected: 'Your document is listed in the Sources panel, and NotebookLM gives you a short overview of it.',
  },
  {
    id: 'm3', title: 'Ask better questions', duration: '2 min',
    intro: ['The more precise the question, the more useful the answer. Name the situation and ask for the source.'],
    visual: 'compare',
    steps: [
      { text: 'Replace the parts in brackets and ask:', copy: 'According to these sources, what applies when [situation]? Cite the relevant section.' },
      { text: 'Ask a follow-up in the same chat to go deeper.', hint: 'For example: “Show this as a checklist.”' },
    ],
    expected: 'The answer is specific to your situation and cites the sections it relies on.',
  },
  {
    id: 'm4', title: 'Verify', duration: '2 min',
    intro: ['Don’t stop at the answer. Open the citation.', 'If the sources don’t contain the answer, NotebookLM tells you instead of guessing.'],
    steps: [
      { text: 'Click one of the numbered citations in your last answer.', hint: 'The citation numbers appear inside the answer text.' },
      { text: 'Now ask something your sources do not cover:', copy: 'What is the weather in Marseille today?' },
    ],
    expected: 'The citation opens the source at the exact passage. For the weather question, NotebookLM says the sources don’t contain the answer.',
  },
  {
    id: 'm5', title: 'Create', duration: '2 min',
    intro: ['Turn your sources into formats people actually use, from the Studio panel on the right.'],
    visual: 'studio',
    steps: [
      { text: 'In the Studio panel, generate an Audio Overview.', hint: 'It takes a few minutes. You can keep working while it is generated.' },
      { text: 'Try a Mind map to see the big picture of your sources.' },
    ],
    expected: 'A spoken briefing of your sources is ready to play, and the mind map shows the main topics and how they connect.',
  },
];

export const FORMATS = ['PDF', 'Word', 'PowerPoint', 'Excel', 'Google Docs', 'Google Slides', 'Web links', 'YouTube', 'Pasted text'];

export const STUDIO = [
  { name: 'Audio Overview', text: 'A spoken briefing to listen to on the go.' },
  { name: 'Video Overview', text: 'A short narrated explainer.' },
  { name: 'Mind map', text: 'The big picture at a glance.' },
  { name: 'Reports', text: 'Briefing documents and study guides.' },
];

export const QUIZ = [
  { q: 'Where do NotebookLM’s answers come from?', options: ['The whole internet', 'Only the sources in the notebook', 'Your Maia history'], answer: 1, why: 'NotebookLM reads only the sources you added to the notebook.' },
  { q: 'What should you do before relying on an answer?', options: ['Open the citation and check the passage', 'Ask the same question twice', 'Nothing, it is always right'], answer: 0, why: 'Citations let you check the exact passage in the original document.' },
  { q: 'Which is the better question?', options: ['“Tell me about customs.”', '“According to these sources, which document is required for X? Cite the section.”'], answer: 1, why: 'A precise question that asks for the source gets a precise, verifiable answer.' },
  { q: 'You need to draft an email to a customer. Which tool fits best?', options: ['Maia', 'NotebookLM', 'Enterprise search'], answer: 0, why: 'Drafting is Maia’s job. NotebookLM is for checking what your reference documents say.' },
  { q: 'What happens if the answer isn’t in the sources?', options: ['It invents one', 'It says it can’t find it', 'It searches the web'], answer: 1, why: 'NotebookLM tells you when the sources don’t contain the answer.' },
];

export const STARTER_QUESTIONS = [
  'What is NotebookLM and when should I use it?',
  'What’s the difference between NotebookLM and our other AI tools?',
  'How do I create my first notebook?',
  'What makes a good source?',
  'How do I verify an answer?',
  'How can I share a notebook without letting others edit it?',
  'Give me ideas for my role.',
];

export const TRY_NOW = [
  'Summarize what I need to know to start using NotebookLM in five minutes.',
  'Quiz me on what I’ve just learned.',
  'Create a step-by-step checklist for my first notebook.',
];

export const STARTER_SOURCES = [
  { name: 'Quick start guide', owner: 'Google team (template)' },
  { name: 'Maia, Copilot, NotebookLM: which tool for what?', owner: 'Google team (template)' },
  { name: 'User FAQ', owner: 'Google team (template)' },
  { name: 'Prompt library by team', owner: 'Google team (template)' },
  { name: 'Official NotebookLM help pages (web links)', owner: 'Public' },
  { name: 'CMA CGM AI usage policy', owner: 'CMA CGM' },
];

export const ROLES = [
  { id: 'doc', label: 'Documentation (BL / SI)', notebook: 'BL & SI Rules Navigator', inside: 'SOPs in force, shipping instruction rules, customer-specific requirements.', why: 'The answer must come from the procedure in force, not from memory.' },
  { id: 'dg', label: 'Customs & Dangerous Goods', notebook: 'DG & Customs Reference', inside: 'Approved regulation extracts (split by class or chapter), internal circulars, customs guidance.', why: 'Citations are mandatory: every answer must point to the rule.' },
  { id: 'ct', label: 'Logistics / Control Tower', notebook: 'Customer SOP Navigator', inside: 'One notebook per customer, with that customer’s SOPs and operating instructions.', why: 'Keeps each customer’s rules separate, so one customer’s instructions are never applied to another.' },
  { id: 'tender', label: 'Tender & Pricing', notebook: 'Tender Pack Reader', inside: 'The tender pack, previous bids and contract terms.', why: 'Read long tender packs faster, with every point traceable to the page.' },
  { id: 'learn', label: 'Learning & Enablement', notebook: 'Course Companion', inside: 'Course material, handbooks and onboarding guides.', why: 'Turns training material into audio briefings, study guides and quizzes people actually finish.' },
  { id: 'ops', label: 'Shipping operations', notebook: 'Operations Procedures Hub', inside: 'Operational procedures, checklists and approved circulars.', why: 'One trusted place for the procedures your team uses every day.' },
  { id: 'other', label: 'Other', notebook: 'My Team Reference Notebook', inside: 'Your team’s approved reference documents.', why: 'Answers grounded in your team’s own documents.' },
];

export const PAINS = [
  { id: 'long', label: 'Reading long documents', prompt: 'Summarize the key obligations in these documents in 10 bullet points, with citations.' },
  { id: 'rule', label: 'Finding a precise rule', prompt: 'According to these sources, what applies when [situation]? Quote the relevant section.' },
  { id: 'compare', label: 'Comparing documents', prompt: 'Compare what [document A] and [document B] say about [topic]. Show the differences in a table.' },
  { id: 'brief', label: 'Preparing a briefing', prompt: 'Create a one-page briefing on [topic] for someone new to the team.' },
  { id: 'learnnew', label: 'Learning new material', prompt: 'Quiz me with 5 questions on these sources.' },
  { id: 'recurring', label: 'Answering recurring questions', prompt: 'Draft answers to the 10 questions my team gets most often about [topic], with sources.' },
];

export const SOURCE_TYPES = ['Procedures', 'Regulations', 'Training material', 'Customer documentation', 'Contracts', 'Other'];

export const PUBLISH_CHECKLIST = [
  'Validate sources with the owner',
  'Assign a named owner',
  'Test five real questions',
  'Check citations',
  'Set viewer / editor permissions',
  'Define a source-review date',
];

export const FAQ = [
  { q: 'What is NotebookLM?', a: 'A tool that answers your questions using only the documents you add to a notebook, with a citation for each answer.' },
  { q: 'How is it different from Maia?', a: 'Maia helps you do the work: draft, translate, summarise. NotebookLM helps you check what your reference documents actually say. They work well together.' },
  { q: 'What files can I add?', a: 'PDFs, Word, PowerPoint and Excel files, Google Docs and Slides, web links, YouTube videos and pasted text.' },
  { q: 'Is my content used to train AI models?', a: 'No. Your sources and questions stay within CMA CGM’s environment and are not used to train models.' },
  { q: 'Who can see my notebook?', a: 'Only the people you share it with. You choose viewer (read and ask) or editor (can change sources).' },
  { q: 'What if the answer isn’t in my sources?', a: 'NotebookLM tells you it can’t find it rather than guessing.' },
  { q: 'Who can help me?', a: 'Your NotebookLM champion, or the support contact listed on this page.' },
];

export const VIDEOS = ['Create your first notebook', 'Ask and verify', 'Generate an Audio Overview', 'Share a notebook'];
