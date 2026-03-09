import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, PlayCircle, Star, Users, Download, Key, Share2, Bookmark, LogOut, Search, Bell, User, ArrowUpRight, Mic, Send, Play, ThumbsUp, ThumbsDown, Menu } from 'lucide-react';

const SphereIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={`${className} rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff9a9e_0%,_#fecfef_40%,_#a18cd1_100%)] shadow-[0_4px_10px_rgba(255,154,158,0.4)] border border-white/60 shrink-0 animate-float`} />
);

const AnimatedLogo = () => {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
      <motion.div
        animate={{ y: [3, -3, 3] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="relative z-10"
      >
        <div className="w-8 h-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff9a9e_0%,_#fecfef_40%,_#a18cd1_100%)] shadow-[0_4px_10px_rgba(255,154,158,0.4)] border border-white/60" />
      </motion.div>
      
      <svg width="48" height="24" viewBox="0 0 60 30" className="absolute top-[55%] left-1/2 -translate-x-1/2 overflow-visible text-gray-400 pointer-events-none">
        {/* Outer Ring */}
        <motion.ellipse
          cx="30"
          animate={{ cy: [15, 15, 15], rx: [28, 27, 28], ry: [8, 9, 8] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          fill="transparent" stroke="currentColor" strokeWidth="1" opacity="0.3"
        />
        {/* Middle Ring */}
        <motion.ellipse
          cx="30"
          animate={{ cy: [15.5, 15, 15.5], rx: [20, 19, 20], ry: [5, 6, 5] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          fill="transparent" stroke="currentColor" strokeWidth="1" opacity="0.4"
        />
        {/* Inner Ring */}
        <motion.ellipse
          cx="30"
          animate={{ cy: [16.5, 15, 16.5], rx: [12, 11, 12], ry: [2, 3, 2] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          fill="transparent" stroke="currentColor" strokeWidth="1" opacity="0.5"
        />
      </svg>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden lg:flex w-64 p-8 flex-col h-full relative z-10 border-r border-white/30">
      <div className="flex items-center gap-3 mb-12 pl-1">
        <AnimatedLogo />
        <span className="text-2xl font-bold text-gray-800 tracking-tight">Sense</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="mb-8">
          <p className="text-[10px] font-bold text-gray-400 mb-4 px-4 tracking-widest uppercase">General</p>
          <div className="flex flex-col gap-1">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
            <NavItem icon={<PlayCircle size={18} />} label="My Sessions" />
            <NavItem icon={<Star size={18} />} label="Popular Sessions" />
            <NavItem icon={<Users size={18} />} label="Community" />
            <NavItem icon={<Download size={18} />} label="Download" />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-400 mb-4 px-4 tracking-widest uppercase">Others</p>
          <div className="flex flex-col gap-1">
            <NavItem icon={<Key size={18} />} label="Premium Access" />
            <NavItem icon={<Share2 size={18} />} label="Shared Sessions" />
            <NavItem icon={<Bookmark size={18} />} label="Saved Practices" />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <NavItem icon={<LogOut size={18} />} label="Logout" />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full ${active ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-900 font-semibold' : 'text-gray-500 hover:bg-white/40 hover:text-gray-800 font-medium'}`}>
    <span className={active ? "text-gray-800" : "text-gray-400"}>{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

const Header = () => (
  <div className="flex items-center justify-between mb-6 xl:mb-10 relative z-10">
    <div className="flex items-center gap-4">
      <button className="lg:hidden p-2.5 text-gray-600 bg-white/60 backdrop-blur-xl rounded-full shadow-sm border border-white/80">
        <Menu size={20} />
      </button>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <Search size={16} className="text-gray-400" />
        <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-32 lg:w-48 placeholder-gray-400 text-gray-700 font-medium" />
      </div>
      <button className="p-2.5 sm:p-3 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-500 hover:bg-white transition-colors">
        <Bell size={18} />
      </button>
      <button className="p-2.5 sm:p-3 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-500 hover:bg-white transition-colors">
        <User size={18} />
      </button>
    </div>
  </div>
);

const TopGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 xl:grid-rows-2 gap-4 xl:gap-6 h-auto xl:h-[380px] relative z-10 mb-8 xl:mb-10">
      {/* Meditate - Wide Card */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 h-64 xl:h-auto bg-white/90 backdrop-blur-2xl rounded-[32px] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-white flex flex-col group cursor-pointer transition-transform hover:-translate-y-1 relative z-20">
        <div className="relative flex-1 rounded-[24px] overflow-hidden mb-2">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Meditate" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 mix-blend-overlay" />
        </div>
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">Meditate</span>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm border border-orange-100">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Sleep - Narrow Card */}
      <div className="col-span-1 md:col-span-1 xl:col-span-2 row-span-1 h-48 xl:h-auto relative rounded-[32px] overflow-hidden group cursor-pointer shadow-sm border border-white/60 bg-white/40">
        <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2488&auto=format&fit=crop" alt="Sleep" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <span className="text-lg font-bold text-gray-900">Sleep</span>
        </div>
      </div>

      {/* Move - Narrow Card */}
      <div className="col-span-1 md:col-span-1 xl:col-span-2 row-span-1 h-48 xl:h-auto relative rounded-[32px] overflow-hidden group cursor-pointer shadow-sm border border-white/60 bg-white/40">
        <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2488&auto=format&fit=crop" alt="Move" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <span className="text-lg font-bold text-gray-900">Move</span>
        </div>
      </div>

      {/* Music - Wide Card */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 h-48 xl:h-auto relative rounded-[32px] overflow-hidden group cursor-pointer shadow-sm border border-white/60 bg-white/40">
        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop" alt="Music" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <span className="text-lg font-bold text-gray-900">Music</span>
        </div>
      </div>
    </div>
  );
};

const Recommended = () => {
  const items = [
    {
      title: "Mindful Moments",
      author: "Alex Morgan",
      duration: "5 Min",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Breath of Balance",
      author: "Sara Lee",
      duration: "5 Min",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2564&auto=format&fit=crop"
    },
    {
      title: "Calm Flow Journey",
      author: "Daniel Cru",
      duration: "5 Min",
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recommended</h2>
        <div className="flex flex-wrap gap-1 bg-white/40 backdrop-blur-xl p-1.5 rounded-3xl sm:rounded-full border border-white/60 shadow-sm">
          <button className="px-4 sm:px-5 py-2 bg-white text-gray-900 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex-1 sm:flex-none">Mindfulness</button>
          <button className="px-4 sm:px-5 py-2 text-gray-600 rounded-full text-xs font-semibold hover:bg-white/50 transition-colors flex-1 sm:flex-none">Focus</button>
          <button className="px-4 sm:px-5 py-2 text-gray-600 rounded-full text-xs font-semibold hover:bg-white/50 transition-colors flex-1 sm:flex-none">Relaxation</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {items.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative h-48 sm:h-40 rounded-[28px] overflow-hidden mb-4 shadow-sm border border-white/60 bg-white/20">
              <img src={item.image} alt={item.title} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 to-pink-200/20 mix-blend-overlay" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-colors shadow-sm border border-white">
                <Bookmark size={14} fill="currentColor" />
              </button>
            </div>
            <div className="px-1">
              <h3 className="text-[15px] font-bold text-gray-900 truncate">{item.title}</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">{item.author} • {item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[40px] p-6 sm:p-8 h-full flex flex-col relative overflow-hidden z-10">
      {/* Subtle background glow inside the panel */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-200/40 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-200/40 rounded-full blur-[80px] -z-10" />

      <div className="text-center mb-8 sm:mb-10 mt-2 sm:mt-4">
        <SphereIcon className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-[28px] font-medium text-gray-900 leading-[1.15] tracking-tight">
          Good Morning<br />Andrew, What's on<br />your mind?
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6 sm:gap-8 pb-24">
        {/* User Message */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-gray-800">You</span>
            <SphereIcon className="w-4 h-4" />
          </div>
          <p className="text-[14px] sm:text-[15px] text-gray-700 text-right max-w-[95%] sm:max-w-[90%] leading-relaxed font-medium">
            Hi, I've been curious about meditation, but honestly, I don't really know where to start. Can you help me with that?
          </p>
        </div>

        {/* AI Message */}
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2 mb-1">
            <SphereIcon className="w-4 h-4" />
            <span className="text-xs font-bold text-gray-800">Sense</span>
          </div>
          <p className="text-[14px] sm:text-[15px] text-gray-700 text-left max-w-[95%] leading-relaxed font-medium">
            Absolutely 🌿 Meditation is just about being present and gentle with yourself. Let's start simple — I'll guide you.
          </p>
          
          <div className="flex items-center gap-3 mt-1 mb-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><ThumbsUp size={14} /></button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors"><ThumbsDown size={14} /></button>
          </div>

          {/* Media Player Card inside chat */}
          <div className="w-full bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-[24px] p-3 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white transition-colors mt-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" alt="Ease into Sleep" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">Ease into Sleep</h4>
              <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-0.5">Meditation | 5 Min</p>
            </div>
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center text-orange-500 hover:scale-105 transition-transform shrink-0">
              <Play size={14} fill="currentColor" className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-2 sm:gap-3">
          <input type="text" placeholder="Ask Anything..." className="bg-transparent outline-none flex-1 text-[14px] sm:text-[15px] text-gray-800 placeholder-gray-400 font-medium min-w-0" />
          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 transition-colors shrink-0">
            <Mic size={18} />
          </button>
          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 transition-colors shrink-0">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#f4f0f5] flex items-center justify-center p-0 sm:p-4 md:p-8 font-sans">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-[#ffcce6]/80 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[70vw] md:w-[45vw] h-[70vw] md:h-[45vw] bg-[#ffe6cc]/80 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[15%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-[#ccffeb]/70 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-[#e6ccff]/80 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />

      {/* Main Glass Container */}
      <div className="relative w-full max-w-[1440px] h-[100dvh] sm:h-[90vh] bg-white/40 backdrop-blur-3xl sm:border border-white/60 rounded-none sm:rounded-[48px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col p-4 sm:p-8 xl:p-10 xl:pl-4 overflow-hidden relative z-10">
          <Header />
          
          {/* Main Content Area - Stacks on smaller screens, side-by-side on desktop */}
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 flex-1 overflow-y-auto xl:overflow-hidden no-scrollbar pb-6 xl:pb-0">
            
            {/* Left/Top Section (Grid + Recommended) */}
            <div className="flex-[1.8] flex flex-col xl:overflow-y-auto no-scrollbar xl:pb-8">
              <TopGrid />
              <Recommended />
            </div>
            
            {/* Right/Bottom Section (Chat Panel) */}
            <div className="flex-[1] w-full xl:min-w-[360px] h-[600px] xl:h-auto shrink-0">
              <RightPanel />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
