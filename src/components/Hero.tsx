import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                Redefining Business Strategy
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-brand-primary mb-8">
                Elevate Your <span className="italic text-slate-400">Vision</span> to Reality.
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                We partner with forward-thinking companies to build brands, products, and experiences that define the future of industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <button className="flex items-center justify-center px-8 py-4 bg-brand-primary text-white rounded-full font-medium hover:bg-slate-800 transition-all group">
                  Start a Project
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                <button className="flex items-center justify-center px-8 py-4 border border-slate-200 text-brand-primary rounded-full font-medium hover:bg-slate-50 transition-all">
                  View Our Work
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Office"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-slate-100 rounded-full blur-3xl opacity-50 -z-10"></div>
    </section>
  );
}
