import { motion } from "motion/react";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Team({ content }: { content?: any[] }) {
  const displayTeam = content || [
    {
      name: "Alexander Vance",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Elena Rodriguez",
      role: "Managing Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Marcus Chen",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sarah Jenkins",
      role: "Director of Innovation",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Leadership</h2>
          <p className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
            Meet the <span className="italic">Visionaries</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <img
                  src={member.image || "https://picsum.photos/seed/member/400/533"}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white text-brand-primary flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <Linkedin size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-brand-primary flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <Twitter size={18} />
                  </button>
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-primary mb-1">{member.name}</h4>
              <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
