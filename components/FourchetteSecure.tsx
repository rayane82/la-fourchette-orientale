
import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, LogOut, Check, Ban, 
  Calendar as CalendarIcon, List, 
  Star, User, TrendingUp, Filter, Shield, MessageCircle, Phone, Lock, Eye, Clock, Users, ArrowRight, History, Trash2, SortAsc, Clock3, Search, ChevronDown, Award
} from 'lucide-react';
import { Reservation, ReservationStatus, ClientType } from '../types';

interface FourchetteSecureProps {
  onClose: () => void;
}

type SortOption = 'visitDate' | 'createdAt' | 'guests' | 'importance';

const FourchetteSecure: React.FC<FourchetteSecureProps> = ({ onClose }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('visitDate');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'upcoming'>('all');

  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('reservations') || '[]');
      setReservations(data);
    };
    loadData();
    const interval = setInterval(loadData, 10000); // Rafraîchissement plus fréquent
    return () => clearInterval(interval);
  }, []);

  // Statistiques en temps réel
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayRes = reservations.filter(r => r.date === todayStr && r.status === 'Confirmé');
    const pending = reservations.filter(r => r.status === 'En attente').length;
    const totalGuestsToday = todayRes.reduce((acc, curr) => acc + curr.guests, 0);
    
    return {
      totalToday: todayRes.length,
      pendingCount: pending,
      guestsToday: totalGuestsToday
    };
  }, [reservations]);

  // Filtrage et Tri Intelligent
  const processedData = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    let filtered = reservations.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           res.phone.includes(searchTerm);
      
      const isToday = res.date === todayStr;
      const isUpcoming = res.date > todayStr;
      
      if (filterDate === 'today') return matchesSearch && isToday;
      if (filterDate === 'upcoming') return matchesSearch && isUpcoming;
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'visitDate':
          return new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime();
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'guests':
          return b.guests - a.guests;
        case 'importance':
          const priority = { 'VIP': 3, 'Habitué': 2, 'Nouveau': 1 };
          return priority[b.clientType] - priority[a.clientType];
        default:
          return 0;
      }
    });
  }, [reservations, searchTerm, sortBy, filterDate]);

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

  const deleteReservation = (id: string) => {
    if (confirm("Supprimer définitivement ce dossier ?")) {
      const updated = reservations.filter(r => r.id !== id);
      setReservations(updated);
      localStorage.setItem('reservations', JSON.stringify(updated));
    }
  };

  const pendingList = processedData.filter(r => r.status === 'En attente');
  const handledList = processedData.filter(r => r.status !== 'En attente');

  const ReservationCard: React.FC<{ res: Reservation }> = ({ res }) => (
    <div className={`bg-white rounded-2xl p-5 border-2 transition-all duration-300 hover:shadow-lg ${
      res.status === 'Confirmé' ? 'border-green-100 shadow-sm' : 
      res.status === 'Annulé' ? 'border-red-50 opacity-60' : 'border-stone-100 shadow-sm'
    }`}>
      {/* Header Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <div className={`w-2 h-2 rounded-full ${res.status === 'En attente' ? 'bg-blue-500 animate-pulse' : res.status === 'Confirmé' ? 'bg-green-500' : 'bg-red-500'}`}></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
               {new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
             </span>
          </div>
          <div className="flex items-center gap-2 text-[#042D1E]">
            <span className="font-serif text-2xl font-black">{res.time}</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 rounded-md text-[10px] font-bold text-stone-500">
               <Users size={12} /> {res.guests}
            </div>
          </div>
        </div>
        
        {/* CRM Badge Select */}
        <select 
          value={res.clientType}
          onChange={(e) => updateClientType(res.id, e.target.value as ClientType)}
          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-none cursor-pointer outline-none ${
            res.clientType === 'VIP' ? 'bg-[#D4AF37] text-white' : 
            res.clientType === 'Habitué' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}
        >
          <option value="Nouveau">Nouveau</option>
          <option value="Habitué">Habitué</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      {/* Client Identity */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#042D1E]/5 flex items-center justify-center text-[#042D1E]">
            <User size={14} />
          </div>
          <p className="font-bold text-stone-800 tracking-tight text-sm truncate">{res.name}</p>
        </div>
        <div className="flex items-center gap-3 group/phone">
          <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover/phone:bg-green-50 group-hover/phone:text-green-500 transition-colors">
            <Phone size={12} />
          </div>
          <p className="text-xs font-medium text-stone-500">{res.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-stone-50">
        {res.status === 'En attente' ? (
          <>
            <button 
              onClick={() => updateStatus(res.id, 'Confirmé')}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Check size={14} /> Confirmer
            </button>
            <button 
              onClick={() => updateStatus(res.id, 'Annulé')}
              className="px-4 py-3 bg-white text-red-500 border border-red-100 hover:bg-red-50 rounded-xl transition-all"
              title="Annuler"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
              res.status === 'Confirmé' ? 'text-green-600' : 'text-red-400'
            }`}>
              {res.status === 'Confirmé' ? <Check size={12}/> : <Ban size={12}/>}
              {res.status}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => updateStatus(res.id, 'En attente')}
                className="p-2 text-stone-300 hover:text-[#D4AF37] transition-colors"
                title="Rétablir"
              >
                <History size={14} />
              </button>
              <button 
                onClick={() => deleteReservation(res.id)}
                className="p-2 text-stone-200 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#F8F9FB] z-[100] flex flex-col overflow-hidden font-sans text-stone-900">
      {/* Header Premium SaaS */}
      <header className="bg-[#042D1E] text-white px-8 py-5 flex justify-between items-center shadow-lg border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src="https://i.postimg.cc/Wpw7D39h/602818834-18089739302297337-6789941149446710277-n.jpg" 
              className="h-10 w-10 rounded-full border border-[#D4AF37]"
              alt="Logo"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#042D1E]"></div>
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold">PILOTAGE <span className="text-[#D4AF37] italic">OPERATIONS</span></h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-black text-stone-500">Dashboard v2.5 - Oujda</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-[#042D1E] transition-all shadow-xl"
          >
            <LogOut size={14} /> Quitter Session
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-stone-200 px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Total Aujourd'hui</p>
            <p className="text-2xl font-serif font-black text-[#042D1E]">{stats.totalToday} <span className="text-[10px] font-sans text-stone-400">TABLES</span></p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <Check size={20} />
          </div>
        </div>
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">En attente</p>
            <p className="text-2xl font-serif font-black text-blue-600">{stats.pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Couverts prévus (Jour)</p>
            <p className="text-2xl font-serif font-black text-[#D4AF37]">{stats.guestsToday}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#D4AF37] flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="bg-[#F8F9FB] px-8 py-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Search & Date Filter */}
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher nom, téléphone..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#D4AF37] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white border border-stone-200 rounded-xl p-1 gap-1">
            <button 
              onClick={() => setFilterDate('all')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterDate === 'all' ? 'bg-[#042D1E] text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Toutes
            </button>
            <button 
              onClick={() => setFilterDate('today')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterDate === 'today' ? 'bg-[#042D1E] text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Aujourd'hui
            </button>
            <button 
              onClick={() => setFilterDate('upcoming')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterDate === 'upcoming' ? 'bg-[#042D1E] text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
            >
              À venir
            </button>
          </div>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-4 py-2 w-full lg:w-auto">
          <Filter size={14} className="text-stone-400" />
          <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Trier par:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent text-xs font-bold outline-none cursor-pointer border-none p-0"
          >
            <option value="visitDate">Chronologie (Arrivée)</option>
            <option value="createdAt">Réception (Récent)</option>
            <option value="guests">Volume (Couverts)</option>
            <option value="importance">Importance (VIP d'abord)</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 bg-[#F8F9FB]">
        
        {/* Column 1: A Traiter */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                <TrendingUp size={16} />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#042D1E]">Flux Entrant</h2>
            </div>
            <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full">
              {pendingList.length} À TRAITER
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {pendingList.length > 0 ? (
              pendingList.map(res => <ReservationCard key={res.id} res={res} />)
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-300 border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center">
                <Check size={48} className="opacity-10 mb-4" />
                <p className="font-serif italic text-lg opacity-40">Aucun nouveau ticket.</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Confirmées / Traitées */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                <Shield size={16} />
              </div>
              <h2 className="font-serif text-xl font-bold text-stone-400">Dossiers Archivés</h2>
            </div>
            <span className="bg-stone-200 text-stone-600 text-[9px] font-black px-3 py-1 rounded-full">
              HISTORIQUE
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar opacity-80 hover:opacity-100 transition-opacity">
            {handledList.length > 0 ? (
              handledList.map(res => <ReservationCard key={res.id} res={res} />)
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-200 p-12 text-center">
                <History size={48} className="opacity-10 mb-4" />
                <p className="font-serif italic text-lg">Liste de service vide.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Control Bar */}
      <footer className="bg-white border-t border-stone-200 px-8 py-3 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            SYSTÈME SÉCURISÉ
          </div>
          <div className="hidden sm:block">
            SÉLECTEUR DE TRI : {sortBy.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <Award size={12} /> CONSOLE ADMINISTRATEUR - OUJDA 2025
        </div>
      </footer>
    </div>
  );
};

export default FourchetteSecure;
