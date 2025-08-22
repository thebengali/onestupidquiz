#!/usr/bin/env node
// ESM generator: creates lib/quizzes_generated.ts with N sets per category.
// This version generates DISTINCT prompts/options per set using category vocab banks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUAD_SETS } from './quip_sets.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
let perCat = 90;
for (let i=0;i<args.length;i++) {
  if (args[i] === '--perCat' || args[i] === '--count' || args[i] === '--days') {
    perCat = parseInt(args[i+1] || '90', 10) || 90;
    i++;
  }
}

const CATS = ['AI Stuff','Random','History','Geography','Science','Language','Sports'];

const BANKS = {
  'AI Stuff': {
    roles: ['prompt wizard','LLM wrangler','gremlin whisperer','token counter','vector bard','ranking goblin','latent space surfer'],
    topics: ['prompts','tokens','embeddings','transformers','RLHF','agents','context windows','hallucinations','RAG','system prompts','gremlins'],
    verbs: ['summon','coax','wrangle','conjure','stitch','embiggen','nudge','rank','decode','distill'],
    adjs: ['spicy','sane','suspicious','clean','chaotic','unhinged','clever','devious','nerdy'],
  },
  'Random': {
    roles: ['chaos curator','goblin intern','gremlin supervisor','meme librarian','dice roller'],
    topics: ['toast','umbrellas','marbles','pigeons','toasters','socks','sandwiches','time travel','dinosaurs','confetti'],
    verbs: ['juggle','befriend','misplace','rearrange','summon','trade','debate'],
    adjs: ['sparkly','cursed','mildly alarming','underrated','overly confident','chaotic'],
  },
  'History': {
    roles: ['archivist','scribe','time tourist','museum goblin','history gremlin'],
    topics: ['Romans','Pharaohs','Mughals','Vikings','Aztecs','Renaissance','Silk Road','Cold War','Industrial Age','Printing press'],
    verbs: ['interpret','chronicle','compare','explain','reconstruct','debate'],
    adjs: ['canonical','revisionist','heroic','messy','pivotal','unlikely'],
  },
  'Geography': {
    roles: ['cartographer','mountain goat','river pilot','border negotiator','map goblin'],
    topics: ['isthmuses','archipelagos','basins','fjords','deserts','monsoons','steppe','atolls','volcanoes','glaciers'],
    verbs: ['navigate','locate','cross','trace','name','mispronounce'],
    adjs: ['windy','coastal','continental','tectonic','scenic','elevated'],
  },
  'Science': {
    roles: ['physicist','chemist','biologist','astronomer','lab goblin','theorist'],
    topics: ['entropy','inertia','mitochondria','CRISPR','quantum foam','photosynthesis','plate tectonics','neutrinos','black holes','vaccines'],
    verbs: ['measure','model','predict','observe','derive','synthesize'],
    adjs: ['falsifiable','elegant','weird','robust','noisy','precise'],
  },
  'Language': {
    roles: ['grammar gremlin','lexicographer','etymology nerd','poet','polyglot'],
    topics: ['idioms','metaphors','palindromes','oxford comma','syntax','semantics','phonemes','morphemes','loanwords','slang'],
    verbs: ['parse','decline','conjugate','coin','pun','diagram'],
    adjs: ['succinct','flowery','ambiguous','playful','idiomatic','formal'],
  },
  'Sports': {
    roles: ['coach','referee','stat goblin','commentator','fanatic'],
    topics: ['penalties','offside','timeouts','batting average','serve','marathon','relay','corner kick','hat-trick','triple-double'],
    verbs: ['score','defend','sprint','train','strategize','analyze'],
    adjs: ['clutch','defensive','aggressive','tactical','endurance','technical'],
  },
};

// Mulberry32 PRNG
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

