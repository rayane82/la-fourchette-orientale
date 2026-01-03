
import React from 'react';
import { MapPin, Instagram, Facebook, Phone, Coffee, Lock, Navigation, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#042D1E] text-stone-400 py-12 relative overflow-hidden border-t border-[#D4AF37]/20">
      <div className="absolute inset-0 bg-zellige opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative inline-block mb-4">
              <img 
                src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
                alt="Logo" 
                className="h-16 w-16 rounded-full border-2 border-[#D4AF37] shadow-2xl"
              />
            </div>
            <h3 className="text-white text-lg font-bold mb-2 font-serif italic">La Fourchette Orientale</h3>
            <p className="text-xs leading-relaxed text-stone-400/80 text-center md:text-left">L'authenticité du beldi à Oujda. Une escale gastronomique d'exception au cœur de l'Oriental.</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-[0.2em] text-[9px]">
              <MapPin size={14} className="text-[#D4AF37]" /> Localisation
            </h4>
            <p className="text-xs mb-3 leading-relaxed text-stone-300 text-center md:text-left">
              Boulevard Mohammed Derfoufi,<br />
              60000 Oujda, Maroc
            </p>
            <div className="w-full h-28 rounded-xl overflow-hidden border border-white/10 mb-3 shadow-lg">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.935057632164!2d-1.9214227251546938!3d34.681588484239576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78650061ca7b8d%3A0xc6700e4e9b03f8ac!2sFourchette%20orientale!5e0!3m2!1sfr!2sma!4v1767469064092!5m2!1sfr!2sma" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mini Map"
              ></iframe>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=34.681588484239576,-1.9214227251546938" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#D4AF37] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              <Navigation size={10} /> Itinéraire
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-[9px]">Contact & Horaires</h4>
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 text-white">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <MessageCircle size={12} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 uppercase">WhatsApp</span>
                  <span className="text-sm font-bold">0770-454031</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/50">
                  <Phone size={12} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 uppercase tracking-tighter">Fixe</span>
                  <span className="text-sm font-bold">0536-680010</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/50">
                  <Mail size={12} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 uppercase tracking-tighter">Email</span>
                  <span className="text-xs font-bold break-all">fourchetteorientale.ma@gmail.com</span>
                </div>
              </div>
            </div>
            <ul className="text-[11px] space-y-2 w-full mt-6">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-stone-400">Lun - Sam</span>
                <span className="text-white font-bold">10:00 - 17:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-stone-400">Dimanche</span>
                <span className="text-white/30 italic text-[10px]">Fermé</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-[9px]">Suivez-nous</h4>
            <div className="flex gap-3 mb-6">
              <a href="https://www.instagram.com/fourchetteorientale.ma" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all border border-white/5 group">
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/fourchetteorientale.ma" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all border border-white/5 group">
                <Facebook size={16} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-[#D4AF37]/10 w-full">
               <Coffee size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
               <p className="text-[9px] italic leading-relaxed text-stone-400">"Un moment de partage sincère, comme à la maison."</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col items-center relative">
          <p className="text-[8px] uppercase tracking-[0.4em] font-medium text-stone-500 text-center">
            © {new Date().getFullYear()} La Fourchette Orientale
          </p>
          
          <button 
            onClick={() => onAdminClick()}
            className="opacity-20 hover:opacity-100 transition-all duration-300 absolute bottom-0 right-0 p-6 cursor-pointer z-20 group"
            title="Accès Gérant"
          >
            <Lock size={18} className="text-white group-hover:text-[#D4AF37] transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
