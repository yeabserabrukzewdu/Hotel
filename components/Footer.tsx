
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Story */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 flex items-center justify-center rounded-sm">
                <span className="text-slate-900 font-serif text-2xl font-bold">L.A.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-widest uppercase leading-none">Hotel & Spa</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-amber-500 font-bold">Addis Ababa</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Experience the pinnacle of Ethiopian hospitality where tradition meets modern luxury. Located in the heart of the capital, we provide a sanctuary for the global traveler.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-slate-900 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About Us', 'Rooms & Suites', 'Dining', 'Wellness Spa', 'Fitness Center', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-400 text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-light">Bole 24, Near Eritrea Embassy, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-light">+251 995 262 626</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <span className="text-slate-400 text-sm font-light">info@la-hotelandspa.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-xl mb-8">Newsletter</h4>
            <p className="text-slate-400 text-sm font-light mb-6">Subscribe to receive exclusive offers and seasonal news from L.A. Hotel.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-amber-500 text-slate-900 px-4 flex items-center justify-center hover:bg-amber-400 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            © 2025 L.A. Hotel & Spa Addis Ababa. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <Link to="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-amber-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
