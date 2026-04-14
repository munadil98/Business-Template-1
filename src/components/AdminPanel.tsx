import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { motion } from 'motion/react';
import { Save, LogIn, LogOut, Shield, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const defaultContent = {
    hero: {
      title: "Elevate Your Vision to Reality.",
      subtitle: "Redefining Business Strategy",
      description: "We partner with forward-thinking companies to build brands, products, and experiences that define the future of industry.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
    },
    about: {
      title: "A Legacy of Innovation and Trust.",
      description: "Founded on the principles of integrity and excellence, Stratos has grown from a boutique firm into a global leader in strategic consulting.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
    },
    services: [
      { title: "Strategic Consulting", description: "Deep market analysis and strategic planning.", icon: "Briefcase" },
      { title: "Digital Transformation", description: "Modernizing your infrastructure.", icon: "Zap" }
    ],
    portfolio: [
      { title: "Global Logistics Hub", category: "Infrastructure", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" }
    ],
    team: [
      { name: "Alexander Vance", role: "CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" }
    ],
    testimonials: [
      { content: "Stratos transformed our approach.", author: "James Wilson", role: "CEO" }
    ],
    contact: {
      email: "hello@stratos.consulting",
      phone: "+1 (555) 000-1234",
      address: "123 Strategy Way, New York, NY 10001"
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'content', 'main'), (doc) => {
      if (doc.exists()) {
        setContent({ ...defaultContent, ...doc.data() });
      } else {
        setContent(defaultContent);
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

  const addItem = (section: string, template: any) => {
    setContent({
      ...content,
      [section]: [...(content[section] || []), template]
    });
  };

  const removeItem = (section: string, index: number) => {
    const newList = [...content[section]];
    newList.splice(index, 1);
    setContent({ ...content, [section]: newList });
  };

  const updateItem = (section: string, index: number, field: string, value: any) => {
    const newList = [...content[section]];
    newList[index] = { ...newList[index], [field]: value };
    setContent({ ...content, [section]: newList });
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
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-primary">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Manage your website content and images</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-green-700 transition-all disabled:opacity-50 shadow-lg shadow-green-600/20"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={logout} className="flex items-center gap-2 text-slate-500 hover:text-brand-primary font-medium">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Hero Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-primary">
              <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">01</span>
              Hero Section
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Subtitle (Badge)</label>
                  <input 
                    type="text" 
                    value={content.hero.subtitle}
                    onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Title</label>
                  <input 
                    type="text" 
                    value={content.hero.title}
                    onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Description</label>
                  <textarea 
                    rows={3}
                    value={content.hero.description}
                    onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Hero Image URL</label>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={content.hero.image}
                    onChange={(e) => setContent({...content, hero: {...content.hero, image: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative group">
                    {content.hero.image ? (
                      <img src={content.hero.image} className="w-full h-full object-cover" alt="Hero Preview" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon className="text-slate-300" size={48} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-primary">
              <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">02</span>
              About Section
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Title</label>
                  <input 
                    type="text" 
                    value={content.about.title}
                    onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Description</label>
                  <textarea 
                    rows={6}
                    value={content.about.description}
                    onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">About Image URL</label>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={content.about.image}
                    onChange={(e) => setContent({...content, about: {...content.about, image: e.target.value}})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                  <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {content.about.image ? (
                      <img src={content.about.image} className="w-full h-full object-cover" alt="About Preview" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon className="text-slate-300" size={48} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">03</span>
                Services
              </h2>
              <button 
                onClick={() => addItem('services', { title: "New Service", description: "Service description", icon: "Zap" })}
                className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <Plus size={16} /> Add Service
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.services?.map((service: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 relative group">
                  <button onClick={() => removeItem('services', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <input 
                    type="text" 
                    value={service.title}
                    onChange={(e) => updateItem('services', idx, 'title', e.target.value)}
                    className="w-full font-bold mb-2 outline-none border-b border-transparent focus:border-brand-primary"
                  />
                  <textarea 
                    value={service.description}
                    onChange={(e) => updateItem('services', idx, 'description', e.target.value)}
                    className="w-full text-sm text-slate-500 outline-none border-b border-transparent focus:border-brand-primary"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Portfolio Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">04</span>
                Portfolio
              </h2>
              <button 
                onClick={() => addItem('portfolio', { title: "New Project", category: "Category", image: "" })}
                className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.portfolio?.map((project: any, idx: number) => (
                <div key={idx} className="space-y-3 p-4 rounded-2xl border border-slate-100 relative group">
                  <button onClick={() => removeItem('portfolio', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg z-10">
                    <Trash2 size={16} />
                  </button>
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    {project.image ? (
                      <img src={project.image} className="w-full h-full object-cover" alt="Project" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={24} /></div>
                    )}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Image URL"
                    value={project.image}
                    onChange={(e) => updateItem('portfolio', idx, 'image', e.target.value)}
                    className="w-full text-xs p-2 rounded bg-slate-50 outline-none"
                  />
                  <input 
                    type="text" 
                    value={project.title}
                    onChange={(e) => updateItem('portfolio', idx, 'title', e.target.value)}
                    className="w-full font-bold outline-none"
                  />
                  <input 
                    type="text" 
                    value={project.category}
                    onChange={(e) => updateItem('portfolio', idx, 'category', e.target.value)}
                    className="w-full text-xs uppercase tracking-widest text-slate-400 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">05</span>
                Team
              </h2>
              <button 
                onClick={() => addItem('team', { name: "Name", role: "Role", image: "" })}
                className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <Plus size={16} /> Add Member
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.team?.map((member: any, idx: number) => (
                <div key={idx} className="space-y-3 p-4 rounded-2xl border border-slate-100 relative group">
                  <button onClick={() => removeItem('team', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg z-10">
                    <Trash2 size={16} />
                  </button>
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    {member.image ? (
                      <img src={member.image} className="w-full h-full object-cover" alt="Member" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={24} /></div>
                    )}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Image URL"
                    value={member.image}
                    onChange={(e) => updateItem('team', idx, 'image', e.target.value)}
                    className="w-full text-xs p-2 rounded bg-slate-50 outline-none"
                  />
                  <input 
                    type="text" 
                    value={member.name}
                    onChange={(e) => updateItem('team', idx, 'name', e.target.value)}
                    className="w-full font-bold outline-none"
                  />
                  <input 
                    type="text" 
                    value={member.role}
                    onChange={(e) => updateItem('team', idx, 'role', e.target.value)}
                    className="w-full text-xs text-slate-400 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">06</span>
                Testimonials
              </h2>
              <button 
                onClick={() => addItem('testimonials', { content: "Quote", author: "Name", role: "Role" })}
                className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <Plus size={16} /> Add Testimonial
              </button>
            </div>
            <div className="grid gap-4">
              {content.testimonials?.map((t: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 relative group">
                  <button onClick={() => removeItem('testimonials', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <textarea 
                    value={t.content}
                    onChange={(e) => updateItem('testimonials', idx, 'content', e.target.value)}
                    className="w-full text-sm italic mb-2 outline-none border-b border-transparent focus:border-brand-primary"
                    placeholder="Testimonial content"
                  />
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={t.author}
                      onChange={(e) => updateItem('testimonials', idx, 'author', e.target.value)}
                      className="font-bold outline-none text-sm"
                      placeholder="Author Name"
                    />
                    <input 
                      type="text" 
                      value={t.role}
                      onChange={(e) => updateItem('testimonials', idx, 'role', e.target.value)}
                      className="text-slate-400 outline-none text-sm"
                      placeholder="Author Role"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-primary">
              <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">07</span>
              Contact Info
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Email</label>
                <input 
                  type="text" 
                  value={content.contact.email}
                  onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Phone</label>
                <input 
                  type="text" 
                  value={content.contact.phone}
                  onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Address</label>
                <input 
                  type="text" 
                  value={content.contact.address}
                  onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
