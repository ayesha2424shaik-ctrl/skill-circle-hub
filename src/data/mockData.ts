import reactThumb from "@/assets/react-thumb.jpg";
import jsThumb from "@/assets/js-thumb.jpg";
import nodejsThumb from "@/assets/nodejs-thumb.jpg";
import pythonThumb from "@/assets/python-thumb.jpg";
import gitThumb from "@/assets/git-thumb.jpg";
import htmlCssThumb from "@/assets/html-css-thumb.jpg";
import typescriptThumb from "@/assets/typescript-thumb.jpg";
import sqlThumb from "@/assets/sql-thumb.jpg";
import dockerThumb from "@/assets/docker-thumb.jpg";
import dsaThumb from "@/assets/dsa-thumb.jpg";
import communicationThumb from "@/assets/communication-thumb.jpg";
import speakingThumb from "@/assets/speaking-thumb.jpg";
import timemgmtThumb from "@/assets/timemgmt-thumb.jpg";
import leadershipThumb from "@/assets/leadership-thumb.jpg";
import teamworkThumb from "@/assets/teamwork-thumb.jpg";
import problemSolvingThumb from "@/assets/problem-solving-thumb.jpg";
import criticalThinkingThumb from "@/assets/critical-thinking-thumb.jpg";
import emotionalIntelligenceThumb from "@/assets/emotional-intelligence-thumb.jpg";

