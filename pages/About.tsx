
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Star, ShieldCheck, Clock, RefreshCw, Hotel, 
  ChevronRight, Check, Heart, Users, MapPin,
  Calendar, Coffee, Utensils, Music, Sparkles, ArrowRight, Flower2
} from 'lucide-react';
import BookingEngine from '../components/BookingEngine';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-trigger').forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const masonryItems = [
    {
      title: "Relaxing Spa",
      desc: "Immerse yourself in a sanctuary of silence and rejuvenation with our signature treatments.",
      img: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800",
      icon: <Flower2 size={32} strokeWidth={1} />
    },
    {
      title: "Wedding & Event",
      desc: "When coming to our events, we will feel all 5 senses, with peaceful space, melodious sound, and attentive care.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      icon: <Sparkles size={32} strokeWidth={1} />,
      special: true
    },
    {
      title: "Bar Music",
      desc: "Enjoy sophisticated rhythms and handcrafted cocktails in an atmosphere of refined elegance.",
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
      icon: <Music size={32} strokeWidth={1} />
    },
    {
      title: "Restaurant",
      desc: "A gastronomic journey that celebrates local ingredients with international culinary expertise.",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
      icon: <Utensils size={32} strokeWidth={1} />
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Welcome & Care Section */}
      <section id="care" className="scroll-trigger py-32 md:py-48 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible.care ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex justify-center gap-1.5 text-amber-500 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <h4 className="text-amber-600 uppercase tracking-[0.6em] font-bold text-[10px] mb-8">WELCOME TO LA HOTEL AND SPA HOTEL</h4>
            <h1 className="text-5xl md:text-8xl font-serif mb-12 max-w-5xl mx-auto leading-tight">WE ALWAYS CARE ABOUT YOUR EXPERIENCE</h1>
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-20 italic">
              "Immerse yourself in luxury and freshness with stunning city views and located in the heart of addis ababa and just a few steps away from Bole airport. Enjoy the sweet breath of the addis ababa city with elegant and luxurious rooms."
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible.care ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="Hotel Exterior 1" />
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl md:-translate-y-12">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="Hotel Exterior 2" />
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="Hotel Exterior 3" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars Grid */}
      <section id="pillars" className="scroll-trigger py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { title: "Four Star Hotel", icon: <Hotel size={40} strokeWidth={1}/>, desc: "Our luxury and best hotel for you." },
              { title: "Keeping You Safe", icon: <ShieldCheck size={40} strokeWidth={1}/>, desc: "We prevent the cleans and standard of the hotel in a regular way, please rest assured" },
              { title: "Room Services 24/24", icon: <Clock size={40} strokeWidth={1}/>, desc: "We always keep the room clean and tidy." },
              { title: "Change Room", icon: <RefreshCw size={40} strokeWidth={1}/>, desc: "You will have the right to change the room within 24 hours from the time of booking" }
            ].map((item, i) => (
              <div key={i} className={`text-center space-y-6 transition-all duration-1000`} style={{ transitionDelay: `${i * 200}ms`, opacity: isVisible.pillars ? 1 : 0, transform: isVisible.pillars ? 'none' : 'translateY(30px)' }}>
                <div className="w-20 h-20 mx-auto flex items-center justify-center text-amber-500 border border-amber-200 rounded-full bg-white shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Luxury & Comfort Split Section */}
      <section id="comfort" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className={`relative group transition-all duration-1000 ${isVisible.comfort ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="aspect-video md:aspect-square rounded-sm overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Interior Details" />
              </div>
              <div className="absolute -top-10 -left-10 w-full h-full border border-amber-500/10 rounded-sm -z-0"></div>
            </div>
            <div className={`space-y-10 transition-all duration-1000 ${isVisible.comfort ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div>
                <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Luxury & Comfort</h2>
                <h4 className="text-2xl font-serif text-amber-600 mb-8 italic">Our service always brings satisfaction</h4>
              </div>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                The details of the bathroom set will be stacked in a tray and placed on the stone table or next to the washbasin in the bathroom. Wrapping each detail will be a plastic bag, plain paper box or embossed hotel logo printed paper box. Logo printing is also applied at most hotels. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Link to="/rooms" className="inline-block gold-gradient text-slate-900 px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:scale-105 transition-all">
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Events & Experiences Masonry - REFACTORED TO MATCH USER IMAGES */}
      <section id="masonry" className="scroll-trigger py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {masonryItems.map((item, i) => (
              <div 
                key={i} 
                className={`relative group aspect-[3/4] overflow-hidden transition-all duration-1000 scroll-trigger ${isVisible.masonry ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Background Image */}
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110" alt={item.title} />
                
                {/* Overlay (Visible on Hover) */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content Box */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 pointer-events-none">
                  {/* The White Label (Default State) */}
                  <div className={`bg-white p-6 text-center transform transition-all duration-700 ease-in-out pointer-events-auto ${
                    item.special ? 'translate-y-[-50%] absolute top-1/2 left-6 right-6 bottom-auto shadow-xl' : 'translate-y-0 relative shadow-lg'
                  } group-hover:-translate-y-4`}>
                    
                    {/* Icon - only visible on hover or if special */}
                    <div className={`mb-4 flex justify-center text-amber-500 transition-all duration-500 ${item.special ? 'opacity-100' : 'opacity-0 h-0 group-hover:opacity-100 group-hover:h-12'}`}>
                      {item.icon}
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Description - reveals on hover */}
                    <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                      <p className="text-slate-500 text-xs font-light leading-relaxed mt-4 px-2">
                        {item.desc}
                      </p>
                      <button className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600 mt-6 border-b border-amber-500/0 hover:border-amber-500 transition-all">
                        READ MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offers Booking Section */}
      <section id="offers" className="scroll-trigger relative min-h-[700px] flex items-center py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/60 z-10"></div>
          <img src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover animate-[kenburns_40s_infinite]" alt="Offer Background" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className={`text-white transition-all duration-1000 ${isVisible.offers ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-amber-500"></div>
                <span className="text-amber-500 uppercase tracking-[0.4em] font-bold text-[10px]">RESERVATION ROOM</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Book directly with us today to enjoy special offers</h2>
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-xl italic">
                Exclusive hotel deals when you book <span className="text-white border-b border-white pb-1 cursor-pointer">directly on our website</span>.
              </p>
            </div>

            <div className={`bg-white p-12 md:p-20 shadow-2xl transition-all duration-1000 delay-300 ${isVisible.offers ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">Best Price Guarantee</h3>
                  <p className="text-slate-400 font-light">Up to 30% off when booking directly</p>
                  <div className="w-full h-px bg-slate-100 mt-6"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">Priority for Room Upgrade</h3>
                  <p className="text-slate-400 font-light">You will be upgraded and lowered your room for free within 24 hours from the time of booking</p>
                  <div className="w-full h-px bg-slate-100 mt-6"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">10% Discount on Food</h3>
                  <p className="text-slate-400 font-light">Enjoy dining at special prices for direct bookings room (excluding buffets)</p>
                  <div className="w-full h-px bg-slate-100 mt-6"></div>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full border border-amber-600 text-amber-600 py-5 font-bold uppercase tracking-[0.4em] text-xs hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-lg"
                >
                  BOOK ROOM NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default About;
