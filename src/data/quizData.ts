export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SkillQuiz {
  skillId: string;
  questions: QuizQuestion[];
}

export const quizzes: SkillQuiz[] = [
  {
    skillId: "react",
    questions: [
      { id: "rq1", question: "What hook is used to manage state in a functional component?", options: ["useEffect", "useState", "useContext", "useRef"], correctIndex: 1 },
      { id: "rq2", question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"], correctIndex: 0 },
      { id: "rq3", question: "Which method is used to render a React component to the DOM?", options: ["ReactDOM.render()", "React.mount()", "React.display()", "ReactDOM.create()"], correctIndex: 0 },
      { id: "rq4", question: "What is the virtual DOM?", options: ["A direct copy of the real DOM", "A lightweight JS representation of the DOM", "A browser extension", "A CSS framework"], correctIndex: 1 },
      { id: "rq5", question: "Which hook replaces lifecycle methods in functional components?", options: ["useState", "useRef", "useEffect", "useMemo"], correctIndex: 2 },
    ],
  },
  {
    skillId: "javascript",
    questions: [
      { id: "jq1", question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "function", "define"], correctIndex: 1 },
      { id: "jq2", question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference"], correctIndex: 2 },
      { id: "jq3", question: "What is a closure?", options: ["A CSS property", "A function with access to its outer scope", "A loop structure", "A data type"], correctIndex: 1 },
      { id: "jq4", question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctIndex: 0 },
      { id: "jq5", question: "What does 'async/await' handle?", options: ["Styling", "Asynchronous operations", "DOM manipulation", "Error types"], correctIndex: 1 },
    ],
  },
  {
    skillId: "nodejs",
    questions: [
      { id: "nq1", question: "What is Node.js built on?", options: ["Python engine", "V8 JavaScript engine", "Java Virtual Machine", "Ruby interpreter"], correctIndex: 1 },
      { id: "nq2", question: "Which module is used to create a web server?", options: ["fs", "http", "path", "url"], correctIndex: 1 },
      { id: "nq3", question: "What is npm?", options: ["Node Package Manager", "New Programming Module", "Node Process Monitor", "Network Protocol Manager"], correctIndex: 0 },
      { id: "nq4", question: "Node.js is:", options: ["Multi-threaded", "Single-threaded with event loop", "Only for frontend", "A database"], correctIndex: 1 },
      { id: "nq5", question: "Which framework is commonly used with Node.js?", options: ["Django", "Flask", "Express", "Laravel"], correctIndex: 2 },
    ],
  },
  {
    skillId: "python",
    questions: [
      { id: "pq1", question: "What type of language is Python?", options: ["Compiled", "Interpreted", "Assembly", "Machine"], correctIndex: 1 },
      { id: "pq2", question: "Which keyword is used for function definitions?", options: ["function", "func", "def", "define"], correctIndex: 2 },
      { id: "pq3", question: "What does 'len()' do?", options: ["Calculates length", "Creates a list", "Prints output", "Imports module"], correctIndex: 0 },
      { id: "pq4", question: "Python uses what for code blocks?", options: ["Curly braces", "Indentation", "Parentheses", "Semicolons"], correctIndex: 1 },
      { id: "pq5", question: "Which is a Python data structure?", options: ["Array", "Dictionary", "LinkedList", "Stack"], correctIndex: 1 },
    ],
  },
  {
    skillId: "typescript",
    questions: [
      { id: "tq1", question: "TypeScript is a superset of:", options: ["Java", "Python", "JavaScript", "C++"], correctIndex: 2 },
      { id: "tq2", question: "What keyword defines a type annotation?", options: ["type", "let", "const", ":"], correctIndex: 3 },
      { id: "tq3", question: "What is an 'interface' in TypeScript?", options: ["A class", "A contract for object shape", "A function", "A module"], correctIndex: 1 },
      { id: "tq4", question: "TypeScript compiles to:", options: ["Machine code", "Bytecode", "JavaScript", "WebAssembly"], correctIndex: 2 },
      { id: "tq5", question: "Which utility type makes all properties optional?", options: ["Required", "Partial", "Readonly", "Pick"], correctIndex: 1 },
    ],
  },
  {
    skillId: "communication",
    questions: [
      { id: "cq1", question: "What is active listening?", options: ["Hearing words only", "Fully concentrating and responding thoughtfully", "Interrupting often", "Multitasking while listening"], correctIndex: 1 },
      { id: "cq2", question: "Which is a key element of effective communication?", options: ["Using jargon", "Clarity", "Speaking fast", "Avoiding eye contact"], correctIndex: 1 },
      { id: "cq3", question: "Non-verbal communication includes:", options: ["Emails", "Body language", "Reports", "Memos"], correctIndex: 1 },
    ],
  },
  {
    skillId: "leadership",
    questions: [
      { id: "lq1", question: "What is servant leadership?", options: ["Leading by authority", "Leading by serving others", "Leading by fear", "Leading by competition"], correctIndex: 1 },
      { id: "lq2", question: "A key leadership quality is:", options: ["Micromanaging", "Empathy", "Avoiding decisions", "Working alone"], correctIndex: 1 },
      { id: "lq3", question: "What does delegation mean?", options: ["Doing everything yourself", "Assigning tasks to others", "Ignoring problems", "Avoiding responsibility"], correctIndex: 1 },
    ],
  },
];
