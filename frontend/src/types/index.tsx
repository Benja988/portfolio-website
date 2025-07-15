// export interface Project {
//   _id: string;
//   title: string;
//   description: string;
//   techStack: string[];
//   image: string;
//   githubUrl?: string;
//   liveUrl?: string;
//   createdAt: string;
// }

// export interface Skill {
//   _id: string;
//   name: string;
//   category: string;
//   proficiency?: number;
//   createdAt: string;
// }

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string[] | string;
  githubUrl: string;
  liveUrl: string;
  image: File | null;
}

export interface SkillFormData {
  name: string;
  category: string;
  proficiency: string;
}