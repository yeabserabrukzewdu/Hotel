
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../components/LanguageContext';
import { 
  Dumbbell, Waves, ChevronRight, Star, Clock, 
  Users, ShieldCheck, HeartPulse, Trophy, Sparkles,
  Timer, Award, Zap, ChevronLeft, Quote, CheckCircle2,
  BicepsFlexed,
  Activity
} from 'lucide-react';
import ChatWidget from '../components/ChatWidget';

const Fitness: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
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

  const galleryImages = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Integrated Hero Section (Screenshot 1) */}
      <section className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        {/* Background Collage Effect */}
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
           <div className="w-full md:w-1/2 h-full relative">
              <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Spinning Zone" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
           </div>
           <div className="w-full md:w-1/2 h-full relative">
              <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Treadmill Zone" />
              <div className="absolute inset-0 bg-slate-950/40"></div>
           </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-10 md:p-20 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-1000">
            <span className="text-amber-600 uppercase tracking-[0.5em] font-black text-[10px] mb-6 block">IN PURSUIT OF GOOD HEALTH</span>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-10 leading-tight">
              GYM At The <br/> LA Hotel and SPA
            </h1>
            
            <div className="space-y-8 text-slate-600 font-light leading-relaxed">
              <p className="text-lg">
                Keep up with your fitness routine whilst you’re away with our hotel gym. Packed with Fitness and resistance equipment and free weights, you can unwind after a busy day in the capital at the 4-star LA Hotel & SPA. All guests over the age of 16 who visit the Hotel are invited to use our in-house hotel gym to exercise and unwind.
              </p>
              <p className="text-lg">
                With a mix of equipment and weights, our hotel gym will cater to you whether you want to do a cardio workout, or if you want to give your muscles some strength training or toning exercises.
              </p>
            </div>

            <div className="mt-12">
              <button className="gold-gradient text-slate-900 px-12 py-5 font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:scale-105 transition-all">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars (Screenshot 2) */}
      <section id="fitness-pillars" className="scroll-trigger py-40 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible['fitness-pillars'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-24 h-24 bg-amber-700/10 text-amber-700 rounded-full flex items-center justify-center mx-auto transition-transform hover:rotate-12">
                 <Dumbbell size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900">High Quality Gyms</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Our gyms are designed and maintained to the highest standards, with state-of-the-art equipment. We ensure every machine is calibrated for precision and safety.
              </p>
            </div>

            <div className={`text-center space-y-8 transition-all duration-1000 delay-200 ${isVisible['fitness-pillars'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-24 h-24 bg-amber-700/10 text-amber-700 rounded-full flex items-center justify-center mx-auto transition-transform hover:rotate-12">
                 <Activity size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900">Instructional Coach</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Even in your holidays, you can spend 20 minutes to keep fit, in our modern gym. Our world-class instructors guide you through customized routines tailored to your goals.
              </p>
            </div>

            <div className={`text-center space-y-8 transition-all duration-1000 delay-400 ${isVisible['fitness-pillars'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-24 h-24 bg-amber-700/10 text-amber-700 rounded-full flex items-center justify-center mx-auto transition-transform hover:rotate-12">
                 <Clock size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900">Open All Day, Every Day</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Whenever you're ready to train, most gyms are open and ready to welcome you, 365 days a year, 24 hours a day. Your schedule is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Professional Equipment Gallery (Screenshot 3 & Slider) */}
      <section id="fitness-gallery" className="scroll-trigger py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-amber-600 text-[11px] uppercase tracking-[0.5em] font-black mb-6 block">PROFESSIONAL GRADE</span>
              <h2 className="text-5xl font-serif text-slate-900">Precision Equipment</h2>
            </div>
            <div className="flex gap-4 mt-8 md:mt-0">
               <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Star size={16} fill="currentColor" className="text-amber-500" /> TechnoGym Certified
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 overflow-hidden rounded-sm shadow-2xl">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className={`group relative aspect-[3/4] overflow-hidden transition-all duration-1000 ${isVisible['fitness-gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" alt={`Gym Detail ${i+1}`} />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                
                {/* Overlay Controls (Visual Reference to Carousel in screenshot 3) */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                      <ChevronLeft size={16} />
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                      <ChevronRight size={16} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Altitude Training Section (Personal Touch) */}
      <section id="altitude-training" className="scroll-trigger py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className={`transition-all duration-1000 ${isVisible['altitude-training'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                 <h4 className="text-amber-500 uppercase tracking-[0.4em] font-black text-xs mb-8">THE ADDIS ADVANTAGE</h4>
                 <h2 className="text-6xl font-serif mb-12 leading-tight">High-Altitude <br/>Performance</h2>
                 <p className="text-slate-400 text-xl font-light leading-relaxed mb-12 italic">
                   "Training at 2,355 meters above sea level isn't just exercise—it's physiological optimization."
                 </p>
                 <div className="space-y-8">
                    {[
                      "Increased Red Blood Cell Production",
                      "Enhanced Aerobic Capacity",
                      "Accelerated Caloric Burn",
                      "Mental Resilience Training"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <div className="w-12 h-px bg-amber-500 group-hover:w-16 transition-all duration-500"></div>
                        <span className="text-sm font-bold uppercase tracking-widest">{benefit}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible['altitude-training'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                 <div className="aspect-square rounded-full border border-white/10 p-12 relative">
                    <div className="absolute inset-0 animate-pulse bg-amber-500/5 rounded-full"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1548690312-e3b507d17a12?auto=format&fit=crop&q=80&w=800" 
                      className="w-full h-full object-cover rounded-full grayscale border-2 border-amber-500/20" 
                      alt="Performance Athlete" 
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase">
                       2,355M ABOVE SEA LEVEL
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Membership CTA */}
      <section className="py-40 bg-white text-center">
        <div className="container mx-auto px-6">
           <Quote className="mx-auto text-amber-500 mb-12 opacity-30" size={64} strokeWidth={1}/>
           <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-16 leading-tight max-w-4xl mx-auto">Elevate your fitness routine to new heights.</h2>
           <button className="gold-gradient text-slate-900 px-16 py-6 font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 transition-all">Join the Elite</button>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
};

export default Fitness;
