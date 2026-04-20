import { motion } from "motion/react";

export default function Portfolio({ content, theme, config }: { content?: any[], theme?: string, config?: any }) {
  const displayProjects = content || [
    // ... (keep existing default projects)
    {
      title: "Global Logistics Hub",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "FinTech Revolution",
      category: "Financial Services",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Sustainable Energy Grid",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Smart City Initiative",
      category: "Public Sector",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const isTechnical = theme === 'technical';
  const isBrutalist = theme === 'brutalist';
  const isOrganic = theme === 'organic';

  return (
    <section 
      id="portfolio" 
      className={`py-24 bg-[var(--bg-main)] ${isBrutalist ? 'border-b-4 border-black' : ''}`}
      style={config?.bgColor ? { backgroundColor: config.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${isTechnical ? 'border-l-4 border-brand-primary pl-8' : ''}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Our Work</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary break-words">
              Selected <span className="italic">Case Studies</span>
            </h3>
          </div>
          <button className={`w-fit text-brand-primary font-bold border-b-2 border-brand-primary pb-1 hover:opacity-60 transition-all ${isBrutalist ? 'border-4 border-black px-4 py-2 rounded-none' : ''}`}>
            View All Projects
          </button>
        </div>

        <div className={`grid gap-8 ${isOrganic ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {displayProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden ${isBrutalist ? 'rounded-none border-4 border-black' : 'rounded-3xl'} ${isOrganic && index % 3 === 1 ? 'lg:translate-y-12' : ''} aspect-[16/10]`}
            >
              <img
                src={project.image || "https://picsum.photos/seed/project/800/500"}
                alt={project.title}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isTechnical ? 'grayscale hover:grayscale-0' : ''}`}
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 ${isBrutalist ? 'bg-brand-primary/80 mix-blend-multiply' : ''}`}>
                <p className="text-[var(--bg-main)]/60 text-sm font-bold uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h4 className={`text-2xl font-serif font-bold text-[var(--bg-main)] ${isBrutalist ? 'uppercase' : ''}`}>
                  <span dangerouslySetInnerHTML={{ __html: project.title }} />
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
