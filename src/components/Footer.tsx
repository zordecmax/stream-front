'use client';

export default function Footer() {
  return (
    <footer className="text-secondary ml-[var(--sidebar-width-left)] mr-[var(--sidebar-width-right)]">
      <div className="px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm">© {new Date().getFullYear()} HYPE. All rights reserved.</p>
      </div>
    </footer>
  );
}
