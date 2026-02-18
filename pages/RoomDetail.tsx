
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROOM_DATA } from './Rooms';
import { 
  Users, Maximize, Bed, Check, ArrowLeft, Star, Coffee, 
  Wifi, Tv, ShieldCheck, ChevronLeft, ChevronRight, Image as ImageIcon 
} from 'lucide-react';
import BookingEngine from '../components/BookingEngine';

const RoomDetail: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const room = ROOM_DATA.find(r => r.id === roomId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-slide hero (optional)
  useEffect(() => {
    if (!room) return;
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % room.images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [room]);

  if (!room) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-4xl font-serif mb-8">Room not found</h2>
        <Link to="/rooms" className="text-amber-600 font-bold uppercase tracking-widest underline">Back to collection</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Immersive Hero Slideshow */}
      <section className="relative h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {room.images.map((img, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 transition-opacity duration-[2.5s] ease-in-out ${heroIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
            >
              <img src={img} className="w-full h-full object-cover brightness-[0.6]" alt={`${room.name} View ${i + 1}`} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pb-20 text-white">
          <button 
            onClick={() => navigate('/rooms')}
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-12 opacity-70 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={16} /> Back to Collection
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <div className="flex gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <h1 className="text-7xl md:text-9xl font-serif mb-6 leading-none animate-in fade-in slide-in-from-left-8 duration-1000">
                {room.name}
              </h1>
              <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] opacity-80">
                <span>Bole Luxury District</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <span>5-Star Premium</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-6 w-full md:w-auto">
              <div className="flex gap-2 mb-4">
                {room.images.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setHeroIndex(i)}
                    className={`h-1.5 transition-all duration-700 ${heroIndex === i ? 'w-12 bg-amber-500' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
              <div className="text-right">
                <span className="block text-amber-500 text-6xl font-serif mb-2">${room.price}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-black">Daily Exclusive Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Navigation Controls */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button 
            onClick={() => setHeroIndex(prev => (prev - 1 + room.images.length) % room.images.length)}
            className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setHeroIndex(prev => (prev + 1) % room.images.length)}
            className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Main Content & Specs */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-24">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-24">
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h3 className="text-amber-600 text-[11px] uppercase tracking-[0.6em] font-bold mb-8 block">AN IMPECCABLE SANCTUARY</h3>
                <h2 className="text-5xl font-serif mb-10 leading-tight">Masterfully Crafted for the Discerning Soul</h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed mb-10">
                  {room.desc} Each detail of our {room.name} has been curated to provide an experience that transcends a standard hotel stay. Blending high-altitude Addis warmth with international design standards.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-10 border-t border-slate-100">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Occupancy</span>
                    <span className="text-xl font-serif">{room.capacity}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Square Space</span>
                    <span className="text-xl font-serif">{room.size}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Bedding</span>
                    <span className="text-xl font-serif">{room.bed} King Set</span>
                  </div>
                </div>
              </div>

              {/* Comprehensive Gallery Section */}
              <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-slate-100 pb-8">
                  <h4 className="text-3xl font-serif">Perspective Gallery</h4>
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-bold">
                    <ImageIcon size={16} /> 7 Professional Captures
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {room.images.map((img, i) => (
                    <div 
                      key={i} 
                      className={`relative overflow-hidden group cursor-zoom-in rounded-sm ${
                        i === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                        alt={`${room.name} Detail ${i + 1}`} 
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-2xl font-serif mb-12">Premier Amenities</h4>
                <div className="grid grid-cols-2 gap-y-10">
                  {[
                    { icon: <Wifi size={24} />, label: "Complimentary Ultra-WiFi" },
                    { icon: <Coffee size={24} />, label: "Artisanal Coffee Suite" },
                    { icon: <Tv size={24} />, label: "4K UHD Smart TV System" },
                    { icon: <ShieldCheck size={24} />, label: "Digital In-Room Safe" },
                    { icon: <Users size={24} />, label: "Butler Service on Request" },
                    { icon: <Maximize size={24} />, label: "Italian Marble Bath" }
                  ].map((amenity, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="text-amber-600 transition-transform group-hover:scale-110">{amenity.icon}</div>
                      <span className="text-sm font-medium text-slate-600 uppercase tracking-widest">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Booking Card */}
            <div className="relative">
              <div className="sticky top-32 bg-white border border-slate-100 shadow-2xl p-12 space-y-10">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 block">Reservation Rate</span>
                  <p className="text-6xl font-serif text-slate-900">${room.price}</p>
                  <p className="text-[10px] uppercase font-black text-amber-600 tracking-widest mt-2">Best Price Guaranteed</p>
                </div>
                
                <div className="space-y-4">
                   <button 
                     onClick={() => setIsBookingOpen(true)}
                     className="w-full gold-gradient py-6 text-slate-900 font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:scale-105 transition-all"
                   >
                     RESERVE THIS SUITE
                   </button>
                   <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">No credit card required today</p>
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <div className="flex items-center gap-4">
                    <Check size={16} className="text-green-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">24-hour Cancellation</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check size={16} className="text-green-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Complimentary Breakfast</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} initialRoom={room.id} />
    </div>
  );
};

export default RoomDetail;
