import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6 xl:mb-10 relative z-10">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2.5 text-gray-600 bg-white/60 backdrop-blur-xl rounded-full shadow-sm border border-white/80">
          <Menu size={20} />
        </button>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-32 lg:w-48 placeholder-gray-400 text-gray-700 font-medium"
          />
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
}
