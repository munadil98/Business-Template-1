import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function FAQ({ content, theme }: { content?: any[], theme?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs = content || [
    { question: "What industries do you specialize in?", answer: "We work across a wide range of sectors including technology, finance, healthcare, and manufacturing, providing tailored strategic consulting for each." },
    { question: "How long does a typical engagement last?", answer: "Engagements vary based on complexity, typically ranging from 3 months for specific projects to multi-year strategic partnerships." },
    { question: "Do you offer implementation support?", answer: "Yes, we don't just provide strategies; we partner with you through the implementation phase to ensure measurable results." },
  ];

  const isBrutalist = theme === 'brutalist';

  return (
    <section className={`py-24 bg-[var(--bg-main)] ${isBrutalist ? 'border-b-4 border-black' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Common Questions</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-brand-primary break-words">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border ${isBrutalist ? 'border-4 border-black rounded-none' : 'border-brand-primary/10 rounded-2xl'} overflow-hidden break-words`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-brand-primary/5 transition-colors gap-4"
              >
                <span className="font-bold text-brand-primary text-base sm:text-lg break-words">
                  <span dangerouslySetInnerHTML={{ __html: faq.question }} />
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 sm:px-6 pb-5 sm:pb-6 text-brand-secondary leading-relaxed rich-text break-words"
                >
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
