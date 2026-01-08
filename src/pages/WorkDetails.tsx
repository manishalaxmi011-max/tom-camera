import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { ArrowLeft, Star, Heart, Zap, Aperture, Loader2 } from 'lucide-react';
import { getWork } from '../services/api';

interface WorkItem {
    id: string;
    title: string;
    category: string;
    description: string;
    coverImage?: string;
    images: string[];
    template: 'wedding' | 'motor' | 'event' | 'cinema';
}

type DetailsProps = {
    data: WorkItem;
    images: string[];
    navigate: (path: string) => void;
};

// --- TEMPLATE: WEDDING (Light, Elegant, Serif) ---
const WeddingLayout = ({ data, images, navigate }: DetailsProps) => (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2a2a2a] selection:bg-rose-200 overflow-x-hidden relative">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Navbar theme="light" />
        <HamburgerMenu />
        <motion.div
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="pt-32 pb-40 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
            <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/work')} className="flex items-center gap-3 text-gray-400 hover:text-rose-500 transition-all duration-500 mb-16 group"><div className="w-8 h-[1px] bg-gray-300 group-hover:w-12 group-hover:bg-rose-500 transition-all" /><span className="uppercase tracking-[0.3em] text-[10px] font-bold">The Archives</span></motion.button>

            <div className="text-center max-w-4xl mx-auto mb-32">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-10 flex justify-center"><div className="relative"><Heart size={40} className="text-rose-300" strokeWidth={1} /><motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-rose-200 blur-xl rounded-full" /></div></motion.div>
                <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-7xl md:text-[10rem] font-serif font-light tracking-tighter mb-10 leading-[0.9]">{data.title}</motion.h1>
                <motion.div initial={{ width: 0 }} animate={{ width: 100 }} className="h-[1px] bg-rose-200 mx-auto mb-10" />
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl md:text-3xl text-gray-400 font-serif leading-relaxed italic max-w-2xl mx-auto">{data.description}</motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`relative group overflow-hidden ${i === 0 ? 'md:col-span-12 h-[80vh]' : ''} ${i === 1 ? 'md:col-span-5 aspect-[4/5] md:mt-[-10%]' : ''} ${i === 2 ? 'md:col-span-7 aspect-[3/2]' : ''} ${i === 3 ? 'md:col-span-12 aspect-[21/9] mt-12' : ''}`}
                    >
                        <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 2 }} src={img} referrerPolicy="no-referrer" alt="Wedding Story" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2s]" />
                        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/20 to-transparent"><span className="text-white font-serif italic text-sm">Frame {i + 1} // Eternal Moments</span></div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-40 text-center"><span className="font-serif italic text-gray-300 text-6xl opacity-20 block">The End</span></div>
        </div>
    </div>
);

// --- TEMPLATE: MOTORGRAPHY / CINEMA ---
const MotorLayout = ({ data, images, navigate }: DetailsProps) => (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-orange-500 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] line-noise" />
        <Navbar theme="dark" />
        <HamburgerMenu />
        <div className="fixed inset-0 pointer-events-none opacity-20 border-[20px] border-white/5 z-50">
            {/* HUD */}
        </div>
        <div className="pt-32 pb-20 px-6 max-w-[1900px] mx-auto relative z-10 font-mono">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 border-b border-white/10 pb-10">
                <div className="space-y-2 mb-8 md:mb-0">
                    <button onClick={() => navigate('/work')} className="flex items-center gap-3 text-orange-500 hover:text-white transition-all group"><ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /><span className="uppercase text-[10px] tracking-[0.5em] font-black">Return_Home</span></button>
                    <div className="flex gap-4 text-[9px] text-zinc-600 tracking-widest"><span>LAT: 52.3676° N</span><span>LON: 4.9041° E</span></div>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                    <div className="flex gap-2 items-center text-[10px] font-black italic"><span className="px-2 py-0.5 bg-orange-600 text-black">REC ●</span><span className="tracking-[0.3em]">REL.2025.v01</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40">
                <div className="relative">
                    <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "anticipate" }}>
                        <span className="text-orange-500 font-black text-xs tracking-[0.4em] mb-4 block uppercase whitespace-nowrap overflow-hidden border-r border-orange-500 animate-typing">SYSTEMS ONLINE // PROJECT_{data.category.toUpperCase()}</span>
                        <h1 className="text-7xl md:text-[12rem] font-black uppercase leading-[0.75] mb-8 tracking-tighter mix-blend-difference">{data.title.split(' ').map((word, i) => (<motion.span key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} className="block">{word}</motion.span>))}</h1>
                    </motion.div>
                </div>
                <div className="flex flex-col justify-end pb-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/5 border border-white/10 p-10 backdrop-blur-3xl rounded-3xl"><div className="w-10 h-1 bg-orange-600 mb-6" /><p className="text-xl text-zinc-400 leading-relaxed font-light tracking-wide italic">{data.description}</p></motion.div>
                </div>
            </div>

            <div className="space-y-12">
                {images.map((img, i) => (
                    <motion.div key={i} initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }} whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.8 }} className={`relative w-full overflow-hidden group perspective-1000 ${i % 3 === 0 ? 'h-[90vh]' : 'h-[60vh]'} rounded-[2rem] border border-white/5 shadow-3xl`}>
                        <motion.img whileHover={{ scale: 1.1, rotate: 1 }} transition={{ duration: 3 }} src={img} referrerPolicy="no-referrer" alt="High Performance" className="w-full h-full object-cover transition-all duration-[3s]" />
                        {/* Viewfinder Overlay */}
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

