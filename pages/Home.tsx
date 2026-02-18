
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Star, ArrowRight, Calendar, Users, MapPin, 
  ShieldCheck, Clock, Package, Plane, Coffee, 
  Wind, Dumbbell, Mail, Phone, Map as MapIcon,
  ChevronLeft, ChevronRight, Quote, Bed, Flower2
} from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import BookingEngine from '../components/BookingEngine';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  
  // Ref for intersection observer to trigger scroll animations
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

  const collectionItems = [
    {
      id: 'rooms-highlight',
      title: "Refined Accommodations",
      subtitle: "MASTERFULLY CRAFTED SUITES",
      desc: "Experience the ultimate in urban luxury with suites that blend European elegance and Abyssinian warmth.",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      link: "/rooms",
      icon: <Bed size={24} />
    },
    {
      id: 'spa-highlight',
      title: "Bole Wellness Spa",
      subtitle: "THE ART OF RENEWAL",
      desc: "Ancient Ethiopian rituals meet modern science in our award-winning sanctuary of tranquility.",
      img: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=1200",
      link: "/spa",
      icon: <Flower2 size={24} />
    },
    {
      id: 'gym-highlight',
      title: "Elite Fitness Center",
      subtitle: "PRECISION PERFORMANCE",
      desc: "State-of-the-art TechnoGym technology paired with the highest-altitude training expertise in the city.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
      link: "/fitness",
      icon: <Dumbbell size={24} />
    }
  ];

  const diningOptions = [
    { 
      name: "The Horizon Grill", 
      type: "Modern Fusion", 
      desc: "An epicurean journey blending highlands spices with international techniques.",
      img: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      name: "The Velvet Lounge", 
      type: "Mixology & Jazz", 
      desc: "Sophisticated cocktails and live melodies overlooking the city skyline.",
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200" 
    }
  ];

  const nearbyExperiences = [
    { name: "Unity Park", dist: "1.2km", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600" },
    { name: "National Museum", dist: "2.5km", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" },
    { name: "Merkato Market", dist: "4.0km", img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover animate-[kenburns_40s_infinite]" 
            alt="L.A. Hotel Entrance"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white text-center">
          <div className="reveal-anim mb-8 opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center gap-1.5 text-amber-500 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.5em] text-white/80">Discover Addis Ababa's Jewel</span>
          </div>
          
          <h1 className="text-8xl md:text-[12rem] font-serif mb-12 leading-none reveal-anim opacity-0" style={{ animationDelay: '0.5s' }}>
            L.A. Hotel <span className="block md:inline">& Spa</span>
          </h1>
          
          <div className="flex flex-col md:row items-center justify-center gap-12 reveal-anim opacity-0" style={{ animationDelay: '0.8s' }}>
            <p className="max-w-xl text-lg md:text-xl font-light italic text-white/90">
              "Where the ancient spirit of Abyssinia meets the refined elegance of 5-star international luxury."
            </p>
            <div className="w-px h-16 bg-white/20 hidden md:block"></div>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="gold-gradient text-slate-900 px-12 py-5 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 transition-all duration-500"
            >
              Explore Sanctuaries
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
           <div className="w-px h-12 bg-white/40 mx-auto mb-2"></div>
           <span className="text-[9px] uppercase tracking-widest text-white font-bold">Scroll</span>
        </div>
      </section>

      {/* Floating Reservation Bar */}
      <div className="sticky top-20 z-40 px-6 py-4 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 hidden md:block transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</span>
              <div className="flex items-center gap-3 text-sm font-bold cursor-pointer group">
                <Calendar className="text-amber-600 group-hover:scale-110 transition-transform" size={16} />
                <span>Select Dates</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Room Class</span>
              <div className="flex items-center gap-3 text-sm font-bold cursor-pointer group">
                <Users className="text-amber-600 group-hover:scale-110 transition-transform" size={16} />
                <span>Presidential Suite</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-slate-900 text-white px-8 py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 transition-all shadow-xl"
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* Pillars of Excellence Section */}
      <section id="pillars" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-4xl mx-auto mb-32 transition-all duration-1000 ${isVisible.pillars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h4 className="text-amber-600 uppercase tracking-[0.6em] font-bold text-xs mb-8">The L.A. Standard</h4>
            <h2 className="text-6xl md:text-7xl font-serif mb-10 leading-tight">Elevating Every Aspect of Your Stay</h2>
            <div className="w-24 h-px bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { 
                title: "Exquisite Assurance", 
                icon: <ShieldCheck size={40} strokeWidth={1}/>, 
                desc: "Our 'Bole Safe' initiative goes beyond cleanliness, ensuring a sanctuary-grade environment for your peace of mind." 
              },
              { 
                title: "Absolute Flexibility", 
                icon: <Clock size={40} strokeWidth={1}/>, 
                desc: "Plans change, luxury shouldn't. Enjoy our premier 24-hour cancellation flexibility across all curated bookings." 
              },
              { 
                title: "Signature Amenities", 
                icon: <Package size={40} strokeWidth={1}/>, 
                desc: "From Italian marble baths to locally-sourced Ethiopian coffee, every detail is selected for the discerning soul." 
              }
            ].map((pillar, i) => (
              <div key={i} className={`group text-center space-y-8 transition-all duration-1000`} style={{ transitionDelay: `${i * 300}ms`, opacity: isVisible.pillars ? 1 : 0, transform: isVisible.pillars ? 'none' : 'translateY(40px)' }}>
                <div className="text-amber-600 mb-10 transform group-hover:scale-110 transition-transform duration-700">{pillar.icon}</div>
                <h3 className="text-2xl font-serif">{pillar.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-sm">{pillar.desc}</p>
                <div className="pt-6">
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-amber-500 pb-1 cursor-pointer hover:text-amber-600 transition-colors">Our Promise</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The L.A. Collection - HIGHLIGHT DISPLAY SECTION */}
      <section id="collection" className="scroll-trigger py-40 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-4xl mb-32 transition-all duration-1000 ${isVisible.collection ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-amber-600 text-[11px] uppercase tracking-[0.6em] font-bold mb-6 block">CURATED SANCTUARIES</span>
            <h2 className="text-6xl md:text-7xl font-serif leading-tight">A Legacy of <br/> Wellness & Elegance</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {collectionItems.map((item, i) => (
              <Link 
                key={item.id}
                to={item.link}
                id={item.id}
                className={`group relative overflow-hidden aspect-[3/4] rounded-sm transition-all duration-1000 scroll-trigger ${isVisible[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Background Image with Hover Scale */}
                <div className="absolute inset-0 z-0 transition-transform duration-[2.5s] ease-out group-hover:scale-110">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-slate-900 group-hover:border-amber-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-500">{item.subtitle}</span>
                  </div>
                  <h3 className="text-3xl font-serif mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{item.title}</h3>
                  <p className="text-sm font-light text-white/70 leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 group-hover:text-amber-500 transition-colors duration-500">
                    Discover More <ArrowRight size={14} className="transform translate-x-0 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute -bottom-10 -right-20 pointer-events-none opacity-[0.03] select-none text-[20vw] font-serif leading-none whitespace-nowrap">
          Wellness Collection
        </div>
      </section>

      {/* Excellence in Service Portfolio */}
      <section id="services" className="scroll-trigger bg-white py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
               <span className="text-amber-600 text-[11px] uppercase tracking-[0.5em] font-bold mb-8 block">UNCOMPROMISING SERVICE</span>
               <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">For us, a luxurious room is merely the beginning.</h2>
               <p className="text-lg text-slate-500 font-light leading-relaxed mb-12">
                 We curate a lifestyle of effortless elegance. From your first landing at Bole International to your final sunset on our terrace, we ensure every moment is punctuated by world-class attention.
               </p>
               <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                  {[
                    { label: "Chauffeur", icon: <Plane size={24} /> },
                    { label: "Butler Service", icon: <Clock size={24} /> },
                    { label: "Revitalize Spa", icon: <Wind size={24} /> },
                    { label: "Elite Fitness", icon: <Dumbbell size={24} /> }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-default">
                      <div className="w-12 h-12 flex items-center justify-center border border-amber-500 rounded-full text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                        {s.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-900">{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className={`lg:w-1/2 relative transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
               <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative z-10">
                 <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" alt="Concierge Service" />
               </div>
               <div className="absolute -bottom-10 -left-10 w-full h-full border border-amber-500/20 rounded-sm -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomic Spotlight - Custom Slider */}
      <section id="dining" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:row items-end justify-between mb-20">
            <div className="max-w-2xl">
              <span className="text-amber-600 text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">EPICUREAN DELIGHTS</span>
              <h2 className="text-5xl font-serif">A Symphony of Flavors</h2>
            </div>
            <div className="flex gap-4 mt-8 md:mt-0">
               <button onClick={() => setActiveSlide(prev => (prev === 0 ? diningOptions.length - 1 : prev - 1))} className="w-16 h-16 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><ChevronLeft size={24} /></button>
               <button onClick={() => setActiveSlide(prev => (prev === diningOptions.length - 1 ? 0 : prev + 1))} className="w-16 h-16 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><ChevronRight size={24} /></button>
            </div>
          </div>

          <div className="relative h-[650px] overflow-hidden rounded-sm group">
            {diningOptions.map((option, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${activeSlide === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
              >
                <img src={option.img} className="w-full h-full object-cover" alt={option.name} />
                <div className="absolute inset-0 bg-slate-950/40"></div>
                <div className="absolute bottom-0 left-0 p-12 md:p-24 text-white max-w-3xl">
                  <span className="text-amber-500 text-[11px] uppercase tracking-[0.4em] font-bold mb-6 block">{option.type}</span>
                  <h3 className="text-5xl md:text-6xl font-serif mb-10">{option.name}</h3>
                  <p className="text-xl font-light text-white/80 leading-relaxed mb-12 italic">"{option.desc}"</p>
                  <Link to="/dining" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] border border-white/40 px-10 py-4 hover:bg-white hover:text-slate-900 transition-all">
                    Discover More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Guest Experiences */}
      <section className="bg-slate-900 py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 blur-[120px]"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
           <Quote className="mx-auto text-amber-500 mb-12 opacity-50" size={64} />
           <div className="max-w-4xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-serif italic mb-12 leading-tight">
                "An unforgettable tapestry of luxury. The staff treated us not as guests, but as royalty returning home to Addis."
              </h2>
              <div className="flex items-center justify-center gap-4">
                 <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" alt="Guest" />
                 </div>
                 <div className="text-left">
                   <p className="text-sm font-bold uppercase tracking-widest">Jameson S. Forbes</p>
                   <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Executive Director, Global Trade</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Neighborhood Curations */}
      <section id="explore" className="scroll-trigger py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className={`transition-all duration-1000 ${isVisible.explore ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
               <span className="text-amber-600 text-[11px] uppercase tracking-[0.5em] font-bold mb-8 block">THE NEIGHBORHOOD</span>
               <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[1.1]">Curated City <br/>Experiences</h2>
               <p className="text-lg text-slate-500 font-light leading-relaxed mb-12">
                 Located in the beating heart of Bole, L.A. Hotel & Spa serves as your primary gateway to Ethiopia's rich heritage. We offer bespoke guided tours to the city's most significant landmarks.
               </p>
               <div className="space-y-10 mb-16">
                 {nearbyExperiences.map((place, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer pb-6 border-b border-slate-100">
                     <div className="flex items-center gap-6">
                       <span className="text-amber-500 font-serif text-2xl">0{i+1}</span>
                       <span className="text-2xl font-serif group-hover:text-amber-600 transition-colors">{place.name}</span>
                     </div>
                     <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{place.dist}</span>
                   </div>
                 ))}
               </div>
               <button className="gold-gradient text-slate-900 px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 transition-all">
                 Request Guided Tour
               </button>
            </div>
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible.explore ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
               <div className="space-y-6">
                 <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="" />
                 </div>
                 <div className="aspect-square rounded-sm overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="" />
                 </div>
               </div>
               <div className="space-y-6 pt-16">
                 <div className="aspect-square rounded-sm overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="" />
                 </div>
                 <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]" alt="" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Sanctuary Contact */}
      <section id="contact" className="scroll-trigger py-40 bg-slate-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32">
             <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <span className="text-amber-500 text-[11px] uppercase tracking-[0.5em] font-bold mb-8 block">PLAN YOUR ARRIVAL</span>
                <h2 className="text-6xl md:text-8xl font-serif mb-16 leading-none">Your Sanctuary Awaits.</h2>
                
                <div className="space-y-16">
                  <div className="flex items-start gap-12 group">
                    <div className="w-px h-16 bg-amber-500/40 group-hover:h-24 transition-all duration-700"></div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber-500 mb-4">Prime Location</h4>
                      <p className="text-2xl font-serif leading-relaxed">Bole 24, Near Eritrea Embassy,<br/>Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-12 group">
                    <div className="w-px h-16 bg-amber-500/40 group-hover:h-24 transition-all duration-700"></div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber-500 mb-4">Direct Reservations</h4>
                      <p className="text-4xl md:text-6xl font-serif tracking-tighter hover:text-amber-500 transition-colors cursor-pointer">+251 995 262 626</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-12 group">
                    <div className="w-px h-16 bg-amber-500/40 group-hover:h-24 transition-all duration-700"></div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber-500 mb-4">Digital Concierge</h4>
                      <p className="text-2xl font-serif underline decoration-amber-500 underline-offset-8">info@la-hotelandspa.com</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className={`relative h-[800px] transition-all duration-[2s] ${isVisible.contact ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-sm z-0"></div>
                <div className="absolute inset-4 overflow-hidden rounded-sm grayscale group hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                    alt="Map Visualization" 
                  />
                  {/* Styled Map Interaction Card */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                     <div className="bg-white p-12 shadow-2xl rounded-sm text-slate-900 max-w-sm transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-6 mb-10">
                           <div className="w-16 h-16 bg-slate-900 text-amber-500 flex items-center justify-center rounded-sm">
                             <MapIcon size={32} strokeWidth={1}/>
                           </div>
                           <div>
                              <h4 className="font-serif text-2xl">L.A. Hotel</h4>
                              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mt-2">Bole District • 2R52+VJF</p>
                           </div>
                        </div>
                        <div className="space-y-6 mb-12 border-y border-slate-100 py-6">
                           <div className="flex justify-between text-xs">
                             <span className="text-slate-400 uppercase tracking-widest">Rating</span>
                             <div className="flex gap-1 text-amber-500">
                               {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                             </div>
                           </div>
                           <div className="flex justify-between text-xs">
                             <span className="text-slate-400 uppercase tracking-widest">Reviews</span>
                             <span className="font-bold underline">42 Guest Stories</span>
                           </div>
                        </div>
                        <button className="w-full gold-gradient py-4 text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg">
                          Launch Navigation
                        </button>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <ChatWidget />
      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Home;
