import type { Profile } from "@/lib/content";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MediumIcon } from "@/components/icons";

type Social = {
  key: keyof Profile["links"];
  label: string;
  Icon: typeof LinkedInIcon;
};

const socials: Social[] = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "github", label: "GitHub", Icon: GitHubIcon },
  { key: "leetcode", label: "LeetCode", Icon: LeetCodeIcon },
  { key: "medium", label: "Medium", Icon: MediumIcon },
];

type Props = {
  links: Profile["links"];
  compact?: boolean;
};

export function SocialLinks({ links, compact = false }: Props) {
  return (
    <ul className="flex items-center gap-1">
      {socials.map(({ key, label, Icon }, index) => (
        <li
          key={key}
          className={compact && index > 1 ? "hidden sm:block" : undefined}
        >
          <a
            href={links[key]}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={`grid h-9 w-9 place-items-center transition-colors ${
              key === "linkedin" ? "text-signal hover:text-ink" : "text-slate hover:text-ink"
            }`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
