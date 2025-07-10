export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string;
  image: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}