
import React, { useState } from 'react';
import { MENU_ITEMS, CATEGORIES, MENU_IMAGES } from '../constants';
import { Utensils, Star, Image, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  const isSignature = (name: string) => 
    ['Ftour Al-Fourchette', 'Tajine de Viande aux Pruneaux', 'Couscous Royal (Vendredi)', 'Jus d\'Avocat Royal'].includes(name);

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % MENU_IMAGES.length);
    resetView();
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + MENU_IMAGES.length) % MENU_IMAGES.length);
    resetView();
  };

  const resetView = () => {
    setIsZoomed(false);
    const container = document.getElementById('menu-scroll-container');
    if (container) container.scrollTop = 0;
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <section id="menu" className="py-32 bg-[#2D1409] relative overflow-hidden">
      {/* Subtle Ambient Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[140px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
      <div className="absolute inset-0 bg-zellige opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <span className="inline-block px-5 py-2 bg-white/5 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] rounded-full">
              L'Excellence du Beldi Authentique
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">Le Menu <span className="text-[#D4AF37] italic opacity-90">Héritage Beldi</span></h2>
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
            <Utensils size={24} className="text-[#D4AF37]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#D4AF37]/30 to-transparent"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
             <p className="text-stone-300/80 text-lg md:text-xl font-light italic max-w-xl leading-relaxed">
              "Un héritage culinaire transmis de génération en génération, <span className="text-[#D4AF37] not-italic font-medium">revisité avec noblesse</span>."
            </p>
            <button 
              onClick={() => {
                setShowGallery(true);
                document.body.style.overflow = 'hidden';
              }}
              className="flex items-center gap-3 px-8 py-4 bg-[#3D1C10] text-[#D4AF37] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-2xl group border border-[#D4AF37]/20"
            >
              <ZoomIn size={18} className="group-hover:scale-110 transition-transform" />
              VOIR LE MENU ILLUSTRÉ (HD)
            </button>
          </div>
        </div>

        {/* Sélecteur de Catégories */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-24">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-8 py-4 text-xs font-black tracking-[0.2em] uppercase transition-all duration-500 rounded-2xl ${
                activeCategory === category 
                ? 'bg-[#D4AF37] text-white shadow-2xl scale-105 border border-white/20' 
                : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille des Plats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-baseline gap-4 mb-3">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-500">
                    {item.name}
                  </h3>
                  {isSignature(item.name) && (
                    <span className="flex items-center gap-1 text-[8px] font-black bg-[#D4AF37] text-white px-2 py-1 rounded-md uppercase tracking-tighter shadow-sm">
                      <Star size={8} fill="currentColor" /> Signature
                    </span>
                  )}
                </div>
                <div className="flex-1 border-b border-white/10 mb-2 opacity-30"></div>
                <span className="text-[#D4AF37] font-serif font-bold text-2xl whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              <p className="text-stone-400/80 text-base md:text-lg italic font-light leading-relaxed pr-12 group-hover:text-stone-200 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox HD */}
      {showGallery && (
        <div className="fixed inset-0 z-[300] bg-black/98 backdrop-blur-3xl flex items-center justify-center animate-fade-in">
          <div className="fixed top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 z-[360] bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-[10px] font-black tracking-widest uppercase">Carte Page {currentImgIndex + 1} / {MENU_IMAGES.length}</span>
              <button 
                onClick={toggleZoom}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#D4AF37] text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {isZoomed ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                {isZoomed ? "Plein Écran" : "Zoom Lecture"}
              </button>
            </div>
            
            <button 
              onClick={() => {
                setShowGallery(false);
                setIsZoomed(false);
                document.body.style.overflow = 'auto';
              }}
              className="p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>
          
          <button onClick={prevImg} className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-[#D4AF37] z-[350] transition-all">
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          <button onClick={nextImg} className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-[#D4AF37] z-[350] transition-all">
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          <div id="menu-scroll-container" className="w-full h-full overflow-y-auto pt-24 pb-32 px-4 md:px-20 flex flex-col items-center custom-scrollbar">
            <div className={`transition-all duration-700 ease-in-out ${isZoomed ? 'max-w-7xl' : 'max-w-4xl'} w-full`}>
              <img 
                src={MENU_IMAGES[currentImgIndex]} 
                alt="Menu Page" 
                className="w-full h-auto shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-sm border border-white/5"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
