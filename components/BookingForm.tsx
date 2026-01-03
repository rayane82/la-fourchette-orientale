
import React, { useState } from 'react';
import { Calendar, Users, Phone, User, Clock, CheckCircle2, AlertCircle, MessageCircle, ShieldCheck, Smartphone, Mail } from 'lucide-react';
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

  // Calcul des limites de dates (Aujourd'hui -> J+7)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 7);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  // Génération des créneaux de 10h à 17h
  const timeSlots = [];
  for (let hour = 10; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 17) timeSlots.push(`${hour}:30`);
  }

  const validateBooking = () => {
    if (!formData.date) return "Veuillez choisir une date.";
    
    const [year, month, day] = formData.date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay(); // 0 est Dimanche

    // Vérification de la plage de 7 jours
    if (selectedDate < new Date(today.setHours(0,0,0,0)) || selectedDate > maxDateObj) {
      return "Les réservations sont limitées aux 7 prochains jours.";
    }

    if (dayOfWeek === 0) {
      return "Nous sommes fermés le dimanche. Merci de demander un autre jour.";
    }

    const [hour] = formData.time.split(':').map(Number);
    if (hour < 10 || hour > 17 || (hour === 17 && formData.time.includes('30'))) {
      return "Les demandes sont acceptées uniquement pour les services de 10h00 à 17h00.";
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

        const updatedReservations = [...existingReservations, requestEntry];
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));

        setIsSubmitting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', phone: '', guests: 2, date: '', time: '12:00' });
        }, 15000);
      } catch (err) {
        setIsSubmitting(false);
        setError("Erreur technique. Veuillez nous contacter directement par téléphone.");
      }
    }, 1500);
  };

  return (
    <section id="reservation" className="py-24 bg-[#042D1E] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-zellige"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Disponibilités</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 uppercase leading-tight">DEMANDER <br/>UNE <span className="text-[#D4AF37] italic">TABLE</span></h2>
            <p className="text-stone-300 mb-10 text-lg leading-relaxed font-light">
              Pour garantir une expérience d'exception, nous acceptons les demandes pour les <span className="text-white font-bold">7 prochains jours</span> uniquement.
              <span className="block mt-4 text-white font-medium italic">Nous vous recontacterons sous peu.</span>
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform border border-white/10">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold">WhatsApp</h4>
                  <p className="text-[#D4AF37] text-2xl font-black">0770-454031</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform border border-white/10">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold">Téléphone Fixe</h4>
                  <p className="text-white text-2xl font-black">0536-680010</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform border border-white/10">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold">E-mail</h4>
                  <p className="text-stone-300 text-sm lowercase font-medium">fourchetteorientale.ma@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group pt-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform border border-white/10">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold">Horaires</h4>
                  <p className="text-stone-300 text-sm">Lun - Sam: <span className="text-white font-bold">10:00 - 17:00</span></p>
                  <p className="text-red-400 text-[10px] uppercase font-black tracking-widest mt-1">Fermé le Dimanche</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-stone-900 border-t-4 border-[#D4AF37]">
            {isSuccess ? (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-green-100">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#06402B] mb-4">Demande Transmise</h3>
                <div className="space-y-4 text-stone-500 leading-relaxed max-w-sm mx-auto">
                  <p className="font-medium text-stone-800">Merci de votre patience.</p>
                  <p className="text-sm">
                    Veuillez attendre notre <span className="text-[#A0522D] font-bold">confirmation officielle</span> par <span className="font-bold">WhatsApp</span> ou par <span className="font-bold">téléphone</span>.
                  </p>
                  <div className="pt-6 border-t border-stone-100 mt-6">
                    <p className="text-[10px] uppercase tracking-widest opacity-50 italic">La table n'est réservée qu'après validation explicite.</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
                    <AlertCircle size={20} className="shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-tight">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Votre Identité</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
                    <input
                      type="text" required placeholder="Nom complet"
                      className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all font-medium"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Numéro de Contact</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
                      <input
                        type="tel" required placeholder="Mobile ou WhatsApp"
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all font-medium"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Nombre d'invités</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
                      <select
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all font-medium appearance-none"
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Date (Max 7 jours)</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
                      <input
                        type="date" required
                        min={minDate}
                        max={maxDate}
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all font-medium"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Horaire souhaité</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
                      <select
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all font-medium appearance-none"
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                      >
                        {timeSlots.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full py-5 bg-[#D4AF37] hover:bg-[#06402B] text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    {isSubmitting ? 'TRANSMISSION...' : 'ENVOYER MA DEMANDE'}
                  </button>
                  
                  <div className="mt-4 p-4 bg-stone-50 border border-stone-100 rounded-2xl flex items-start gap-3 shadow-sm">
                    <ShieldCheck className="text-[#D4AF37] shrink-0 w-4 h-4 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-stone-900 uppercase tracking-widest leading-none">
                        Validation Manuelle
                      </p>
                      <p className="text-[10px] text-stone-500 font-medium leading-relaxed">
                        Ceci est une <span className="text-[#06402B] font-bold">demande de table</span>. Votre réservation est effective uniquement après confirmation par <span className="text-[#D4AF37] font-bold">WhatsApp (0770-454031)</span> ou appel téléphonique.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
