
import React, { useState } from 'react';
import { Calendar, Users, Phone, User, Clock, CheckCircle2, AlertCircle, MessageCircle, Smartphone, Info } from 'lucide-react';
import { Reservation } from '../types';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '12:00'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcul des limites de date (Aujourd'hui -> +7 jours)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const timeSlots = [];
  for (let hour = 10; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 17) timeSlots.push(`${hour}:30`);
  }

  const validateBooking = () => {
    if (!formData.date) return "Veuillez choisir une date.";
    
    const [year, month, day] = formData.date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0) {
      return "Nous sommes fermés le dimanche. Merci de demander un autre jour.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateBooking();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const existingRaw = localStorage.getItem('reservations');
        const existingReservations = existingRaw ? JSON.parse(existingRaw) : [];
        
        const requestEntry: Reservation = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
          status: 'En attente',
          clientType: 'Nouveau',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('reservations', JSON.stringify([...existingReservations, requestEntry]));

        setIsSubmitting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', phone: '', guests: 2, date: '', time: '12:00' });
        }, 15000);
      } catch (err) {
        setIsSubmitting(false);
        setError("Erreur technique. Veuillez nous contacter directement.");
      }
    }, 1500);
  };

  return (
    <section id="reservation" className="py-24 bg-[#042D1E] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-zellige"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase">DEMANDER UNE <span className="text-[#D4AF37] italic">TABLE</span></h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* OPTION 1 : FORMULAIRE SITE */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-stone-900 border-t-8 border-[#D4AF37] flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#06402B] rounded-full flex items-center justify-center text-white font-black shadow-md">1</div>
              <h3 className="font-serif text-2xl font-bold text-[#06402B]">Demande de réservation en ligne</h3>
            </div>

            {isSuccess ? (
              <div className="flex-1 flex flex-col justify-center text-center py-10 animate-fade-in">
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-[#06402B]">Demande envoyée !</h4>
                <div className="mt-6 p-6 bg-[#2D140D]/5 rounded-3xl border-2 border-[#D4AF37]/20">
                  <p className="text-[#06402B] font-bold text-base leading-relaxed">
                    Merci pour votre confiance. Votre réservation sera validée par <span className="text-[#2D140D] font-black underline decoration-[#D4AF37]">appel téléphonique</span> ou <span className="text-[#2D140D] font-black underline decoration-[#D4AF37]">message WhatsApp</span> dans les plus brefs délais.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase border border-red-100 flex items-center gap-2 animate-shake"><AlertCircle size={14}/>{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Votre Nom</label>
                    <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5"/><input type="text" required placeholder="Ex: M. Alaoui" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}/></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Tél / WhatsApp</label>
                    <div className="relative"><Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5"/><input type="tel" required placeholder="06..." className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium transition-all" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}/></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Date (Max 7j)</label>
                    <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5"/><input type="date" required min={minDate} max={maxDate} className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium transition-all cursor-pointer" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}/></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Heure</label>
                    <div className="relative"><Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5"/><select className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium appearance-none cursor-pointer" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })}>{timeSlots.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Couverts</label>
                    <div className="relative"><Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5"/><select className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium appearance-none cursor-pointer" value={formData.guests} onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} pers.</option>)}</select></div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2D140D]/5 p-5 rounded-2xl border border-[#D4AF37]/20 mb-2">
                  <Info size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-[12px] font-semibold text-[#2D140D] leading-relaxed">
                    Note d'excellence : Votre demande sera <span className="font-black text-[#06402B]">validée par appel téléphonique ou message WhatsApp</span> pour garantir un service sur-mesure.
                  </p>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#06402B] text-[#D4AF37] font-black rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs active:scale-[0.98]">{isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER MA DEMANDE'}</button>
                <p className="text-[9px] text-stone-400 text-center italic">Service de 10h00 à 17h00 • Fermé le Dimanche</p>
              </form>
            )}
          </div>

          {/* OPTION 2 : CONTACT DIRECT */}
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center backdrop-blur-sm group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-black shadow-md">2</div>
                <h3 className="font-serif text-2xl font-bold">Demande via WhatsApp ou Tél</h3>
              </div>
              <p className="text-stone-400 mb-8 leading-relaxed font-light">Vous préférez un échange immédiat ? Contactez directement notre équipe pour une prise en charge prioritaire.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/212770454031" target="_blank" className="flex items-center gap-4 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl hover:bg-green-500 hover:text-white transition-all group shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:bg-white group-hover:text-green-500 transition-all"><MessageCircle size={24}/></div>
                  <div><span className="text-[9px] uppercase font-black block opacity-60 tracking-widest">WhatsApp</span><span className="font-bold text-lg">0770-454031</span></div>
                </a>
                <a href="tel:0536680010" className="flex items-center gap-4 p-5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all group shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-white group-hover:text-[#D4AF37] transition-all"><Phone size={24}/></div>
                  <div><span className="text-[9px] uppercase font-black block opacity-60 tracking-widest">Téléphone Fixe</span><span className="font-bold text-lg">0536-680010</span></div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingForm;
