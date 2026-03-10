import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { topGridCards, type TopGridCard as TopGridCardData } from '../../data/dashboard.ts';

const GRID_COLUMNS = {
  left: ['meditate', 'move'],
  right: ['sleep', 'music'],
} as const;

const SHELL_BASE_CLASS =
  'relative flex w-full flex-col bg-white/70 backdrop-blur-2xl rounded-[32px] p-[2px] sm:p-[3px] shadow-sm border border-white/80 transition-all duration-500 ease-out cursor-pointer';

function TopGridCard({
  active,
  card,
  onHover,
}: {
  key?: React.Key;
  active: boolean;
  card: TopGridCardData;
  onHover: () => void;
}) {
  return (
    <div
      data-card-shell={card.id}
      data-card-state={active ? 'active' : 'inactive'}
      onMouseEnter={onHover}
      className={`${SHELL_BASE_CLASS} ${active ? 'z-20 shadow-[0_20px_48px_rgba(0,0,0,0.12)] bg-white/100 border-white' : 'z-10 opacity-95 hover:opacity-100 hover:z-20'} ${card.minHeightClassName}`}
    >
      <div
        data-card-media={card.id}
        className={`relative flex-1 rounded-[30px] overflow-hidden ${card.mediaClassName}`}
      >
        <img
          src={card.image}
          alt={card.title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${active ? 'scale-105' : 'scale-100'} ${card.id === 'meditate' ? 'opacity-90' : 'opacity-85'}`}
        />
        {card.accentOverlayClassName ? (
          <div className={card.accentOverlayClassName} />
        ) : null}
        <div className={card.fadeOverlayClassName} />
        <div data-card-overlay={card.id} className={card.overlayClassName}>
          <span className="text-[17px] font-bold tracking-tight text-gray-900 drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]">
            {card.title}
          </span>
          {card.showArrow ? (
            <div
              data-card-arrow={card.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border ${active ? 'bg-orange-50 text-orange-500 border-orange-100 opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            >
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getCards(ids: readonly TopGridCardData['id'][]) {
  return ids.map((id) => topGridCards.find((card) => card.id === id)).filter(Boolean) as TopGridCardData[];
}

export default function TopGrid() {
  const [activeCard, setActiveCard] = useState<TopGridCardData['id']>('meditate');
  const leftColumnCards = getCards(GRID_COLUMNS.left);
  const rightColumnCards = getCards(GRID_COLUMNS.right);

  return (
    <div
      data-top-grid="root"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.55fr)_minmax(0,_1fr)] gap-4 xl:gap-5 items-start relative z-10 mb-8 xl:mb-10 overflow-visible"
      onMouseLeave={() => setActiveCard('meditate')}
    >
      <div data-top-grid-column="left" className="flex flex-col gap-4 xl:gap-5">
        {leftColumnCards.map((card) => (
          <TopGridCard
            key={card.id}
            card={card}
            active={activeCard === card.id}
            onHover={() => setActiveCard(card.id)}
          />
        ))}
      </div>

      <div data-top-grid-column="right" className="flex flex-col gap-4 xl:gap-5">
        {rightColumnCards.map((card) => (
          <TopGridCard
            key={card.id}
            card={card}
            active={activeCard === card.id}
            onHover={() => setActiveCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
