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
        setSiteContent(doc.data());
      }
    });
    return () => unsub();
  }, []);

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
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Hero content={siteContent?.hero} />
          <Services content={siteContent?.services} />
          <About content={siteContent?.about} />
          <Portfolio content={siteContent?.portfolio} />
          <Team content={siteContent?.team} />
          <Testimonials content={siteContent?.testimonials} />
          <Contact content={siteContent?.contact} />
        </main>
        <Footer />
        
        {/* Hidden Admin Link for User */}
        <a href="#admin" className="fixed bottom-4 right-4 text-[10px] text-slate-300 hover:text-slate-600">Admin</a>
      </div>
    </AuthProvider>
  );
}
