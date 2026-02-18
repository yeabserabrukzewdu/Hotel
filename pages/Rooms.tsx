
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { Link } from 'react-router-dom';
import { Users, Maximize, Bed, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingEngine from '../components/BookingEngine';

export const ROOM_DATA = [
  { 
    id: 'standard-room',
    name: "Standard Room", 
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Recently refurbished in an individual and elegant style, enjoy the comfort of a luxurious Corrib Room. Upgrade to an immaculate Corrib Lake View.",
    price: 35,
    capacity: "2 PERSONS",
    size: "30 M²",
    bed: "1",
    features: ['Free WiFi', 'Air Conditioning', 'Safe Box', 'Smart TV']
  },
  { 
    id: 'standard-medium',
    name: "Standard Medium Room", 
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512918766671-ad650596309c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505691722218-26986d2039a4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1591088398332-8a77d399e8d5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1616594831707-301142c3b39c?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Recently refurbished in an individual and elegant style, enjoy the comfort of a luxurious Corrib Room. Upgrade to an immaculate Corrib Lake View.",
    price: 30,
    capacity: "2 PERSONS",
    size: "40 M²",
    bed: "1",
    features: ['City View', 'Work Desk', 'Rain Shower', 'Mini Bar']
  },
  { 
    id: 'twin-bed',
    name: "Twin Bed Room", 
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512918766671-ad650596309c?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Recently refurbished in an individual and elegant style, enjoy the comfort of a luxurious Corrib Room. Upgrade to an immaculate Corrib Lake View.",
    price: 45,
    capacity: "2 PERSONS",
    size: "40 M²",
    bed: "1",
    features: ['Twin Beds', 'Coffee Maker', 'Premium Linens', 'Evening Turndown']
  },
  { 
    id: 'standard-suit',
    name: "Standard Suit Room", 
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9759678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1591088398332-8a77d399e8d5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Recently refurbished in an individual and elegant style, enjoy the comfort of a luxurious Corrib Room. Upgrade to an immaculate Corrib Lake View.",
    price: 40,
    capacity: "2 PERSONS",
    size: "45 M²",
    bed: "1",
    features: ['Lounge Area', 'Bath Tub', 'Walk-in Closet', 'Fruit Basket']
  }
];

const RoomCard: React.FC<{ room: any, index: number, isVisible: boolean, onReserve: (id: string) => void }> = ({ room, index, isVisible, onReserve }) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div 
      id={room.id}
      className={`scroll-trigger transition-all duration-1000 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-10 shadow-lg bg-slate-100">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img 
            src={room.images[activeImage]} 
            key={activeImage}
            className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105" 
            alt={room.name} 
          />
        </div>
        
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button onClick={prevImg} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 hover:bg-[#d4af37] hover:text-white transition-all shadow-xl">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextImg} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 hover:bg-[#d4af37] hover:text-white transition-all shadow-xl">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {room.images.map((_: any, i: number) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${activeImage === i ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/40'}`}></div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-baseline">
          <h2 className="text-4xl font-serif text-slate-900">{room.name}</h2>
          <span className="text-2xl font-serif text-[#b89535]">${room.price} / DAY</span>
        </div>

        <div className="flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-y border-slate-100 py-6">
          <div className="flex items-center gap-3">
            <Users size={18} strokeWidth={1} className="text-slate-400" />
            <span>CAPACITY: {room.capacity}</span>
          </div>
          <div className="flex items-center gap-3">
            <Maximize size={18} strokeWidth={1} className="text-slate-400" />
            <span>SIZE: {room.size}</span>
          </div>
          <div className="flex items-center gap-3">
            <Bed size={18} strokeWidth={1} className="text-slate-400" />
            <span>BED: {room.bed}</span>
          </div>
        </div>

        <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 line-clamp-2">{room.desc}</p>

        <div className="flex gap-4">
          <Link to={`/rooms/${room.id}`} className="bg-slate-900 text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-slate-700 transition-all duration-500">
            ROOM DETAILS
          </Link>
          <button 
            onClick={() => onReserve(room.id)}
            className="bg-[#d4af37] text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-slate-900 transition-all duration-500"
          >
            RESERVE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const Rooms: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);
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

  const handleReserve = (id: string) => {
    setSelectedRoomId(id);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-[#fcfcfc] pb-32">
      <section className="pt-32 pb-24 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-1.5 text-amber-500 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-slate-900">Rooms & Suites</h1>
          <div className="w-24 h-px bg-amber-500 mx-auto"></div>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
          {ROOM_DATA.map((room, i) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              index={i} 
              isVisible={isVisible[room.id]} 
              onReserve={handleReserve}
            />
          ))}
        </div>
      </section>

      <BookingEngine 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialRoom={selectedRoomId} 
      />
    </div>
  );
};

export default Rooms;
