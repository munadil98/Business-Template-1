import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { motion } from 'motion/react';
import { Save, LogIn, LogOut, Shield, Plus, Trash2, Image as ImageIcon, Eye, Layout, Palette, Type, ChevronUp, ChevronDown } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Portfolio from './Portfolio';
import Team from './Team';
import Testimonials from './Testimonials';
import Contact from './Contact';
import FAQ from './FAQ';
import Stats from './Stats';
import Footer from './Footer';

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };

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

  const handleThemeChange = (theme: string) => {
    setContent({ ...content, theme });
    applyTheme(theme);
  };

  const defaultContent = {
    hero: {
      title: "Elevate Your Vision to Reality.",
      subtitle: "Redefining Business Strategy",
      description: "We partner with forward-thinking companies to build brands, products, and experiences that define the future of industry.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
      bgColor: ""
    },
    about: {
      title: "A Legacy of Innovation and Trust.",
      description: "Founded on the principles of integrity and excellence, Stratos has grown from a boutique firm into a global leader in strategic consulting.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
      bgColor: ""
    },
    services: [
      { title: "Strategic Consulting", description: "Deep market analysis and strategic planning.", icon: "Briefcase" }
    ],
    servicesConfig: { bgColor: "" },
    portfolio: [
      { title: "Global Logistics Hub", category: "Infrastructure", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" }
    ],
    portfolioConfig: { bgColor: "" },
    team: [
      { name: "Alexander Vance", role: "CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" }
    ],
    teamConfig: { bgColor: "" },
    testimonials: [
      { content: "Stratos transformed our approach.", author: "James Wilson", role: "CEO" }
    ],
    testimonialsConfig: { bgColor: "" },
    contact: {
      email: "hello@stratos.consulting",
      phone: "+1 (555) 000-1234",
      address: "123 Strategy Way, New York, NY 10001",
      bgColor: "",
      visible: true
    },
    stats: [
      { label: "Global Clients", value: "500+" },
      { label: "Projects Completed", value: "1.2k" },
      { label: "Expert Consultants", value: "150+" },
      { label: "Years Experience", value: "15+" },
    ],
    statsConfig: { bgColor: "", visible: false },
    faq: [
      { question: "What industries do you specialize in?", answer: "We work across a wide range of sectors." },
      { question: "How long does a typical engagement last?", answer: "Typically ranging from 3 months to multi-year partnerships." },
    ],
    faqConfig: { bgColor: "", visible: false }
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

  const toggleVisibility = (section: string) => {
    const configKey = section === 'hero' || section === 'about' || section === 'contact' ? section : `${section}Config`;
    setContent({
      ...content,
      [configKey]: { ...content[configKey], visible: !content[configKey]?.visible }
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const defaultOrder = ['hero', 'services', 'stats', 'about', 'portfolio', 'team', 'testimonials', 'faq', 'contact'];
    const currentOrder = content.sectionOrder || defaultOrder;
    const newOrder = [...currentOrder];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIndex];
    newOrder[newIndex] = temp;
    
    setContent({ ...content, sectionOrder: newOrder });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-primary">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Manage your website content and images</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex bg-slate-200 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'edit' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-brand-primary'}`}
              >
                <Layout size={16} /> Edit
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'preview' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-brand-primary'}`}
              >
                <Eye size={16} /> Preview
              </button>
            </div>
            <div className="flex-1 md:w-48">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Layout Theme</label>
              <select 
                value={content.theme || 'default'}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none bg-white text-slate-900 text-sm font-medium"
              >
                <option value="default">Stratos Original</option>
                <option value="technical">Technical Dashboard</option>
                <option value="editorial">Editorial Hero</option>
                <option value="hardware">Hardware Tool</option>
                <option value="luxury-dark">Luxury Dark</option>
                <option value="brutalist">Cyber Brutalist</option>
                <option value="organic">Warm Organic</option>
                <option value="atmospheric">Atmospheric</option>
                <option value="minimal">Clean Minimal</option>
                <option value="prestige">Luxury Prestige</option>
              </select>
            </div>
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

        {viewMode === 'edit' ? (
          <div className="grid gap-8 admin-inputs-reset">
            <style>{`
              .admin-inputs-reset input, 
              .admin-inputs-reset textarea, 
              .admin-inputs-reset select {
                color: #0f172a !important;
                background-color: #ffffff !important;
              }
              .ql-container {
                font-family: inherit;
                font-size: 14px;
                color: #0f172a !important;
                background: white;
              }
              .ql-editor {
                min-height: 100px;
              }
            `}</style>

            {/* Section Management */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-dashed border-slate-200">
              <h2 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Section Management & Ordering</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(content.sectionOrder || ['hero', 'services', 'stats', 'about', 'portfolio', 'team', 'testimonials', 'faq', 'contact']).map((sectionId: string, index: number) => {
                  const labels: Record<string, string> = {
                    hero: 'Hero',
                    services: 'Services',
                    about: 'About',
                    portfolio: 'Portfolio',
                    team: 'Team',
                    testimonials: 'Testimonials',
                    stats: 'Stats',
                    faq: 'FAQ',
                    contact: 'Contact'
                  };
                  const configKey = sectionId === 'hero' || sectionId === 'about' || sectionId === 'contact' ? sectionId : `${sectionId}Config`;
                  const isVisible = content[configKey]?.visible !== false;
                  
                  return (
                    <div key={sectionId} className={`flex items-center gap-2 p-2 rounded-2xl border transition-all ${isVisible ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button 
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === (content.sectionOrder?.length || 9) - 1}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-700">{labels[sectionId]}</p>
                        <p className="text-[10px] text-slate-400">{isVisible ? 'Visible' : 'Hidden'}</p>
                      </div>
                      <button 
                        onClick={() => toggleVisibility(sectionId)}
                        className={`p-2 rounded-xl transition-all ${isVisible ? 'text-brand-primary bg-brand-primary/5' : 'text-slate-300 hover:text-brand-primary'}`}
                      >
                        {isVisible ? <Eye size={16} /> : <Plus size={16} />}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-[10px] text-slate-400 italic">
                Use arrows to reorder sections. Toggle the eye icon to show/hide sections.
              </p>
            </section>
            {/* Hero Section */}
            {content.hero?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                  <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">01</span>
                  Hero Section
                </h2>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleVisibility('hero')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.hero.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    title={content.hero.visible !== false ? 'Hide Section' : 'Show Section'}
                  >
                    {content.hero.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                    {content.hero.visible !== false ? 'Visible' : 'Hidden'}
                  </button>
                  <Palette size={16} className="text-slate-400" />
                  <input 
                    type="color" 
                    value={content.hero.bgColor || '#ffffff'} 
                    onChange={(e) => setContent({...content, hero: {...content.hero, bgColor: e.target.value}})}
                    className="w-8 h-8 rounded cursor-pointer border-none"
                    title="Section Background Color"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider flex items-center gap-2">
                      <Type size={14} /> Subtitle (Badge)
                    </label>
                    <ReactQuill 
                      theme="snow"
                      value={content.hero.subtitle}
                      onChange={(val) => setContent({...content, hero: {...content.hero, subtitle: val}})}
                      modules={quillModules}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider flex items-center gap-2">
                      <Type size={14} /> Title
                    </label>
                    <ReactQuill 
                      theme="snow"
                      value={content.hero.title}
                      onChange={(val) => setContent({...content, hero: {...content.hero, title: val}})}
                      modules={quillModules}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider flex items-center gap-2">
                      <Type size={14} /> Description
                    </label>
                    <ReactQuill 
                      theme="snow"
                      value={content.hero.description}
                      onChange={(val) => setContent({...content, hero: {...content.hero, description: val}})}
                      modules={quillModules}
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
          )}

          {/* About Section */}
            {content.about?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">02</span>
                About Section
              </h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleVisibility('about')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.about.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.about.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.about.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <Palette size={16} className="text-slate-400" />
                <input 
                  type="color" 
                  value={content.about.bgColor || '#ffffff'} 
                  onChange={(e) => setContent({...content, about: {...content.about, bgColor: e.target.value}})}
                  className="w-8 h-8 rounded cursor-pointer border-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider flex items-center gap-2">
                    <Type size={14} /> Title
                  </label>
                  <ReactQuill 
                    theme="snow"
                    value={content.about.title}
                    onChange={(val) => setContent({...content, about: {...content.about, title: val}})}
                    modules={quillModules}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 tracking-wider flex items-center gap-2">
                    <Type size={14} /> Description
                  </label>
                  <ReactQuill 
                    theme="snow"
                    value={content.about.description}
                    onChange={(val) => setContent({...content, about: {...content.about, description: val}})}
                    modules={quillModules}
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
          )}

            {/* Services Section */}
            {content.servicesConfig?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">03</span>
                Services
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('services')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.servicesConfig?.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.servicesConfig?.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.servicesConfig?.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <div className="flex items-center gap-3">
                  <Palette size={16} className="text-slate-400" />
                  <input 
                    type="color" 
                    value={content.servicesConfig?.bgColor || '#ffffff'} 
                    onChange={(e) => setContent({...content, servicesConfig: {...content.servicesConfig, bgColor: e.target.value}})}
                    className="w-8 h-8 rounded cursor-pointer border-none"
                  />
                </div>
                <button 
                  onClick={() => addItem('services', { title: "New Service", description: "Service description", icon: "Zap" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add Service
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {content.services?.map((service: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('services', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Service Title</label>
                    <ReactQuill 
                      theme="snow"
                      value={service.title}
                      onChange={(val) => updateItem('services', idx, 'title', val)}
                      modules={{ toolbar: [['bold', 'italic', 'underline'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description</label>
                    <ReactQuill 
                      theme="snow"
                      value={service.description}
                      onChange={(val) => updateItem('services', idx, 'description', val)}
                      modules={{ toolbar: [['bold', 'italic', 'underline'], [{ 'color': [] }]] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

            {/* Portfolio Section */}
            {content.portfolioConfig?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">04</span>
                Portfolio
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('portfolio')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.portfolioConfig?.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.portfolioConfig?.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.portfolioConfig?.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <div className="flex items-center gap-3">
                  <Palette size={16} className="text-slate-400" />
                  <input 
                    type="color" 
                    value={content.portfolioConfig?.bgColor || '#ffffff'} 
                    onChange={(e) => setContent({...content, portfolioConfig: {...content.portfolioConfig, bgColor: e.target.value}})}
                    className="w-8 h-8 rounded cursor-pointer border-none"
                  />
                </div>
                <button 
                  onClick={() => addItem('portfolio', { title: "New Project", category: "Category", image: "" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.portfolio?.map((project: any, idx: number) => (
                <div key={idx} className="space-y-3 p-4 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('portfolio', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg z-10">
                    <Trash2 size={16} />
                  </button>
                  <div className="aspect-video rounded-xl overflow-hidden bg-white border border-slate-100">
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
                    className="w-full text-xs p-2 rounded bg-white border border-slate-200 outline-none"
                  />
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Project Title</label>
                    <ReactQuill 
                      theme="snow"
                      value={project.title}
                      onChange={(val) => updateItem('portfolio', idx, 'title', val)}
                      modules={{ toolbar: [['bold', 'italic'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <input 
                    type="text" 
                    value={project.category}
                    onChange={(e) => updateItem('portfolio', idx, 'category', e.target.value)}
                    className="w-full text-xs uppercase tracking-widest text-slate-400 outline-none bg-white p-2 rounded border border-slate-200"
                    placeholder="Category"
                  />
                </div>
              ))}
            </div>
          </section>
          )}

            {/* Team Section */}
            {content.teamConfig?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">05</span>
                Team
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('team')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.teamConfig?.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.teamConfig?.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.teamConfig?.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <div className="flex items-center gap-3">
                  <Palette size={16} className="text-slate-400" />
                  <input 
                    type="color" 
                    value={content.teamConfig?.bgColor || '#ffffff'} 
                    onChange={(e) => setContent({...content, teamConfig: {...content.teamConfig, bgColor: e.target.value}})}
                    className="w-8 h-8 rounded cursor-pointer border-none"
                  />
                </div>
                <button 
                  onClick={() => addItem('team', { name: "Name", role: "Role", image: "" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add Member
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.team?.map((member: any, idx: number) => (
                <div key={idx} className="space-y-3 p-4 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('team', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg z-10">
                    <Trash2 size={16} />
                  </button>
                  <div className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-100">
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
                    className="w-full text-xs p-2 rounded bg-white border border-slate-200 outline-none"
                  />
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Name</label>
                    <ReactQuill 
                      theme="snow"
                      value={member.name}
                      onChange={(val) => updateItem('team', idx, 'name', val)}
                      modules={{ toolbar: [['bold'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <input 
                    type="text" 
                    value={member.role}
                    onChange={(e) => updateItem('team', idx, 'role', e.target.value)}
                    className="w-full text-xs text-slate-400 outline-none bg-white p-2 rounded border border-slate-200"
                    placeholder="Role"
                  />
                </div>
              ))}
            </div>
          </section>
          )}

            {/* Testimonials Section */}
            {content.testimonialsConfig?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">06</span>
                Testimonials
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('testimonials')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.testimonialsConfig?.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.testimonialsConfig?.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.testimonialsConfig?.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <div className="flex items-center gap-3">
                  <Palette size={16} className="text-slate-400" />
                  <input 
                    type="color" 
                    value={content.testimonialsConfig?.bgColor || '#ffffff'} 
                    onChange={(e) => setContent({...content, testimonialsConfig: {...content.testimonialsConfig, bgColor: e.target.value}})}
                    className="w-8 h-8 rounded cursor-pointer border-none"
                  />
                </div>
                <button 
                  onClick={() => addItem('testimonials', { content: "Quote", author: "Name", role: "Role" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add Testimonial
                </button>
              </div>
            </div>
            <div className="grid gap-6">
              {content.testimonials?.map((t: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('testimonials', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Testimonial Content</label>
                    <ReactQuill 
                      theme="snow"
                      value={t.content}
                      onChange={(val) => updateItem('testimonials', idx, 'content', val)}
                      modules={{ toolbar: [['bold', 'italic'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Author Name</label>
                      <input 
                        type="text" 
                        value={t.author}
                        onChange={(e) => updateItem('testimonials', idx, 'author', e.target.value)}
                        className="w-full p-2 rounded border border-slate-200 outline-none text-sm"
                        placeholder="Author Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Author Role</label>
                      <input 
                        type="text" 
                        value={t.role}
                        onChange={(e) => updateItem('testimonials', idx, 'role', e.target.value)}
                        className="w-full p-2 rounded border border-slate-200 outline-none text-sm"
                        placeholder="Author Role"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

            {/* Contact Section */}
            {content.contact?.visible !== false && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">07</span>
                Contact Info
              </h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleVisibility('contact')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.contact.visible !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {content.contact.visible !== false ? <Eye size={12} /> : <Trash2 size={12} />}
                  {content.contact.visible !== false ? 'Visible' : 'Hidden'}
                </button>
                <Palette size={16} className="text-slate-400" />
                <input 
                  type="color" 
                  value={content.contact.bgColor || '#ffffff'} 
                  onChange={(e) => setContent({...content, contact: {...content.contact, bgColor: e.target.value}})}
                  className="w-8 h-8 rounded cursor-pointer border-none"
                />
              </div>
            </div>
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
          )}

            {/* Stats Section */}
            {content.statsConfig?.visible && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">08</span>
                Stats Section
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('stats')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.statsConfig?.visible ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}
                >
                  {content.statsConfig?.visible ? 'Visible' : 'Hidden'}
                </button>
                <button 
                  onClick={() => addItem('stats', { label: "Label", value: "0" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add Stat
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('stats', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value</label>
                    <ReactQuill 
                      theme="snow"
                      value={stat.value}
                      onChange={(val) => updateItem('stats', idx, 'value', val)}
                      modules={{ toolbar: [['bold'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Label</label>
                    <ReactQuill 
                      theme="snow"
                      value={stat.label}
                      onChange={(val) => updateItem('stats', idx, 'label', val)}
                      modules={{ toolbar: [['bold'], [{ 'color': [] }]] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

            {/* FAQ Section */}
            {content.faqConfig?.visible && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-primary">
                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm">09</span>
                FAQ Section
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleVisibility('faq')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${content.faqConfig?.visible ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}
                >
                  {content.faqConfig?.visible ? 'Visible' : 'Hidden'}
                </button>
                <button 
                  onClick={() => addItem('faq', { question: "Question?", answer: "Answer" })}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus size={16} /> Add FAQ
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {content.faq?.map((faq: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 relative group bg-slate-50">
                  <button onClick={() => removeItem('faq', idx)} className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question</label>
                    <ReactQuill 
                      theme="snow"
                      value={faq.question}
                      onChange={(val) => updateItem('faq', idx, 'question', val)}
                      modules={{ toolbar: [['bold', 'italic'], [{ 'color': [] }]] }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Answer</label>
                    <ReactQuill 
                      theme="snow"
                      value={faq.answer}
                      onChange={(val) => updateItem('faq', idx, 'answer', val)}
                      modules={{ toolbar: [['bold', 'italic'], [{ 'color': [] }]] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-white px-4 py-1 rounded-lg text-xs text-slate-400 font-mono border border-slate-200">
              preview.stratos.consulting
            </div>
            <div className="w-12"></div>
          </div>
          <div className="h-[800px] overflow-y-auto relative overflow-x-hidden">
            <Navbar theme={content.theme} isStatic={true} content={content} />
            <main>
              {(content.sectionOrder || ['hero', 'services', 'stats', 'about', 'portfolio', 'team', 'testimonials', 'faq', 'contact']).map((sectionId: string) => (
                <div key={sectionId}>
                  {sectionId === 'hero' && content.hero?.visible !== false && <Hero content={content.hero} theme={content.theme} />}
                  {sectionId === 'services' && content.servicesConfig?.visible !== false && <Services content={content.services} theme={content.theme} config={content.servicesConfig} />}
                  {sectionId === 'stats' && content.statsConfig?.visible && <Stats content={content.stats} theme={content.theme} />}
                  {sectionId === 'about' && content.about?.visible !== false && <About content={content.about} theme={content.theme} />}
                  {sectionId === 'portfolio' && content.portfolioConfig?.visible !== false && <Portfolio content={content.portfolio} theme={content.theme} config={content.portfolioConfig} />}
                  {sectionId === 'team' && content.teamConfig?.visible !== false && <Team content={content.team} theme={content.theme} config={content.teamConfig} />}
                  {sectionId === 'testimonials' && content.testimonialsConfig?.visible !== false && <Testimonials content={content.testimonials} theme={content.theme} config={content.testimonialsConfig} />}
                  {sectionId === 'faq' && content.faqConfig?.visible && <FAQ content={content.faq} theme={content.theme} />}
                  {sectionId === 'contact' && content.contact?.visible !== false && <Contact content={content.contact} theme={content.theme} />}
                </div>
              ))}
            </main>
            <Footer theme={content.theme} />
          </div>
        </div>
      )}
    </div>
  </div>
);
}
