export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 sm:px-12">
      <p className="font-mono text-[11px] tracking-[0.08em] text-ink-muted uppercase text-center">
        &copy; {new Date().getFullYear()} Scott Wang
      </p>
    </footer>
  );
}
