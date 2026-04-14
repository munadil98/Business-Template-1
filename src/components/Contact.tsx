import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-8 leading-tight">
              Let's Start Your <span className="italic">Next Chapter</span>.
            </h3>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Ready to elevate your business? Our team of experts is here to help you navigate your most complex challenges.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Email Us</p>
                  <p className="text-lg font-medium text-brand-primary">hello@stratos.consulting</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Call Us</p>
                  <p className="text-lg font-medium text-brand-primary">+1 (555) 000-1234</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-brand-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Visit Us</p>
                  <p className="text-lg font-medium text-brand-primary">123 Strategy Way, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-0 bg-slate-50 p-10 rounded-3xl border border-slate-100"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Work Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all bg-white">
                  <option>Strategic Consulting</option>
                  <option>Digital Transformation</option>
                  <option>Market Expansion</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"></textarea>
              </div>
              <button className="w-full flex items-center justify-center px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-all group">
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
