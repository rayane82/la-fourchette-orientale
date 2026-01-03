
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Accueil', id: 'accueil' },
    { name: 'À Propos', id: 'about' },
    { name: 'Le Menu', id: 'menu' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#06402B] shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <img 
                src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
                alt="Logo" 
                className="h-14 w-14 rounded-full border-2 border-[#D4AF37] transition-transform group-hover:scale-110 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping pointer-events-none"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-widest leading-none text-white">
                LA FOURCHETTE
              </span>
              <span className="text-xs tracking-[0.3em] font-light text-[#D4AF37]">
                ORIENTALE
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-xs font-bold tracking-widest uppercase transition-all relative group text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
                </button>
              ))}
              
              {/* Bouton Distinct "Demander une table" */}
              <button
                onClick={() => scrollTo('reservation')}
                className="px-6 py-3 bg-[#D4AF37] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-[#06402B] transition-all shadow-lg active:scale-95"
              >
                Demander une table
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors text-white bg-white/10"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#06402B] z-[-1] transition-transform duration-500 ease-in-out md:hidden ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="h-full flex flex-col justify-center items-center space-y-10 px-6">
          <div className="w-20 h-0.5 bg-[#D4AF37]"></div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-3xl font-serif text-white hover:text-[#D4AF37] transition-colors tracking-wider text-center"
            >
              {link.name}
            </button>
          ))}
          
          {/* Mobile CTA */}
          <button
            onClick={() => scrollTo('reservation')}
            className="px-10 py-5 bg-[#D4AF37] text-white text-sm font-black uppercase tracking-widest rounded-full shadow-2xl"
          >
            Demander une table
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
