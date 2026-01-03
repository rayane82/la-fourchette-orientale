
import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Ahm Maj",
    date: "Il y a une semaine",
    content: "Une expérience irréprochable du début à la fin. Tout est parfaitement maîtrisé, de l’accueil jusqu’au passage en caisse. Le service est professionnel et attentionné, les plats sont savoureux et bien présentés, et l’équipe — serveuse comme personnel en caisse — fait preuve d’un réel sens du détail. L’ambiance intérieure est chaleureuse, la décoration soignée et moderne. Mention spéciale pour l’attention portée aux enfants, avec des jeux pensés pour leur confort, ce qui rend l’expérience familiale particulièrement agréable. Une adresse de référence à Oujda.",
    rating: 5
  },
  {
    name: "Sama Zabini",
    date: "Il y a 4 mois",
    content: "Restaurant magnifique !! J’ai adoré chaque plat que j’ai mangé mais les brochettes de viande j’en rêve encore dans mon sommeil 😍😍 la serveuse était géniale, propreté irréprochable et l’ambiance très cosy !! En plus c’est un trop beau restaurant, la déco est bien faite (je vous laisse les photos). Bref je regrette pas et j’étais choquée que les prix soient aussi abordables.",
    rating: 5
  },
  {
    name: "Sylvie F",
    date: "Il y a un mois",
    content: "Très bon déjeuner dans ce restaurant qui propose des plats traditionnels mais aussi des burgers. Service impeccable sans chichi, petit amuse-bouche, plats savoureux.",
    rating: 5
  },
  {
    name: "Claire NACHER",
    date: "Il y a 8 mois",
    content: "Super lieu, nous sommes venus en famille à 7, nous avons été très bien accueillis, servis assez rapidement et les plats étaient très bons ! Nous y retournons dès demain pour un couscous !",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute inset-0 bg-zellige opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 bg-[#06402B]/5 border border-[#D4AF37]/30 text-[#06402B] text-[10px] font-black uppercase tracking-[0.5em] rounded-full mb-6">
            Paroles de nos convives
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#06402B]">
            Vos moments <span className="text-[#D4AF37] italic">partagés</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <button 
            onClick={() => scroll('left')}
            className="p-4 bg-white border border-stone-200 rounded-full text-[#06402B] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all shadow-md active:scale-90"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 bg-white border border-stone-200 rounded-full text-[#06402B] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all shadow-md active:scale-90"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="min-w-full md:min-w-[calc(50%-1rem)] snap-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100 relative group transition-all duration-500 flex flex-col justify-between"
            >
              <div className="absolute top-8 right-12 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors">
                <Quote size={80} strokeWidth={1} />
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#D4AF37]" fill="currentColor" />
                  ))}
                </div>

                <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-10 font-light italic relative z-10">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-stone-50 pt-8 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#06402B]/5 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#06402B] text-xl">{t.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-1">{t.date}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full text-[10px] font-black text-stone-400 uppercase tracking-widest">
                   Avis Certifié
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
