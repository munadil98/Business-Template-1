import { motion } from "motion/react";

export default function About({ content, theme }: { content?: any, theme?: string }) {
  const title = content?.title || "A Legacy of Innovation and Trust.";
  const description = content?.description || "Founded on the principles of integrity and excellence, Stratos has grown from a boutique firm into a global leader in strategic consulting. We believe that the best solutions come from a deep understanding of our clients' unique challenges and aspirations.";

  const isTechnical = theme === 'technical';
  const isBrutalist = theme === 'brutalist';
  const isOrganic = theme === 'organic';

  return (
    <section 
      id="about" 
      className={`py-24 bg-[var(--bg-main)] overflow-hidden ${isBrutalist ? 'border-b-4 border-black' : ''}`}
      style={content?.bgColor ? { backgroundColor: content.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${isOrganic ? 'flex flex-col-reverse lg:grid' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`aspect-[4/3] overflow-hidden shadow-2xl ${isBrutalist ? 'rounded-none border-4 border-black' : 'rounded-3xl'}`}>
              <img
                src={content?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"}
                alt="Our Team"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {!isTechnical && !isBrutalist && (
              <div className="absolute -bottom-6 -right-6 w-48 h-48 md:w-64 md:h-64 bg-brand-primary rounded-3xl p-6 md:p-8 text-[var(--bg-main)] hidden lg:block shadow-2xl z-20">
                <p className="text-4xl md:text-5xl font-serif font-bold mb-2">15+</p>
                <p className="text-xs md:text-sm font-medium opacity-80 uppercase tracking-widest leading-tight">
                  Years of Excellence in Global Consulting
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-0"
          >
            <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Who We Are</h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8 leading-tight break-words ${isTechnical ? 'font-mono' : ''}`}>
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
            <div className="text-base sm:text-lg text-brand-secondary mb-8 leading-relaxed break-words rich-text">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className={`space-y-6 ${isTechnical ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
              {[
                "Client-centric approach to every project",
                "Global network of industry experts",
                "Commitment to sustainable growth",
                "Data-driven strategic insights"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 ${isBrutalist ? 'border-2 border-black rounded-none' : 'rounded-full bg-brand-primary/10'}`}>
                    <div className={`w-2 h-2 ${isBrutalist ? 'bg-black' : 'rounded-full bg-brand-primary'}`}></div>
                  </div>
                  <span className={`text-brand-primary font-medium ${isTechnical ? 'text-sm' : ''}`}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
