export type QuestionCategory =
  | "Getting to Know You"
  | "Memories"
  | "Future Together"
  | "Love & Appreciation"
  | "Just for Fun"
  | "Deep Conversations";

export type QuestionDefinition = {
  id: string;
  category: QuestionCategory;
  text: string;
};

export const questionBank: QuestionDefinition[] = [
  { id: "know-01", category: "Getting to Know You", text: "What is something small that can instantly make an ordinary day better for you?" },
  { id: "know-02", category: "Getting to Know You", text: "When do you feel most like yourself?" },
  { id: "know-03", category: "Getting to Know You", text: "What is one thing you wish people understood about you without having to explain it?" },
  { id: "know-04", category: "Getting to Know You", text: "What does a genuinely restful day look like to you?" },
  { id: "memory-01", category: "Memories", text: "Which little moment together do you find yourself replaying in your head?" },
  { id: "memory-02", category: "Memories", text: "What is a childhood memory that still makes you smile?" },
  { id: "memory-03", category: "Memories", text: "When did you last feel completely carefree?" },
  { id: "memory-04", category: "Memories", text: "What is one ordinary day with us that you would happily relive?" },
  { id: "future-01", category: "Future Together", text: "What is one simple tradition you would love for us to build together?" },
  { id: "future-02", category: "Future Together", text: "If we had an entirely free weekend together, how would you want to spend it?" },
  { id: "future-03", category: "Future Together", text: "What is a place you would love to discover with me someday?" },
  { id: "future-04", category: "Future Together", text: "What does a happy, ordinary life together look like in your imagination?" },
  { id: "love-01", category: "Love & Appreciation", text: "What is one thing I do that makes you feel cared for?" },
  { id: "love-02", category: "Love & Appreciation", text: "When have you felt especially understood by me?" },
  { id: "love-03", category: "Love & Appreciation", text: "What is something about us that you are quietly proud of?" },
  { id: "love-04", category: "Love & Appreciation", text: "What kind of affection means the most to you on a difficult day?" },
  { id: "fun-01", category: "Just for Fun", text: "If we opened a tiny café together, what would we call it?" },
  { id: "fun-02", category: "Just for Fun", text: "Which fictional world would you want us to visit for one day?" },
  { id: "fun-03", category: "Just for Fun", text: "What silly little competition do you think you could definitely beat me at?" },
  { id: "fun-04", category: "Just for Fun", text: "If our relationship had a theme song today, what would it be?" },
  { id: "deep-01", category: "Deep Conversations", text: "What has been taking up the most space in your mind lately?" },
  { id: "deep-02", category: "Deep Conversations", text: "What helps you feel safe enough to be completely honest?" },
  { id: "deep-03", category: "Deep Conversations", text: "What is something you are still learning to be gentle with yourself about?" },
  { id: "deep-04", category: "Deep Conversations", text: "When life feels overwhelming, what kind of support feels right to you?" },
];
