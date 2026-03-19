export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  tip: string;
}

export const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

export const questions: Question[] = [
  { id: 1, category: "Leadership", difficulty: "Medium", question: "Tell me about a time you took ownership of a project without being asked.", tip: "Focus on your initiative and the measurable impact you created." },
  { id: 2, category: "Leadership", difficulty: "Hard", question: "Describe a situation where you had to lead a team through ambiguity.", tip: "Emphasize how you created clarity and kept the team motivated." },
  { id: 3, category: "Problem-Solving", difficulty: "Medium", question: "Walk me through a time you faced a major obstacle at work. How did you overcome it?", tip: "Show your analytical thinking and persistence." },
  { id: 4, category: "Problem-Solving", difficulty: "Hard", question: "Tell me about a time you had to make a decision with incomplete information.", tip: "Highlight your reasoning process and risk assessment." },
  { id: 5, category: "Collaboration", difficulty: "Easy", question: "Describe a disagreement you had with a coworker. How did you resolve it?", tip: "Show empathy and your ability to find common ground." },
  { id: 6, category: "Collaboration", difficulty: "Medium", question: "Tell me about a time you worked with someone whose style was very different from yours.", tip: "Demonstrate adaptability and respect for diverse perspectives." },
  { id: 7, category: "Adaptability", difficulty: "Easy", question: "Give an example of when priorities shifted suddenly. How did you handle it?", tip: "Show composure and your ability to reprioritize effectively." },
  { id: 8, category: "Adaptability", difficulty: "Medium", question: "Tell me about a time you failed. What did you learn?", tip: "Be honest, show self-awareness, and focus on growth." },
  { id: 9, category: "Communication", difficulty: "Easy", question: "Describe a time you had to explain something complex to a non-technical audience.", tip: "Highlight clarity, empathy, and use of analogies." },
  { id: 10, category: "Communication", difficulty: "Medium", question: "Tell me about a situation where miscommunication caused a problem. How did you fix it?", tip: "Show accountability and proactive resolution." },
  { id: 11, category: "Delivery", difficulty: "Medium", question: "Tell me about a time you had to juggle multiple deadlines. How did you prioritize?", tip: "Show your framework for prioritization and time management." },
  { id: 12, category: "Delivery", difficulty: "Hard", question: "Describe a project you delivered under a tight deadline. What trade-offs did you make?", tip: "Demonstrate pragmatism and clear communication of trade-offs." },
  { id: 13, category: "Customer Focus", difficulty: "Easy", question: "Give an example of going above and beyond for a customer or stakeholder.", tip: "Quantify the impact and show genuine care." },
  { id: 14, category: "Customer Focus", difficulty: "Medium", question: "Tell me about a time you received tough feedback. How did you respond?", tip: "Show humility, openness to feedback, and concrete action taken." },
  { id: 15, category: "Conflict Resolution", difficulty: "Hard", question: "Tell me about a time you mediated a conflict between two team members.", tip: "Show neutrality, active listening, and how you guided them to a resolution." },
  { id: 16, category: "Conflict Resolution", difficulty: "Hard", question: "Describe a situation where you had to push back on a manager's decision.", tip: "Demonstrate respectful assertiveness backed by data or reasoning." },
  { id: 17, category: "Conflict Resolution", difficulty: "Medium", question: "Tell me about a time a project's direction caused tension on your team. How did you handle it?", tip: "Focus on facilitating open dialogue and aligning on shared goals." },
  { id: 18, category: "Conflict Resolution", difficulty: "Medium", question: "Give an example of when you had to deliver bad news to a stakeholder.", tip: "Show transparency, empathy, and how you offered a path forward." },
  { id: 19, category: "Conflict Resolution", difficulty: "Easy", question: "Describe a time you dealt with a difficult personality at work.", tip: "Highlight patience, professionalism, and finding productive ways to collaborate." },
  { id: 20, category: "Innovation", difficulty: "Medium", question: "Tell me about a time you proposed a new idea that improved a process or product.", tip: "Show initiative and quantify the improvement your idea created." },
  { id: 21, category: "Innovation", difficulty: "Hard", question: "Describe a situation where you challenged the status quo.", tip: "Demonstrate courage to question norms and a constructive approach to change." },
  { id: 22, category: "Innovation", difficulty: "Hard", question: "Give an example of when you used a creative solution to solve a technical problem.", tip: "Walk through your thought process and why conventional approaches wouldn't work." },
  { id: 23, category: "Innovation", difficulty: "Medium", question: "Tell me about a time you experimented with something new that didn't work out.", tip: "Show intellectual curiosity and what you learned from the experiment." },
  { id: 24, category: "Innovation", difficulty: "Easy", question: "Describe how you stay current with industry trends and apply them to your work.", tip: "Give a concrete example of translating a trend into a tangible outcome." },
  { id: 25, category: "Strategic Thinking", difficulty: "Hard", question: "Tell me about a time you had to balance short-term needs with long-term goals.", tip: "Show how you weighed trade-offs and communicated your reasoning." },
  { id: 26, category: "Strategic Thinking", difficulty: "Hard", question: "Describe a decision you made that had significant long-term impact on your team or org.", tip: "Highlight foresight, stakeholder alignment, and measurable outcomes." },
  { id: 27, category: "Strategic Thinking", difficulty: "Medium", question: "Give an example of when you identified a risk early and took preventive action.", tip: "Show proactive thinking and how your early action saved time or resources." },
  { id: 28, category: "Strategic Thinking", difficulty: "Hard", question: "Tell me about a time you had to align multiple stakeholders around a single strategy.", tip: "Demonstrate influence, communication, and consensus-building skills." },
  { id: 29, category: "Strategic Thinking", difficulty: "Medium", question: "Describe a situation where you had to pivot your strategy mid-project.", tip: "Show adaptability, data-driven decision making, and clear communication of the change." },
  { id: 30, category: "Conflict Resolution", difficulty: "Hard", question: "Tell me about a time you turned a tense client relationship into a positive one.", tip: "Show empathy, ownership, and the steps you took to rebuild trust." },
  { id: 31, category: "Innovation", difficulty: "Hard", question: "Describe a time you built something from scratch with no playbook to follow.", tip: "Highlight resourcefulness, learning speed, and how you iterated to success." },
  { id: 32, category: "Strategic Thinking", difficulty: "Hard", question: "Tell me about a time you used data to influence a major business decision.", tip: "Walk through the data you gathered, your analysis, and the outcome." },
  { id: 33, category: "Innovation", difficulty: "Easy", question: "Give an example of when you automated a repetitive task to save your team time.", tip: "Quantify the time saved and explain the solution you built." },
  { id: 34, category: "Strategic Thinking", difficulty: "Medium", question: "Describe a time you said no to a good idea because it didn't align with the bigger picture.", tip: "Show strategic prioritization and how you communicated the decision." },
];

export const categories = [...new Set(questions.map((q) => q.category))];
