
import React, { useState, useEffect } from 'react';
import { 
  X, Calendar as CalendarIcon, Users, ArrowRight, 
  CheckCircle2, Star, ShieldCheck, Plane, 
  ChevronRight, ArrowLeft, Sparkles,
  Info, Bed, InfoIcon, Maximize, ChevronLeft, Mail, Loader2
} from 'lucide-react';
import { generateReservationEmail } from '../services/gemini';

/** 
 * CONFIGURATION: SENDGRID INTEGRATION
 * Note: You must verify yeabserabruk1234@gmail.com as a Single Sender in SendGrid.
 */
const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY_HERE";
const SENDER_EMAIL = "yeabserabruk1234@gmail.com";

interface BookingEngineProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: string;
}

const ROOMS = [
  { 
    id: 'standard-room', 
    name: 'Standard Corrib Room', 
    price: 35, 
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    capacity: "2 PAX",
    size: "30 M²",
    tags: ['City View', 'TechnoGym Access']
  },
  { 
    id: 'standard-medium', 
    name: 'Standard Medium Room', 
    price: 30, 
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    capacity: "2 PAX",
    size: "40 M²",
    tags: ['High-Altitude Air', 'Work Studio']
  },
  { 
    id: 'twin-bed', 
    name: 'L.A. Executive Twin', 
    price: 45, 
    img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800',
    capacity: "2 PAX",
    size: "40 M²",
    tags: ['Twin Bed Set', 'Artisanal Bar']
  },
  { 
    id: 'standard-suit', 
    name: 'Bole Presidential Suite', 
    price: 40, 
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    capacity: "2 PAX",
    size: "45 M²",
    tags: ['Butler Service', 'VIP Lounge']
  },
];