function slugifyCat(cat) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function makePrompt(cat, qi, rng) {
  const B = BANKS[cat] || BANKS['Random'];
  const role = pick(rng, B.roles);
  const topic = pick(rng, B.topics);
  const adj = pick(rng, B.adjs);
  const verb = pick(rng, B.verbs);

  const templates = [
    `As a ${role}, which choice is the most ${adj}?`,
    `In the realm of ${topic}, what would a ${role} choose?`,
    `Pick the option that best ${verb}s ${topic}.`,
    `Which answer is peak ${topic} energy?`,
    `Your ${role} instinct says…`,
    `Which one feels canonically ${adj} for ${topic}?`,
    `If ${topic} had a mascot, which option fits?`,
    `Choose the most defensible take on ${topic}.`,
    `Which option a ${role} would argue for?`,
    `What’s the least embarrassing ${topic} choice?`,
  ];
  return templates[Math.floor(rng() * templates.length)];
}

function makeOptions(cat, rng) {
  const B = BANKS[cat] || BANKS['Random'];
  const topic = pick(rng, B.topics);
  const role = pick(rng, B.roles);
  const adj = pick(rng, B.adjs);
  const verb = pick(rng, B.verbs);

  const opts = [
    `${cap(topic)} for breakfast`,
    `${cap(adj)} plan approved by a ${role}`,
    `Politely ${verb} the problem`,
    `Go full goblin on ${topic}`,
    `${cap(verb)} first, think later`,
    `Ask a ${role} to help`,
    `Invent a ${adj} workaround`,
    `Ignore ${topic} with confidence`,
  ];

  // pick 4 unique options
  const out = [];
  while (out.length < 4 && opts.length) {
    out.push(opts.splice(Math.floor(rng() * opts.length), 1)[0]);
  }
  return out;
}

function buildQuestion(cat, qi, setSeed) {
  const rng = mulberry32(setSeed + qi * 1337);
  const prompt = makePrompt(cat, qi, rng);
  const options = makeOptions(cat, rng);
  const answerIndex = Math.floor(rng() * 4);

  // choose a random quip quadruplet and align by tier to option indices
  const quad = QUAD_SETS[Math.floor(rng() * QUAD_SETS.length)];
  const nonIdx = [0,1,2,3].filter(i => i !== answerIndex);
  const closeIdx = nonIdx[0];
  const mehIdx   = nonIdx[1];
  const nopeIdx  = nonIdx[2];

  const quipsByOption = [];
  for (let i=0;i<4;i++) {
    if (i === answerIndex) quipsByOption[i] = [quad.best];
    else if (i === closeIdx) quipsByOption[i] = [quad.close];
    else if (i === mehIdx) quipsByOption[i] = [quad.meh];
    else quipsByOption[i] = [quad.nope];
  }

  const weights = [0,0,0,0];
  weights[answerIndex] = 1.0;
  weights[closeIdx] = 0.75;
  weights[mehIdx] = 0.5;
  weights[nopeIdx] = 0.3;

  return {
    id: `q-${qi+1}`,
    prompt,
    options,
    answerIndex,
    weights,
    quipsByOption
  };
}

function buildSet(cat, n, seed) {
  const slug = `${slugifyCat(cat)}-${String(n).padStart(3,'0')}`;
  const title = `${cat} — Set ${String(n).padStart(2,'0')}`;
  const questions = [];
  for (let i=0;i<10;i++) questions.push(buildQuestion(cat, i, seed));
  return { slug, title, category: cat, questions };
}

function main() {
  const outPath = path.join(__dirname, '..', 'lib', 'quizzes_generated.ts');
  const sets = [];
  for (const cat of CATS) {
    for (let n=1; n<=perCat; n++) {
      const seed = (slugifyCat(cat).length * 100000) + n * 97; // category-specific deterministic seed
      sets.push(buildSet(cat, n, seed));
    }
  }
  const ts = `/* AUTO-GENERATED: DO NOT EDIT BY HAND */
export const GENERATED_QUIZ_SETS = ${JSON.stringify(sets, null, 2)} as any[];
`;
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log(`Wrote ${sets.length} sets to ${outPath}`);
}

main();
