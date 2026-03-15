import reactThumb from "@/assets/react-thumb.jpg";
import jsThumb from "@/assets/js-thumb.jpg";
import nodejsThumb from "@/assets/nodejs-thumb.jpg";
import pythonThumb from "@/assets/python-thumb.jpg";
import gitThumb from "@/assets/git-thumb.jpg";
import communicationThumb from "@/assets/communication-thumb.jpg";
import speakingThumb from "@/assets/speaking-thumb.jpg";
import timemgmtThumb from "@/assets/timemgmt-thumb.jpg";
import leadershipThumb from "@/assets/leadership-thumb.jpg";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoLink: string;
  category: "tech" | "nontech";
}

export const techVideos: Video[] = [
  { id: "t1", title: "React Fundamentals", description: "Learn the building blocks of React including components, props, and state management.", thumbnail: reactThumb, videoLink: "https://youtube.com", category: "tech" },
  { id: "t2", title: "JavaScript ES6+", description: "Master modern JavaScript features like arrow functions, destructuring, and async/await.", thumbnail: jsThumb, videoLink: "https://youtube.com", category: "tech" },
  { id: "t3", title: "Node.js Basics", description: "Build server-side applications with Node.js and understand the event loop.", thumbnail: nodejsThumb, videoLink: "https://youtube.com", category: "tech" },
  { id: "t4", title: "Python for Beginners", description: "Start your programming journey with Python's clean and readable syntax.", thumbnail: pythonThumb, videoLink: "https://youtube.com", category: "tech" },
  { id: "t5", title: "Git & Version Control", description: "Learn Git workflows, branching strategies, and collaboration techniques.", thumbnail: gitThumb, videoLink: "https://youtube.com", category: "tech" },
];

export const nonTechVideos: Video[] = [
  { id: "n1", title: "Communication Skills", description: "Develop effective verbal and written communication for professional settings.", thumbnail: communicationThumb, videoLink: "https://youtube.com", category: "nontech" },
  { id: "n2", title: "Public Speaking", description: "Overcome stage fright and deliver compelling presentations with confidence.", thumbnail: speakingThumb, videoLink: "https://youtube.com", category: "nontech" },
  { id: "n3", title: "Time Management", description: "Master productivity techniques to make the most of every day.", thumbnail: timemgmtThumb, videoLink: "https://youtube.com", category: "nontech" },
  { id: "n4", title: "Leadership", description: "Build leadership skills that inspire teams and drive results.", thumbnail: leadershipThumb, videoLink: "https://youtube.com", category: "nontech" },
];

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: "tech" | "nontech";
}

export const techResources: Resource[] = [
  { id: "r1", title: "MDN Web Docs", description: "Comprehensive documentation for web technologies.", link: "https://developer.mozilla.org", category: "tech" },
  { id: "r2", title: "freeCodeCamp", description: "Learn to code with free interactive lessons.", link: "https://freecodecamp.org", category: "tech" },
  { id: "r3", title: "The Odin Project", description: "Full-stack curriculum with hands-on projects.", link: "https://theodinproject.com", category: "tech" },
  { id: "r4", title: "LeetCode", description: "Practice coding problems for technical interviews.", link: "https://leetcode.com", category: "tech" },
];

export const nonTechResources: Resource[] = [
  { id: "r5", title: "Coursera Soft Skills", description: "University-level courses on communication and leadership.", link: "https://coursera.org", category: "nontech" },
  { id: "r6", title: "TED Talks", description: "Inspiring talks on ideas worth spreading.", link: "https://ted.com", category: "nontech" },
  { id: "r7", title: "Toastmasters", description: "Build public speaking and leadership skills.", link: "https://toastmasters.org", category: "nontech" },
];
