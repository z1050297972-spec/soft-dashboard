import React from 'react';
import {
  Bookmark,
  Download,
  Key,
  LayoutDashboard,
  LogOut,
  PlayCircle,
  Share2,
  Star,
  Users,
} from 'lucide-react';

import {
  dashboardBrand,
  logoutItem,
  navigationSections,
  type NavigationIcon,
} from '../../data/dashboard.ts';
import { AnimatedLogo, NavItem } from './ui.tsx';

const ICONS: Record<NavigationIcon, React.ReactElement> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  PlayCircle: <PlayCircle size={18} />,
  Star: <Star size={18} />,
  Users: <Users size={18} />,
  Download: <Download size={18} />,
  Key: <Key size={18} />,
  Share2: <Share2 size={18} />,
  Bookmark: <Bookmark size={18} />,
  LogOut: <LogOut size={18} />,
};

export default function Sidebar() {
  return (
    <div className="hidden lg:flex w-64 p-8 flex-col h-full relative z-10">
      <div className="flex items-center gap-3 mb-12 pl-1">
        <AnimatedLogo />
        <span className="text-2xl font-bold text-gray-800 tracking-tight">
          {dashboardBrand}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {navigationSections.map((section, index) => (
          <div key={section.title} className={index === 0 ? 'mb-8' : undefined}>
            <p className="text-[10px] font-bold text-gray-400 mb-4 px-4 tracking-widest uppercase">
              {section.title}
            </p>
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.label}
                  icon={ICONS[item.icon]}
                  label={item.label}
                  active={item.active}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <NavItem icon={ICONS[logoutItem.icon]} label={logoutItem.label} />
      </div>
    </div>
  );
}
