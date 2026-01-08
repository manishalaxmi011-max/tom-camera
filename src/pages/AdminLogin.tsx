import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Camera } from 'lucide-react';
import { login } from '../services/api';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await login(username, password);
            localStorage.setItem('admin_token', data.token);
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error("Login Error:", err);
            // Check for network/connection errors
            if (err.message && (err.message.includes('fetch') || err.message.includes('Network'))) {
                setError('Server unreachable. Ensure backend is running.');
            } else {
                setError('Invalid credentials');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-white">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-orange-600/10 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-orange-900/10 blur-[150px] rounded-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-white/5 rounded-3xl border border-white/10 mb-6 backdrop-blur-xl">
                        <Camera size={40} className="text-orange-500" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Systems <span className="text-orange-500">Access</span></h1>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all font-mono text-sm tracking-widest"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all font-mono text-sm tracking-widest"
                            required
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-mono text-center"
                        >
                            ACCESS_DENIED: {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? 'AUTHENTICATING...' : 'ENTER SYSTEM'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">
                        Terminal V1.0.4 // Connection Secure
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
