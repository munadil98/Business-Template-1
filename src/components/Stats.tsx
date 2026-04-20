import { motion } from "motion/react";

export default function Stats({ content, theme }: { content?: any[], theme?: string }) {
  const displayStats = content || [
    { label: "Global Clients", value: "500+" },
    { label: "Projects Completed", value: "1.2k" },
    { label: "Expert Consultants", value: "150+" },
    { label: "Years Experience", value: "15+" },
  ];

  const isBrutalist = theme === 'brutalist';
  const isTechnical = theme === 'technical';

  return (
    <section className={`py-20 bg-brand-primary text-[var(--bg-main)] ${isBrutalist ? 'border-y-4 border-black' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center`}>
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center break-words"
            >
              <p className={`text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-2 break-words ${isTechnical ? 'font-mono' : ''}`}>
                <span dangerouslySetInnerHTML={{ __html: stat.value }} />
              </p>
              <p className="text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] opacity-60 font-medium break-words">
                <span dangerouslySetInnerHTML={{ __html: stat.label }} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
