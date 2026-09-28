# NotebookLM at CMA CGM (prototype)

Run locally: `npm install`, put `GEMINI_API_KEY=...` in `.env.local`, then `npm run dev`.
- All texts: `data.ts` · Logos: `LOGOS` in `data.ts` · Starter notebook link: `APP.starterNotebookUrl`
- Gemini model: `MODEL` in `services/blueprint.ts` (falls back to a template if no key / API error)
