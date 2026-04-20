import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ theme, isStatic, content }: { theme?: string, isStatic?: boolean, content?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultLinks = [
    { id: 'hero', name: "Home", href: "#home" },
    { id: 'services', name: "Services", href: "#services" },
    { id: 'stats', name: "Stats", href: "#stats" },
    { id: 'about', name: "About", href: "#about" },
    { id: 'portfolio', name: "Portfolio", href: "#portfolio" },
    { id: 'team', name: "Team", href: "#team" },
    { id: 'testimonials', name: "Testimonials", href: "#testimonials" },
    { id: 'faq', name: "FAQ", href: "#faq" },
    { id: 'contact', name: "Contact", href: "#contact" },
  ];

  const sectionOrder = content?.sectionOrder || defaultLinks.map(l => l.id);
  
  const navLinks = sectionOrder
    .map(id => defaultLinks.find(link => link.id === id))
    .filter(link => {
      if (!link) return false;
      const configKey = link.id === 'hero' || link.id === 'about' || link.id === 'contact' ? link.id : `${link.id}Config`;
      return content?.[configKey]?.visible !== false;
    }) as { id: string, name: string, href: string }[];

  const isBrutalist = theme === 'brutalist';
  const isMinimal = theme === 'minimal';

  return (
    <nav className={`${isStatic ? 'absolute' : 'fixed'} w-full z-50 bg-[var(--bg-main)]/80 backdrop-blur-md ${isBrutalist ? 'border-b-4 border-black' : isMinimal ? 'border-b border-brand-primary/5' : 'border-b border-brand-primary/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between h-20 items-center ${isMinimal ? 'justify-center' : ''}`}>
          <div className={`flex-shrink-0 flex items-center ${isMinimal ? 'hidden' : ''}`}>
            <span className={`text-2xl font-serif font-bold tracking-tighter text-brand-primary ${isBrutalist ? 'uppercase italic' : ''}`}>
              STRATOS<span className="opacity-40">.</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className={`flex items-baseline ${isMinimal ? 'space-x-12' : 'ml-10 space-x-8'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors ${isBrutalist ? 'uppercase font-black' : ''}`}
                >
                  {link.name}
                </a>
              ))}
              {!isMinimal && (
                <a 
                  href="#contact"
                  className={`bg-brand-primary text-[var(--bg-main)] px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-all ${isBrutalist ? 'rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'rounded-full'}`}
                >
                  Get Started
                </a>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--bg-main)] border-b border-brand-primary/10 max-h-[70vh] overflow-y-auto overflow-x-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-brand-secondary hover:text-brand-primary hover:bg-brand-primary/5 break-words"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
