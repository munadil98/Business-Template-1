import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero({ content, theme }: { content?: any, theme?: string }) {
  const title = content?.title || "Elevate Your Vision to Reality.";
  const subtitle = content?.subtitle || "Redefining Business Strategy";
  const description = content?.description || "We partner with forward-thinking companies to build brands, products, and experiences that define the future of industry.";

  const isEditorial = theme === 'editorial';
  const isMinimal = theme === 'minimal';
  const isAtmospheric = theme === 'atmospheric';
  const isBrutalist = theme === 'brutalist';

  return (
    <section 
      className={`relative pt-24 pb-16 lg:pt-40 lg:pb-40 overflow-hidden ${isAtmospheric ? 'min-h-screen flex items-center' : ''}`}
      style={content?.bgColor ? { backgroundColor: content.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={isEditorial || isMinimal 
          ? 'flex flex-col items-center text-center gap-12 lg:gap-16' 
          : 'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'
        }>
          <div className={isEditorial || isMinimal 
            ? 'max-w-4xl w-full' 
            : 'lg:col-span-7 w-full text-center lg:text-left min-w-0 overflow-hidden'
          }>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className={`flex flex-col ${isEditorial || isMinimal ? 'items-center' : 'items-center lg:items-start'} w-full`}>
                <span className={`inline-block px-4 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6 ${isBrutalist ? 'border-2 border-brand-primary rounded-none' : ''}`}>
                  <span dangerouslySetInnerHTML={{ __html: subtitle }} />
                </span>
                <h1 className={`w-full text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] text-brand-primary mb-8 break-words whitespace-normal ${isEditorial ? 'text-5xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase leading-[0.9]' : 'lg:text-7xl'} ${isEditorial || isMinimal ? 'mx-auto' : ''}`}>
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </h1>
                <div className={`text-base sm:text-lg text-brand-secondary mb-10 leading-relaxed max-w-xl rich-text ${isEditorial || isMinimal ? 'mx-auto' : 'lg:mx-0'}`}>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${isEditorial || isMinimal ? 'justify-center mx-auto' : 'justify-center lg:justify-start'}`}>
                  <a 
                    href="#contact"
                    className={`flex items-center justify-center px-10 py-5 bg-brand-primary text-[var(--bg-main)] font-bold hover:opacity-90 transition-all group ${isBrutalist ? 'rounded-none border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0' : 'rounded-full uppercase text-sm tracking-widest'}`}
                  >
                    Start a Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </a>
                  <a 
                    href="#portfolio"
                    className={`flex items-center justify-center px-10 py-5 border-2 border-brand-primary/10 text-brand-primary font-bold hover:bg-brand-primary/5 transition-all ${isBrutalist ? 'rounded-none' : 'rounded-full uppercase text-sm tracking-widest'}`}
                  >
                    View Our Work
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {!isMinimal && (
            <div className={`relative w-full ${isEditorial ? 'max-w-5xl mx-auto order-first lg:order-none' : 'lg:col-span-5 order-first lg:order-none'}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative mx-auto w-full shadow-2xl overflow-hidden ${isBrutalist ? 'rounded-none border-4 border-brand-primary' : 'rounded-3xl'} ${isEditorial ? 'aspect-video' : 'aspect-[4/5]'}`}
              >
                <img
                  src={content?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"}
                  alt="Hero Image"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-slate-100 rounded-full blur-3xl opacity-50 -z-10 hidden lg:block"></div>
    </section>
  );
}
