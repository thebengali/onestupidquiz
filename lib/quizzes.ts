export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explain?: string;
};

export type QuizSet = {
  slug: string;
  title: string;
  category: Category;
  categoryTitle: string;
  vibe?: string; // display hint
  questions: Question[];
};

export type Category =
  | 'AI Stuff'
  | 'Random'
  | 'History'
  | 'Geography'
  | 'Science'
  | 'Language'
  | 'Sports';

export const ALL_CATEGORIES: Category[] = [
  'AI Stuff',
  'Random',
  'History',
  'Geography',
  'Science',
  'Language',
  'Sports',
];

function q(id: string, prompt: string, options: string[], answerIndex: number, explain?: string): Question {
  return { id, prompt, options, answerIndex, explain };
}

// Small helper to create a 10-question set
function makeSet(
  slug: string,
  title: string,
  category: Category,
  vibe: string,
  questions: Question[]
): QuizSet {
  return {
    slug,
    title,
    category,
    categoryTitle: category,
    vibe,
    questions
  };
}

// Sample quirky Qs (10) — you can replace with your own per set
const SAMPLE10_AI: Question[] = [
  q('ai1','What does the “L” in LLM stand for?',['Large','Lyrical','Logical','Lucky'],0,'Large Language Model — sadly not Lyrical.'),
  q('ai2','Best snack for model training?',['Chips','GPU time','Pickles','Tiramisu'],1,'Models eat compute.'),
  q('ai3','Prompting feels like…',['Casting spells','Typing emails','Jazz','Origami'],0,'“Wingardium Leviosa,” but for text.'),
  q('ai4','A temperature of 1.5 means…',['Spicy output','Colder than 0.2','Deterministic','Mute bot'],0,'Spicy = more randomness.'),
  q('ai5','Embeddings are like…',['Word vibes','Data glue','Tiny maps','All of these'],3,'All metaphors welcome.'),
  q('ai6','Which is NOT a diffusion step?',['Noise','Denoise','Re-noise','Detax'],3,'“Detax” is not a real step. Yet.'),
  q('ai7','Tool-use in agents feels like…',['Swiss army knife','Spoon','Umbrella','Yo-yo'],0,'Multi-tool, many tricks.'),
  q('ai8','Top reason for hallucination?',['Confidence','Lack of context','Pixie dust','Bad vibes'],1,'Grounding reduces tall tales.'),
  q('ai9','Vector DB stores…',['Vectors','Feelings','Avocados','Videos'],0,'Just numbers with direction.'),
  q('ai10','Best way to test a prompt?',['A/B + logs','Guess','Hope','Close eyes'],0,'Measure or it didn’t happen.'),
];

const SAMPLE10_GENERIC: Question[] = [
  q('g1','A minute has how many seconds?',['30','45','60','90'],2),
  q('g2','Which is a prime?',['21','23','27','33'],1),
  q('g3','Which ocean is largest?',['Indian','Pacific','Atlantic','Arctic'],1),
  q('g4','Which came first?',['Bronze Age','Iron Age','Space Age','Stone Age'],3),
  q('g5','Language with most native speakers?',['English','Hindi','Mandarin Chinese','Spanish'],2),
  q('g6','Capital of Japan?',['Seoul','Beijing','Tokyo','Kyoto'],2),
  q('g7','H2O is…',['Helium','Water','Hydrogen','Ozone'],1),
  q('g8','Fastest land animal?',['Cheetah','Horse','Ostrich','Lion'],0),
  q('g9','Light travels fastest in…',['Vacuum','Water','Glass','Air'],0),
  q('g10','Planet known as Red Planet?',['Venus','Mars','Jupiter','Saturn'],1),
];

function cloneQs(prefix: string, qs: Question[]): Question[] {
  return qs.map((qq, i) => ({...qq, id: `${prefix}-${i+1}`}));
}

// 3 sets per category as seed examples
export const QUIZ_SETS: QuizSet[] = [
  // AI Stuff (default)
  makeSet('ai-stuff-01','AI Stuff: Prompt Potions','AI Stuff','Whimsical & nerdy', cloneQs('aiA', SAMPLE10_AI)),
  makeSet('ai-stuff-02','AI Stuff: Vector Ventures','AI Stuff','Whimsical & nerdy', cloneQs('aiB', SAMPLE10_AI)),
  makeSet('ai-stuff-03','AI Stuff: Agents Assemble','AI Stuff','Whimsical & nerdy', cloneQs('aiC', SAMPLE10_AI)),

  // Random
  makeSet('random-01','Random: Lucky Dip','Random','Chaotic fun', cloneQs('rA', SAMPLE10_GENERIC)),
  makeSet('random-02','Random: Shuffle Deck','Random','Chaotic fun', cloneQs('rB', SAMPLE10_GENERIC)),
  makeSet('random-03','Random: Wild Guess','Random','Chaotic fun', cloneQs('rC', SAMPLE10_GENERIC)),

  // History
  makeSet('history-01','History: Time Travel Lite','History','Curious past', cloneQs('hA', SAMPLE10_GENERIC)),
  makeSet('history-02','History: Empires & Edges','History','Curious past', cloneQs('hB', SAMPLE10_GENERIC)),
  makeSet('history-03','History: Quick March','History','Curious past', cloneQs('hC', SAMPLE10_GENERIC)),

  // Geography
  makeSet('geography-01','Geography: Map Snap','Geography','Earthy vibes', cloneQs('geoA', SAMPLE10_GENERIC)),
  makeSet('geography-02','Geography: Globe Trot','Geography','Earthy vibes', cloneQs('geoB', SAMPLE10_GENERIC)),
  makeSet('geography-03','Geography: Latitude Attitude','Geography','Earthy vibes', cloneQs('geoC', SAMPLE10_GENERIC)),

  // Science
  makeSet('science-01','Science: Lab Laughs','Science','Nerd-approved', cloneQs('sA', SAMPLE10_GENERIC)),
  makeSet('science-02','Science: Tiny Giants','Science','Nerd-approved', cloneQs('sB', SAMPLE10_GENERIC)),
  makeSet('science-03','Science: Wow or Why','Science','Nerd-approved', cloneQs('sC', SAMPLE10_GENERIC)),

  // Language
  makeSet('language-01','Language: Word Nerd','Language','Punny', cloneQs('lA', SAMPLE10_GENERIC)),
  makeSet('language-02','Language: Babel Babble','Language','Punny', cloneQs('lB', SAMPLE10_GENERIC)),
  makeSet('language-03','Language: Syntax Spin','Language','Punny', cloneQs('lC', SAMPLE10_GENERIC)),

  // Sports
  makeSet('sports-01','Sports: Sideline Shuffle','Sports','Game on', cloneQs('spA', SAMPLE10_GENERIC)),
  makeSet('sports-02','Sports: Fast Break','Sports','Game on', cloneQs('spB', SAMPLE10_GENERIC)),
  makeSet('sports-03','Sports: Extra Time','Sports','Game on', cloneQs('spC', SAMPLE10_GENERIC)),
];
