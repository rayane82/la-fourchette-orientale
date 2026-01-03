
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LogOut, Check, X, Search, Clock, Users, Phone, User, Trash2, Calendar, ChevronRight, AlertCircle
} from 'lucide-react';
import { Reservation } from '../types';

interface FourchetteSecureProps {
  onClose: () => void;
}

const FourchetteSecure: React.FC<FourchetteSecureProps> = ({ onClose }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Chargement des données avec auto-refresh
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('reservations') || '[]');
      setReservations(data);
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Logique de tri : La visite la plus proche en premier
  const sortedReservations = useMemo(() => {
    return [...reservations].sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
      const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
      return dateTimeA - dateTimeB; // Ascendant : plus proche d'abord
    });
  }, [reservations]);

  // Filtrage par recherche
  const filteredReservations = useMemo(() => {
    return sortedReservations.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.phone.includes(searchTerm)
    );
  }, [sortedReservations, searchTerm]);

  const pendingList = filteredReservations.filter(r => r.status === 'En attente');
  const confirmedList = filteredReservations.filter(r => r.status === 'Confirmé');

  const updateStatus = (id: string, status: 'Confirmé' | 'Annulé' | 'En attente') => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  const deleteReservation = (id: string) => {
    if (confirm("⚠️ Attention : Supprimer définitivement cette fiche client ?")) {
      const updated = reservations.filter(r => r.id !== id);
      setReservations(updated);
      localStorage.setItem('reservations', JSON.stringify(updated));
    }
  };

  const ClientCard: React.FC<{ res: Reservation; type: 'pending' | 'confirmed' }> = ({ res, type }) => (
    <div className={`bg-white rounded-[2rem] p-6 border-2 transition-all duration-300 ${
      type === 'pending' ? 'border-stone-100 shadow-sm hover:shadow-md' : 'border-green-50 opacity-90'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm font-black text-[#D4AF37] tracking-tighter uppercase">Fiche Client</span>
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <User size={18} className="text-stone-400" /> {res.name}
          </h3>
        </div>
        <div className="bg-stone-50 px-3 py-1.5 rounded-xl flex items-center gap-2 border border-stone-100">
          <Users size={16} className="text-[#06402B]" />
          <span className="font-bold text-sm">{res.guests} pers.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#F9F6F2] p-3 rounded-2xl flex items-center gap-3">
          <Calendar size={16} className="text-[#D4AF37]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-400 leading-none mb-1">Date</p>
            <p className="text-xs font-bold">{new Date(res.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
          </div>
        </div>
        <div className="bg-[#F9F6F2] p-3 rounded-2xl flex items-center gap-3">
          <Clock size={16} className="text-[#D4AF37]" />
          <div>
            <p className="text-[10px] uppercase font-bold text-stone-400 leading-none mb-1">Heure</p>
            <p className="text-sm font-black text-[#06402B]">{res.time}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 px-1">
        <Phone size={14} className="text-green-600" />
        <span className="text-sm font-bold text-stone-600 tracking-wider">{res.phone}</span>
      </div>

      <div className="flex gap-2">
        {type === 'pending' ? (
          <>
            <button 
              onClick={() => updateStatus(res.id, 'Confirmé')}
              className="flex-1 py-4 bg-[#06402B] text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-[#D4AF37] transition-all active:scale-95"
            >
              <Check size={18} /> Valider
            </button>
            <button 
              onClick={() => deleteReservation(res.id)}
              className="px-5 py-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2">
              <Check size={14} /> Demande Validée
            </span>
            <button 
              onClick={() => updateStatus(res.id, 'En attente')}
              className="text-stone-300 hover:text-[#D4AF37] p-2 transition-colors"
              title="Rétablir"
            >
              <AlertCircle size={18} />
            </button>
            <button 
              onClick={() => deleteReservation(res.id)}
              className="text-stone-300 hover:text-red-500 p-2 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#F9FAFB] z-[100] flex flex-col font-sans text-stone-900 overflow-hidden">
      {/* Header Gérant */}
      <header className="bg-[#042D1E] text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
              className="h-12 w-12 rounded-full border-2 border-[#D4AF37]"
              alt="Logo"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#042D1E]"></div>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight">Console <span className="text-[#D4AF37]">Gérant</span></h1>
            <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-black">La Fourchette Orientale</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-[#D4AF37] text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
        >
          <LogOut size={16} /> Quitter
        </button>
      </header>

      {/* Barre de Recherche Dynamique */}
      <div className="p-4 md:p-6 bg-white border-b border-stone-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un client (Nom ou Tél)..." 
            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-[9px] font-black uppercase text-stone-400 tracking-widest">En attente</p>
            <p className="text-2xl font-serif font-bold text-blue-600 leading-none mt-1">{pendingList.length}</p>
          </div>
          <div className="h-8 w-px bg-stone-100"></div>
          <div className="text-center">
            <p className="text-[9px] font-black uppercase text-stone-400 tracking-widest">Validées</p>
            <p className="text-2xl font-serif font-bold text-green-600 leading-none mt-1">{confirmedList.length}</p>
          </div>
        </div>
      </div>

      {/* Colonnes de Gestion Chronologique */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-8 overflow-hidden bg-[#F9FAFB]">
        
        {/* Section : NOUVELLES DEMANDES */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Clock size={18} />
            </div>
            <h2 className="text-xl font-serif font-black text-[#042D1E]">Demandes à traiter</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
            {pendingList.length > 0 ? (
              pendingList.map(res => <ClientCard key={res.id} res={res} type="pending" />)
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-300 border-2 border-dashed border-stone-200 rounded-[3rem] p-10 text-center bg-white/50">
                <Calendar size={48} className="opacity-10 mb-4" />
                <p className="font-serif italic text-lg opacity-40">Tout est à jour pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Séparateur Visuel */}
        <div className="hidden md:flex items-center justify-center">
          <ChevronRight className="text-stone-200" size={32} strokeWidth={1} />
        </div>

        {/* Section : PLANNING CONFIRMÉ */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <Check size={18} />
            </div>
            <h2 className="text-xl font-serif font-black text-stone-400">Planning Confirmé</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar opacity-70 hover:opacity-100 transition-opacity">
            {confirmedList.length > 0 ? (
              confirmedList.map(res => <ClientCard key={res.id} res={res} type="confirmed" />)
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-200 p-10 text-center border-2 border-dashed border-stone-100 rounded-[3rem]">
                <Users size={48} className="opacity-10 mb-4" />
                <p className="font-serif italic text-lg opacity-20">Aucune réservation confirmée.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Barre de Status Inférieure */}
      <footer className="bg-white border-t border-stone-200 px-8 py-3 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            SERVEUR CONNECTÉ
          </div>
          <div className="hidden sm:block">MODE : TRI CHRONOLOGIQUE PAR VISITE</div>
        </div>
        <div className="text-[#D4AF37]">LA FOURCHETTE ORIENTALE • OUJDA 2025</div>
      </footer>
    </div>
  );
};

export default FourchetteSecure;
