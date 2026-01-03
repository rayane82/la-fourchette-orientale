
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LogOut, Check, Trash2, Search, Calendar, Clock, Users, User, Phone, 
  ArrowUpDown, CheckCircle, AlertCircle, ChevronRight, Hash, XCircle
} from 'lucide-react';
import { Reservation } from '../types';

interface FourchetteSecureProps {
  onClose: () => void;
}

const FourchetteSecure: React.FC<FourchetteSecureProps> = ({ onClose }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(data);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const processedData = useMemo(() => {
    return reservations
      .filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.phone.includes(searchTerm)
      )
      .sort((a, b) => {
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

  // EFFACER : Suppression physique du registre
  const deleteRes = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Voulez-vous EFFACER DEFINITIVEMENT cette demande du registre ? Cette action est irréversible.")) {
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
      <header className="bg-[#042D1E] text-white px-8 py-5 flex justify-between items-center shadow-2xl border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-6">
          <img src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" className="h-14 w-14 rounded-full border-2 border-[#D4AF37] shadow-lg" alt="Logo"/>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight uppercase">Registre <span className="text-[#D4AF37]">Central</span></h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-black">Administration des Services • Oujda</p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all active:scale-95 group">
          <LogOut size={18} className="text-[#D4AF37]" /><span className="text-xs font-black uppercase tracking-widest">Sortir</span>
        </button>
      </header>

      <div className="bg-white border-b border-stone-200 px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-sm z-20">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input type="text" placeholder="Rechercher une demande..." className="w-full pl-14 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all shadow-inner" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="flex gap-10">
          <div className="text-center"><span className="text-[8px] font-black uppercase text-stone-500 block mb-1">Nouveautés</span><span className="text-xl font-serif font-bold text-blue-400">{stats.pending}</span></div>
          <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="flex items-center gap-4 px-8 py-4 bg-[#06402B] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[#D4AF37] transition-all"><ArrowUpDown size={16}/>{sortOrder === 'asc' ? 'Prochainement' : 'Plus lointain'}</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100 uppercase tracking-widest text-[10px] font-black text-stone-400">
                <th className="px-8 py-6">Identité Client</th>
                <th className="px-8 py-6">Date & Heure</th>
                <th className="px-8 py-6 text-center">Pers.</th>
                <th className="px-8 py-6">État</th>
                <th className="px-8 py-6 text-right">Décision Gérant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {processedData.length > 0 ? processedData.map((res) => (
                <tr key={res.id} className={`group transition-all ${res.status === 'Confirmé' ? 'bg-green-50/20' : res.status === 'Annulé' ? 'bg-red-50/10 grayscale-[0.3]' : 'hover:bg-stone-50'}`}>
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${res.status === 'Confirmé' ? 'bg-green-100 border-green-200 text-green-600' : 'bg-stone-100 border-stone-200 text-stone-400'}`}><User size={18}/></div>
                      <div><p className="font-black text-stone-900 uppercase tracking-tight">{res.name}</p><p className="text-xs font-bold text-stone-500 tracking-wider">{res.phone}</p></div>
                    </div>
                  </td>
                  <td className="px-8 py-7"><div className="flex flex-col"><span className="text-[10px] font-black uppercase text-[#D4AF37]">{new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span><span className="text-lg font-serif font-black">{res.time}</span></div></td>
                  <td className="px-8 py-7 text-center"><span className="px-3 py-1 bg-stone-100 rounded-lg text-sm font-black border border-stone-200">{res.guests}</span></td>
                  <td className="px-8 py-7">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                      res.status === 'Confirmé' ? 'bg-green-100 text-green-700 border-green-200' : 
                      res.status === 'Annulé' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {res.status === 'Confirmé' ? <CheckCircle size={10} /> : res.status === 'Annulé' ? <XCircle size={10} /> : <AlertCircle size={10} className="animate-pulse" />}
                      {res.status}
                    </span>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <div className="flex justify-end items-center gap-3">
                      {res.status !== 'Confirmé' ? (
                        <button onClick={() => updateStatus(res.id, 'Confirmé')} className="px-5 py-2.5 bg-[#06402B] text-[#D4AF37] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[#D4AF37] hover:text-white transition-all active:scale-95"><Check size={14} className="inline mr-1"/> Valider</button>
                      ) : (
                        <button onClick={() => updateStatus(res.id, 'En attente')} className="p-3 text-stone-300 hover:text-[#06402B] transition-colors" title="Remettre en attente"><ChevronRight size={22} className="rotate-180" /></button>
                      )}
                      
                      {/* ANNULER : Marque en rouge mais garde la fiche */}
                      {res.status !== 'Annulé' && (
                        <button onClick={() => updateStatus(res.id, 'Annulé')} className="p-3 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all border border-orange-100" title="ANNULER (Conserver mais refuser)"><XCircle size={18}/></button>
                      )}

                      {/* EFFACER : Détruit la fiche définitivement */}
                      <button onClick={(e) => deleteRes(e, res.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm" title="EFFACER (Suppression définitive)"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-40 text-center opacity-20"><Calendar size={60} className="mx-auto mb-4" /><p className="font-serif italic text-2xl">Le registre est vide.</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="bg-white border-t border-stone-200 px-10 py-4 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
        <div className="flex items-center gap-6"><span>CONTRÔLE ACTIF</span><span>{stats.total} Fiches</span></div>
        <div className="text-[#D4AF37]">LA FOURCHETTE ORIENTALE • OUJDA</div>
      </footer>
    </div>
  );
};

export default FourchetteSecure;