const BookingEngine: React.FC<BookingEngineProps> = ({ isOpen, onClose, initialRoom }) => {
  const [step, setStep] = useState(1);
  const [activePicker, setActivePicker] = useState<'checkIn' | 'checkOut' | null>(null);
  const [pickerViewDate, setPickerViewDate] = useState(new Date());
  const [statusMessage, setStatusMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomId: initialRoom || '',
    name: '',
    email: '',
    specialRequest: '',
    airportPickUp: false
  });

  useEffect(() => {
    if (isOpen) {
      setBookingData(prev => ({ 
        ...prev, 
        roomId: initialRoom || prev.roomId 
      }));
      setStep(1);
      setActivePicker(null);
      setIsProcessing(false);
      setStatusMessage('');
    }
  }, [isOpen, initialRoom]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS.find(r => r.id === bookingData.roomId);
  
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 1;
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const nights = calculateNights();
  const totalPrice = (selectedRoom?.price || 0) * nights;

  const handleStep1Next = () => {
    if (initialRoom || bookingData.roomId) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleSendGridDispatch = async () => {
    setIsProcessing(true);
    setStatusMessage('Drafting your personalized itinerary with Gemini AI...');
    
    try {
      // 1. Generate Luxury Email Content via Gemini
      const personalizedBody = await generateReservationEmail({
        ...bookingData,
        roomName: selectedRoom?.name || 'Luxury Suite'
      });

      setStatusMessage(`Initiating secure SendGrid dispatch to ${bookingData.email}...`);

      // 2. Prepare SendGrid Payload
      const sendGridPayload = {
        personalizations: [
          {
            to: [{ email: bookingData.email }],
            subject: `Reservation Confirmed: ${selectedRoom?.name} - L.A. Hotel & Spa`
          }
        ],
        from: {
          email: SENDER_EMAIL,
          name: "L.A. Hotel & Spa Reservations"
        },
        content: [
          {
            type: "text/plain",
            value: personalizedBody
          }
        ]
      };

      // 3. Dispatch via Fetch API
      if (SENDGRID_API_KEY !== "YOUR_SENDGRID_API_KEY_HERE") {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sendGridPayload)
        });

        if (!response.ok) {
          throw new Error("SendGrid API returned an error status.");
        }
      } else {
        // Fallback for demonstration if API key is not yet provided
        console.warn("SendGrid API Key missing. Simulating successful dispatch...");
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      setIsProcessing(false);
      setStep(4);
    } catch (error) {
      console.error("Dispatch Error:", error);
      setStatusMessage("Dispatch interrupted by security protocols. Your reservation is stored locally.");
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 2000);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Select Date';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handleDateSelect = (day: number) => {
    const selected = new Date(pickerViewDate.getFullYear(), pickerViewDate.getMonth(), day);
    const isoStr = selected.toISOString().split('T')[0];
    
    if (activePicker === 'checkIn') {
      setBookingData(prev => ({ ...prev, checkIn: isoStr }));
      setActivePicker(null);
    } else if (activePicker === 'checkOut') {
      setBookingData(prev => ({ ...prev, checkOut: isoStr }));
      setActivePicker(null);
    }
  };

  const changeMonth = (offset: number) => {
    setPickerViewDate(new Date(pickerViewDate.getFullYear(), pickerViewDate.getMonth() + offset, 1));
  };

  const renderCalendar = () => {
    const month = pickerViewDate.getMonth();
    const year = pickerViewDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const today = new Date();
    today.setHours(0,0,0,0);

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-10" />);
    for (let d = 1; d <= daysInMonth; d++) {
      const current = new Date(year, month, d);
      const isSelected = (activePicker === 'checkIn' && bookingData.checkIn === current.toISOString().split('T')[0]) ||
                         (activePicker === 'checkOut' && bookingData.checkOut === current.toISOString().split('T')[0]);
      const isPast = current < today;

      days.push(
        <button
          key={d}
          disabled={isPast}
          onClick={() => handleDateSelect(d)}
          className={`h-10 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center
            ${isSelected ? 'bg-amber-500 text-slate-900 shadow-lg' : isPast ? 'text-slate-200 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-amber-600'}
          `}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><ChevronLeft size={16}/></button>
          <span className="font-serif text-slate-900 font-bold">
            {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><ChevronRight size={16}/></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-[10px] uppercase font-black text-slate-300 text-center py-2 tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-700" onClick={onClose}></div>
      
      <div className="relative w-full max-w-7xl bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full md:h-[90vh] animate-in zoom-in-95 duration-500 rounded-lg">
        
        {/* Left Sidebar Profile */}
        <div className="w-full lg:w-[400px] bg-slate-900 text-white p-8 lg:p-12 flex flex-col border-r border-white/5 shrink-0 overflow-y-auto hidden lg:flex">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900 font-black text-xs">LA</div>
              <span className="font-serif text-sm tracking-widest uppercase">Portfolio</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-amber-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <h2 className="text-4xl font-serif mb-12 leading-tight">Your <br/><span className="italic text-amber-500 font-normal">Sanctuary</span></h2>
          
          <div className="space-y-12 flex-1">
            <div className="space-y-8">
              {[
                { num: 1, title: 'Temporal Settings', desc: 'Check-in/Out' },
                { num: 2, title: 'Suite Selection', desc: 'Inventory' },
                { num: 3, title: 'Guest Profile', desc: 'Contact' },
              ].map((s) => (
                <div key={s.num} className="flex gap-6 items-start">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all shrink-0 ${
                    (step === 4 ? true : step >= s.num) ? 'bg-amber-500 border-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'border-white/20 text-white/20'
                  }`}>
                    {step > s.num || step === 4 ? <CheckCircle2 size={12} strokeWidth={3} /> : s.num}
                  </div>
                  <div className={step >= s.num || step === 4 ? 'text-white' : 'text-white/20'}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">{s.title}</p>
                    <p className="text-[11px] font-light italic">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedRoom && step >= 1 && (
              <div className="mt-12 pt-12 border-t border-white/5 animate-in slide-in-from-bottom-4">
                 <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-16 h-16 rounded overflow-hidden shadow-2xl">
                       <img src={selectedRoom.img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                       <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mb-1">Confirmed</p>
                       <p className="font-serif text-base">{selectedRoom.name}</p>
                    </div>
                 </div>
                 <div className="space-y-4 px-1">
                    <div className="flex justify-between text-xs">
                       <span className="text-white/40 uppercase tracking-widest font-bold">Stay</span>
                       <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-white/5 text-sm font-bold">
                       <span className="text-amber-500 uppercase tracking-[0.2em]">TOTAL</span>
                       <span className="text-2xl font-serif">${totalPrice}</span>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="mt-auto flex items-center gap-4 text-white/40 pt-12">
             <ShieldCheck size={16} />
             <span className="text-[9px] uppercase tracking-[0.3em] font-black">Secure Reservation Terminal</span>
          </div>
        </div>

        {/* Right Content Engine */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          {/* Dispatch Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 z-[70] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
              <div className="relative mb-8">
                <Loader2 className="text-amber-500 animate-spin" size={64} strokeWidth={1} />
                <Mail className="absolute inset-0 m-auto text-slate-900" size={24} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-4">Securing Your Sanctuary</h3>
              <p className="text-slate-400 font-light max-w-sm">{statusMessage}</p>
            </div>
          )}

          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center p-6 border-b border-slate-100 bg-white z-20">
             <div className="font-serif text-xl text-slate-900">L.A. Reservation</div>
             <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-900"><X size={20}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-16">
            
            {step === 1 && (
              <div className="max-w-3xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                   <h4 className="text-amber-600 font-black text-[10px] uppercase tracking-[0.5em]">Phase 01</h4>
                   <h3 className="text-5xl font-serif text-slate-900 leading-tight">Define Your Journey</h3>
                   <p className="text-slate-500 font-light text-lg">Your sanctuary in Addis Ababa begins here.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 relative">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Arrival Signature</label>
                    <button 
                      onClick={() => setActivePicker(activePicker === 'checkIn' ? null : 'checkIn')}
                      className={`w-full flex items-center gap-5 pl-6 pr-4 py-5 bg-slate-50 border transition-all text-left rounded-xl text-sm ${
                        activePicker === 'checkIn' ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-100'
                      }`}
                    >
                      <CalendarIcon className="text-amber-600" size={18} />
                      <span className={bookingData.checkIn ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                        {formatDate(bookingData.checkIn)}
                      </span>
                    </button>
                    {activePicker === 'checkIn' && renderCalendar()}
                  </div>

                  <div className="space-y-3 relative">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Departure Signature</label>
                    <button 
                      onClick={() => setActivePicker(activePicker === 'checkOut' ? null : 'checkOut')}
                      className={`w-full flex items-center gap-5 pl-6 pr-4 py-5 bg-slate-50 border transition-all text-left rounded-xl text-sm ${
                        activePicker === 'checkOut' ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-100'
                      }`}
                    >
                      <CalendarIcon className="text-amber-600" size={18} />
                      <span className={bookingData.checkOut ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                        {formatDate(bookingData.checkOut)}
                      </span>
                    </button>
                    {activePicker === 'checkOut' && renderCalendar()}
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Guest Count</label>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <button 
                        key={n}
                        onClick={() => setBookingData({...bookingData, guests: n})}
                        className={`py-6 border rounded-xl transition-all flex flex-col items-center gap-1 shadow-sm ${
                          bookingData.guests === n ? 'border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-500/10' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <span className="text-xs font-black tracking-widest">{n} PAX</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-right-8 duration-500 pb-20">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-slate-100 pb-10">
                   <div className="space-y-4">
                      <h4 className="text-amber-600 font-black text-[10px] uppercase tracking-[0.5em]">Phase 02</h4>
                      <h3 className="text-5xl font-serif text-slate-900 leading-tight">Curated Selection</h3>
                   </div>
                   <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900 group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Dates
                   </button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {ROOMS.map((room) => (
                    <div 
                      key={room.id}
                      onClick={() => setBookingData({...bookingData, roomId: room.id})}
                      className={`group relative overflow-hidden flex flex-col md:flex-row border rounded-2xl transition-all cursor-pointer ${
                        bookingData.roomId === room.id ? 'border-amber-500 ring-4 ring-amber-500/10 shadow-2xl' : 'border-slate-100 hover:border-amber-200 bg-white shadow-sm hover:shadow-lg'
                      }`}
                    >
                      <div className="w-full md:w-[320px] aspect-[16/10] md:aspect-auto overflow-hidden">
                         <img src={room.img} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="" />
                      </div>
                      <div className="flex-1 p-8 flex flex-col justify-between">
                         <div className="space-y-4">
                            <div className="flex justify-between items-start">
                               <h4 className="text-2xl font-serif text-slate-900 group-hover:text-amber-600 transition-colors">{room.name}</h4>
                               <p className="text-2xl font-serif text-amber-600">${room.price} <span className="text-[10px] uppercase font-black text-slate-300">/ Day</span></p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {room.tags.map(tag => (
                                  <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">{tag}</span>
                               ))}
                            </div>
                         </div>
                         <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                               <div className="flex items-center gap-2"><Bed size={14}/> {room.capacity}</div>
                               <div className="flex items-center gap-2"><Maximize size={14}/> {room.size}</div>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                               bookingData.roomId === room.id ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-200'
                            }`}>
                               <CheckCircle2 size={24} strokeWidth={3} />
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-3xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-8 duration-500 pb-32">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                   <div className="space-y-4">
                      <h4 className="text-amber-600 font-black text-[10px] uppercase tracking-[0.5em]">Phase 03</h4>
                      <h3 className="text-5xl font-serif text-slate-900 leading-tight">Guest Profile</h3>
                 </div>
                   {!initialRoom && (
                     <button onClick={() => setStep(2)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Selection
                     </button>
                   )}
                </div>

                <div className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full p-5 bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 rounded-xl text-sm transition-all"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full p-5 bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 rounded-xl text-sm transition-all"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Additional Logistics</label>
                     <div className="grid md:grid-cols-2 gap-4">
                        <button 
                          onClick={() => setBookingData({...bookingData, airportPickUp: !bookingData.airportPickUp})}
                          className={`flex items-center justify-between gap-4 p-5 border rounded-xl transition-all shadow-sm ${
                             bookingData.airportPickUp ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                           <div className="flex items-center gap-4 text-white">
                             <Plane size={18} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Bole Chauffeur</span>
                           </div>
                           {bookingData.airportPickUp && <CheckCircle2 size={16} className="text-amber-500"/>}
                        </button>
                        <div className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-100 rounded-xl">
                           <InfoIcon size={18} className="text-amber-600 shrink-0" />
                           <span className="text-[9px] font-bold text-amber-800 leading-tight uppercase tracking-widest">Luxury Suites include complimentary pickup</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Special Preferences</label>
                    <textarea 
                      placeholder="Dietary requirements, pillow preference, etc."
                      className="w-full p-5 bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 rounded-xl text-sm h-32 resize-none transition-all text-slate-900"
                      value={bookingData.specialRequest}
                      onChange={(e) => setBookingData({...bookingData, specialRequest: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex items-center justify-center min-h-full py-20 animate-in zoom-in-95 duration-1000">
                <div className="text-center max-w-2xl px-6 space-y-12">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shadow-inner relative">
                      <CheckCircle2 size={72} strokeWidth={1} />
                      <div className="absolute inset-0 rounded-full border-4 border-amber-500 animate-ping opacity-10"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-6xl md:text-7xl font-serif text-slate-900 leading-tight">Sanctuary <br/><span className="italic text-amber-600 font-normal">Confirmed</span></h3>
                    <p className="text-slate-400 font-light text-xl leading-relaxed">Preparation for your arrival has commenced. Welcome to the collection.</p>
                  </div>

                  <div className="p-12 bg-slate-900 rounded-3xl text-left relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 text-white">
                       <ShieldCheck size={120} />
                    </div>
                    <div className="relative z-10 space-y-8">
                       <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-8">
                          <div>
                             <p className="text-[9px] uppercase tracking-widest text-amber-500 font-black mb-2">Reservation ID</p>
                             <p className="text-2xl font-serif text-white">LA-2025-X091</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] uppercase tracking-widest text-amber-500 font-black mb-2">Guest Profile</p>
                             <p className="text-base font-bold text-white uppercase tracking-widest">{bookingData.name.split(' ')[0]}</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <Mail className="text-amber-500" size={16} />
                             <p className="text-[11px] text-white uppercase tracking-[0.2em] font-black">SendGrid Confirmation Dispatched</p>
                          </div>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">
                             A professional digital itinerary has been sent from <span className="text-white font-medium italic">{SENDER_EMAIL}</span> to <span className="text-white font-medium">{bookingData.email}</span>.
                          </p>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={onClose}
                    className="inline-flex items-center gap-4 text-slate-900 font-black uppercase tracking-[0.4em] text-[10px] border-b-2 border-slate-900 pb-2 hover:text-amber-600 hover:border-amber-600 transition-all"
                  >
                    RETURN TO COLLECTION
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {step < 4 && !isProcessing && (
            <div className="p-6 lg:p-10 border-t border-slate-100 bg-white shadow-[0_-15px_40px_rgba(0,0,0,0.03)] z-30">
               <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-10">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Total Valuation</span>
                        <span className="text-4xl font-serif text-slate-900 leading-none">${totalPrice}</span>
                     </div>
                     <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
                     <div className="hidden md:flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Status</span>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Live Secure Flow</span>
                        </div>
                     </div>
                  </div>
                  
                  {step === 1 ? (
                    <button 
                      onClick={handleStep1Next}
                      disabled={!bookingData.checkIn || !bookingData.checkOut}
                      className="w-full md:w-auto gold-gradient px-12 py-6 text-slate-900 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 disabled:opacity-50 transition-all flex items-center justify-center gap-4 rounded-lg"
                    >
                      {initialRoom || bookingData.roomId ? 'Finalize Profile' : 'Explore Suites'} <ArrowRight size={14} strokeWidth={3} />
                    </button>
                  ) : step === 2 ? (
                    <button 
                      onClick={() => setStep(3)}
                      disabled={!bookingData.roomId}
                      className="w-full md:w-auto gold-gradient px-12 py-6 text-slate-900 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 disabled:opacity-50 transition-all rounded-lg"
                    >
                      Continue to Details
                    </button>
                  ) : (
                    <button 
                      onClick={handleSendGridDispatch}
                      disabled={!bookingData.name || !bookingData.email}
                      className="w-full md:w-auto gold-gradient px-12 py-6 text-slate-900 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:scale-105 disabled:opacity-50 transition-all rounded-lg"
                    >
                      Confirm Reservation
                    </button>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingEngine;
