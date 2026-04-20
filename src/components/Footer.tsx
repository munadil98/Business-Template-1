export default function Footer({ theme }: { theme?: string }) {
  const isMinimal = theme === 'minimal';
  const isBrutalist = theme === 'brutalist';

  return (
    <footer className={`bg-[var(--bg-main)] ${isBrutalist ? 'border-t-4 border-black' : 'border-t border-brand-primary/10'} pt-20 pb-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isMinimal && (
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <span className={`text-2xl font-serif font-bold tracking-tighter text-brand-primary ${isBrutalist ? 'uppercase italic' : ''}`}>
                STRATOS<span className="opacity-40">.</span>
              </span>
              <p className="mt-6 text-brand-secondary leading-relaxed">
                Empowering global enterprises through strategic innovation and excellence since 2010.
              </p>
            </div>
            
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-widest text-brand-primary mb-6 ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Company</h4>
              <ul className="space-y-4">
                <li><a href="#about" className="text-brand-secondary hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="#team" className="text-brand-secondary hover:text-brand-primary transition-colors">Our Team</a></li>
                <li><a href="#contact" className="text-brand-secondary hover:text-brand-primary transition-colors">Careers</a></li>
                <li><a href="#home" className="text-brand-secondary hover:text-brand-primary transition-colors">News</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-bold uppercase tracking-widest text-brand-primary mb-6 ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Services</h4>
              <ul className="space-y-4">
                {["Consulting", "Digital", "Strategy", "Analytics"].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-brand-secondary hover:text-brand-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-bold uppercase tracking-widest text-brand-primary mb-6 ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Legal</h4>
              <ul className="space-y-4">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className={`pt-10 border-t border-brand-primary/5 flex flex-col items-center gap-6 ${isMinimal ? '' : 'md:flex-row md:justify-between'}`}>
          {isMinimal && (
            <span className="text-xl font-serif font-bold tracking-tighter text-brand-primary">
              STRATOS<span className="opacity-40">.</span>
            </span>
          )}
          <p className="text-brand-secondary/60 text-sm">
            © 2026 Stratos Consulting Group. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["LinkedIn", "Twitter", "Instagram"].map((social) => (
              <a key={social} href="#" className={`text-brand-secondary/60 hover:text-brand-primary text-sm font-medium transition-colors ${isBrutalist ? 'uppercase font-bold' : ''}`}>
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
