import React from 'react';
import { Bookmark } from 'lucide-react';

import { recommendationTabs, recommendedItems, type RecommendedItem } from '../../data/dashboard.ts';

const ACTIVE_TAB_CLASS =
  'px-4 sm:px-5 py-2 bg-white text-gray-900 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex-1 sm:flex-none';

const INACTIVE_TAB_CLASS =
  'px-4 sm:px-5 py-2 text-gray-600 rounded-full text-xs font-semibold hover:bg-white/50 transition-colors flex-1 sm:flex-none';

function RecommendationCard({
  item,
}: {
  key?: React.Key;
  item: RecommendedItem;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-48 sm:h-40 rounded-[28px] overflow-hidden mb-4 shadow-sm border border-white/60 bg-white/20">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 to-pink-200/20 mix-blend-overlay" />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-colors shadow-sm border border-white">
          <Bookmark size={14} fill="currentColor" />
        </button>
      </div>
      <div className="px-1">
        <h3 className="text-[15px] font-bold text-gray-900 truncate">{item.title}</h3>
        <p className="text-xs font-medium text-gray-500 mt-1">
          {item.author} • {item.duration}
        </p>
      </div>
    </div>
  );
}

export default function Recommended() {
  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recommended</h2>
        <div className="flex flex-wrap gap-1 bg-white/40 backdrop-blur-xl p-1.5 rounded-3xl sm:rounded-full border border-white/60 shadow-sm">
          {recommendationTabs.map((tab, index) => (
            <button
              key={tab}
              className={index === 0 ? ACTIVE_TAB_CLASS : INACTIVE_TAB_CLASS}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {recommendedItems.map((item) => (
          <RecommendationCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
