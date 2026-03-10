export type NavigationIcon =
  | 'LayoutDashboard'
  | 'PlayCircle'
  | 'Star'
  | 'Users'
  | 'Download'
  | 'Key'
  | 'Share2'
  | 'Bookmark'
  | 'LogOut';

export type NavigationItem = {
  label: string;
  icon: NavigationIcon;
  active?: boolean;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

export type TopGridCard = {
  id: 'meditate' | 'move' | 'sleep' | 'music';
  title: string;
  image: string;
  mediaClassName: string;
  overlayClassName: string;
  fadeOverlayClassName: string;
  minHeightClassName: string;
  accentOverlayClassName?: string;
  showArrow?: boolean;
};

export type RecommendedItem = {
  title: string;
  author: string;
  duration: string;
  image: string;
};

export type ChatMediaCard = {
  title: string;
  subtitle: string;
  image: string;
};

export type ChatMessage = {
  author: 'You' | 'Sense';
  content: string;
  align: 'left' | 'right';
  showFeedback?: boolean;
  mediaCard?: ChatMediaCard;
};

export const dashboardBrand = 'MindDance';

export const navigationSections: NavigationSection[] = [
  {
    title: 'General',
    items: [
      { icon: 'LayoutDashboard', label: 'Dashboard', active: true },
      { icon: 'PlayCircle', label: 'My Sessions' },
      { icon: 'Star', label: 'Popular Sessions' },
      { icon: 'Users', label: 'Community' },
      { icon: 'Download', label: 'Download' },
    ],
  },
  {
    title: 'Others',
    items: [
      { icon: 'Key', label: 'Premium Access' },
      { icon: 'Share2', label: 'Shared Sessions' },
      { icon: 'Bookmark', label: 'Saved Practices' },
    ],
  },
];

export const logoutItem: NavigationItem = {
  icon: 'LogOut',
  label: 'Logout',
};

export const topGridCards: TopGridCard[] = [
  {
    id: 'meditate',
    title: 'Meditate',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    mediaClassName: 'pattern-dots bg-pink-50',
    overlayClassName:
      'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-4 sm:px-5',
    fadeOverlayClassName:
      'absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/88 via-white/34 to-transparent pointer-events-none',
    minHeightClassName: 'min-h-[180px] xl:min-h-[320px]',
    accentOverlayClassName:
      'absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 mix-blend-overlay',
    showArrow: true,
  },
  {
    id: 'move',
    title: 'Move',
    image:
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2488&auto=format&fit=crop',
    mediaClassName: 'bg-[#eef0f4]',
    overlayClassName: 'absolute inset-x-0 bottom-0 px-4 py-4 sm:px-5',
    fadeOverlayClassName:
      'absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 via-white/38 to-transparent pointer-events-none',
    minHeightClassName: 'min-h-[150px] xl:min-h-[180px]',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    image:
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2488&auto=format&fit=crop',
    mediaClassName: 'bg-[#f4f2ee]',
    overlayClassName: 'absolute inset-x-0 bottom-0 px-4 py-4 sm:px-5',
    fadeOverlayClassName:
      'absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 via-white/38 to-transparent pointer-events-none',
    minHeightClassName: 'min-h-[135px] xl:min-h-[165px]',
  },
  {
    id: 'music',
    title: 'Music',
    image:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
    mediaClassName: 'bg-[#f4eef1]',
    overlayClassName: 'absolute inset-x-0 bottom-0 px-4 py-4 sm:px-5',
    fadeOverlayClassName:
      'absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none',
    minHeightClassName: 'min-h-[180px] xl:min-h-[300px]',
  },
];

export const recommendationTabs = ['Mindfulness', 'Focus', 'Relaxation'] as const;

export const recommendedItems: RecommendedItem[] = [
  {
    title: 'Mindful Moments',
    author: 'Alex Morgan',
    duration: '5 Min',
    image:
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
  },
  {
    title: 'Breath of Balance',
    author: 'Sara Lee',
    duration: '5 Min',
    image:
      'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2564&auto=format&fit=crop',
  },
  {
    title: 'Calm Flow Journey',
    author: 'Daniel Cru',
    duration: '5 Min',
    image:
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop',
  },
];

export const rightPanelHeading = "Good Morning\nAndrew, What's on\nyour mind?";

export const chatMessages: ChatMessage[] = [
  {
    author: 'You',
    align: 'right',
    content:
      "Hi, I've been curious about meditation, but honestly, I don't really know where to start. Can you help me with that?",
  },
  {
    author: 'Sense',
    align: 'left',
    content:
      "Absolutely 🌿 Meditation is just about being present and gentle with yourself. Let's start simple — I'll guide you.",
    showFeedback: true,
    mediaCard: {
      title: 'Ease into Sleep',
      subtitle: 'Meditation | 5 Min',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop',
    },
  },
];
