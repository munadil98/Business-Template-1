import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "Stratos transformed our approach to global logistics. Their strategic insights were instrumental in our 40% growth last year.",
    author: "James Wilson",
    role: "CEO, Global Freight Solutions",
  },
  {
    content: "The level of expertise and dedication the team brings is unmatched. They don't just consult; they partner for success.",
    author: "Linda Park",
    role: "COO, TechStream Systems",
  },
  {
    content: "Working with Stratos was a turning point for our digital transformation journey. Highly professional and results-oriented.",
    author: "Robert Miller",
    role: "Director, Innovate Corp",
  },
];

export default function Testimonials({ content, theme, config }: { content?: any[], theme?: string, config?: any }) {
  const displayTestimonials = content || [
    // ... (keep existing default testimonials)
    {
      content: "Stratos transformed our approach to global logistics. Their strategic insights were instrumental in our 40% growth last year.",
      author: "James Wilson",
      role: "CEO, Global Freight Solutions",
    },
    {
      content: "The level of expertise and dedication the team brings is unmatched. They don't just consult; they partner for success.",
      author: "Linda Park",
      role: "COO, TechStream Systems",
    },
    {
      content: "Working with Stratos was a turning point for our digital transformation journey. Highly professional and results-oriented.",
      author: "Robert Miller",
      role: "Director, Innovate Corp",
    },
  ];

  const isEditorial = theme === 'editorial';
  const isMinimal = theme === 'minimal';

  return (
    <section 
      className={`py-24 ${isMinimal ? 'bg-[var(--bg-main)] text-brand-primary' : 'bg-brand-primary text-[var(--bg-main)]'} overflow-hidden relative`}
      style={config?.bgColor ? { backgroundColor: config.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-20 ${isEditorial ? 'text-center max-w-4xl mx-auto' : isMinimal ? 'text-left' : 'text-center'}`}>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Testimonials</h2>
          <p className={`text-4xl md:text-5xl font-serif font-bold ${isEditorial ? 'md:text-7xl leading-tight' : ''}`}>
            Voices of <span className="italic opacity-40">Success</span>
          </p>
        </div>

        <div className={`grid gap-12 ${isEditorial ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${
                isEditorial 
                  ? 'text-center p-0 bg-transparent border-0' 
                  : isMinimal 
                    ? 'p-0 bg-transparent border-0' 
                    : 'p-10 rounded-3xl bg-[var(--bg-main)]/5 border border-[var(--bg-main)]/10 backdrop-blur-sm'
              }`}
            >
              {!isMinimal && <Quote className="opacity-40 mb-8 mx-auto lg:mx-0" size={isEditorial ? 64 : 40} />}
              <div className={`leading-relaxed mb-8 italic rich-text break-words ${isEditorial ? 'text-2xl sm:text-3xl md:text-4xl font-serif' : 'text-lg sm:text-xl font-light'}`}>
                <span dangerouslySetInnerHTML={{ __html: testimonial.content }} />
              </div>
              <div className={isEditorial ? 'flex flex-col items-center' : ''}>
                <p className="font-bold text-lg">
                  <span dangerouslySetInnerHTML={{ __html: testimonial.author }} />
                </p>
                <p className="opacity-40 text-sm uppercase tracking-widest font-medium">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Elements */}
      {!isMinimal && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none hidden lg:block">
          <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-slate-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-slate-800/30 rounded-full blur-3xl"></div>
        </div>
      )}
    </section>
  );
}
