// app/data/questions.ts
export type Option = {
  text: string;
  weight: number; // 1, 0.75, 0.33, 0 etc.
  quip?: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "q1",
    prompt: "What can 2 + 2 get you?",
    options: [
      { text: "4", weight: 1, quip: "Math class says ✅" },
      { text: "Whatever your boss signs off", weight: 0.75, quip: "Corporate algebra™" },
      { text: "A meeting about the meeting", weight: 0.33, quip: "Calendar math" },
      { text: "A new KPI", weight: 0, quip: "Key Pain Indicator" }
    ]
  },
  {
    id: "q2",
    prompt: "Pick the most effective way to show impact:",
    options: [
      { text: "Ship useful things", weight: 1, quip: "Wild, I know" },
      { text: "Make a deck", weight: 0.75, quip: "Slides > substance?" },
      { text: "Rename the project", weight: 0.33, quip: "Rebrand the problem" },
      { text: "Form a task force", weight: 0, quip: "Force, but no tasks" }
    ]
  },
  {
    id: "q3",
    prompt: "Fastest way to learn a new tool?",
    options: [
      { text: "Build a tiny thing with it", weight: 1, quip: "Hands on beats hands off" },
      { text: "Skim docs then try", weight: 0.75, quip: "Docs + doing = 💪" },
      { text: "Watch 12 tutorials first", weight: 0.33, quip: "Analysis paralysis" },
      { text: "Ask for a 3‑hour meeting", weight: 0, quip: "Meeting-driven development" }
    ]
  },
  {
    id: "q4",
    prompt: "Best password hygiene:",
    options: [
      { text: "Use a manager + unique per site", weight: 1, quip: "Future‑you approves" },
      { text: "One strong password reused", weight: 0.33, quip: "One key for all locks? 😬" },
      { text: "Write on sticky note", weight: 0, quip: "Yellow security" },
      { text: "123456789", weight: 0, quip: "Hackers say thanks" }
    ]
  },
  {
    id: "q5",
    prompt: "HTTP code for a missing page is:",
    options: [
      { text: "404", weight: 1, quip: "Not Found, found" },
      { text: "200", weight: 0.33, quip: "OK but not OK" },
      { text: "418", weight: 0.75, quip: "I’m a teapot (cute, but no)" },
      { text: "500", weight: 0, quip: "That’s on the server" }
    ]
  },
  {
    id: "q6",
    prompt: "UI that feels good usually:",
    options: [
      { text: "Is consistent and predictable", weight: 1, quip: "Brains love patterns" },
      { text: "Changes style every screen", weight: 0, quip: "Chaos‑driven design" },
      { text: "Hides actions to look clean", weight: 0.33, quip: "Minimal… effort?" },
      { text: "Uses 9 different fonts", weight: 0, quip: "Typography soup" }
    ]
  },
  {
    id: "q7",
    prompt: "Good commit message:",
    options: [
      { text: "Explains the why and what", weight: 1, quip: "Future teammates thank you" },
      { text: "‘fixes’", weight: 0.33, quip: "Fixes what, friend?" },
      { text: "Emoji only", weight: 0.33, quip: "😅" },
      { text: "Long essay about life", weight: 0, quip: "Blog in the PR, not commit" }
    ]
  },
  {
    id: "q8",
    prompt: "Meetings should be:",
    options: [
      { text: "Short, with decisions captured", weight: 1, quip: "Action > airtime" },
      { text: "Status theater", weight: 0.33, quip: "Applause optional" },
      { text: "Without agenda", weight: 0, quip: "Wandering minds" },
      { text: "As many as possible", weight: 0, quip: "Calendar Tetris" }
    ]
  },
  {
    id: "q9",
    prompt: "First step when debugging:",
    options: [
      { text: "Reproduce the issue reliably", weight: 1, quip: "Make it fail on command" },
      { text: "Restart computer", weight: 0.33, quip: "Classic, but not science" },
      { text: "Rewrite everything", weight: 0, quip: "Ambitious 😬" },
      { text: "Blame networking", weight: 0.33, quip: "It’s always DNS, until it isn’t" }
    ]
  },
  {
    id: "q10",
    prompt: "Best way to get feedback:",
    options: [
      { text: "Ship, measure, iterate", weight: 1, quip: "Reality is a great reviewer" },
      { text: "Ask only your best friend", weight: 0.33, quip: "Biased sample" },
      { text: "Wait until it’s perfect", weight: 0, quip: "Perfection is a delay tactic" },
      { text: "Announce and forget", weight: 0, quip: "Ghost release" }
    ]
  }
];
