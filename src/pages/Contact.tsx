import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Mail, MapPin, Phone, ArrowDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { HamburgerMenu } from '../components/HamburgerMenu';

// --- SERVICES DATA ---
const SERVICES = [
    "Wedding Photography", "Event Coverage", "Cinematography", "Motorgraphy",
    "Freelance / Creative", "Editing Lab", "Full Production", "Other"
];

export const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', service: '', project: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate "server"
        setTimeout(() => setStatus('sent'), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative min-h-screen bg-[#F3F0EA] text-[#1A1A1A] overflow-x-hidden selection:bg-orange-200"
        >
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <HamburgerMenu />

            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 flex flex-col items-center justify-center min-h-[60vh] text-center z-10">

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <span className="inline-block py-2 px-6 rounded-full border border-black/5 text-[#1A1A1A]/60 text-[10px] font-black tracking-[0.4em] uppercase mb-8 backdrop-blur-md bg-white/50">
                        Get In Touch
                    </span>
                    <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-8 uppercase text-[#1A1A1A]">
                        Let's Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                            Something Epic
                        </span>
                    </h1>
                    <p className="max-w-xl mx-auto text-xl font-light text-[#1A1A1A]/60 leading-relaxed">
                        We don't just take photos; we craft visual legacies.
                        Tell us about your vision, and we'll handle the rest.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A1A1A]/30"
                >
                    <ArrowDown className="w-6 h-6" />
                </motion.div>
            </section>

            {/* --- FORM & INFO SECTION --- */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-12 pt-12">
                        <div>
                            <h3 className="text-xs font-black tracking-widest uppercase text-[#1A1A1A]/40 mb-6">Contact Details</h3>
                            <div className="space-y-6">
                                <a href="mailto:hello@camera.com" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                        <Mail className="w-5 h-5 text-[#1A1A1A] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-lg font-medium text-[#1A1A1A] group-hover:text-orange-600 transition-colors">hello@camera.com</span>
                                </a>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                        <Phone className="w-5 h-5 text-[#1A1A1A] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-lg font-medium text-[#1A1A1A]">+1 (555) 000-0000</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                        <MapPin className="w-5 h-5 text-[#1A1A1A] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-lg font-medium text-[#1A1A1A]">Los Angeles, CA</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-black/10">
                            <h3 className="text-xs font-black tracking-widest uppercase text-[#1A1A1A]/40 mb-6">Follow Us</h3>
                            <div className="flex gap-4">
                                {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                                    <a key={social} href="#" className="text-sm font-bold text-[#1A1A1A]/60 hover:text-orange-600 uppercase tracking-wider transition-colors">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-2xl shadow-black/5 relative overflow-hidden"
                        >
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 opacity-80" />

                            <AnimatePresence mode="wait">
                                {status === 'sent' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-[400px] flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-600">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-black uppercase mb-4 text-[#1A1A1A]">Message Received</h3>
                                        <p className="text-[#1A1A1A]/50 max-w-md">We'll be in touch with you shortly to discuss your project.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-12">

                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="group relative">
                                                <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors ${activeField === 'name' ? 'text-orange-600' : 'text-[#1A1A1A]/40'}`}>
                                                    01. What's your name?
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    onFocus={() => setActiveField('name')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="John Doe"
                                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/20 focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>

                                            <div className="group relative">
                                                <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors ${activeField === 'email' ? 'text-orange-600' : 'text-[#1A1A1A]/40'}`}>
                                                    02. What's your email?
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    onFocus={() => setActiveField('email')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/20 focus:outline-none focus:border-orange-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Services Tags */}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-[#1A1A1A]/40">
                                                03. What are you interested in?
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {SERVICES.map((service) => (
                                                    <button
                                                        type="button"
                                                        key={service}
                                                        onClick={() => setFormState({ ...formState, service })}
                                                        className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${formState.service === service
                                                                ? 'bg-orange-600 border-orange-600 text-white'
                                                                : 'bg-black/5 border-black/5 text-[#1A1A1A]/60 hover:bg-black/10 hover:text-[#1A1A1A]'
                                                            }`}
                                                    >
                                                        {service}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Project Details */}
                                        <div className="group relative">
                                            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors ${activeField === 'project' ? 'text-orange-600' : 'text-[#1A1A1A]/40'}`}>
                                                04. Tell us about your project
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formState.project}
                                                onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                                                onFocus={() => setActiveField('project')}
                                                onBlur={() => setActiveField(null)}
                                                placeholder="Budget, timeline, vision..."
                                                className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-light text-[#1A1A1A] placeholder-[#1A1A1A]/20 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Submit Action */}
                                        <div className="pt-6 border-t border-black/5 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={status === 'sending'}
                                                className="group relative px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-black text-xs tracking-[0.3em] uppercase overflow-hidden hover:scale-105 transition-transform shadow-xl"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {status === 'sending' ? 'Sending...' : 'Send Request'}
                                                    {!status && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                                </span>
                                                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                            </button>
                                        </div>

                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};
