import React from 'react';
import { Mic, Play, Send, ThumbsDown, ThumbsUp } from 'lucide-react';

import {
  chatMessages,
  rightPanelHeading,
  type ChatMessage as ChatMessageData,
} from '../../data/dashboard.ts';
import { SphereIcon } from './ui.tsx';

function MediaCard({
  image,
  subtitle,
  title,
}: NonNullable<ChatMessageData['mediaCard']>) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-[24px] p-3 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white transition-colors mt-2">
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">{title}</h4>
        <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center text-orange-500 hover:scale-105 transition-transform shrink-0">
        <Play size={14} fill="currentColor" className="ml-1" />
      </button>
    </div>
  );
}

function ChatMessage({
  message,
}: {
  key?: React.Key;
  message: ChatMessageData;
}) {
  const isRightAligned = message.align === 'right';
  const wrapperClass = isRightAligned
    ? 'flex flex-col items-end gap-1.5'
    : 'flex flex-col items-start gap-1.5';
  const messageClass = isRightAligned
    ? 'text-[14px] sm:text-[15px] text-gray-700 text-right max-w-[95%] sm:max-w-[90%] leading-relaxed font-medium'
    : 'text-[14px] sm:text-[15px] text-gray-700 text-left max-w-[95%] leading-relaxed font-medium';

  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-2 mb-1">
        {isRightAligned ? (
          <>
            <span className="text-xs font-bold text-gray-800">{message.author}</span>
            <SphereIcon className="w-4 h-4" floating={false} />
          </>
        ) : (
          <>
            <SphereIcon className="w-4 h-4" floating={false} />
            <span className="text-xs font-bold text-gray-800">{message.author}</span>
          </>
        )}
      </div>
      <p className={messageClass}>{message.content}</p>

      {message.showFeedback ? (
        <div className="flex items-center gap-3 mt-1 mb-2">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ThumbsUp size={14} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ThumbsDown size={14} />
          </button>
        </div>
      ) : null}

      {message.mediaCard ? <MediaCard {...message.mediaCard} /> : null}
    </div>
  );
}

export default function RightPanel() {
  const headingLines = rightPanelHeading.split('\n');

  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[40px] p-6 sm:p-8 h-full flex flex-col relative overflow-hidden z-10">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-200/40 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-200/40 rounded-full blur-[80px] -z-10" />

      <div className="text-center mb-8 sm:mb-10 mt-2 sm:mt-4">
        <SphereIcon
          className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6"
          floating={false}
        />
        <h2 className="text-2xl sm:text-[28px] font-medium text-gray-900 leading-[1.15] tracking-tight">
          {headingLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < headingLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6 sm:gap-8 pb-24">
        {chatMessages.map((message) => (
          <ChatMessage key={message.author} message={message} />
        ))}
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Ask Anything..."
            className="bg-transparent outline-none flex-1 text-[14px] sm:text-[15px] text-gray-800 placeholder-gray-400 font-medium min-w-0"
          />
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
}
