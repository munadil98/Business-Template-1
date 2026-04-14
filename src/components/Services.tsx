import { motion } from "motion/react";
import { Briefcase, BarChart3, Globe, Zap, Shield, Users } from "lucide-react";

const iconMap: any = {
  Briefcase, BarChart3, Globe, Zap, Shield, Users
};

export default function Services({ content }: { content?: any[] }) {
  const displayServices = content || [
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

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Our Expertise</h2>
          <p className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
            Solutions for the <span className="italic">Modern Enterprise</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-slate-100 hover:border-brand-primary/10 hover:shadow-xl hover:shadow-slate-200/50 transition-all"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-primary">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
