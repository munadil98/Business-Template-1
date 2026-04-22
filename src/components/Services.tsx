import { motion } from "motion/react";
import { Briefcase, BarChart3, Globe, Zap, Shield, Users } from "lucide-react";

const iconMap: any = {
  Briefcase, BarChart3, Globe, Zap, Shield, Users
};

export default function Services({ content, theme, config }: { content?: any[], theme?: string, config?: any }) {
  const displayServices = content || [
    // ... (keep existing default services)
    {
      title: "Strategic Consulting",
      description: "Deep market analysis and strategic planning to navigate complex business landscapes.",
      icon: "Briefcase",
    },
    {
      title: "Digital Transformation",
      description: "Modernizing your infrastructure and workflows with cutting-edge technology solutions.",
      icon: "Zap",
    },
    {
      title: "Market Expansion",
      description: "Identifying and capturing new opportunities across global markets and demographics.",
      icon: "Globe",
    },
    {
      title: "Data Analytics",
      description: "Turning raw data into actionable insights to drive informed decision-making.",
      icon: "BarChart3",
    },
    {
      title: "Risk Management",
      description: "Comprehensive security and risk assessment to protect your assets and reputation.",
      icon: "Shield",
    },
    {
      title: "Human Capital",
      description: "Building and nurturing elite teams that drive innovation and organizational growth.",
      icon: "Users",
    },
  ];

  const isTechnical = theme === 'technical';
  const isBrutalist = theme === 'brutalist';
  const isMinimal = theme === 'minimal';

  return (
    <section 
      className={`py-24 bg-[var(--bg-main)] ${isBrutalist ? 'border-y-4 border-black' : ''}`}
      style={config?.bgColor ? { backgroundColor: config.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-16 md:mb-20 ${isMinimal ? 'text-left' : 'text-center'}`}>
          <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Our Expertise</h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary break-words">
            Solutions for the <span className="italic">Modern Enterprise</span>
          </p>
        </div>

        <div className={`grid gap-6 md:gap-12 ${isTechnical ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group transition-all ${
                  isTechnical 
                    ? 'flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 border-b border-brand-primary/10 pb-8 rounded-none' 
                    : isBrutalist 
                      ? 'p-6 md:p-8 border-4 border-black rounded-none hover:translate-x-1 sm:hover:translate-x-2 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' 
                      : 'p-6 md:p-8 rounded-2xl border border-brand-primary/5 hover:border-brand-primary/10 hover:shadow-xl shadow-sm'
                }`}
              >
                <div className={`flex-shrink-0 flex items-center justify-center transition-colors ${
                  isTechnical 
                    ? 'w-12 h-12 sm:w-16 sm:h-16 text-brand-primary' 
                    : 'w-12 h-12 sm:w-14 sm:h-14 bg-brand-primary/5 rounded-xl group-hover:bg-brand-primary group-hover:text-[var(--bg-main)] text-brand-primary'
                }`}>
                  <IconComponent size={isTechnical ? 28 : 24} className="sm:size-[28px]" />
                </div>
                <div className={isTechnical ? 'flex-1' : ''}>
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brand-primary break-words ${isBrutalist ? 'uppercase' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: service.title }} />
                  </h3>
                  <div className="text-sm sm:text-base text-brand-secondary leading-relaxed break-words">
                    <div dangerouslySetInnerHTML={{ __html: service.description }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
