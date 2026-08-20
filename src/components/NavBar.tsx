"use client";

import Image from "next/image";
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
        <a href="#top" onClick={(e) => handleClick(e, "#top")}>
          <Image
            src="/logo.png"
            alt="Scott Wang"
            width={256}
            height={256}
            priority
            className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
          />
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
