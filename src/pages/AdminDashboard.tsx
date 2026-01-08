import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, LogOut, X,
    Loader2, Layout, Database, Camera
} from 'lucide-react';
import { getWorks, createWork, updateWork, deleteWork } from '../services/api';

const CATEGORIES = ["Wedding", "Motorgraphy", "Events", "Cinematography", "Other"];

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem('admin_token') || '');

    // State
    const [works, setWorks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [currentWork, setCurrentWork] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        title: '',
        category: 'Wedding',
        description: '',
        coverImage: '',
        images: [] as string[],
        template: 'wedding',
        type: 'photo'
    });

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchWorks();
    }, [token]);

    const fetchWorks = async () => {
        setIsLoading(true);
        try {
            const data = await getWorks();
            const validData = (data as any[]).filter(item => item && (item.title || item.test));
            setWorks(validData);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const openModal = (work?: any) => {
        if (work) {
            setCurrentWork(work);
            setFormData(work);
        } else {
            setCurrentWork(null);
            setFormData({
                title: '', category: 'Wedding', description: '',
                coverImage: '', images: [], template: 'wedding', type: 'photo'
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await deleteWork(token, id);
            fetchWorks();
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (currentWork) await updateWork(token, currentWork.id, formData);
            else await createWork(token, formData);

            setShowModal(false);
            fetchWorks();
        } catch (e) {
            console.error(e);
            alert('Save Failed! The total size of images is too large for the Free Database. Please use URLs or smaller files.');
        } finally {
            setIsSaving(false);
        }
    };

    // --- RENDER HELPERS ---

    const StatsCard = ({ icon: Icon, label, value, color }: any) => (
        <div className="bg-[#111] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-32 ${color} opacity-5 blur-[80px] rounded-full group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl text-white/70">
                    <Icon size={24} />
                </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{label}</p>
        </div>
    );

    const filteredWorks = works || [];

    return (
        <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30 overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col justify-between bg-[#0A0A0A] z-20 transition-all duration-300">
                <div>
                    <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
                            <span className="font-black text-lg">A</span>
                        </div>
                        <span className="hidden lg:block ml-4 font-bold tracking-tight text-lg">Anti Gravity</span>
                    </div>

                    <nav className="p-4 space-y-2">
                        <button className="w-full flex items-center gap-4 p-4 bg-white/5 text-white rounded-2xl transition-all">
                            <Layout size={20} className="text-orange-500" />
                            <span className="hidden lg:block text-sm font-bold opacity-100">Dashboard</span>
                        </button>
                    </nav>
                </div>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block text-xs font-black tracking-widest uppercase">Logout</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto relative CustomScrollbar">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Overview</h1>
                        <p className="text-xs text-zinc-500 font-mono">System Online</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => openModal()}
                            className="bg-orange-600 hover:bg-orange-500 text-white pl-4 pr-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-900/30 transition-all active:scale-95"
                        >
                            <Plus size={16} /> New Entry
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard icon={Database} label="Total Projects" value={works?.length || 0} color="bg-blue-500" />
                        <StatsCard icon={Camera} label="Media Assets" value="-" color="bg-purple-500" />
                    </div>

                    {/* Content Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-orange-500 rounded-full" />
                            Recent Uploads
                        </h2>

                        {isLoading ? (
                            <div className="h-60 flex items-center justify-center text-zinc-500 gap-3">
                                <Loader2 className="animate-spin" /> Fetching Data...
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <AnimatePresence>
                                    {filteredWorks?.length > 0 ? (
                                        filteredWorks.map((work, i) => (
                                            <motion.div
                                                key={work.id || i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl"
                                            >
                                                {/* Image Area */}
                                                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900">
                                                    <img
                                                        src={work.coverImage || (work.images && work.images[0]) || 'https://via.placeholder.com/400?text=No+Image'}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase border border-white/10">
                                                            {work.category || 'Test'}
                                                        </span>
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                                        <button onClick={() => openModal(work)} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button onClick={() => handleDelete(work.id)} className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Info Area */}
                                                <div className="p-6">
                                                    <h3 className="font-bold text-lg mb-1 truncate">{work.title || 'Untitled Work'}</h3>
                                                    <p className="text-zinc-500 text-xs line-clamp-2">{work.description || 'No description provided.'}</p>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="col-span-full border border-dashed border-white/10 rounded-3xl p-12 text-center text-zinc-500">
                                            <p>No projects found. Create your first one!</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- MODAL --- */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-50">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowModal(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />

                            {/* Slide Panel */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="absolute right-0 top-0 h-full w-full max-w-2xl bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex flex-col"
                            >
                                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#141414]">
                                    <h2 className="text-2xl font-black uppercase tracking-tight">
                                        {currentWork ? 'Edit Project' : 'New Project'}
                                    </h2>
                                    <button onClick={() => setShowModal(false)}><X /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 CustomScrollbar">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold font-mono text-zinc-500 uppercase">Project Identity</label>
                                        <input
                                            placeholder="Project Title"
                                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 text-lg font-bold focus:border-orange-500/50 outline-none transition-all"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                        <select
                                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 outline-none font-medium"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold font-mono text-zinc-500 uppercase">Cover Image Path</label>
                                        <p className="text-[10px] text-zinc-600 mb-2">Copy to <code className="text-orange-500">public</code> folder &rarr; type path (e.g. <code className="text-zinc-400">/photo1.jpg</code>) OR paste full URL.</p>

                                        <div className="aspect-video relative rounded-3xl bg-[#1A1A1A] border-2 border-dashed border-white/5 overflow-hidden">
                                            {formData.coverImage ? (
                                                <img src={formData.coverImage} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => console.error("Cover Error", e)} />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700">
                                                    <span className="text-[10px] font-bold uppercase">No Image Set</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[10px] font-mono text-zinc-600 mt-1">
                                            Attempting to load: <span className="text-orange-500">{formData.coverImage || '(empty)'}</span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter path (e.g. /my-photo.jpg) or URL..."
                                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 text-xs text-zinc-400 focus:border-orange-500/50 outline-none"
                                            value={formData.coverImage}
                                            onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                                        />
                                    </div>

                                    {/* Gallery Section - Manual Mode */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold font-mono text-zinc-500 uppercase flex justify-between">
                                            <span>Gallery Assets</span>
                                            <span>{formData.images.length} items</span>
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {formData.images.map((img, i) => (
                                                <div key={i} className="aspect-square relative rounded-xl bg-[#1A1A1A] overflow-hidden group">
                                                    <img src={img} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                                                        className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                                                    >
                                                        <Trash2 size={16} className="text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                name="galleryUrl"
                                                placeholder="Enter path (e.g. /gallery/pic1.jpg) or URL..."
                                                className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl p-3 text-xs text-zinc-400 focus:border-orange-500/50 outline-none"
                                                onKeyDown={(e: any) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        const val = e.target.value.trim();
                                                        if (val) {
                                                            setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                                                            e.target.value = '';
                                                        }
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                    if (input && input.value) {
                                                        const val = input.value.trim();
                                                        if (val) {
                                                            setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                                                            input.value = '';
                                                        }
                                                    }
                                                }}
                                                className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-xl text-xs font-bold"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold font-mono text-zinc-500 uppercase">Description</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 outline-none resize-none"
                                            placeholder="Project description..."
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </form>

                                <div className="p-8 border-t border-white/10 bg-[#141414] flex gap-4">
                                    <button onClick={handleSubmit} disabled={isSaving} className="flex-1 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold py-4">
                                        {isSaving ? 'Saving...' : 'Save Project'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
            <style>{`
                .CustomScrollbar::-webkit-scrollbar { width: 6px; }
                .CustomScrollbar::-webkit-scrollbar-track { background: transparent; }
                .CustomScrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            `}</style>
        </div>
    );
};
