import Header from './components/dashboard/Header.tsx';
import Recommended from './components/dashboard/Recommended.tsx';
import RightPanel from './components/dashboard/RightPanel.tsx';
import Sidebar from './components/dashboard/Sidebar.tsx';
import TopGrid from './components/dashboard/TopGrid.tsx';

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
            <div className="flex-[1.8] flex flex-col xl:overflow-y-auto no-scrollbar xl:pb-8 overflow-visible">
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
