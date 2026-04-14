export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-serif font-bold tracking-tighter text-brand-primary">
              STRATOS<span className="text-slate-400">.</span>
            </span>
            <p className="mt-6 text-slate-500 leading-relaxed">
              Empowering global enterprises through strategic innovation and excellence since 2010.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Our Team", "Careers", "News"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Services</h4>
            <ul className="space-y-4">
              {["Consulting", "Digital", "Strategy", "Analytics"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-6">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-brand-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © 2026 Stratos Consulting Group. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["LinkedIn", "Twitter", "Instagram"].map((social) => (
              <a key={social} href="#" className="text-slate-400 hover:text-brand-primary text-sm font-medium transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
