
import React, { useState, useMemo } from 'react';
import { 
  Users, TrendingUp, DollarSign, Calendar, 
  MessageCircle, BarChart3, Settings, LogOut, 
  Search, CheckCircle2, MoreVertical, Sparkles,
  Bed, UserCheck, XCircle, Utensils, GlassWater,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Filter, Download, FileText, PieChart, Info,
  Flower2, Clock, X, CreditCard, Wallet, Smartphone,
  ChevronLeft
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';
import { Reservation, DiningOrder, GymMembership } from '../types';
import { generateAdminInsights } from '../services/gemini';

// --- Hierarchical Mock Data Structure ---

const YEARLY_DATA = [
  { name: 'Jan', total: 185000 },
  { name: 'Feb', total: 210000 },
  { name: 'Mar', total: 195000 },
  { name: 'Apr', total: 245000 },
  { name: 'May', total: 220000 },
];

const MONTHLY_DATA: Record<string, any[]> = {
  'Jan': [{ name: 'Week 1', total: 42000 }, { name: 'Week 2', total: 48000 }, { name: 'Week 3', total: 45000 }, { name: 'Week 4', total: 50000 }],
  'Feb': [{ name: 'Week 1', total: 51000 }, { name: 'Week 2', total: 52000 }, { name: 'Week 3', total: 53000 }, { name: 'Week 4', total: 54000 }],
  'Mar': [{ name: 'Week 1', total: 45000 }, { name: 'Week 2', total: 46000 }, { name: 'Week 3', total: 52000 }, { name: 'Week 4', total: 52000 }],
  'Apr': [{ name: 'Week 1', total: 60000 }, { name: 'Week 2', total: 62000 }, { name: 'Week 3', total: 61000 }, { name: 'Week 4', total: 62000 }],
  'May': [{ name: 'Week 1', total: 55000 }, { name: 'Week 2', total: 54000 }, { name: 'Week 3', total: 56000 }, { name: 'Week 4', total: 55000 }],
};

const WEEKLY_DATA: Record<string, any[]> = {
  'Week 1': [
    { name: 'Mon', total: 5400 }, { name: 'Tue', total: 5500 }, { name: 'Wed', total: 6600 }, { name: 'Thu', total: 6900 }, { name: 'Fri', total: 9900 }, { name: 'Sat', total: 13100 }, { name: 'Sun', total: 7900 },
  ],
  'Week 2': [
    { name: 'Mon', total: 5100 }, { name: 'Tue', total: 5700 }, { name: 'Wed', total: 6800 }, { name: 'Thu', total: 6800 }, { name: 'Fri', total: 10500 }, { name: 'Sat', total: 13500 }, { name: 'Sun', total: 8200 },
  ],
  'Week 3': [{ name: 'Mon', total: 6000 }, { name: 'Tue', total: 6100 }, { name: 'Wed', total: 6200 }, { name: 'Thu', total: 6300 }, { name: 'Fri', total: 7000 }, { name: 'Sat', total: 12000 }, { name: 'Sun', total: 9000 }],
  'Week 4': [{ name: 'Mon', total: 7000 }, { name: 'Tue', total: 7100 }, { name: 'Wed', total: 7200 }, { name: 'Thu', total: 7300 }, { name: 'Fri', total: 8000 }, { name: 'Sat', total: 15000 }, { name: 'Sun', total: 10000 }],
};

const DAILY_HOURLY_DATA: Record<string, any[]> = {
  'Mon': [
    { name: '08:00', total: 450 }, { name: '10:00', total: 800 }, { name: '12:00', total: 1200 }, { name: '14:00', total: 600 }, { name: '16:00', total: 900 }, { name: '18:00', total: 1100 }, { name: '20:00', total: 1500 }, { name: '22:00', total: 850 },
  ],
  'Tue': [
    { name: '08:00', total: 300 }, { name: '10:00', total: 900 }, { name: '12:00', total: 1400 }, { name: '14:00', total: 700 }, { name: '16:00', total: 1000 }, { name: '18:00', total: 1300 }, { name: '20:00', total: 1600 }, { name: '22:00', total: 950 },
  ],
  'Wed': [{ name: '08:00', total: 500 }, { name: '12:00', total: 2000 }, { name: '16:00', total: 1500 }, { name: '20:00', total: 2600 }],
  'Thu': [{ name: '08:00', total: 600 }, { name: '12:00', total: 2100 }, { name: '16:00', total: 1600 }, { name: '20:00', total: 2700 }],
  'Fri': [{ name: '08:00', total: 800 }, { name: '12:00', total: 3000 }, { name: '16:00', total: 2500 }, { name: '20:00', total: 4200 }],
  'Sat': [{ name: '08:00', total: 1200 }, { name: '12:00', total: 4500 }, { name: '16:00', total: 3500 }, { name: '20:00', total: 6500 }],
  'Sun': [{ name: '08:00', total: 900 }, { name: '12:00', total: 3500 }, { name: '16:00', total: 2500 }, { name: '20:00', total: 4500 }],
};

// --- Detailed Transaction History ---
const TRANSACTION_HISTORY = [
  // May - Week 2 - Mon
  { id: 'TRX-901', month: 'May', week: 'Week 2', day: 'Mon', type: 'Booking', title: 'Presidential Suite 802', price: 4500, method: 'Card', status: 'Completed', guest: 'Sophia Williams', time: '09:15 AM' },
  { id: 'TRX-902', month: 'May', week: 'Week 2', day: 'Mon', type: 'Dining', title: 'Horizon Grill - Dinner', price: 185, method: 'Room Charge', status: 'Completed', guest: 'Room 802', time: '08:30 PM' },
  { id: 'TRX-903', month: 'May', week: 'Week 2', day: 'Mon', type: 'Spa', title: 'Ancient Aroma Ritual', price: 120, method: 'Digital', status: 'Completed', guest: 'Room 504', time: '11:00 AM' },
  { id: 'TRX-904', month: 'May', week: 'Week 2', day: 'Mon', type: 'Dining', title: 'Lounge - Afternoon Tea', price: 45, method: 'Cash', status: 'Completed', guest: 'Walk-in', time: '04:45 PM' },
  // May - Week 2 - Tue
  { id: 'TRX-910', month: 'May', week: 'Week 2', day: 'Tue', type: 'Booking', title: 'Executive Suit 504', price: 800, method: 'Card', status: 'Completed', guest: 'Abebe Bikila', time: '10:00 AM' },
  { id: 'TRX-911', month: 'May', week: 'Week 2', day: 'Tue', type: 'Spa', title: 'Full Body Massage', price: 150, method: 'Card', status: 'Completed', guest: 'Room 302', time: '02:30 PM' },
  // Apr - Week 4 - Sat
  { id: 'TRX-850', month: 'Apr', week: 'Week 4', day: 'Sat', type: 'Booking', title: 'Luxury Double 202', price: 3400, method: 'Digital', status: 'Completed', guest: 'Chen Wei', time: '12:00 PM' },
  { id: 'TRX-851', month: 'Apr', week: 'Week 4', day: 'Sat', type: 'Dining', title: 'Grand Buffet Event', price: 12000, method: 'Corporate', status: 'Completed', guest: 'Addis Tech Hub', time: '07:00 PM' },
  // Jan - Week 1 - Wed
  { id: 'TRX-101', month: 'Jan', week: 'Week 1', day: 'Wed', type: 'Dining', title: 'New Year Drinks', price: 250, method: 'Cash', status: 'Completed', guest: 'Walk-in', time: '11:45 PM' },
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'dining' | 'gym' | 'revenue'>('overview');
  
  // Drill-down Path: ['Year 2025', 'Month', 'Week', 'Day']
  const [drillPath, setDrillPath] = useState<string[]>(['Year 2025']);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const currentLevel = drillPath.length; // 1: Year, 2: Month, 3: Week, 4: Day
  const currentScope = drillPath[drillPath.length - 1];

  const chartData = useMemo(() => {
    if (currentLevel === 1) return YEARLY_DATA;
    if (currentLevel === 2) return MONTHLY_DATA[currentScope] || [];
    if (currentLevel === 3) return WEEKLY_DATA[currentScope] || WEEKLY_DATA['Week 1'];
    if (currentLevel === 4) return DAILY_HOURLY_DATA[currentScope] || DAILY_HOURLY_DATA['Mon'];
    return [];
  }, [currentLevel, currentScope]);

  const filteredTransactions = useMemo(() => {
    return TRANSACTION_HISTORY.filter(t => {
      if (currentLevel === 1) return true; // Show all for year
      if (currentLevel === 2) return t.month === currentScope; // Show all for specific month
      if (currentLevel === 3) return t.month === drillPath[1] && t.week === currentScope; // Show all for specific week
      if (currentLevel === 4) return t.month === drillPath[1] && t.week === drillPath[2] && t.day === currentScope; // Show all for specific day
      return true;
    });
  }, [currentLevel, currentScope, drillPath]);

  const stats = useMemo(() => {
    // If it's a day view, total up hourly. Otherwise total up daily/weekly/monthly.
    const gross = chartData.reduce((acc, curr) => acc + (curr.total || 0), 0);
    const tax = gross * 0.15;
    const net = gross - tax;
    return { gross, tax, net };
  }, [chartData]);

  const handleBarClick = (data: any) => {
    if (data && data.activeLabel && currentLevel < 4) {
      setDrillPath([...drillPath, data.activeLabel]);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    setDrillPath(drillPath.slice(0, index + 1));
  };

  const popDrillPath = () => {
    if (drillPath.length > 1) {
      setDrillPath(drillPath.slice(0, -1));
    }
  };

  const handleGetInsights = async () => {
    setLoadingInsight(true);
    const insight = await generateAdminInsights({ revenue: stats.gross, level: currentLevel, scope: currentScope });
    setAiInsight(insight);
    setLoadingInsight(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar - Professional High-Contrast */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col sticky top-0 h-screen shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center text-slate-950 font-black text-xl shadow-inner">LA</div>
          <div>
            <h1 className="font-serif text-lg leading-none">Management</h1>
            <p className="text-[9px] text-amber-500 uppercase tracking-widest mt-1 font-bold">Admin Protocol</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', label: 'Financial Dashboard', icon: <BarChart3 size={18} /> },
            { id: 'rooms', label: 'Guest Ledger', icon: <Bed size={18} /> },
            { id: 'dining', label: 'F&B Operations', icon: <Utensils size={18} /> },
            { id: 'gym', label: 'Club Members', icon: <Users size={18} /> },
            { id: 'revenue', label: 'Detailed Ledger', icon: <DollarSign size={18} /> },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
           <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 mb-4">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">System Synchronized</span>
             </div>
          </div>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="text-sm">Secure Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">
              {drillPath.map((path, i) => (
                <React.Fragment key={i}>
                  <button 
                    onClick={() => handleBreadcrumbClick(i)}
                    className={`transition-colors ${i === drillPath.length - 1 ? 'text-amber-600 font-black' : 'hover:text-slate-600'}`}
                  >
                    {path}
                  </button>
                  {i < drillPath.length - 1 && <ChevronRight size={10} className="text-slate-300" />}
                </React.Fragment>
              ))}
            </div>
            <h2 className="text-4xl font-serif text-slate-900">
              {currentLevel === 4 ? `${currentScope} Breakdown` : `Financial Intelligence`}
            </h2>
          </div>
          
          <div className="flex gap-4">
             {currentLevel > 1 && (
               <button 
                 onClick={popDrillPath}
                 className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
               >
                 <ChevronLeft size={14}/> Previous View
               </button>
             )}
             <button className="gold-gradient text-slate-950 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
               Download CSV Audit
             </button>
          </div>
        </header>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2">Gross for {currentScope}</p>
              <div className="flex items-baseline gap-2">
                 <h3 className="text-3xl font-black text-slate-900">${stats.gross.toLocaleString()}</h3>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2">VAT Liability (15%)</p>
              <h3 className="text-3xl font-black text-red-500">-${stats.tax.toLocaleString()}</h3>
           </div>
           <div className="bg-slate-950 p-8 rounded-[32px] shadow-2xl text-white">
              <p className="text-amber-500/60 text-[10px] uppercase font-black tracking-widest mb-2">Net for {currentScope}</p>
              <h3 className="text-3xl font-black text-amber-500">${stats.net.toLocaleString()}</h3>
           </div>
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2">Entries Recorded</p>
              <h3 className="text-3xl font-black text-slate-900">{filteredTransactions.length}</h3>
           </div>
        </div>

        {/* Chart Section - The Core Drill-Down Logic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
               <div className="flex justify-between items-start mb-12">
                 <div>
                    <h3 className="text-xl font-serif text-slate-900">
                      {currentLevel === 1 ? 'Yearly Overview' : 
                       currentLevel === 2 ? `${currentScope} Weekly Trend` : 
                       currentLevel === 3 ? `${currentScope} Daily Revenue` : 
                       `${currentScope} Hourly Performance`}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">
                      {currentLevel < 4 ? 'Click a bar to explore granular data' : 'Hourly breakdown of transactions'}
                    </p>
                 </div>
                 <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                   <BarChart3 size={18} />
                 </div>
               </div>

               <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={chartData} 
                      onClick={handleBarClick} 
                      className={currentLevel < 4 ? "cursor-pointer" : ""}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip 
                        cursor={{fill: 'rgba(212, 175, 55, 0.05)'}}
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }} 
                      />
                      <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.total > 10000 ? '#b89535' : '#d4af37'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* List Section - Transaction Detail Ledger */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                   <div>
                      <h3 className="text-xl font-serif text-slate-900">Service & Revenue Ledger</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                        Exact list for {currentScope}
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900 transition-colors">
                        <Download size={14}/> Export View
                      </button>
                      <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                        <Filter size={14}/> Categories
                      </button>
                   </div>
                </div>

                <div className="space-y-6">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                      <div key={t.id} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all group animate-in slide-in-from-bottom-3">
                         <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-sm ${
                           t.type === 'Booking' ? 'bg-amber-100 text-amber-700' : 
                           t.type === 'Dining' ? 'bg-blue-100 text-blue-700' : 
                           'bg-emerald-100 text-emerald-700'
                         }`}>
                            {t.type === 'Booking' ? <Bed size={28}/> : t.type === 'Dining' ? <Utensils size={28}/> : <Flower2 size={28}/>}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <h4 className="font-black text-slate-900 text-sm uppercase tracking-tighter">{t.title}</h4>
                               <span className="text-[8px] font-black uppercase bg-white border border-slate-100 px-2 py-0.5 rounded text-slate-500 shadow-xs">{t.status}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">{t.guest} • {t.method}</p>
                            <div className="flex items-center gap-4 text-[9px] text-slate-300 font-bold uppercase mt-2">
                               <div className="flex items-center gap-1">
                                 <Clock size={12}/> {t.time}
                               </div>
                               <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                               <div>{t.day}, {t.month}</div>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black text-slate-950">${t.price.toLocaleString()}</p>
                            <p className="text-[9px] text-slate-300 font-black uppercase">REF: {t.id}</p>
                         </div>
                         <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="text-slate-300" size={20} />
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-24 text-center flex flex-col items-center gap-6 animate-in fade-in">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <FileText size={40} />
                      </div>
                      <p className="text-slate-400 text-sm font-light italic max-w-xs mx-auto">
                        No transactions found in this specific temporal segment of the ledger.
                      </p>
                    </div>
                  )}
                </div>
                
                {filteredTransactions.length > 0 && (
                  <button className="w-full mt-10 py-5 border-2 border-dashed border-slate-100 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-all">
                    Load Archival Records
                  </button>
                )}
            </div>
          </div>

          {/* AI Strategy & mix */}
          <div className="space-y-8">
            <div className="bg-slate-950 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col min-h-[450px]">
               <div className="absolute top-0 right-0 p-10 text-amber-500/10">
                  <Sparkles size={64} className="animate-pulse" />
               </div>
               <h3 className="text-2xl font-serif mb-6 z-10">Gemini Strategy Lab</h3>
               <p className="text-slate-400 font-light text-sm leading-relaxed mb-12 z-10">
                 Diving into {currentScope} performance. AI is currently scanning for revenue trends and operational efficiency.
               </p>
               <button 
                 onClick={handleGetInsights}
                 disabled={loadingInsight}
                 className="w-full gold-gradient text-slate-950 font-black py-5 rounded-3xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 z-10 mb-8"
               >
                 {loadingInsight ? 'Crunching Temporal Data...' : 'Analyze This Period'}
               </button>

               {aiInsight && (
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-[11px] leading-relaxed text-slate-300 animate-in fade-in duration-500 z-10 overflow-y-auto max-h-60">
                    <h4 className="text-amber-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 size={12}/> Analysis Summary
                    </h4>
                    {aiInsight}
                  </div>
               )}
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
               <h3 className="text-xl font-serif mb-12 flex items-center gap-3 text-slate-900">
                  <PieChart className="text-amber-500" size={24} />
                  Category Split
               </h3>
               <div className="space-y-10">
                  {[
                    { label: 'Accommodations', val: '72%', color: '#d4af37' },
                    { label: 'F&B Operations', val: '18%', color: '#64748b' },
                    { label: 'Wellness Services', val: '10%', color: '#94a3b8' }
                  ].map((item, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-[10px] uppercase font-black tracking-widest mb-4">
                          <span className="text-slate-400">{item.label}</span>
                          <span style={{ color: item.color }}>{item.val}</span>
                       </div>
                       <div className="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: item.val, backgroundColor: item.color }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
