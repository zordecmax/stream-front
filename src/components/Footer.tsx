'use client';

export default function Footer() {
  return (
    <footer className="text-secondary">
      <div className="px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm">© {new Date().getFullYear()} HYPE. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
