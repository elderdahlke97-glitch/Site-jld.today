import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, ClipboardList, Puzzle, ChevronRight, Lock } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  darkMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, darkMode = false }) => {
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isInicio = currentScreen === 'home';
  const isSobreNos = currentScreen === 'sobre';
  const isProdutos = currentScreen === 'plans' || currentScreen === 'solucao' || currentScreen === 'checkout' || showProductsMenu;

  const activeColor = darkMode ? '#38BDF8' : '#0F3D9C';
  const inactiveColor = darkMode ? '#94A3B8' : '#64748B';

  // Close floating menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProductsMenu(false);
      }
    };

    if (showProductsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProductsMenu]);

  const handleSelectAgendaJLD = () => {
    setShowProductsMenu(false);
    onNavigate('plans');
  };

  const handleSelectPersonalise = () => {
    setShowProductsMenu(false);
    onNavigate('solucao');
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 pointer-events-none"
    >
      {/* Fullscreen Backdrop Click Catcher */}
      {showProductsMenu && (
        <div
          className="fixed inset-0 z-40 pointer-events-auto bg-black/10 dark:bg-black/30 backdrop-blur-[0.5px]"
          onClick={() => setShowProductsMenu(false)}
        />
      )}

      {/* Floating Menu Popover strictly contained inside the max-w-[390px] mobile screen */}
      {showProductsMenu && (
        <div
          className={`absolute bottom-[76px] right-3 w-[224px] rounded-2xl p-2.5 border shadow-2xl z-50 animate-fadeIn backdrop-blur-xl transition-all pointer-events-auto ${
            darkMode
              ? 'bg-slate-900/98 border-slate-700/90 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-white'
              : 'bg-white/98 border-slate-200/90 shadow-[0_12px_32px_rgba(15,61,156,0.22)] text-slate-800'
          }`}
        >
          {/* Header indicator */}
          <div className="px-2 pt-1 pb-2 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Nossos Produtos
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 mt-2">
            {/* 1. Agenda JLD (Active - Opens Agenda JLD) */}
            <button
              onClick={handleSelectAgendaJLD}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer group ${
                darkMode
                  ? 'hover:bg-slate-800 active:bg-slate-750 text-slate-100'
                  : 'hover:bg-blue-50 active:bg-blue-100 text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                    darkMode
                      ? 'bg-cyan-950/60 border-cyan-800/80 text-cyan-400'
                      : 'bg-blue-50 border-blue-200 text-[#0F3D9C]'
                  }`}
                >
                  <CalendarDays size={15} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="text-xs font-black tracking-tight leading-tight">Agenda JLD</div>
                  <div className="text-[9.5px] font-medium text-slate-400">Agendamento online</div>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-500 transition-all shrink-0"
              />
            </button>

            {/* 2. OS JLD Vem ai!! (Disabled / Locked) */}
            <div
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left select-none cursor-not-allowed opacity-60 ${
                darkMode
                  ? 'bg-slate-800/40 text-slate-400 border border-slate-800/60'
                  : 'bg-slate-100/70 text-slate-400 border border-slate-200/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400 border border-slate-300/60 dark:border-slate-700">
                  <ClipboardList size={15} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight text-slate-400 line-through">
                    OS JLD
                  </div>
                  <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400">
                    Vem aí!!
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800">
                <Lock size={10} />
              </div>
            </div>

            {/* 3. Personalise (Active - Opens Solicite sua solução) */}
            <button
              onClick={handleSelectPersonalise}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer group ${
                darkMode
                  ? 'hover:bg-slate-800 active:bg-slate-750 text-slate-100'
                  : 'hover:bg-emerald-50 active:bg-emerald-100 text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                    darkMode
                      ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  <Puzzle size={15} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="text-xs font-black tracking-tight leading-tight">Personalise</div>
                  <div className="text-[9.5px] font-medium text-slate-400">Solicite sua solução</div>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-500 transition-all shrink-0"
              />
            </button>
          </div>

          {/* Pointing arrow aligned with the 3rd navigation item (Produtos) */}
          <div
            className={`absolute -bottom-1.5 right-8 w-3 h-3 rotate-45 border-r border-b ${
              darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          />
        </div>
      )}

      {/* Main Bottom Navigation Bar */}
      <nav
        className={`relative w-full h-[68px] backdrop-blur-md border-t z-50 flex items-center justify-around px-6 select-none transition-colors duration-200 pointer-events-auto ${
          darkMode
            ? 'bg-slate-900/98 border-slate-800 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]'
            : 'bg-white/98 border-slate-100/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]'
        }`}
      >
        {/* 1. Início */}
        <button
          onClick={() => {
            setShowProductsMenu(false);
            onNavigate('home');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
            isInicio
              ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#64748B] hover:text-slate-800'
          }`}
        >
          {/* House Icon with filled style matching screenshot */}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill={isInicio ? activeColor : 'none'}
            stroke={isInicio ? activeColor : inactiveColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg>

          <span
            className={`text-[11px] font-bold mt-1 tracking-tight leading-none ${
              isInicio
                ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
                : darkMode ? 'text-slate-400' : 'text-[#64748B]'
            }`}
          >
            Início
          </span>

          {/* Active Dot Indicator */}
          <div className="h-1.5 mt-1 flex items-center justify-center">
            {isInicio && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  darkMode ? 'bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'bg-[#0F3D9C]'
                }`}
              />
            )}
          </div>
        </button>

        {/* 2. Sobre Nós */}
        <button
          onClick={() => {
            setShowProductsMenu(false);
            onNavigate('sobre');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
            isSobreNos
              ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#64748B] hover:text-slate-800'
          }`}
        >
          {/* Info Icon with circle matching screenshot */}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke={isSobreNos ? activeColor : inactiveColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="8" x2="12" y2="8.01" strokeWidth="3" />
            <line x1="12" y1="11.5" x2="12" y2="16" />
          </svg>

          <span
            className={`text-[11px] font-bold mt-1 tracking-tight leading-none ${
              isSobreNos
                ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
                : darkMode ? 'text-slate-400' : 'text-[#64748B]'
            }`}
          >
            Sobre Nós
          </span>

          {/* Active Dot Indicator */}
          <div className="h-1.5 mt-1 flex items-center justify-center">
            {isSobreNos && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  darkMode ? 'bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'bg-[#0F3D9C]'
                }`}
              />
            )}
          </div>
        </button>

        {/* 3. Produtos (Opens Floating Popover Menu) */}
        <button
          onClick={() => setShowProductsMenu((prev) => !prev)}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
            isProdutos
              ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#64748B] hover:text-slate-800'
          }`}
        >
          {/* 4 Rounded Squares Grid matching screenshot */}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke={isProdutos ? activeColor : inactiveColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
          </svg>

          <span
            className={`text-[11px] font-bold mt-1 tracking-tight leading-none ${
              isProdutos
                ? darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'
                : darkMode ? 'text-slate-400' : 'text-[#64748B]'
            }`}
          >
            Produtos
          </span>

          {/* Active Dot Indicator */}
          <div className="h-1.5 mt-1 flex items-center justify-center">
            {isProdutos && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  darkMode ? 'bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'bg-[#0F3D9C]'
                }`}
              />
            )}
          </div>
        </button>
      </nav>
    </div>
  );
};

