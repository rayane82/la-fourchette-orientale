
import React from 'react';
import { Heart, Home, Star, Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Brand Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5D2E17]/5 rounded-full blur-[120px]"></div>
      <div className="absolute inset-0 bg-zellige opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-full h-full border border-[#D4AF37]/20 rounded-[2.5rem] z-0 transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#06402B]/10 rounded-[2.5rem] z-0 transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1"></div>
            
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(93,46,23,0.15)] aspect-[4/5] bg-white p-3">
              <img 
                src="https://i.postimg.cc/HszjRSHg/images-(2).png" 
                alt="Intérieur traditionnel marocain" 
                className="w-full h-full object-cover rounded-[1.8rem] transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Floating Badge with Refined Accents */}
            <div className="absolute -bottom-10 -right-4 bg-white p-7 rounded-[2rem] shadow-2xl z-20 hidden lg:block border border-stone-100">
               <div className="flex items-center gap-3 mb-3">
                 <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <span className="text-[10px] font-black text-[#06402B] uppercase tracking-[0.3em]">Excellence Oujda</span>
               </div>
               <p className="font-serif italic text-xl text-[#06402B] leading-tight">
                 "L'Art de recevoir comme <br/>
                 <span className="text-[#D4AF37] not-italic font-sans font-black text-sm uppercase tracking-tighter">nulle part ailleurs</span>"
               </p>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="space-y-12">
            <div className="relative">
              {/* Green text badge with Gold border */}
              <span className="inline-block text-[#06402B] font-black tracking-[0.5em] uppercase text-[10px] mb-6 px-6 py-2.5 bg-[#06402B]/5 rounded-full shadow-sm border-2 border-[#D4AF37]">
                Notre Philosophie
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#06402B] leading-[1.1]">
                L’Art de l’Accueil <br/>
                <span className="text-[#5D2E17] italic font-normal opacity-90">Traditionnel</span>
              </h2>
              <div className="flex gap-2 mt-8">
                <div className="w-20 h-1.5 bg-[#D4AF37] rounded-full"></div>
                <div className="w-8 h-1.5 bg-[#5D2E17] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-[#06402B] text-2xl leading-relaxed font-serif italic opacity-90">
                "Plus qu'un restaurant, <span className="text-[#5D2E17]">une demeure</span>."
              </p>
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                Situé à Oujda, <span className="font-bold text-[#06402B]">La Fourchette Orientale</span> vous accueille dans un cadre où l’on s’assoit comme chez soi. Notre espace révèle le riche patrimoine et l’héritage précieux de notre pays.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white rounded-2xl text-[#D4AF37] shadow-sm border border-stone-100 group-hover:bg-[#5D2E17] group-hover:text-white transition-all duration-300">
                  <Home size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#06402B] text-lg mb-1 uppercase tracking-wider">Cadre Familier</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">Le confort d'un salon traditionnel marocain.</p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white rounded-2xl text-[#D4AF37] shadow-sm border border-stone-100 group-hover:bg-[#5D2E17] group-hover:text-white transition-all duration-300">
                  <Heart size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#06402B] text-lg mb-1 uppercase tracking-wider">Service de Cœur</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">Une équipe dévouée à votre bien-être.</p>
                </div>
              </div>
            </div>
            
            {/* Signature Quote Card with Deep Terracotta Border */}
            <div className="relative p-10 bg-[#06402B] rounded-[2.5rem] text-white shadow-2xl overflow-hidden group border-r-8 border-[#D4AF37]">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-110 transition-transform duration-700">
                <Quote size={80} />
              </div>
              <div className="absolute inset-0 bg-zellige opacity-5"></div>
              
              <div className="relative z-10">
                <p className="italic font-serif text-2xl leading-relaxed mb-6 text-stone-100">
                  "Entre saveurs marocaines généreuses et accueil bienveillant, chaque repas est un <span className="text-[#D4AF37] font-bold">véritable voyage</span>."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-[#D4AF37]"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">La Fourchette Orientale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
