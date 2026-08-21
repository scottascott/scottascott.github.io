"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setOpen(false);
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

        <div className="hidden items-center gap-6 sm:flex">
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
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase transition-colors hover:border-cyan hover:text-cyan"
          >
            Resume ↓
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={`h-px w-5 bg-ink-soft transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink-soft transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-5 bg-ink-soft transition-transform duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-md sm:hidden">
          <ul className="flex flex-col px-6 py-2 font-mono text-[13px] tracking-[0.16em] text-ink-muted uppercase">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block py-3 transition-colors hover:text-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-6 py-4">
            <a
              href={profile.resumeUrl}
              download
              className="block rounded-full border border-line-strong px-4 py-2.5 text-center font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase transition-colors hover:border-cyan hover:text-cyan"
            >
              Resume ↓
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
