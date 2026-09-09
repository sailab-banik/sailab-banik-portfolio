import { getStack } from "@/lib/content";

export function Toolkit() {
  const groups = getStack();

  return (
    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map(({ group, items }) => (
        <div key={group}>
          <dt className="text-meta text-slate">{group}</dt>
          <dd className="mt-3">
            <ul className="text-ui text-ink">
              {items.map((item) => (
                <li key={item} className="mt-1.5 first:mt-0">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
