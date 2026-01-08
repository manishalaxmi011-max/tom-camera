import React from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
    theme?: 'light' | 'dark'; // 'light' = dark text (for light bg), 'dark' = white text (for dark bg)
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'light' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // text-white for dark theme, text-[#1a1a1a] for light theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-[#1a1a1a]';
    const pillBg = theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-white/40 border-white/20';
    const pillText = theme === 'dark' ? 'text-white' : 'text-[#1a1a1a]';

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({ label, path, onClick }: { label: string, path?: string, onClick?: () => void }) => {
        const active = path ? isActive(path) : false;

        return (
            <span
                onClick={() => {
                    if (onClick) onClick();
                    else if (path) navigate(path);
                }}
                className={`
                    px-5 py-2 rounded-full cursor-pointer transition-all duration-300
                    ${active ? 'bg-[#C86D45] text-white shadow-lg' : `hover:text-[#C86D45] ${pillText}`}
                `}
            >
                {label}
            </span>
        );
    };

    return (
        <nav className={`absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-8 bg-transparent ${textColor}`}>

            {/* Logo */}
            <div onClick={() => navigate('/')} className="text-xl font-bold tracking-tighter uppercase cursor-pointer z-50">
                LUMIX
            </div>

            {/* Center Menu (Glassy Pill) */}
            <div className={`hidden md:flex ${pillBg} backdrop-blur-md rounded-full p-1 space-x-1 text-[11px] font-bold tracking-wider border items-center shadow-sm`}>
                <NavItem label="HOME" path="/" />
                <NavItem label="SERVICES" path="/services" />
                <NavItem label="WORK" path="/work" />
                <NavItem label="ABOUT US" path="/about" />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6 z-50">
                <Search size={18} className="cursor-pointer hover:scale-110 transition" />
                <div onClick={() => navigate('/contact')} className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition group">
                    <MessageCircle size={18} className="group-hover:text-[#C86D45] transition-colors" />
                    <span className="text-[11px] font-bold group-hover:text-[#C86D45] transition-colors">CONTACT US</span>
                </div>
            </div>
        </nav>
    );
};