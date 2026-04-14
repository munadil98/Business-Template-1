import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { motion } from 'motion/react';
import { Save, LogIn, LogOut, Shield } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'content', 'main'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data());
      } else {
        // Initial default content
        setContent({
          hero: {
            title: "Elevate Your Vision to Reality.",
            subtitle: "Redefining Business Strategy",
            description: "We partner with forward-thinking companies to build brands, products, and experiences that define the future of industry."
          },
          about: {
            title: "A Legacy of Innovation and Trust.",
            description: "Founded on the principles of integrity and excellence, Stratos has grown from a boutique firm into a global leader in strategic consulting."
          }
        });
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'content/main');
    });

    return () => unsub();
  }, []);

  const handleSave = async () => {
    if (!isAdmin) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'main'), {
        ...content,
        updatedAt: new Date().toISOString()
      });
      alert("Content saved successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'content/main');
    } finally {
      setSaving(false);
    }
  };

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <Shield className="mx-auto text-brand-primary mb-4" size={48} />
          <h1 className="text-2xl font-serif font-bold mb-6">Admin Access</h1>
          <button 
            onClick={login}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            <LogIn size={20} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-2xl font-serif font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-6">You do not have administrator privileges.</p>
          <button onClick={logout} className="text-brand-primary font-bold">Sign Out</button>
        </div>
      </div>
    );
  }

  if (!content) return <div className="p-8">Loading content...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-primary">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-all disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={logout} className="flex items-center gap-2 text-slate-500 hover:text-brand-primary">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Subtitle (Badge)</label>
                <input 
                  type="text" 
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  value={content.hero.title}
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={content.hero.description}
                  onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  value={content.about.title}
                  onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={content.about.description}
                  onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
