import profile from "../../content/profile.json";
import nav from "../../content/nav.json";
import terminal from "../../content/terminal.json";
import experience from "../../content/experience.json";
import projects from "../../content/projects.json";
import articles from "../../content/articles.json";
import certificates from "../../content/certificates.json";
import sections from "../../content/sections.json";
import stack from "../../content/stack.json";

export type Profile = {
  name: string;
  domain: string;
  role: string;
  headline: string;
  emphasis: string;
  statement: string;
  status: string;
  timezone: string;
  email: string;
  location: string;
  links: {
    linkedin: string;
    github: string;
    leetcode: string;
    medium: string;
  };
  resume: string;
  portrait: string;
  colophon: string;
};

export type NavItem = { id: string; label: string };

export type Fact = { label: string; value: string; note?: string };

export type TerminalCommand = {
  input: string;
  output?: string;
  checks?: Fact[];
};

export type Terminal = {
  title: string;
  size: string;
  label: string;
  commands: TerminalCommand[];
};

export type Change = { text: string; metric: string };

export type Commit = {
  hash: string;
  period: string;
  title: string;
  changes: Change[];
  ref?: string;
  branch?: string;
  award?: string;
  org?: string;
  summary?: string;
  diff?: string;
};

export type CachePanel = {
  kind: "cache";
  caption: string;
  status: string;
  bars: { label: string; value: string; share: number; highlight?: boolean }[];
  facts: Fact[];
};

export type WeekPanel = {
  kind: "week";
  caption: string;
  tag: string;
  max: number;
  days: { day: string; execution: number; preparation: number }[];
  legend: { execution: string; preparation: string };
  report: { title: string; body: string };
  facts: Fact[];
};

export type JobTone = "queued" | "running" | "done" | "rejected" | "idle";

export type QueuePanel = {
  kind: "queue";
  caption: string;
  tag: string;
  lanes: { title: string; jobs: { id: string; state: string; tone: JobTone }[] }[];
};

export type Panel = CachePanel | WeekPanel | QueuePanel;

export type Project = {
  slug: string;
  title: string;
  path: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string; primary?: boolean }[];
  panel: Panel;
};

export type Article = {
  title: string;
  publication: string;
  date: string;
  url: string;
};

export type Certificate = {
  title: string;
  detail: string;
  issuer: string;
  date: string;
};

export type StackGroup = { group: string; items: string[] };

export type SectionCopy = {
  title: string;
  lead?: string;
  path?: string;
  action?: string;
};

export type SectionName = keyof typeof sections;

export function getProfile(): Profile {
  return profile;
}

export function getNav(): NavItem[] {
  return nav;
}

export function getTerminal(): Terminal {
  return terminal;
}

export function getExperience(): Commit[] {
  return experience;
}

export function getProjects(): Project[] {
  return projects as Project[];
}

export function getArticles(): Article[] {
  return articles;
}

export function getCertificates(): Certificate[] {
  return certificates;
}

export function getStack(): StackGroup[] {
  return stack;
}

export function getSection(name: SectionName): SectionCopy {
  return sections[name];
}
