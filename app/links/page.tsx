import { SiDiscord, SiGithub, SiX, SiYoutube } from "react-icons/si";

const links = [
  {
    name: "twitter",
    href: "/x",
    Icon: SiX,
  },
  {
    name: "github",
    href: "/github",
    Icon: SiGithub,
  },
  {
    name: "youtube",
    href: "/youtube",
    Icon: SiYoutube,
  },
  {
    name: "discord",
    href: "/discord",
    Icon: SiDiscord,
  },
] as const;

export default function Links() {
  return (
    <main className="relative flex-1 px-8 py-16 sm:px-16 sm:py-24">
      <h1 className="font-pixel text-6xl leading-none lowercase tracking-wide text-foreground sm:text-8xl">
        Links
      </h1>

      <ul className="mt-10 max-w-2xl divide-y divide-border border-y border-border">
        {links.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              className="group flex items-center gap-4 px-1 py-5 text-lg text-foreground/90 transition-colors hover:bg-[#0c50ff] hover:text-[#eeeeee] sm:text-xl"
            >
              <span className="inline-flex items-center gap-3">
                <Icon className="inline-block h-5 w-5 sm:h-6 sm:w-6" />
                {name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
