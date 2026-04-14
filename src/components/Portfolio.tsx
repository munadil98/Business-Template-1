import { motion } from "motion/react";

const projects = [
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
              Selected <span className="italic">Case Studies</span>
            </h3>
          </div>
          <button className="text-brand-primary font-bold border-b-2 border-brand-primary pb-1 hover:text-slate-600 hover:border-slate-600 transition-all">
            View All Projects
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[16/10]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h4 className="text-2xl font-serif font-bold text-white">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
