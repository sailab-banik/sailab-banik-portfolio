import profile from "../../content/profile.json";
import projects from "../../content/projects.json";

export type Profile = {
  name: string;
  role: string;
  statement: string;
  email: string;
  location: string;
  about: string;
  links: {
    linkedin: string;
    github: string;
    leetcode: string;
    medium: string;
  };
  resume: string;
  portrait: string;
};

export type Project = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  stack: string[];
  outcomes: string[];
  repo?: string;
  live?: string;
};

export function getProfile(): Profile {
  return profile;
}

export function getProjects(): Project[] {
  return projects;
}
