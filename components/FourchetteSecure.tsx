
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LogOut, Check, Trash2, Search, Calendar, Clock, Users, User, Phone, 
  ArrowUpDown, CheckCircle, AlertCircle, ChevronRight, Hash
} from 'lucide-react';
import { Reservation } from '../types';

interface FourchetteSecureProps {
  onClose: () => void;
}

const FourchetteSecure: React.FC<FourchetteSecureProps> = ({ onClose }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Chargement et synchronisation sans suppression des données existantes
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('reservations') || '[]');
      setReservations(data);
    };
    loadData();
    // Rafraîchissement automatique pour capter les nouvelles demandes en temps réel
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Logique de Tri Fusionné (Date + Heure) et Filtrage
  const processedData = useMemo(() => {
    return reservations
      .filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.phone.includes(searchTerm)
      )
      .sort((a, b) => {
        // On crée des objets Date complets pour comparer précisément l'instant T de la visite
        const timeA = new Date(`${a.date}T${a.time.padStart(5, '0')}`).getTime();
        const timeB = new Date(`${b.date}T${b.time.padStart(5, '0')}`).getTime();
        
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [reservations, searchTerm, sortOrder]);

  const updateStatus = (id: string, status: 'Confirmé' | 'Annulé' | 'En attente') => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  const deleteRes = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette fiche client du registre ? Cette action est irréversible.")) {
      const updated = reservations.filter(r => r.id !== id);
      setReservations(updated);
      localStorage.setItem('reservations', JSON.stringify(updated));
    }
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'En attente').length,
    today: reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length
  };

  return (
    <div className="fixed inset-0 bg-[#F9FAFB] z-[100] flex flex-col font-sans text-stone-900 overflow-hidden">
      {/* Header Premium Gérant */}
      <header className="bg-[#042D1E] text-white px-8 py-5 flex justify-between items-center shadow-2xl border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <img 
              src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
              className="h-14 w-14 rounded-full border-2 border-[#D4AF37] shadow-lg group-hover:scale-105 transition-transform"
              alt="Logo"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#042D1E]"></div>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight uppercase">Registre <span className="text-[#D4AF37]">Central</span></h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-black">Planification des services • Oujda</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-stone-500 tracking-widest mb-1">En attente</span>
              <span className="text-xl font-serif font-bold text-blue-400">{stats.pending}</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-black uppercase text-stone-500 tracking-widest mb-1">Aujourd'hui</span>
              <span className="text-xl font-serif font-bold text-[#D4AF37]">{stats.today}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 active:scale-95 group"
          >
            <LogOut size={18} className="text-[#D4AF37] group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xs font-black uppercase tracking-widest">Quitter la Console</span>
          </button>
        </div>
      </header>

      {/* Barre de Contrôle : Recherche et Tri Chronologique */}
      <div className="bg-white border-b border-stone-200 px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-sm z-20">
        <div className="relative w-full max-w-3xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher par nom, téléphone ou référence..." 
            className="w-full pl-14 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-4 bg-[#06402B] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#D4AF37] transition-all"
          >
            <ArrowUpDown size={16} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
            {sortOrder === 'asc' ? 'Visite la plus proche' : 'Visite la plus lointaine'}
          </button>
        </div>
      </div>

      {/* Registre Principal */}
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden transition-all duration-500">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-100 backdrop-blur-md">
                <th className="px-8 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Client & Contact</th>
                <th className="px-8 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Date & Heure de Visite</th>
                <th className="px-8 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">Couverts</th>
                <th className="px-8 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest">Statut</th>
                <th className="px-8 py-6 text-[10px] font-black text-stone-400 uppercase tracking-widest text-right">Actions Gérant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {processedData.length > 0 ? processedData.map((res) => (
                <tr 
                  key={res.id} 
                  className={`group transition-all duration-300 ${
                    res.status === 'Confirmé' ? 'bg-green-50/30' : 'hover:bg-stone-50'
                  }`}
                >
                  {/* Client */}
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                        res.status === 'Confirmé' ? 'bg-green-100 border-green-200 text-green-600' : 'bg-stone-100 border-stone-200 text-stone-400'
                      }`}>
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-black text-stone-900 text-base group-hover:text-[#06402B] transition-colors uppercase tracking-tight">{res.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone size={12} className="text-[#D4AF37]" />
                          <p className="text-xs font-bold text-stone-500 tracking-wider">{res.phone}</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Date & Heure Combinées */}
                  <td className="px-8 py-7">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-stone-900">
                        <Calendar size={14} className="text-[#D4AF37]" />
                        <span className="text-sm font-black uppercase">
                          {new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#06402B]" />
                        <span className="text-xl font-serif font-black text-[#042D1E]">{res.time}</span>
                      </div>
                    </div>
                  </td>

                  {/* Nombre de personnes */}
                  <td className="px-8 py-7">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-2xl border border-stone-200 group-hover:bg-[#06402B] group-hover:text-white transition-all">
                        <Users size={16} />
                        <span className="text-sm font-black">{res.guests}</span>
                      </div>
                      <span className="text-[8px] font-black text-stone-300 uppercase mt-1 tracking-widest">Invités</span>
                    </div>
                  </td>

                  {/* Statut visuel */}
                  <td className="px-8 py-7">
                    <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                      res.status === 'Confirmé' 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
                    }`}>
                      {res.status === 'Confirmé' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                      {res.status === 'Confirmé' ? 'Demande Validée' : 'Nouvelle Demande'}
                    </span>
                  </td>

                  {/* Actions de décision */}
                  <td className="px-8 py-7">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      {res.status !== 'Confirmé' ? (
                        <button 
                          onClick={() => updateStatus(res.id, 'Confirmé')}
                          className="flex items-center gap-2 px-6 py-3 bg-[#06402B] text-[#D4AF37] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all active:scale-90"
                        >
                          <Check size={16} /> Valider la table
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateStatus(res.id, 'En attente')}
                          className="p-3 text-stone-300 hover:text-[#06402B] transition-colors"
                          title="Rétablir en attente"
                        >
                          <ChevronRight size={22} className="rotate-180" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteRes(res.id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-100"
                        title="Annuler & Supprimer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-40 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-20 scale-110">
                      <div className="p-8 bg-stone-100 rounded-full">
                        <Calendar size={80} strokeWidth={1} />
                      </div>
                      <p className="font-serif italic text-3xl text-stone-600">Le registre est actuellement vide.</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">En attente de nouvelles demandes clients</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Barre de status et informations système */}
      <footer className="bg-white border-t border-stone-200 px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse"></span>
            SYSTÈME OPÉRATIONNEL EN DIRECT
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Hash size={10} className="text-[#D4AF37]" />
            TOTAL : {stats.total} FICHES CLIENTS PRÉSERVÉES
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#D4AF37]">
          LA FOURCHETTE ORIENTALE • CONSOLE GÉRANT • OUJDA 2025
        </div>
      </footer>
    </div>
  );
};

export default FourchetteSecure;
