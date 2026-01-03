
import React from 'react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
        <img 
          src="https://i.postimg.cc/vHdB2JV4/unnamed-(11)-Photoroom.png" 
          alt="Atmosphère Fourchette Orientale" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#06402B]/90"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          S'asseoir comme <span className="text-[#D4AF37] italic">chez soi</span>
        </h1>
        
        {/* Slogan encore plus discret (text-base md:text-lg) */}
        <p className="text-base md:text-lg text-stone-200 mb-14 font-light tracking-wide max-w-2xl mx-auto opacity-0 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Découvrez une escale culinaire à Oujda où l’héritage marocain se savoure dans un <span className="text-[#D4AF37] font-medium">cadre chaleureux et soigné</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <button 
            onClick={() => scrollTo('reservation')}
            className="group relative px-12 py-5 bg-[#D4AF37] text-white font-bold rounded-full overflow-hidden transition-all shadow-2xl min-w-[240px]"
          >
            <span className="relative z-10 tracking-widest uppercase text-sm">DEMANDER UNE TABLE</span>
            <div className="absolute inset-0 bg-[#06402B] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <button 
            onClick={() => scrollTo('menu')}
            className="px-12 py-5 border border-white/30 text-white font-bold rounded-full backdrop-blur-md hover:bg-white hover:text-[#06402B] transition-all min-w-[240px] tracking-widest uppercase text-sm"
          >
            DÉCOUVRIR LE MENU
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
