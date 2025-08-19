export type Option = { text: string; score: number; quip: string };
export type Question = { id: string; question: string; options: Option[] };
const questions: Question[] = [
  {
    id: "two-plus-two",
    question: "What can 2 and 2 get you?",
    options: [
      { text: "4", score: 1.0, quip: "Correct, conventional, mildly disappointing." },
      { text: "5", score: 0.75, quip: "Confident presentation adds 1.0 of vibes." },
      { text: "Depends who’s counting", score: 0.5, quip: "Politics is just arithmetic with adjectives." },
      { text: "Whatever the rubric says", score: 0.33, quip: "If the rubric says jazz, we clap." }
    ]
  },
  {
    id: "success",
    question: "Best way to ‘succeed’?",
    options: [
      { text: "Work hard", score: 1.0, quip: "Respect. Bring snacks." },
      { text: "Network shamelessly", score: 0.75, quip: "Merit, but make it social." },
      { text: "Be born into it", score: 0.5, quip: "Speedrun unlocked." },
      { text: "Redefine ‘success’ until you win", score: 0.33, quip: "Semantic gymnastics earns partial credit." }
    ]
  },
  {
    id: "meetings",
    question: "A ‘quick sync’ is…",
    options: [
      { text: "An hour", score: 1.0, quip: "Time is a flat calendar." },
      { text: "15 minutes", score: 0.75, quip: "Legend says this once happened." },
      { text: "An email", score: 0.5, quip: "Future archaeologists will praise you." },
      { text: "A lifestyle", score: 0.33, quip: "Grindset: invited." }
    ]
  },
  {
    id: "tabs-spaces",
    question: "Tabs vs Spaces?",
    options: [
      { text: "Whatever the formatter says", score: 1.0, quip: "We bow to the robot." },
      { text: "Spaces", score: 0.75, quip: "Soft yet opinionated." },
      { text: "Tabs", score: 0.5, quip: "Hard stop at chaos." },
      { text: "ASCII art indentation", score: 0.33, quip: "Michelangelo of tech debt." }
    ]
  },
  {
    id: "deadline",
    question: "Best ETA for a ‘quick tweak’?",
    options: [
      { text: "Unknown (Schrödinger’s bug)", score: 1.0, quip: "Observed only at merge." },
      { text: "Tomorrow", score: 0.75, quip: "Optimism with a helmet." },
      { text: "1 hour", score: 0.5, quip: "A unit of hope." },
      { text: "5 minutes", score: 0.33, quip: "Performance art." }
    ]
  },
  {
    id: "fix-system",
    question: "Best way to fix a broken system?",
    options: [
      { text: "Touch grass", score: 1.0, quip: "Nature patches 90% of bugs." },
      { text: "Rebrand the problem", score: 0.75, quip: "Now it’s innovation." },
      { text: "Start a task force", score: 0.5, quip: "Calendar-first engineering." },
      { text: "Follow the process", score: 0.33, quip: "Paperwork is duct tape for empires." }
    ]
  },
  {
    id: "ai",
    question: "The purpose of AI is to…",
    options: [
      { text: "Automate the boring bits", score: 1.0, quip: "May your wrists rejoice." },
      { text: "Replace meetings", score: 0.75, quip: "If only it liked snacks." },
      { text: "Generate decks forever", score: 0.5, quip: "Slide 47 cures nothing." },
      { text: "Win arguments online", score: 0.33, quip: "Achievement unlocked: notifications." }
    ]
  },
  {
    id: "ethics",
    question: "Most ethical way to ship fast?",
    options: [
      { text: "Small safe launches", score: 1.0, quip: "Iterate without collateral damage." },
      { text: "Feature flags + rollbacks", score: 0.75, quip: "Parachutes are chic." },
      { text: "Hope and dashboards", score: 0.5, quip: "Observability is not absolution." },
      { text: "Fix in prod", score: 0.33, quip: "Bold. Also: no." }
    ]
  }
];
export default questions;
