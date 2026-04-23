import { Instagram, Twitter, Youtube } from "lucide-react";
import { WicketMark } from "./WicketMark";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <WicketMark className="w-7 h-7 text-gold" />
            <span className="font-serif text-2xl font-semibold">
              Middle <span className="text-gold">Off</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            The game within the game. Premium cricket analysis, data, and stories — built for fans who see beyond the scoreboard.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Sections</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="#featured" className="hover:text-foreground">Analysis</a></li>
            <li><a href="#categories" className="hover:text-foreground">Categories</a></li>
            <li><a href="#signature" className="hover:text-foreground">Signature</a></li>
            <li><a href="#about" className="hover:text-foreground">About</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Cricket</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">IPL</a></li>
            <li><a href="#" className="hover:text-foreground">Tests</a></li>
            <li><a href="#" className="hover:text-foreground">ODIs</a></li>
            <li><a href="#" className="hover:text-foreground">T20Is</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Middle Off. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 60 12" className="w-12 h-3 text-pitch-glow"><line x1="0" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" /><circle cx="30" cy="6" r="2" fill="currentColor" /></svg>
            <span>22 yards apart.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
