
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#F9F6F2] relative overflow-hidden">
      <div className="absolute inset-0 bg-zellige opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#A0522D] text-[10px] font-black uppercase tracking-[0.5em] rounded-full mb-6">
            Localisation
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#06402B] mb-6">Nous <span className="text-[#D4AF37] italic">Trouver</span></h2>
          <div className="flex items-center justify-center gap-4 text-stone-500 uppercase tracking-widest text-xs font-bold">
            <MapPin size={18} className="text-[#D4AF37]" />
            Boulevard Mohammed Derfoufi, Oujda, Maroc
          </div>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          {/* Decorative Frame */}
          <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-[3rem] pointer-events-none group-hover:scale-[1.01] transition-transform duration-700"></div>
          
          {/* Map Container */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl bg-white p-3">
            <div className="h-[450px] w-full rounded-[1.8rem] overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.935057632164!2d-1.9214227251546938!3d34.681588484239576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78650061ca7b8d%3A0xc6700e4e9b03f8ac!2sFourchette%20orientale!5e0!3m2!1sfr!2sma!4v1767469064092!5m2!1sfr!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation La Fourchette Orientale"
              ></iframe>
            </div>
          </div>

          {/* Floating Navigation Button */}
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=34.681588484239576,-1.9214227251546938" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#06402B] text-[#D4AF37] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-[#D4AF37] hover:text-white transition-all group"
          >
            <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Ouvrir dans Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
