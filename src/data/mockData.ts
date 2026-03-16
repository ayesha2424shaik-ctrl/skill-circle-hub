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

export interface Skill {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: "tech" | "nontech";
  videos: Video[];
  resources: Resource[];
  platforms: CodingPlatform[];
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
];

export const techSkills = skills.filter(s => s.category === "tech");
export const nonTechSkills = skills.filter(s => s.category === "nontech");
