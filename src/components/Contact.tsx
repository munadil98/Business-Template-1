import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact({ content, theme }: { content?: any, theme?: string }) {
  const contactInfo = content || {
    email: "hello@stratos.consulting",
    phone: "+1 (555) 000-1234",
    address: "123 Strategy Way, New York, NY 10001",
  };

  const isTechnical = theme === 'technical';
  const isBrutalist = theme === 'brutalist';
  const isMinimal = theme === 'minimal';

  return (
    <section 
      id="contact" 
      className={`py-24 bg-[var(--bg-main)] ${isBrutalist ? 'border-b-4 border-black' : ''}`}
      style={content?.bgColor ? { backgroundColor: content.bgColor } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`lg:grid lg:gap-24 ${isMinimal ? 'grid-cols-1 max-w-2xl mx-auto' : 'lg:grid-cols-2'}`}>
          {!isMinimal && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary mb-4 break-words ${isBrutalist ? 'bg-black text-white inline-block px-2' : ''}`}>Get in Touch</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8 leading-tight break-words">
                Let's Start Your <span className="italic">Next Chapter</span>.
              </h3>
              <p className="text-base sm:text-lg text-brand-secondary mb-12 leading-relaxed break-words">
                Ready to elevate your business? Our team of experts is here to help you navigate your most complex challenges.
              </p>

              <div className={`space-y-8 ${isTechnical ? 'grid grid-cols-1 gap-4 space-y-0' : ''}`}>
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 text-brand-primary ${isBrutalist ? 'border-2 border-black rounded-none' : 'rounded-full bg-brand-primary/5'}`}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-1">Email Us</p>
                    <p className="text-lg font-medium text-brand-primary">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 text-brand-primary ${isBrutalist ? 'border-2 border-black rounded-none' : 'rounded-full bg-brand-primary/5'}`}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-1">Call Us</p>
                    <p className="text-lg font-medium text-brand-primary">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 text-brand-primary ${isBrutalist ? 'border-2 border-black rounded-none' : 'rounded-full bg-brand-primary/5'}`}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-1">Visit Us</p>
                    <p className="text-lg font-medium text-brand-primary">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`mt-16 lg:mt-0 bg-[var(--bg-main)] p-10 ${isBrutalist ? 'rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'rounded-3xl border border-brand-primary/10'}`}
          >
            {isMinimal && (
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-serif font-bold text-brand-primary mb-4">Send a Message</h2>
                <p className="text-brand-secondary">We'll get back to you within 24 hours.</p>
              </div>
            )}
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">First Name</label>
                  <input type="text" className={`w-full px-4 py-3 outline-none transition-all bg-[var(--bg-main)] ${isBrutalist ? 'border-2 border-black rounded-none focus:bg-slate-50' : 'rounded-xl border border-brand-primary/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'}`} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">Last Name</label>
                  <input type="text" className={`w-full px-4 py-3 outline-none transition-all bg-[var(--bg-main)] ${isBrutalist ? 'border-2 border-black rounded-none focus:bg-slate-50' : 'rounded-xl border border-brand-primary/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'}`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">Work Email</label>
                <input type="email" className={`w-full px-4 py-3 outline-none transition-all bg-[var(--bg-main)] ${isBrutalist ? 'border-2 border-black rounded-none focus:bg-slate-50' : 'rounded-xl border border-brand-primary/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'}`} />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">Subject</label>
                <select className={`w-full px-4 py-3 outline-none transition-all bg-[var(--bg-main)] ${isBrutalist ? 'border-2 border-black rounded-none focus:bg-slate-50' : 'rounded-xl border border-brand-primary/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'}`}>
                  <option>Strategic Consulting</option>
                  <option>Digital Transformation</option>
                  <option>Market Expansion</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">Message</label>
                <textarea rows={4} className={`w-full px-4 py-3 outline-none transition-all bg-[var(--bg-main)] ${isBrutalist ? 'border-2 border-black rounded-none focus:bg-slate-50' : 'rounded-xl border border-brand-primary/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'}`}></textarea>
              </div>
              <button className={`w-full flex items-center justify-center px-8 py-4 bg-brand-primary text-[var(--bg-main)] font-bold hover:opacity-90 transition-all group ${isBrutalist ? 'rounded-none border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0' : 'rounded-xl'}`}>
                Send Message
                <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
