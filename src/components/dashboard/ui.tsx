import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';

type SphereIconProps = {
  className?: string;
  floating?: boolean;
};

type NavItemProps = {
  key?: React.Key;
  icon: ReactNode;
  label: string;
  active?: boolean;
};

export function SphereIcon({
  className = 'w-8 h-8',
  floating = true,
}: SphereIconProps) {
  return (
    <div
      className={`${className} rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff9a9e_0%,_#fecfef_40%,_#a18cd1_100%)] shadow-[0_4px_10px_rgba(255,154,158,0.4)] border border-white/60 shrink-0 ${floating ? 'animate-float' : ''}`}
    />
  );
}

export function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
      <motion.div
        animate={{ y: [3, -3, 3] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        className="relative z-10"
      >
        <div className="w-8 h-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ff9a9e_0%,_#fecfef_40%,_#a18cd1_100%)] shadow-[0_4px_10px_rgba(255,154,158,0.4)] border border-white/60" />
      </motion.div>

      <svg
        width="48"
        height="24"
        viewBox="0 0 60 30"
        className="absolute top-[55%] left-1/2 -translate-x-1/2 overflow-visible text-gray-400 pointer-events-none"
      >
        <motion.ellipse
          cx="30"
          animate={{ cy: [15, 15, 15], rx: [28, 27, 28], ry: [8, 9, 8] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
        <motion.ellipse
          cx="30"
          animate={{ cy: [15.5, 15, 15.5], rx: [20, 19, 20], ry: [5, 6, 5] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <motion.ellipse
          cx="30"
          animate={{ cy: [16.5, 15, 16.5], rx: [12, 11, 12], ry: [2, 3, 2] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full ${active ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-900 font-semibold' : 'text-gray-500 hover:bg-white/40 hover:text-gray-800 font-medium'}`}
    >
      <span className={active ? 'text-gray-800' : 'text-gray-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
