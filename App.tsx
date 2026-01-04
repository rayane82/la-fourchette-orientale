
import React, { useState } from 'react';
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
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (currentView === 'admin') {
    return (
      <FourchetteSecure 
        onClose={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] selection:bg-[#D4AF37] selection:text-white">
      <Navbar onAdminClick={handleAdminAccess} />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <div className="bg-[#06402B] py-16 text-center">
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <h2 className="text-3xl font-serif italic text-[#D4AF37]">
                "La cuisine est le miroir d'une culture, ici elle est sertie d'or."
            </h2>
        </div>
        <Menu />
        <BookingForm />
      </main>
      <Footer onAdminClick={handleAdminAccess} />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl">
                <button 
                  onClick={() => setShowAuthModal(false)} 
                  className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#06402B]">Accès Sécurisé</h3>
                    <p className="text-stone-500 text-sm mt-2">Console d'administration du restaurant.</p>
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                    <input 
                      type="password" 
                      placeholder="Mot de passe" 
                      className="w-full p-4 bg-stone-50 border rounded-2xl text-center font-bold tracking-widest outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      autoFocus 
                    />
                    {error && <p className="text-red-500 text-center text-[10px] font-black uppercase">{error}</p>}
                    <button 
                      type="submit" 
                      className="w-full py-5 bg-[#06402B] text-[#D4AF37] font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-white transition-all"
                    >
                      DÉVERROUILLER
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
