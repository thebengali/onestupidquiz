#!/usr/bin/env node
// ESM generator: creates lib/quizzes_generated.ts with N sets per category.
import { QUAD_SETS } from './quip_sets.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const CATEGORIES = ['AI Stuff','Random','History','Geography','Science','Language','Sports'];

function slugifyCat(cat) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Simple seeded PRNG (mulberry32)
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function makePrompt(cat, idx, setNo, rng) {
  const templates = [
    `Which choice feels most ${cat}-core today?`,
    `Pick the most on-brand ${cat} option.`,
    `${cat} quiz energy: which one screams “obviously”?`,
    `What would a ${cat} gremlin pick?`,
    `Your ${cat} instinct says…`,
    `Choose the option that best fits ${cat}.`,
    `Which of these is peak ${cat}?`,
    `If ${cat} had a mascot, which is it?`,
    `What’s the smartest ${cat}-ish choice here?`,
    `Which answer is least likely to embarrass future-you in ${cat}?`
  ];
  return templates[idx % templates.length];
}

function makeOptions(cat, rng) {
  const base = [
    "The obvious one",
    "The almost-right one",
    "The stylishly meh one",
    "The chaotic gremlin pick"
  ];
  // random small shuffles
  return base.sort(() => rng() - 0.5);
}

function buildQuestion(cat, qi, setSeed) {
  const rng = mulberry32(setSeed + qi * 1337);
  const prompt = makePrompt(cat, qi, setSeed, rng);
  const options = makeOptions(cat, rng);
  const answerIndex = Math.floor(rng() * 4); // random "best"
  // pick a quip quadruplet and align to option tiers
  const quad = pick(rng, QUAD_SETS);
  // distribute close/meh/nope to non-best positions deterministically
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
  // default weights [1.0,0.75,0.5,0.3] arranged so answerIndex gets 1.0
  const baseW = [1.0, 0.75, 0.5, 0.3];
  const weights = [0,0,0,0];
  // assign weights to positions: best gets 1.0, the rest assigned in order close/meh/nope
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

function buildSet(cat, setNo, seed) {
  const slug = `${slugifyCat(cat)}-${String(setNo).padStart(3,'0')}`;
  const title = `${cat} — Set ${String(setNo).padStart(2,'0')}`;
  const questions = [];
  for (let i=0;i<10;i++) questions.push(buildQuestion(cat, i, seed));
  return { slug, title, category: cat, questions };
}

function main() {
  const outPath = path.join(__dirname, '..', 'lib', 'quizzes_generated.ts');
  const sets = [];
  // deterministic seed by category + setNo
  for (const cat of CATEGORIES) {
    for (let n=1; n<=perCat; n++) {
      const seed = (slugifyCat(cat).length * 100000) + n;
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
