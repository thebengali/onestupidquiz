export type Question = {
  question: string;
  answers: string[];
  correct: number; // index in answers[]
  quipCorrect?: string;
  quipWrong?: string;
  points?: number;
};

export const questions: Question[] = [
  {
    question: "What’s the *least* helpful thing to say to someone debugging?",
    answers: [
      "“Have you tried turning it off and on again?”",
      "“Works on my machine.”",
      "“Let’s rubber-duck this.”",
      "“Ship it and we’ll fix in prod.”"
    ],
    correct: 1,
    quipCorrect: "Classic. The universal non-fix.",
    quipWrong: "Bold pick. Still not as cursed as 'fix in prod'.",
    points: 7
  },
  {
    question: "Which beverage best describes Monday energy?",
    answers: ["Espresso", "Decaf", "Iced matcha", "Battery acid (figurative!)"],
    correct: 0,
    quipCorrect: "Zap-zap ⚡ You’re caffeinated *and* correct.",
    quipWrong: "Respect the matcha, but Mondays need rocket fuel.",
    points: 5
  },
  {
    question: "Tabs vs Spaces: what’s the *only* right answer?",
    answers: ["Tabs", "Spaces", "Whatever the formatter says", "ASCII art indentation"],
    correct: 2,
    quipCorrect: "Let the robots fight. You keep shipping.",
    quipWrong: "Spicy! But the formatter is the real boss.",
    points: 9
  },
  {
    question: "Product says 'quick tweak'. What’s your ETA?",
    answers: ["5 min", "1 hour", "Tomorrow", "Unknown (Schrödinger’s bug)"],
    correct: 3,
    quipCorrect: "At least you’re honest. Reality is a quantum state.",
    quipWrong: "Optimism is cute. Reality is… less so.",
    points: 8
  },
  {
    question: "Pick the best commit message:",
    answers: [
      "fix stuff",
      "refactor: split quiz logic, add snarky quips",
      "final_final_REAL_final",
      "wip"
    ],
    correct: 1,
    quipCorrect: "Chef’s kiss. Future you says thanks.",
    quipWrong: "Future you is filing an HR complaint.",
    points: 6
  }
];

export default questions;
