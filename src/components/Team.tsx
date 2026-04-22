import { motion } from "motion/react";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Team({ content, theme, config }: { content?: any[], theme?: string, config?: any }) {
  const displayTeam = content || [
    // ... (keep existing default team)
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

  const isTechnical = theme === 'technical';
  const isBrutalist = theme === 'brutalist';

  return (
    <section 
      className={`py-24 bg-[var(--bg-main)] ${isBrutalist ? 'border-b-4 border-black' : ''}`}
      style={config?.bgColor ? { backgroundColor: config.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 md:mb-20 ${isTechnical ? 'text-left border-l-4 border-brand-primary pl-8' : ''}`}>
          <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Leadership</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary break-words">
            Meet the <span className="italic">Visionaries</span>
          </p>
        </div>

        <div className={`grid gap-6 md:gap-8 ${isTechnical ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
          {displayTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group ${isTechnical ? 'flex flex-row items-center gap-4 sm:gap-8 border-b border-brand-primary/5 pb-8' : 'flex flex-col'}`}
            >
              <div className={`relative overflow-hidden mb-4 sm:mb-6 flex-shrink-0 ${isTechnical ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-0' : 'aspect-[3/4] rounded-2xl'} ${isBrutalist ? 'rounded-none border-4 border-black' : ''}`}>
                <img
                  src={member.image || "https://picsum.photos/seed/member/400/533"}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${isTechnical ? '' : 'grayscale group-hover:grayscale-0'}`}
                  referrerPolicy="no-referrer"
                />
                {!isTechnical && (
                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-[var(--bg-main)] text-brand-primary flex items-center justify-center hover:opacity-90 transition-colors">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[var(--bg-main)] text-brand-primary flex items-center justify-center hover:opacity-90 transition-colors">
                      <Twitter size={18} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h4 className={`text-xl font-bold text-brand-primary mb-1 ${isBrutalist ? 'uppercase' : ''}`}>
                  <span dangerouslySetInnerHTML={{ __html: member.name }} />
                </h4>
                <p className="text-brand-secondary font-medium text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
