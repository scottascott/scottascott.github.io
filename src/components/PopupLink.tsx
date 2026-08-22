"use client";

type PopupConfig = {
  maxWidth: number;
  height: number;
};

export default function PopupLink({
  href,
  popup,
  className,
  children,
}: {
  href: string;
  popup?: PopupConfig;
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!popup) return;
    if (window.innerWidth < 640) return;

    event.preventDefault();

    const width = Math.min(window.screen.availWidth, popup.maxWidth);
    const height = popup.height;
    const left = Math.max(0, (window.screen.availWidth - width) / 2);
    const top = Math.max(0, (window.screen.availHeight - height) / 2);

    window.open(
      href,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`,
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
