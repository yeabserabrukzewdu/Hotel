
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { 
  Utensils, Wine, Clock, ChevronRight, Star, 
  ChefHat, Coffee, Music, Calendar, Info,
  ChevronLeft, Users, Phone, MapPin, Download, Check,
  GlassWater, Sparkles, Languages, Quote
} from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import BookingEngine from '../components/BookingEngine';

const Dining: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [heroIndex, setHeroIndex] = useState(0);
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

  const heroImages = [
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200"
  ];

  const nextHero = () => setHeroIndex(prev => (prev + 1) % heroImages.length);
  const prevHero = () => setHeroIndex(prev => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="bg-[#fcfcfc] overflow-x-hidden">
      {/* 1. Immersive Hero Slider */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/45 z-10"></div>
          {heroImages.map((img, i) => (
            <div 
              key={i}
              className={`absolute inset-0 transition-opacity duration-[2.5s] ease-in-out ${heroIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt="Dining Hero" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="w-12 h-px bg-amber-500"></div>
               <span className="text-amber-500 uppercase tracking-[0.5em] font-bold text-[10px]">Gastronomic Excellence</span>
               <div className="w-12 h-px bg-amber-500"></div>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-serif mb-8 leading-none animate-in fade-in slide-in-from-bottom-12 duration-1000">
              LA Hotel & SPA <span className="block italic text-amber-500">Dining Experience</span>
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-white/90 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              "Where world-class culinary artistry meets the soulful flavors of the Horn of Africa."
            </p>
            <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <button onClick={() => setIsBookingOpen(true)} className="gold-gradient text-slate-900 px-10 py-4 font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 transition-all">Book a Table</button>
            </div>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-4">
           <button onClick={prevHero} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm">
             <ChevronLeft size={20} />
           </button>
           <button onClick={nextHero} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm">
             <ChevronRight size={20} />
           </button>
        </div>
      </section>

      {/* 2. Brand Introduction & Core Values */}
      <section id="dining-intro" className="scroll-trigger py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className={`transition-all duration-1000 ${isVisible['dining-intro'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <h2 className="text-amber-600 uppercase tracking-[0.6em] font-black text-xs mb-8">OUR RESTAURANTS</h2>
                <h3 className="text-5xl font-serif text-slate-900 leading-tight mb-10">A Legacy of <br/>Flavor & Hospitality</h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">
                  LA Hotel and SPA offers dining at its best with the freshest flavors of locally sourced produce. Kickstart your day with a delicious breakfast and enjoy a range of continental and local dishes.
                </p>
                <div className="p-8 bg-slate-50 border-l-2 border-amber-500 italic text-slate-600 text-sm leading-relaxed mb-10">
                  "It offers a selected buffet breakfast. You would prefer to enjoy your meal in the comfort of your room? Enjoy our delicious meal trays including a starter, a main course, a dessert, a drink... and a surprise and 24 hour room service."
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl text-slate-900">100%</h4>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Organic Ingredients</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl text-slate-900">24/7</h4>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">In-Room Dining</p>
                  </div>
                </div>
             </div>
             <div className={`relative transition-all duration-[2s] ${isVisible['dining-intro'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600" className="rounded-sm shadow-xl hover:brightness-110 transition-all" alt="Culinary" />
                    <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600" className="rounded-sm shadow-xl hover:brightness-110 transition-all" alt="Freshness" />
                  </div>
                  <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=600" className="rounded-sm shadow-xl hover:brightness-110 transition-all" alt="Gourmet" />
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" className="rounded-sm shadow-xl hover:brightness-110 transition-all" alt="Presentation" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. The Bar Experience */}
      <section id="bar-experience" className="scroll-trigger py-40 bg-[#0a1120] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible['bar-experience'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                 <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative group">
                    <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="LA Bar" />
                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition-colors"></div>
                 </div>
              </div>
              <div className={`order-1 lg:order-2 space-y-12 transition-all duration-1000 ${isVisible['bar-experience'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                 <div className="space-y-4">
                    <h2 className="text-amber-500 uppercase tracking-[0.6em] font-black text-xs">THE LOUNGE & BAR</h2>
                    <h3 className="text-5xl md:text-6xl font-serif leading-tight">Sophisticated <br/> Spirits & Rhythms</h3>
                 </div>
                 <p className="text-slate-400 text-lg font-light leading-relaxed">
                   Our stylish bar and restaurant provide the best relaxation place in Addis Ababa for you to hang out and enjoy with friends and family. Treat yourself to a wide array of delicacies, drinks, entertainment and refreshments.
                 </p>
                 <div className="space-y-8">
                    <p className="text-slate-300 italic font-light border-l border-amber-500/40 pl-8">
                      "Relax after an exciting day in the busy city of Addis Ababa. Whether you're visiting for business or leisure, the LA Bar is the ideal place to let the day run out with a large selection of international wines, cocktails, beers, spirits and soft drinks."
                    </p>
                    <div className="flex gap-10">
                       <div className="flex items-center gap-3">
                          <Wine className="text-amber-500" size={24} />
                          <span className="text-[10px] uppercase font-black tracking-widest">Global Cellar</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Music className="text-amber-500" size={24} />
                          <span className="text-[10px] uppercase font-black tracking-widest">Live Melodies</span>
                       </div>
                    </div>
                 </div>
                 <button className="border border-white/20 px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-slate-900 transition-all">Download Drink List</button>
              </div>
           </div>
        </div>
      </section>

      {/* 4. NEW SECTION: Private Dining & Special Occasions */}
      <section id="private-dining" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-amber-600 uppercase tracking-[0.6em] font-black text-xs mb-8">EXCLUSIVE EXPERIENCES</h2>
              <h3 className="text-5xl font-serif text-slate-900 mb-10">Private Dining & Bespoke Events</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Elevate your celebrations to a new height of luxury. Our dedicated event specialists curate every detail, from custom menus to floral arrangements, ensuring a masterpiece of an evening.
              </p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "The Chef's Table", 
                  img: "https://images.unsplash.com/photo-1550966841-3eeec2160910?auto=format&fit=crop&q=80&w=800",
                  desc: "An intimate, multi-course journey prepared personally by our Executive Chef for up to 8 guests."
                },
                { 
                  title: "The Rooftop Terrace", 
                  img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800",
                  desc: "Dine under the Addis starlight with panoramic city views in our most sought-after private alcove."
                },
                { 
                  title: "Grand Banquet Hall", 
                  img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
                  desc: "A regal setting for galas, corporate dinners, and weddings that demand the absolute pinnacle of luxury."
                }
              ].map((item, i) => (
                <div key={i} className={`group relative h-[500px] overflow-hidden rounded-sm transition-all duration-1000 ${isVisible['private-dining'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                   <img src={item.img} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt={item.title} />
                   <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/60 transition-colors"></div>
                   <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                      <h4 className="text-2xl font-serif mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">{item.title}</h4>
                      <p className="text-sm font-light text-white/70 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                      <button className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-amber-500 pb-1 self-start">Inquire Now</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Service Offerings Grid */}
      <section id="offerings-split" className="scroll-trigger py-40 bg-slate-50">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className={`lg:w-1/2 space-y-10 transition-all duration-1000 ${isVisible['offerings-split'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <h4 className="text-amber-600 uppercase tracking-[0.4em] font-black text-xs">CULINARY COMMITMENT</h4>
                <h2 className="text-5xl font-serif text-slate-900 leading-tight">We Always Want To Give Our Customers The Best</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Our chef is very good at making local food like you know it from home, as well as continental food. We provide a dining experience like royalty, with expert hospitality at every touchpoint.
                </p>
                
                <div className="grid md:grid-cols-2 gap-y-10 gap-x-12 pt-10">
                  {[
                    { name: "Cocktail & Drink", icon: <GlassWater size={24} /> },
                    { name: "Custom Decoration", icon: <Sparkles size={24} /> },
                    { name: "Morning Buffet", icon: <Coffee size={24} /> },
                    { name: "Breakfast in the Room", icon: <Utensils size={24} /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:w-1/2 grid grid-cols-2 gap-4 transition-all duration-1000 ${isVisible['offerings-split'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <div className="space-y-4">
                    <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Detail 1" />
                    </div>
                    <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Detail 2" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-16">
                    <div className="aspect-square rounded-sm overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Detail 3" />
                    </div>
                    <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Detail 4" />
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Operational Quick Info Bar */}
      <section id="operational-info" className="scroll-trigger py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
           <div className={`grid md:grid-cols-3 gap-16 transition-all duration-1000 ${isVisible['operational-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex flex-col items-center text-center space-y-4">
                 <Calendar className="text-amber-500 mb-2" size={32} strokeWidth={1}/>
                 <h4 className="font-serif text-2xl">Opening Date</h4>
                 <p className="text-slate-400 font-light uppercase tracking-widest text-[10px]">Monday - Saturday</p>
                 <div className="w-8 h-px bg-amber-500/20"></div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 border-y md:border-y-0 md:border-x border-white/5 py-12 md:py-0">
                 <Clock className="text-amber-500 mb-2" size={32} strokeWidth={1}/>
                 <h4 className="font-serif text-2xl">Opening Hours</h4>
                 <p className="text-slate-400 font-light uppercase tracking-widest text-[10px]">06:00 Am – 23:30 Pm</p>
                 <div className="w-8 h-px bg-amber-500/20"></div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                 <Phone className="text-amber-500 mb-2" size={32} strokeWidth={1}/>
                 <h4 className="font-serif text-2xl">Phone Booking</h4>
                 <p className="text-slate-400 font-light uppercase tracking-widest text-[10px]">+251 995 262 626</p>
                 <div className="w-8 h-px bg-amber-500/20"></div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-40 bg-white text-center relative overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-[0.03] text-[20vw] font-serif whitespace-nowrap pointer-events-none select-none">
          LA Hotel Dining
        </div>
        <div className="container mx-auto px-6 relative z-10">
           <Quote className="mx-auto text-amber-500 mb-12 opacity-30" size={64} strokeWidth={1}/>
           <h2 className="text-5xl md:text-7xl font-serif mb-16 leading-tight max-w-4xl mx-auto">Discover the art of refined Abyssinian dining.</h2>
           <button onClick={() => setIsBookingOpen(true)} className="gold-gradient text-slate-900 px-16 py-6 font-bold uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 transition-all">Experience Royalty</button>
        </div>
      </section>

      <ChatWidget />
      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Dining;
