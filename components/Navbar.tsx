
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from './LanguageContext';
import { LANGUAGES } from '../constants';
import { Menu, X } from 'lucide-react';
import BookingEngine from './BookingEngine';

const Navbar: React.FC = () => {
  const { t, setLanguage, language: currentLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, path: "/" },
    { name: t.navAbout, path: "/about" },
    { name: t.navRooms, path: "/rooms" },
    { name: t.navDining, path: "/dining" },
    { name: t.navSpa, path: "/spa" },
    { name: t.navFitness, path: "/fitness" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Don't show public nav on admin page
  if (location.pathname === '/admin') return null;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/90 backdrop-blur-md py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded transition-transform group-hover:rotate-3 shadow-md">
              <span className="text-amber-500 font-serif text-2xl font-bold">L.A.</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest uppercase leading-none text-slate-900">Hotel & Spa</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Addis Ababa</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:text-amber-600 ${
                  isActive(link.path) ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language & CTA */}
          <div className="hidden lg:flex items-center gap-6 border-l border-slate-200 pl-6">
            <div className="flex gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-7 h-7 flex items-center justify-center text-lg rounded-full transition-all duration-300 hover:scale-125 border ${
                    currentLanguage === lang.code 
                      ? 'grayscale-0 opacity-100 border-amber-500 shadow-sm' 
                      : 'grayscale opacity-30 border-transparent hover:opacity-70'
                  }`}
                  title={lang.name}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="gold-gradient text-slate-900 px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Reserve
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-8 space-y-6 flex flex-col h-full">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-bold uppercase tracking-widest pb-2 border-b border-slate-100 ${
                    isActive(link.path) ? 'text-amber-600' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-8 mt-auto">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Region</p>
              <div className="flex gap-4 mb-10">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`w-12 h-12 flex items-center justify-center text-3xl rounded-full border-2 transition-all ${
                      currentLanguage === lang.code ? 'border-amber-500 bg-amber-50' : 'border-transparent bg-slate-50 opacity-60'
                    }`}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full bg-slate-900 text-white py-5 rounded-sm text-xs font-black uppercase tracking-widest shadow-xl"
              >
                Quick Booking
              </button>
            </div>
          </div>
        </div>
      </nav>
      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;
