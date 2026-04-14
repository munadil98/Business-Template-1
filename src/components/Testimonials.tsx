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

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-brand-primary text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Testimonials</h2>
          <p className="text-4xl md:text-5xl font-serif font-bold">
            Voices of <span className="italic text-slate-400">Success</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Quote className="text-slate-400 mb-8" size={40} />
              <p className="text-xl leading-relaxed mb-8 font-light italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-bold text-lg">{testimonial.author}</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-slate-800/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-slate-800/30 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