export interface Video {
  id: string;
  title: string;
  description: string;
  videoLink: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface CodingPlatform {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Documentation {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "official" | "guide" | "cheatsheet" | "book" | "article";
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: "tech" | "nontech";
  videos: Video[];
  resources: Resource[];
  platforms: CodingPlatform[];
  documentation: Documentation[];
}

export const skills: Skill[] = [
  {
    id: "react",
    title: "React",
    description: "Build modern user interfaces with React's component-based architecture.",
    thumbnail: reactThumb,
    category: "tech",
    videos: [
      { id: "v1", title: "React Fundamentals", description: "Learn components, props, and state management.", videoLink: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
      { id: "v2", title: "React Hooks Deep Dive", description: "Master useState, useEffect, and custom hooks.", videoLink: "https://www.youtube.com/watch?v=TNhaISOUy6Q" },
      { id: "v3", title: "Building a React Project", description: "Create a full project from scratch with React.", videoLink: "https://www.youtube.com/watch?v=b9eMGE7QtTk" },
    ],
    resources: [
      { id: "r1", title: "React Official Docs", description: "Comprehensive React documentation and tutorials.", link: "https://react.dev" },
      { id: "r2", title: "React Patterns", description: "Common design patterns in React applications.", link: "https://reactpatterns.com" },
    ],
    platforms: [
      { id: "p1", name: "CodeSandbox", description: "Online IDE for React projects.", link: "https://codesandbox.io" },
      { id: "p2", name: "StackBlitz", description: "Instant dev environment for React.", link: "https://stackblitz.com" },
    ],
    documentation: [
      { id: "d1", title: "React Official Documentation", description: "Complete guide to React concepts, hooks, and API reference.", link: "https://react.dev/learn", type: "official" },
      { id: "d2", title: "React Cheat Sheet", description: "Quick reference for React hooks, lifecycle, and patterns.", link: "https://devhints.io/react", type: "cheatsheet" },
      { id: "d3", title: "Thinking in React", description: "Step-by-step guide to building UI components the React way.", link: "https://react.dev/learn/thinking-in-react", type: "guide" },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Master the language of the web with modern ES6+ features.",
    thumbnail: jsThumb,
    category: "tech",
    videos: [
      { id: "v4", title: "JavaScript ES6+ Features", description: "Arrow functions, destructuring, async/await and more.", videoLink: "https://www.youtube.com/watch?v=NCwa_xi0Uuc" },
      { id: "v5", title: "JavaScript DOM Manipulation", description: "Learn to interact with the browser DOM.", videoLink: "https://www.youtube.com/watch?v=5fb2aPlgoys" },
      { id: "v6", title: "Async JavaScript", description: "Promises, async/await, and the event loop.", videoLink: "https://www.youtube.com/watch?v=PoRJizFvM7s" },
    ],
    resources: [
      { id: "r3", title: "MDN JavaScript Guide", description: "Comprehensive JS documentation.", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
      { id: "r4", title: "JavaScript.info", description: "Modern JavaScript tutorial.", link: "https://javascript.info" },
    ],
    platforms: [
      { id: "p3", name: "freeCodeCamp", description: "Free interactive JavaScript lessons.", link: "https://freecodecamp.org" },
      { id: "p4", name: "Exercism", description: "Practice JS with mentored exercises.", link: "https://exercism.org/tracks/javascript" },
    ],
    documentation: [
      { id: "d4", title: "MDN JavaScript Reference", description: "Complete JavaScript language reference and Web APIs.", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "official" },
      { id: "d5", title: "You Don't Know JS", description: "Deep dive book series into JavaScript mechanics.", link: "https://github.com/getify/You-Dont-Know-JS", type: "book" },
      { id: "d6", title: "ES6 Features Cheatsheet", description: "Quick overview of all ES6+ features with examples.", link: "https://es6-features.org", type: "cheatsheet" },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "Build server-side applications with JavaScript runtime.",
    thumbnail: nodejsThumb,
    category: "tech",
    videos: [
      { id: "v7", title: "Node.js Crash Course", description: "Build server-side apps and understand the event loop.", videoLink: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
      { id: "v8", title: "REST API with Node.js", description: "Create RESTful APIs using Express.js.", videoLink: "https://www.youtube.com/watch?v=pKd0Rpw7O48" },
    ],
    resources: [
      { id: "r5", title: "Node.js Official Docs", description: "Node.js API reference and guides.", link: "https://nodejs.org/en/docs" },
      { id: "r6", title: "The Odin Project - Node", description: "Full-stack Node.js curriculum.", link: "https://theodinproject.com/paths/full-stack-javascript" },
    ],
    platforms: [
      { id: "p5", name: "Replit", description: "Run Node.js projects in the browser.", link: "https://replit.com" },
      { id: "p6", name: "Glitch", description: "Build and deploy Node.js apps online.", link: "https://glitch.com" },
    ],
    documentation: [
      { id: "d7", title: "Node.js API Docs", description: "Complete Node.js API reference documentation.", link: "https://nodejs.org/docs/latest/api/", type: "official" },
      { id: "d8", title: "Express.js Guide", description: "Getting started guide for Express web framework.", link: "https://expressjs.com/en/guide/routing.html", type: "guide" },
    ],
  },
  {
    id: "python",
    title: "Python",
    description: "Start your programming journey with Python's clean syntax.",
    thumbnail: pythonThumb,
    category: "tech",
    videos: [
      { id: "v9", title: "Python for Beginners", description: "Learn Python basics from scratch.", videoLink: "https://www.youtube.com/watch?v=kqtD5dpn9C8" },
      { id: "v10", title: "Python Projects for Beginners", description: "Build real projects with Python.", videoLink: "https://www.youtube.com/watch?v=8ext9G7xspg" },
    ],
    resources: [
      { id: "r7", title: "Python Official Docs", description: "Python language reference.", link: "https://docs.python.org/3/" },
      { id: "r8", title: "Real Python", description: "Python tutorials and articles.", link: "https://realpython.com" },
    ],
    platforms: [
      { id: "p7", name: "HackerRank - Python", description: "Practice Python coding challenges.", link: "https://hackerrank.com/domains/python" },
      { id: "p8", name: "LeetCode", description: "Solve algorithmic problems in Python.", link: "https://leetcode.com" },
    ],
    documentation: [
      { id: "d9", title: "Python Official Docs", description: "The definitive Python language and library reference.", link: "https://docs.python.org/3/", type: "official" },
      { id: "d10", title: "Automate the Boring Stuff", description: "Free book on practical Python programming.", link: "https://automatetheboringstuff.com", type: "book" },
      { id: "d11", title: "Python Cheatsheet", description: "Comprehensive Python cheatsheet with examples.", link: "https://pythoncheatsheet.org", type: "cheatsheet" },
    ],
  },
  {
    id: "git",
    title: "Git & Version Control",
    description: "Learn Git workflows, branching, and collaboration techniques.",
    thumbnail: gitThumb,
    category: "tech",
    videos: [
      { id: "v11", title: "Git & GitHub Crash Course", description: "Learn Git fundamentals and GitHub workflows.", videoLink: "https://www.youtube.com/watch?v=RGOj5yH7evk" },
      { id: "v12", title: "Advanced Git Techniques", description: "Rebasing, cherry-pick, and advanced merging.", videoLink: "https://www.youtube.com/watch?v=qsTthZi23VE" },
    ],
    resources: [
      { id: "r9", title: "Pro Git Book", description: "Free comprehensive Git book.", link: "https://git-scm.com/book/en/v2" },
      { id: "r10", title: "GitHub Docs", description: "GitHub guides and tutorials.", link: "https://docs.github.com" },
    ],
    platforms: [
      { id: "p9", name: "Learn Git Branching", description: "Interactive Git branching tutorial.", link: "https://learngitbranching.js.org" },
      { id: "p10", name: "GitHub Skills", description: "Learn GitHub with hands-on courses.", link: "https://skills.github.com" },
    ],
    documentation: [
      { id: "d12", title: "Pro Git Book", description: "The entire Pro Git book, free and open source.", link: "https://git-scm.com/book/en/v2", type: "book" },
      { id: "d13", title: "Git Cheat Sheet", description: "Quick reference for everyday Git commands.", link: "https://education.github.com/git-cheat-sheet-education.pdf", type: "cheatsheet" },
    ],
  },
  {
    id: "communication",
    title: "Communication Skills",
    description: "Develop effective verbal and written communication.",
    thumbnail: communicationThumb,
    category: "nontech",
    videos: [
      { id: "v13", title: "Effective Communication", description: "Master professional communication techniques.", videoLink: "https://www.youtube.com/watch?v=HAnw168huqA" },
      { id: "v14", title: "Business Writing Skills", description: "Write clear, professional emails and documents.", videoLink: "https://www.youtube.com/watch?v=so4IlhMqmS8" },
    ],
    resources: [
      { id: "r11", title: "Coursera Communication", description: "University-level communication courses.", link: "https://coursera.org/browse/personal-development/communication" },
      { id: "r12", title: "Grammarly Blog", description: "Writing tips and communication guides.", link: "https://grammarly.com/blog" },
    ],
    platforms: [],
    documentation: [
      { id: "d14", title: "Communication Skills Guide", description: "Harvard guide to effective workplace communication.", link: "https://hbr.org/topic/communication", type: "guide" },
      { id: "d15", title: "Business Writing Handbook", description: "Principles of clear and professional writing.", link: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/", type: "article" },
    ],
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    description: "Overcome stage fright and deliver compelling presentations.",
    thumbnail: speakingThumb,
    category: "nontech",
    videos: [
      { id: "v15", title: "TED's Secret to Great Speaking", description: "Learn what makes TED talks so compelling.", videoLink: "https://www.youtube.com/watch?v=-FOCpMAww28" },
      { id: "v16", title: "Public Speaking Tips", description: "Practical tips to improve your presentations.", videoLink: "https://www.youtube.com/watch?v=tShavGuo0_E" },
    ],
    resources: [
      { id: "r13", title: "Toastmasters", description: "Build public speaking and leadership skills.", link: "https://toastmasters.org" },
      { id: "r14", title: "TED Talks", description: "Watch inspiring talks on ideas worth spreading.", link: "https://ted.com" },
    ],
    platforms: [],
    documentation: [
      { id: "d16", title: "Art of Public Speaking", description: "Classic guide to mastering public speaking.", link: "https://www.toastmasters.org/resources", type: "guide" },
    ],
  },
  {
    id: "time-management",
    title: "Time Management",
    description: "Master productivity techniques to maximize every day.",
    thumbnail: timemgmtThumb,
    category: "nontech",
    videos: [
      { id: "v17", title: "Time Management Masterclass", description: "Learn proven productivity strategies.", videoLink: "https://www.youtube.com/watch?v=iONDebHX9qk" },
      { id: "v18", title: "The Pomodoro Technique", description: "Use time-boxing to boost focus and output.", videoLink: "https://www.youtube.com/watch?v=mNBmG24djoY" },
    ],
    resources: [
      { id: "r15", title: "Todoist Productivity Guide", description: "Practical productivity methods and tips.", link: "https://todoist.com/productivity-methods" },
    ],
    platforms: [],
    documentation: [
      { id: "d17", title: "Getting Things Done", description: "David Allen's productivity methodology explained.", link: "https://gettingthingsdone.com", type: "book" },
      { id: "d18", title: "Pomodoro Technique Guide", description: "Official guide to the Pomodoro time management method.", link: "https://francescocirillo.com/products/the-pomodoro-technique", type: "guide" },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "Build leadership skills that inspire teams and drive results.",
    thumbnail: leadershipThumb,
    category: "nontech",
    videos: [
      { id: "v19", title: "Leadership Skills", description: "Essential leadership qualities for any role.", videoLink: "https://www.youtube.com/watch?v=pYKH2uSax8U" },
      { id: "v20", title: "How Great Leaders Inspire", description: "Simon Sinek's golden circle of leadership.", videoLink: "https://www.youtube.com/watch?v=qp0HIF3SfI4" },
    ],
    resources: [
      { id: "r16", title: "Harvard Business Review", description: "Articles on leadership and management.", link: "https://hbr.org" },
      { id: "r17", title: "MindTools Leadership", description: "Leadership skills and techniques.", link: "https://mindtools.com/leadership" },
    ],
    platforms: [],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Master the building blocks of web design and styling.",
    thumbnail: htmlCssThumb,
    category: "tech",
    videos: [
      { id: "v21", title: "HTML & CSS Full Course", description: "Complete guide to building websites.", videoLink: "https://www.youtube.com/watch?v=mU6anWqZJcc" },
      { id: "v22", title: "CSS Flexbox & Grid", description: "Modern layout techniques for responsive design.", videoLink: "https://www.youtube.com/watch?v=3YW65K6LcIA" },
    ],
    resources: [
      { id: "r18", title: "MDN Web Docs", description: "Complete HTML and CSS reference.", link: "https://developer.mozilla.org/en-US/docs/Web" },
      { id: "r19", title: "CSS Tricks", description: "Tips, tricks, and techniques on CSS.", link: "https://css-tricks.com" },
    ],
    platforms: [
      { id: "p11", name: "CodePen", description: "Online code editor for frontend experiments.", link: "https://codepen.io" },
      { id: "p12", name: "Frontend Mentor", description: "Real-world frontend challenges.", link: "https://frontendmentor.io" },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Add static typing to JavaScript for safer, more scalable code.",
    thumbnail: typescriptThumb,
    category: "tech",
    videos: [
      { id: "v23", title: "TypeScript for Beginners", description: "Learn TypeScript fundamentals from scratch.", videoLink: "https://www.youtube.com/watch?v=d56mG7DezGs" },
      { id: "v24", title: "TypeScript with React", description: "Build type-safe React applications.", videoLink: "https://www.youtube.com/watch?v=TPACABQTHvM" },
    ],
    resources: [
      { id: "r20", title: "TypeScript Official Docs", description: "Official TypeScript documentation.", link: "https://typescriptlang.org/docs" },
      { id: "r21", title: "TypeScript Deep Dive", description: "Free comprehensive TypeScript book.", link: "https://basarat.gitbook.io/typescript" },
    ],
    platforms: [
      { id: "p13", name: "TypeScript Playground", description: "Online TypeScript editor and compiler.", link: "https://typescriptlang.org/play" },
      { id: "p14", name: "Exercism TypeScript", description: "Practice TypeScript with exercises.", link: "https://exercism.org/tracks/typescript" },
    ],
  },
  {
    id: "sql",
    title: "SQL & Databases",
    description: "Learn to work with relational databases and query data.",
    thumbnail: sqlThumb,
    category: "tech",
    videos: [
      { id: "v25", title: "SQL Full Course", description: "Complete SQL tutorial for beginners.", videoLink: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
      { id: "v26", title: "Database Design", description: "Learn to design efficient database schemas.", videoLink: "https://www.youtube.com/watch?v=ztHopE5Wnpc" },
    ],
    resources: [
      { id: "r22", title: "SQL Tutorial", description: "Interactive SQL tutorials.", link: "https://sqlzoo.net" },
      { id: "r23", title: "PostgreSQL Docs", description: "PostgreSQL documentation.", link: "https://postgresql.org/docs" },
    ],
    platforms: [
      { id: "p15", name: "SQLBolt", description: "Interactive SQL lessons.", link: "https://sqlbolt.com" },
      { id: "p16", name: "LeetCode Database", description: "SQL practice problems.", link: "https://leetcode.com/problemset/database" },
    ],
  },
  {
    id: "docker",
    title: "Docker & Containerization",
    description: "Learn to containerize applications for consistent deployment.",
    thumbnail: dockerThumb,
    category: "tech",
    videos: [
      { id: "v27", title: "Docker Tutorial for Beginners", description: "Complete Docker crash course.", videoLink: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
      { id: "v28", title: "Docker Compose", description: "Manage multi-container applications.", videoLink: "https://www.youtube.com/watch?v=SXwC9fSwct8" },
    ],
    resources: [
      { id: "r24", title: "Docker Official Docs", description: "Docker documentation and guides.", link: "https://docs.docker.com" },
      { id: "r25", title: "Docker Hub", description: "Container image registry.", link: "https://hub.docker.com" },
    ],
    platforms: [
      { id: "p17", name: "Play with Docker", description: "Free Docker playground.", link: "https://labs.play-with-docker.com" },
      { id: "p18", name: "Katacoda Docker", description: "Interactive Docker scenarios.", link: "https://katacoda.com/courses/docker" },
    ],
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master fundamental CS concepts for coding interviews.",
    thumbnail: dsaThumb,
    category: "tech",
    videos: [
      { id: "v29", title: "Data Structures Full Course", description: "Complete guide to data structures.", videoLink: "https://www.youtube.com/watch?v=RBSGKlAvoiM" },
      { id: "v30", title: "Algorithm Techniques", description: "Common algorithm patterns and approaches.", videoLink: "https://www.youtube.com/watch?v=8hly31xKli0" },
    ],
    resources: [
      { id: "r26", title: "GeeksforGeeks", description: "DSA tutorials and practice.", link: "https://geeksforgeeks.org" },
      { id: "r27", title: "Algorithm Visualizer", description: "Visualize how algorithms work.", link: "https://algorithm-visualizer.org" },
    ],
    platforms: [
      { id: "p19", name: "LeetCode", description: "Coding interview preparation.", link: "https://leetcode.com" },
      { id: "p20", name: "HackerRank DSA", description: "Data structures and algorithms practice.", link: "https://hackerrank.com/domains/data-structures" },
    ],
  },
  {
    id: "teamwork",
    title: "Teamwork & Collaboration",
    description: "Learn to work effectively in teams and collaborate.",
    thumbnail: teamworkThumb,
    category: "nontech",
    videos: [
      { id: "v31", title: "Teamwork Skills", description: "Essential skills for effective collaboration.", videoLink: "https://www.youtube.com/watch?v=yyw0xeOwVd0" },
      { id: "v32", title: "Remote Team Collaboration", description: "Collaborate effectively in remote settings.", videoLink: "https://www.youtube.com/watch?v=a9TRj8RFy3I" },
    ],
    resources: [
      { id: "r28", title: "Harvard Teamwork Guide", description: "Building and leading effective teams.", link: "https://hbr.org/topic/teams" },
      { id: "r29", title: "Atlassian Team Playbook", description: "Team collaboration best practices.", link: "https://atlassian.com/team-playbook" },
    ],
    platforms: [],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "Develop analytical thinking and creative solutions.",
    thumbnail: problemSolvingThumb,
    category: "nontech",
    videos: [
      { id: "v33", title: "Problem Solving Techniques", description: "Structured approaches to solving problems.", videoLink: "https://www.youtube.com/watch?v=UFdR8w_R1HA" },
      { id: "v34", title: "Creative Problem Solving", description: "Think outside the box for innovative solutions.", videoLink: "https://www.youtube.com/watch?v=9k_jABNk6tc" },
    ],
    resources: [
      { id: "r30", title: "Mind Tools Problem Solving", description: "Problem solving techniques and tools.", link: "https://mindtools.com/problem-solving" },
    ],
    platforms: [],
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking",
    description: "Enhance analytical and logical reasoning abilities.",
    thumbnail: criticalThinkingThumb,
    category: "nontech",
    videos: [
      { id: "v35", title: "Critical Thinking Skills", description: "Develop better reasoning and analysis.", videoLink: "https://www.youtube.com/watch?v=Cum3k-Wglfw" },
      { id: "v36", title: "Logical Reasoning", description: "Improve your logical thinking abilities.", videoLink: "https://www.youtube.com/watch?v=bCqLnNJws5o" },
    ],
    resources: [
      { id: "r31", title: "Critical Thinking Web", description: "Free online critical thinking tutorials.", link: "https://philosophy.hku.hk/think" },
      { id: "r32", title: "Coursera Critical Thinking", description: "University-level critical thinking courses.", link: "https://coursera.org/courses?query=critical%20thinking" },
    ],
    platforms: [],
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence",
    description: "Build self-awareness and empathy for better relationships.",
    thumbnail: emotionalIntelligenceThumb,
    category: "nontech",
    videos: [
      { id: "v37", title: "Emotional Intelligence Explained", description: "Understanding and developing EQ.", videoLink: "https://www.youtube.com/watch?v=Y7m9eNoB3NU" },
      { id: "v38", title: "Building Empathy", description: "Develop empathy and emotional awareness.", videoLink: "https://www.youtube.com/watch?v=1Evwgu369Jw" },
    ],
    resources: [
      { id: "r33", title: "Psychology Today EQ", description: "Articles on emotional intelligence.", link: "https://psychologytoday.com/basics/emotional-intelligence" },
      { id: "r34", title: "Greater Good Magazine", description: "Science-based insights on well-being and EQ.", link: "https://greatergood.berkeley.edu" },
    ],
    platforms: [],
  },
];

export const techSkills = skills.filter(s => s.category === "tech");
export const nonTechSkills = skills.filter(s => s.category === "nontech");
