import { motion } from "motion/react";

export default function About({ content }: { content?: any }) {
  const title = content?.title || "A Legacy of Innovation and Trust.";
  const description = content?.description || "Founded on the principles of integrity and excellence, Stratos has grown from a boutique firm into a global leader in strategic consulting. We believe that the best solutions come from a deep understanding of our clients' unique challenges and aspirations.";

  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                alt="Our Team"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary rounded-3xl p-8 text-white hidden md:block shadow-2xl">
              <p className="text-5xl font-serif font-bold mb-2">15+</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest leading-tight">
                Years of Excellence in Global Consulting
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-0"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Who We Are</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8 leading-tight">
              {title.split(' ').map((word: string, i: number) => 
                word.toLowerCase() === 'innovation' ? <span key={i} className="italic">Innovation </span> : word + ' '
              )}
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="space-y-6">
              {[
                "Client-centric approach to every project",
                "Global network of industry experts",
                "Commitment to sustainable growth",
                "Data-driven strategic insights"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
