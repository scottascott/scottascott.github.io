"use client";

import { useLenis } from "lenis/react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const lenis = useLenis();

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(href, { offset: -90 });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 sm:px-12">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          className="font-serif text-lg font-semibold text-ink"
        >
          Scott Wang
        </a>
        <ul className="flex gap-6 font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="transition-colors hover:text-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
