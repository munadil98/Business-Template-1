/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

import { AuthProvider } from "./AuthContext";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [siteContent, setSiteContent] = useState<any>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'content', 'main'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSiteContent(data);
        applyTheme(data.theme || 'default');
      }
    });
    return () => unsub();
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    const themes: Record<string, any> = {
      default: {
        '--brand-primary': '#0f172a',
        '--brand-secondary': '#64748b',
        '--bg-main': '#f8fafc',
        '--text-main': '#0f172a',
        '--font-display': '"Playfair Display", serif',
        '--font-body': '"Inter", sans-serif',
      },
      technical: {
        '--brand-primary': '#141414',
        '--brand-secondary': '#525252',
        '--bg-main': '#E4E3E0',
        '--text-main': '#141414',
        '--font-display': 'Georgia, serif',
        '--font-body': '"Courier New", Courier, monospace',
      },
      editorial: {
        '--brand-primary': '#050505',
        '--brand-secondary': '#F27D26',
        '--bg-main': '#ffffff',
        '--text-main': '#050505',
        '--font-display': '"Anton", sans-serif',
        '--font-body': '"Inter", sans-serif',
      },
      hardware: {
        '--brand-primary': '#151619',
        '--brand-secondary': '#8E9299',
        '--bg-main': '#E6E6E6',
        '--text-main': '#FFFFFF',
        '--font-display': '"JetBrains Mono", monospace',
        '--font-body': '"JetBrains Mono", monospace',
      },
      'luxury-dark': {
        '--brand-primary': '#000000',
        '--brand-secondary': 'rgba(255, 255, 255, 0.6)',
        '--bg-main': '#000000',
        '--text-main': '#ffffff',
        '--font-display': '"Inter", sans-serif',
        '--font-body': '"Inter", sans-serif',
      },
      brutalist: {
        '--brand-primary': '#000000',
        '--brand-secondary': '#00FF00',
        '--bg-main': '#FFFFFF',
        '--text-main': '#000000',
        '--font-display': '"Anton", sans-serif',
        '--font-body': '"Inter", sans-serif',
      },
      organic: {
        '--brand-primary': '#5A5A40',
        '--brand-secondary': '#8A8A6A',
        '--bg-main': '#f5f5f0',
        '--text-main': '#1a1a1a',
        '--font-display': '"Cormorant Garamond", serif',
        '--font-body': '"Cormorant Garamond", serif',
      },
      atmospheric: {
        '--brand-primary': '#ff4e00',
        '--brand-secondary': 'rgba(255, 255, 255, 0.6)',
        '--bg-main': '#0a0502',
        '--text-main': '#ffffff',
        '--font-display': 'Georgia, serif',
        '--font-body': '-apple-system, BlinkMacSystemFont, sans-serif',
      },
      minimal: {
        '--brand-primary': '#4a4a4a',
        '--brand-secondary': '#9e9e9e',
        '--bg-main': '#f5f5f5',
        '--text-main': '#1a1a1a',
        '--font-display': '"SF Pro Text", -apple-system, sans-serif',
        '--font-body': '"SF Pro Text", -apple-system, sans-serif',
      },
      prestige: {
        '--brand-primary': '#1a1a1a',
        '--brand-secondary': 'rgba(26, 26, 26, 0.6)',
        '--bg-main': '#f5f2ed',
        '--text-main': '#1a1a1a',
        '--font-display': '"Cormorant Garamond", serif',
        '--font-body': '"Montserrat", sans-serif',
      }
    };

    const selected = themes[theme] || themes.default;
    Object.entries(selected).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  };

  // Simple toggle for demo - in real app use routing
  useEffect(() => {
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showAdmin) {
    return (
      <AuthProvider>
        <AdminPanel />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--bg-main)] overflow-x-hidden w-full relative">
        <Navbar theme={siteContent?.theme} content={siteContent} />
        <main className="w-full">
          {(siteContent?.sectionOrder || ['hero', 'services', 'stats', 'about', 'portfolio', 'team', 'testimonials', 'faq', 'contact']).map((sectionId: string) => (
            <div key={sectionId}>
              {sectionId === 'hero' && siteContent?.hero?.visible !== false && <Hero content={siteContent?.hero} theme={siteContent?.theme} />}
              {sectionId === 'services' && siteContent?.servicesConfig?.visible !== false && (
                <Services 
                  content={siteContent?.services} 
                  theme={siteContent?.theme} 
                  config={siteContent?.servicesConfig}
                />
              )}
              {sectionId === 'stats' && siteContent?.statsConfig?.visible && <Stats content={siteContent?.stats} theme={siteContent?.theme} />}
              {sectionId === 'about' && siteContent?.about?.visible !== false && <About content={siteContent?.about} theme={siteContent?.theme} />}
              {sectionId === 'portfolio' && siteContent?.portfolioConfig?.visible !== false && (
                <Portfolio 
                  content={siteContent?.portfolio} 
                  theme={siteContent?.theme} 
                  config={siteContent?.portfolioConfig}
                />
              )}
              {sectionId === 'team' && siteContent?.teamConfig?.visible !== false && (
                <Team 
                  content={siteContent?.team} 
                  theme={siteContent?.theme} 
                  config={siteContent?.teamConfig}
                />
              )}
              {sectionId === 'testimonials' && siteContent?.testimonialsConfig?.visible !== false && (
                <Testimonials 
                  content={siteContent?.testimonials} 
                  theme={siteContent?.theme} 
                  config={siteContent?.testimonialsConfig}
                />
              )}
              {sectionId === 'faq' && siteContent?.faqConfig?.visible && <FAQ content={siteContent?.faq} theme={siteContent?.theme} />}
              {sectionId === 'contact' && siteContent?.contact?.visible !== false && <Contact content={siteContent?.contact} theme={siteContent?.theme} />}
            </div>
          ))}
        </main>
        <Footer theme={siteContent?.theme} />
        
        {/* Hidden Admin Link for User */}
        <a href="#admin" className="fixed bottom-4 right-4 text-[10px] text-slate-300 hover:text-slate-600">Admin</a>
      </div>
    </AuthProvider>
  );
}
