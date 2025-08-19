// app/data/questions.ts
export type Option = {
  text: string;
  weight: number;         // 1, 0.75, 0.33, 0 etc.
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
      { text: "Make a deck", weight: 0.75, quip: "Slides > substance" },
      { text: "Rename the project", weight: 0.33, quip: "Rebrand the problem" },
      { text: "Form a task force", weight: 0, quip: "Force, but no tasks" }
    ]
  }
];