// --- TEMPLATE: EVENTS ---
const EventLayout = ({ data, images, navigate }: DetailsProps) => (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-purple-500 overflow-x-hidden relative">
        <Navbar theme="dark" />
        <HamburgerMenu />
        <div className="fixed top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-purple-600/20 rounded-full blur-[160px] animate-pulse" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto relative z-10">
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/work')} className="bg-white/5 hover:bg-white text-white hover:text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest mb-16 transition-all border border-white/10 flex items-center gap-3 w-fit"><ArrowLeft size={16} /> All Events</motion.button>

            <div className="relative mb-60 h-[70vh] flex flex-col justify-center">
                <motion.h1 initial={{ scale: 0.5, opacity: 0, rotate: -5 }} animate={{ scale: 1, opacity: 1, rotate: -2 }} transition={{ duration: 1, type: "spring" }} className="text-8xl md:text-[14rem] font-black uppercase italic tracking-tighter relative z-30 leading-[0.8] mix-blend-exclusion">{data.title}</motion.h1>
                <motion.div initial={{ x: 200, opacity: 0, rotate: 15 }} animate={{ x: 0, opacity: 1, rotate: 5 }} transition={{ delay: 0.3, duration: 1 }} className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[500px] z-10">
                    <div className="relative group w-full h-full">
                        {images.length > 0 && (
                            <>
                                <img src={images[0]} referrerPolicy="no-referrer" alt="Event Focus" className="w-full h-full object-cover rounded-[3rem] border-8 border-white/10 shadow-4xl rotate-3 group-hover:rotate-1 transition-all duration-700" />
                                <div className="absolute -top-10 -right-10 bg-purple-600 text-white font-black p-6 rounded-3xl rotate-12 shadow-2xl z-40 transform hover:scale-110 transition-transform"><span className="text-xl">LIVE ON STAGE</span></div>
                            </>
                        )}
                    </div>
                </motion.div>
                <div className="mt-20 max-w-2xl bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl self-start">
                    <div className="flex gap-2 mb-6">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="text-yellow-400 fill-yellow-400" size={20} />)}</div>
                    <p className="text-3xl font-black leading-tight uppercase italic">{data.description}</p>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {images.slice(1).map((img, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }} initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="break-inside-avoid relative group rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl">
                        <img src={img} referrerPolicy="no-referrer" alt="Event Vibe" className="w-full transition-transform duration-[2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <motion.div whileHover={{ rotate: 360 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md rounded-full"><Zap size={32} fill="currentColor" /></motion.div>
                    </motion.div>
                ))}
            </div>
            <div className="py-40 text-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="inline-block p-10 border-4 border-dashed border-white/10 rounded-full"><Star size={100} className="text-white/5" /></motion.div></div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---
export const WorkDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState<WorkItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchWork = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await getWork(id);
                setWork(data as any);
            } catch (err) {
                console.error("Failed to fetch work", err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWork();
    }, [id]);

    if (isLoading) {
        return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Loader2 size={48} className="text-orange-500" /></motion.div></div>;
    }

    if (error || !work) {
        return <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white gap-6"><Aperture size={64} className="text-gray-800" /><div className="text-center"><h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Repository Error</h2></div><button onClick={() => navigate('/work')} className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm uppercase hover:bg-orange-500 hover:text-white transition-all">Back to Work</button></div>;
    }

    const allImages = work.coverImage ? [work.coverImage, ...(work.images || [])] : (work.images || []);
    const template = work.template || 'event';

    // RENDER
    let LayoutComponent = EventLayout;
    if (template === 'wedding') LayoutComponent = WeddingLayout;
    if (template === 'motor' || template === 'cinema') LayoutComponent = MotorLayout;

    return <LayoutComponent data={work} images={allImages} navigate={navigate} />;
};
