
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { 
  Flower2, Moon, Sun, Clock, Star, Sparkles, Wind, Droplets, 
  ChevronRight, CheckCircle2, Waves, Thermometer, UserCheck, 
  Phone, Calendar, Info, Quote, GlassWater, Heart
} from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import BookingEngine from '../components/BookingEngine';

const Spa: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-trigger').forEach(el => {
      if (el.id) observerRef.current?.observe(el);
    });
    
    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    { name: "AROMA THERAPY", price: "1000 Birr", duration: "40 Min", icon: <Wind size={32} />, desc: "Aromatherapy is a holistic healing practice that uses essential oils extracted from plants to promote physical and psychological well-being." },
    { name: "SAUNA RELAX", price: "1000 Birr", duration: "40 Min", icon: <Thermometer size={32} />, desc: "Using a sauna may help relieve aches and pains, support relaxation, and improve cardiovascular health. Improved blood circulation." },
    { name: "STEAM", price: "1000 Birr", duration: "40 Min", icon: <Droplets size={32} />, desc: "Steam rooms may provide benefits, such as reducing system-wide inflammation, clears congestion, reduces inflammation, improves circulation, reduces stress." },
    { name: "FULL BODY MASSAGE", price: "1000 Birr", duration: "1 Hour", icon: <UserCheck size={32} />, desc: "Massage is a general term for pressing, rubbing and manipulating your skin, muscles, tendons and ligaments for deep pressure." },
    { name: "SALT & AROMA", price: "1000 Birr", duration: "20 Min", icon: <Sparkles size={32} />, desc: "If you need improvement in health problems from anxiety to poor sleep, you may want to consider aromatherapy with salt extracts." },
    { name: "JACUZZI", price: "1000 Birr", duration: "40 Min", icon: <Waves size={32} />, desc: "The benefits of using a hot tub include stress relief, improved blood sugar management, better sleep, and muscle relaxation." },
    { name: "REVIVE WITH ROSE", price: "1000 Birr", duration: "1 Hour", icon: <Flower2 size={32} />, desc: "Moroccan bath includes lathering, steaming and scrubbing. In a private setting, a practitioner will use a rose soap to lather your body." },
    { name: "GEOTHERMAL SPA", price: "$53", duration: "1 Hour", icon: <Thermometer size={32} />, desc: "Vix te soleat eirmod civibus. Ius ad autem dicam exerci, sed et erremasc simul." }
  ];

  return (
    <div className="bg-[#fcfcfc] overflow-x-hidden">
      {/* 1. Cinematic Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/45 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover animate-[kenburns_40s_infinite]" 
            alt="Spa Hero"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white text-center">
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-12 h-px bg-amber-500"></div>
              <span className="text-amber-500 uppercase tracking-[0.5em] font-bold text-[10px]">Pure Serenity</span>
              <div className="w-12 h-px bg-amber-500"></div>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-serif mb-12 leading-none">
              Bole <span className="text-amber-500 italic">Wellness</span>
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-white/90 max-w-2xl mx-auto mb-12">
              "The secret sanctuary in the heart of Addis Ababa."
            </p>
            <button onClick={() => setIsBookingOpen(true)} className="gold-gradient text-slate-900 px-12 py-5 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all">Book Your Ritual</button>
          </div>
        </div>
      </section>

      {/* 2. Introduction & Quick Info (Screenshot 2) */}
      <section id="spa-intro" className="scroll-trigger py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className={`relative transition-all duration-[1.5s] ${isVisible['spa-intro'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1519415510271-41975b4e847c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Spa Treatment" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-full h-full border border-amber-500/10 rounded-sm -z-10"></div>
            </div>
            
            <div className={`transition-all duration-1000 ${isVisible['spa-intro'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <h4 className="text-amber-600 uppercase tracking-[0.6em] font-black text-xs mb-8">RELAX AND TAKE CARE OF BEAUTY</h4>
              <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight mb-10">Come Experience the Secrets of Relaxation</h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
                When coming to this Spa, we will feel all 5 senses, with peaceful space, melodious sound, faint scent and enjoy attentive and effective care. From there, each person seems to remove all worries, work pressure, rest the body and mind. Design a cozy, quiet, gentle space and combine the faint scent spread around, with melodious music melodies.
              </p>

              <div className="grid md:grid-cols-3 gap-8 py-10 border-t border-slate-100">
                <div>
                  <h5 className="text-xl font-serif text-slate-900 mb-2">Opening Date:</h5>
                  <p className="text-amber-600 font-bold text-sm">Monday - Sunday</p>
                </div>
                <div className="border-x border-slate-100 px-4">
                  <h5 className="text-xl font-serif text-slate-900 mb-2">Opening Hours:</h5>
                  <p className="text-amber-600 font-bold text-sm">08:00 am – 12:30 pm</p>
                </div>
                <div className="pl-4">
                  <h5 className="text-xl font-serif text-slate-900 mb-2">Phone Booking:</h5>
                  <p className="text-slate-900 font-bold text-sm">+251 995 262 626</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Therapies Gallery (Screenshot 3) */}
      <section id="therapies-gallery" className="scroll-trigger py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-8 h-px bg-slate-200"></div>
            <span className="text-slate-400 uppercase tracking-[0.5em] font-bold text-[10px]">OUR SERVICES</span>
            <div className="w-8 h-px bg-slate-200"></div>
          </div>
          <h2 className="text-5xl font-serif text-slate-900 mb-6">Therapies And Massage</h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto italic">
            Quality Service. Attention to Detail. Relaxation at its best. Our waxing services gently remove hair, leaving the skin comfortable and smooth.
          </p>
        </div>
        <div className="container mx-auto px-6">
          <div className={`grid md:grid-cols-3 gap-1 transition-all duration-1000 ${isVisible['therapies-gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Facial Treatment" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Mud Mask" />
            </div>
            <div className="aspect-[4/5] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Massage therapy" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Service Cards Grid (Screenshots 4 & 5) */}
      <section id="spa-services" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`p-10 border border-slate-100 rounded-sm text-center flex flex-col items-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group scroll-trigger ${isVisible['spa-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-amber-500 mb-8 transition-transform group-hover:scale-110 duration-500">
                  {s.icon}
                </div>
                <h3 className="text-xl font-serif text-amber-600 mb-6 uppercase tracking-widest">{s.name}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-8 flex-1">
                  {s.desc}
                </p>
                <div className="flex gap-2">
                  <span className="bg-amber-500/10 text-amber-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{s.price}</span>
                  <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offer Banner (Screenshot 7) */}
      <section id="special-offer" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center bg-slate-50">
            <div className="lg:w-1/2 aspect-[16/9] lg:aspect-auto h-[500px] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Special Offer Spa" />
            </div>
            <div className="lg:w-1/2 p-12 md:p-24 text-center lg:text-left">
              <h2 className="text-6xl md:text-8xl font-serif text-slate-900 mb-8 leading-none">Spa for <span className="text-amber-600">1500 Birr</span></h2>
              <p className="text-xl text-slate-500 font-light italic mb-12">
                includes massage, steam and sauna and it is best offer for better health
              </p>
              <button onClick={() => setIsBookingOpen(true)} className="gold-gradient text-slate-900 px-16 py-6 font-black uppercase tracking-[0.4em] text-xs shadow-xl hover:scale-105 transition-all">BOOK NOW</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ambience Gallery (Screenshot 1) */}
      <section id="ambience-gallery" className="scroll-trigger py-40 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 mb-24 text-center">
           <h2 className="text-5xl font-serif mb-6 italic">The Ambience of Absolute Peace</h2>
           <p className="text-slate-400 font-light tracking-[0.2em] uppercase text-xs">A Visual Journey Through Our Lounge</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4 h-[600px]">
           <div className={`flex-[1.5] relative transition-all duration-[1.5s] ${isVisible['ambience-gallery'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <img src="https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover brightness-75" alt="Lounge Area" />
              <div className="absolute inset-0 bg-slate-950/20"></div>
           </div>
           <div className={`flex-[2] relative transition-all duration-[1.5s] delay-300 ${isVisible['ambience-gallery'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img src="https://images.unsplash.com/photo-1519415510271-41975b4e847c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover shadow-2xl border-4 border-amber-500/20" alt="Relaxation Beds" />
              <div className="absolute bottom-10 left-10 p-8 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-sm">
                 <h4 className="text-2xl font-serif mb-4">Post-Treatment Bliss</h4>
                 <p className="text-xs text-slate-400 font-light leading-relaxed">Relax on our premium loungers with specialized red-velvet ritual towels.</p>
              </div>
           </div>
           <div className={`flex-1 relative transition-all duration-[1.5s] delay-500 ${isVisible['ambience-gallery'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <img src="https://images.unsplash.com/photo-1591343395582-ea127cf397e4?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover brightness-75" alt="Washroom Detail" />
              <div className="absolute inset-0 bg-slate-950/20"></div>
           </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-40 bg-white text-center">
        <div className="container mx-auto px-6 relative z-10">
           <Quote className="mx-auto text-amber-500 mb-12 opacity-30" size={64} strokeWidth={1}/>
           <h2 className="text-5xl md:text-7xl font-serif mb-16 leading-tight max-w-4xl mx-auto">Discover the art of refined Abyssinian wellness.</h2>
           <button onClick={() => setIsBookingOpen(true)} className="gold-gradient text-slate-900 px-16 py-6 font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 transition-all">Experience Relaxation</button>
        </div>
      </section>

      <ChatWidget />
      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Spa;
