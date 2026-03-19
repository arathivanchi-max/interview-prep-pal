export interface Question {
  id: number;
  category: string;
  question: string;
  tip: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: "Leadership",
    question: "Tell me about a time you took ownership of a project without being asked.",
    tip: "Focus on your initiative and the measurable impact you created.",
  },
  {
    id: 2,
    category: "Leadership",
    question: "Describe a situation where you had to lead a team through ambiguity.",
    tip: "Emphasize how you created clarity and kept the team motivated.",
  },
  {
    id: 3,
    category: "Problem-Solving",
    question: "Walk me through a time you faced a major obstacle at work. How did you overcome it?",
    tip: "Show your analytical thinking and persistence.",
  },
  {
    id: 4,
    category: "Problem-Solving",
    question: "Tell me about a time you had to make a decision with incomplete information.",
    tip: "Highlight your reasoning process and risk assessment.",
  },
  {
    id: 5,
    category: "Collaboration",
    question: "Describe a disagreement you had with a coworker. How did you resolve it?",
    tip: "Show empathy and your ability to find common ground.",
  },
  {
    id: 6,
    category: "Collaboration",
    question: "Tell me about a time you worked with someone whose style was very different from yours.",
    tip: "Demonstrate adaptability and respect for diverse perspectives.",
  },
  {
    id: 7,
    category: "Adaptability",
    question: "Give an example of when priorities shifted suddenly. How did you handle it?",
    tip: "Show composure and your ability to reprioritize effectively.",
  },
  {
    id: 8,
    category: "Adaptability",
    question: "Tell me about a time you failed. What did you learn?",
    tip: "Be honest, show self-awareness, and focus on growth.",
  },
  {
    id: 9,
    category: "Communication",
    question: "Describe a time you had to explain something complex to a non-technical audience.",
    tip: "Highlight clarity, empathy, and use of analogies.",
  },
  {
    id: 10,
    category: "Communication",
    question: "Tell me about a situation where miscommunication caused a problem. How did you fix it?",
    tip: "Show accountability and proactive resolution.",
  },
  {
    id: 11,
    category: "Delivery",
    question: "Tell me about a time you had to juggle multiple deadlines. How did you prioritize?",
    tip: "Show your framework for prioritization and time management.",
  },
  {
    id: 12,
    category: "Delivery",
    question: "Describe a project you delivered under a tight deadline. What trade-offs did you make?",
    tip: "Demonstrate pragmatism and clear communication of trade-offs.",
  },
  {
    id: 13,
    category: "Customer Focus",
    question: "Give an example of going above and beyond for a customer or stakeholder.",
    tip: "Quantify the impact and show genuine care.",
  },
  {
    id: 14,
    category: "Customer Focus",
    question: "Tell me about a time you received tough feedback. How did you respond?",
    tip: "Show humility, openness to feedback, and concrete action taken.",
  },
];

export const categories = [...new Set(questions.map((q) => q.category))];
