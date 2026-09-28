import { GoogleGenAI, Type } from '@google/genai';

export type Blueprint = {
  name: string;
  purpose: string;
  audience: string;
  recommended_sources: string[];
  sources_to_avoid: string[];
  starter_questions: string[];
  sharing: string;
  review_cadence: string;
};

export type BuilderInput = { goal: string; audience: string; sources: string[] };

// Change the model here if needed.
const MODEL = 'gemini-2.5-flash';

const SYSTEM = `You are a NotebookLM adoption coach for CMA CGM champions (a global shipping and logistics group).
From the user's goal, audience and source types, produce a practical notebook blueprint. Be concrete and short.
Recommend only document types. Never invent specific document titles, regulation numbers, product features or statistics.
Starter questions must start with "According to these sources," and be realistic for the audience.
Return JSON only.`;

const SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    purpose: { type: Type.STRING },
    audience: { type: Type.STRING },
    recommended_sources: { type: Type.ARRAY, items: { type: Type.STRING } },
    sources_to_avoid: { type: Type.ARRAY, items: { type: Type.STRING } },
    starter_questions: { type: Type.ARRAY, items: { type: Type.STRING } },
    sharing: { type: Type.STRING },
    review_cadence: { type: Type.STRING },
  },
  required: ['name', 'purpose', 'audience', 'recommended_sources', 'sources_to_avoid', 'starter_questions', 'sharing', 'review_cadence'],
};

export async function generateBlueprint(input: BuilderInput): Promise<{ blueprint: Blueprint; source: 'gemini' | 'template' }> {
  const key = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
  if (key) {
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const res = await ai.models.generateContent({
        model: MODEL,
        contents: `Goal: ${input.goal}\nAudience: ${input.audience || 'not specified'}\nSource types available: ${input.sources.join(', ') || 'not specified'}`,
        config: { systemInstruction: SYSTEM, responseMimeType: 'application/json', responseSchema: SCHEMA },
      });
      const bp = JSON.parse(res.text || '{}') as Blueprint;
      if (bp && bp.name) return { blueprint: bp, source: 'gemini' };
    } catch (e) {
      console.warn('Gemini call failed, using template', e);
    }
  }
  await new Promise((r) => setTimeout(r, 900));
  return { blueprint: templateBlueprint(input), source: 'template' };
}

// Offline fallback so the demo never breaks.
export function templateBlueprint(input: BuilderInput): Blueprint {
  const g = input.goal.toLowerCase();
  const audience = input.audience.trim() || 'Your team';
  const pick = (re: RegExp) => re.test(g);
  let t = {
    name: 'Team Reference Notebook',
    topic: 'your team’s procedures',
    sources: ['Current team procedures', 'Approved guidelines and policies', 'Onboarding or training material', 'Frequently asked questions from the team'],
    q: ['what is the procedure for [situation]?', 'which document defines [rule]? Quote the section.', 'what are the steps a new team member must follow for [task]?', 'what changed between [version A] and [version B]?', 'what are the 5 points people most often get wrong about [topic]?'],
  };
  if (pick(/danger|imdg|\bdg\b|hazard/)) t = {
    name: 'Dangerous Goods Operations Reference', topic: 'dangerous goods handling',
    sources: ['Approved dangerous goods regulation extracts, split by class or chapter', 'CMA CGM internal dangerous goods procedures', 'Approved operational circulars', 'Dangerous goods training material'],
    q: ['what documentation is required to ship a Class 3 product? Cite the section.', 'which segregation rules apply between [class A] and [class B]?', 'what must be checked before accepting a dangerous goods booking?', 'what is the escalation process when a declaration is incomplete?', 'what are the most common errors in dangerous goods declarations?'],
  };
  else if (pick(/custom|ics2|tariff|clearance/)) t = {
    name: 'Customs Rules Reference', topic: 'customs formalities',
    sources: ['Current customs regulations relevant to your lanes', 'Internal customs procedures', 'Approved customs circulars', 'Customs filing guidance'],
    q: ['what information is mandatory for an advance import declaration?', 'which procedure applies when [situation]? Quote the section.', 'what are the deadlines for [filing]?', 'what documents must accompany [shipment type]?', 'what changed in the latest circular?'],
  };
  else if (pick(/bill of lading|\bbl\b|shipping instruction|\bsi\b|documentation/)) t = {
    name: 'BL & SI Rules Navigator', topic: 'bill of lading and shipping instruction rules',
    sources: ['BL and SI standard operating procedures in force', 'Customer-specific documentation requirements', 'Approved templates and checklists', 'Documentation training material'],
    q: ['what must appear on the BL when [situation]? Cite the SOP.', 'what should I check in a shipping instruction before issuing the BL?', 'what are this customer’s specific requirements for [field]?', 'how do I handle an amendment request after issuance?', 'what are the most frequent BL errors and how to avoid them?'],
  };
  else if (pick(/customer|sop|control tower|client/)) t = {
    name: 'Customer SOP Navigator', topic: 'one customer’s operating procedures',
    sources: ['This customer’s SOPs (one notebook per customer)', 'Customer operating instructions and escalation matrix', 'Service level commitments for this customer', 'Recent approved process changes'],
    q: ['what is the procedure for [situation] for this customer?', 'who must be notified when [event] happens?', 'what are this customer’s cut-off times?', 'what is different in this customer’s process compared to our standard?', 'what are the service commitments for [service]?'],
  };
  else if (pick(/tender|bid|rfq|pricing|contract/)) t = {
    name: 'Tender Pack Reader', topic: 'a tender pack',
    sources: ['The full tender pack', 'Previous bids for similar lanes or customers', 'Standard contract terms', 'Internal pricing guidelines'],
    q: ['what are the mandatory requirements in this tender? List them with sections.', 'what penalties or liabilities are mentioned?', 'how do these terms differ from our standard contract?', 'what deadlines and deliverables are required?', 'which questions should we clarify with the customer?'],
  };
  else if (pick(/train|onboard|learn|course|new joiner/)) t = {
    name: 'Course Companion', topic: 'training material',
    sources: ['Course material and slides', 'Handbooks and reference guides', 'Onboarding checklists', 'Recorded session transcripts'],
    q: ['what are the 10 key things to remember from this course?', 'quiz me with 5 questions.', 'what should a new joiner do in their first week?', 'explain [concept] with a simple example.', 'create a one-page summary for a manager.'],
  };
  const generic = t.name === 'Team Reference Notebook';
  const extra = generic ? input.sources.filter((s) => s !== 'Other') : [];
  return {
    name: t.name,
    purpose: `Help ${audience} find and verify answers about ${t.topic}, using only approved documents.`,
    audience,
    recommended_sources: Array.from(new Set([...t.sources, ...extra])).slice(0, 6),
    sources_to_avoid: ['Outdated or superseded versions', 'Drafts that are not approved', 'Personal notes or email threads'],
    starter_questions: t.q.map((x) => `According to these sources, ${x}`),
    sharing: `Viewer access for ${audience}; editor access only for the named owner and one backup.`,
    review_cadence: 'Review sources every 60 days, or every 30 days for compliance-related content.',
  };
}
