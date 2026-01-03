
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Menu from './components/Menu';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import FourchetteSecure from './components/FourchetteSecure';
import { Lock, X } from 'lucide-react';

export type ViewState = 'landing' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminAccess = () => {
    setShowAuthModal(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'OUJDA2025') {
      setCurrentView('admin');
      setShowAuthModal(false);
      setPassword('');
      setError('');
      window.location.hash = 'admin';
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (currentView === 'admin') {
    return <FourchetteSecure onClose={() => {
      setCurrentView('landing');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] selection:bg-[#D4AF37] selection:text-white">
      <Navbar onAdminClick={handleAdminAccess} />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <div className="bg-[#06402B] py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <h2 className="text-3xl font-serif italic text-[#D4AF37]">
              "La cuisine est le miroir d'une culture, et chez nous, ce miroir est serti d'or."
            </h2>
          </div>
        </div>
        <Menu />
        <BookingForm />
      </main>
      <Footer onAdminClick={handleAdminAccess} />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative p-10">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#06402B]">Accès Sécurisé</h3>
              <p className="text-stone-500 text-sm mt-2">Veuillez saisir votre mot de passe administrateur.</p>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-6">
              <div>
                <input 
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all font-bold text-center tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-2 text-center font-bold uppercase tracking-widest">{error}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-[#06402B] text-[#D4AF37] font-black rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl uppercase tracking-[0.2em] text-xs"
              >
                DÉVERROUILLER LA CONSOLE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
