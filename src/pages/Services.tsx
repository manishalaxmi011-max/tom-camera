import { Navbar } from '../components/Navbar';
import { ServicesSection } from '../components/ServicesSection';
import { HamburgerMenu } from '../components/HamburgerMenu';

export const Services = () => {
    return (
        <div className="relative min-h-screen bg-[#0E0E0E]">
            {/* 
               Pass a className or prop to Navbar if we need to change text color.
               For now, we'll assume standard navbar. If needed we can adjust.
               Since background is dark, we might want to invert Navbar text.
            */}
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar theme="dark" />
            </div>

            <HamburgerMenu />

            <div className="pt-0"> {/* ServicesSection has its own padding */}
                <ServicesSection />
            </div>
        </div>
    );
};
