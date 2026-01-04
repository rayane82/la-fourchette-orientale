
import React, { useState, useEffect } from 'react';
import { 
  X, LogOut, Check, Ban, 
  Calendar as CalendarIcon, List, 
  Star, User, TrendingUp, Filter, Shield, MessageCircle, Phone
} from 'lucide-react';
import { Reservation, ReservationStatus, ClientType } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<ReservationStatus | 'All'>('All');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservations') || '[]');
    setReservations(data.sort((a: Reservation, b: Reservation) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  }, []);

  const updateStatus = (id: string, status: ReservationStatus) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  const updateClientType = (id: string, clientType: ClientType) => {
    const updated = reservations.map(r => r.id === id ? { ...r, clientType } : r);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  const filteredReservations = filter === 'All' 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  const pendingCount = reservations.filter(r => r.status === 'En attente').length;

  return (
    <div className="fixed inset-0 bg-[#F9F6F2] z-[100] flex flex-col overflow-hidden font-sans text-stone-900">
      {/* Premium Header */}
      <header className="bg-[#06402B] text-white p-6 shadow-2xl flex justify-between items-center relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
              className="h-14 w-14 rounded-full border-2 border-[#D4AF37] shadow-xl"
              alt="Logo Admin"
            />
            {pendingCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-black w-6 h-6 rounded-full border-2 border-[#06402B] flex items-center justify-center animate-pulse">
                {pendingCount}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight">Gestion des Demandes</h1>
            <p className="text-stone-400 text-xs uppercase tracking-[0.3em] font-medium">Console Exclusive - La Fourchette</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-6 opacity-50">
             <span className="text-[10px] uppercase tracking-widest font-black">Contacts Établissement</span>
             <span className="text-xs font-bold text-[#D4AF37]">WhatsApp: 0770-454031 | Fixe: 0536-680010</span>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-[#D4AF37] rounded-full transition-all group border border-white/5"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-bold text-sm uppercase tracking-widest">Fermer</span>
          </button>
        </div>
      </header>

      {/* Modern Toolbar */}
      <div className="bg-white border-b border-stone-200 p-6 flex flex-wrap gap-6 items-center justify-between shadow-sm">
        <div className="flex bg-stone-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl transition-all ${view === 'list' ? 'bg-white shadow-lg text-[#06402B] font-bold' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <List size={20} /> <span className="uppercase text-xs tracking-widest">Demandes</span>
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl transition-all ${view === 'calendar' ? 'bg-white shadow-lg text-[#06402B] font-bold' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <CalendarIcon size={20} /> <span className="uppercase text-xs tracking-widest">Plan de salle</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-stone-50 px-6 py-3 rounded-2xl border border-stone-200 flex items-center gap-3 group focus-within:border-[#D4AF37] transition-colors">
            <Filter size={18} className="text-stone-400" />
            <select 
              className="bg-transparent text-sm font-bold outline-none cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="All">Tous les dossiers</option>
              <option value="En attente">En attente de validation</option>
              <option value="Confirmé">Confirmé & Notifié</option>
              <option value="Annulé">Refusé / Annulé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6 md:p-12">
        {view === 'list' ? (
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#06402B]/5 border-b border-stone-100">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Client (WhatsApp/Tél)</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Visite Souhaitée</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Groupe</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Segment</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Statut Actuel</th>
                    <th className="px-8 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Action Manuelle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredReservations.length > 0 ? filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-[#F9F6F2]/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-stone-900 group-hover:text-[#06402B] flex items-center gap-2">
                          {res.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 font-bold mt-1">
                           <MessageCircle size={12} className="text-green-500" />
                           {res.phone}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-stone-900 font-medium">{new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                        <div className="text-sm text-[#D4AF37] font-black uppercase tracking-tighter">{res.time}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-[#06402B]/5 px-3 py-1 rounded-full text-xs font-bold text-[#06402B]">
                          {res.guests} pers.
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          className={`text-[10px] font-black px-3 py-1 rounded-full outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-[#D4AF37] transition-all uppercase tracking-widest ${
                            res.clientType === 'VIP' ? 'bg-purple-100 text-purple-700' : 
                            res.clientType === 'Habitué' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-700'
                          }`}
                          value={res.clientType}
                          onChange={(e) => updateClientType(res.id, e.target.value as ClientType)}
                        >
                          <option value="Nouveau">Nouveau</option>
                          <option value="Habitué">Habitué</option>
                          <option value="VIP">VIP</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                          res.status === 'Confirmé' ? 'bg-green-50 text-green-700 border-green-100' : 
                          res.status === 'Annulé' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                        }`}>
                          {res.status === 'Confirmé' ? 'Validé' : res.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => updateStatus(res.id, 'Confirmé')}
                            className="p-3 bg-white text-green-600 border border-green-100 hover:bg-green-600 hover:text-white rounded-2xl shadow-sm transition-all active:scale-90"
                            title="Valider et Notifier le client"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => updateStatus(res.id, 'Annulé')}
                            className="p-3 bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white rounded-2xl shadow-sm transition-all active:scale-90"
                            title="Refuser"
                          >
                            <Ban size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center gap-4 text-stone-300">
                          <Shield size={48} className="opacity-20" />
                          <p className="font-serif italic text-xl">Aucune demande en attente.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-3xl flex items-center gap-6">
               <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm">
                 <MessageCircle size={28} />
               </div>
               <div>
                 <h4 className="font-bold text-blue-900 text-sm uppercase tracking-widest">Aide à la confirmation</h4>
                 <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                   Une fois le statut passé sur "Validé", n'oubliez pas de confirmer manuellement via votre WhatsApp Business (<b>0770-454031</b>) pour finaliser l'expérience client.
                 </p>
               </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto h-full animate-fade-in-up text-center">
             <div className="bg-white rounded-[2.5rem] shadow-2xl p-20 border border-stone-100">
                <CalendarIcon size={64} className="mx-auto text-[#D4AF37] mb-8" />
                <h2 className="text-4xl font-serif text-[#06402B] mb-6">Planification Visuelle</h2>
                <p className="text-stone-500 max-w-lg mx-auto leading-relaxed italic">L'interface de gestion calendaire est en cours d'ajustement pour refléter les flux de service de 10h à 17h.</p>
                <button onClick={() => setView('list')} className="mt-12 px-10 py-4 bg-[#06402B] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all">VOIR LES DEMANDES</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
