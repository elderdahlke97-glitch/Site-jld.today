import React from 'react';
import { Sun, Moon, Wifi } from 'lucide-react';
import { JLDLogo } from './JLDLogo';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenLogin: () => void;
  isLoggedIn?: boolean;
  whatsappUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onOpenLogin,
  isLoggedIn = false,
  whatsappUrl = 'https://wa.me/5551996837623',
}) => {
  return (
    <header className={`w-full transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}`}>
      {/* Mobile Status Bar (9:41 on left, Signal / Wifi / 100 Battery on right) */}
      <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs select-none ${darkMode ? 'text-slate-200' : 'text-black'}`}>
        <span className="font-extrabold text-[15px] tracking-tight">9:41</span>
        
        <div className="flex items-center gap-1.5">
          {/* Signal 4 bars */}
          <div className="flex items-end gap-[1.5px] h-3 px-0.5">
            <span className={`w-[3px] h-1.5 rounded-[0.5px] ${darkMode ? 'bg-slate-200' : 'bg-black'}`} />
            <span className={`w-[3px] h-2 rounded-[0.5px] ${darkMode ? 'bg-slate-200' : 'bg-black'}`} />
            <span className={`w-[3px] h-2.5 rounded-[0.5px] ${darkMode ? 'bg-slate-200' : 'bg-black'}`} />
            <span className={`w-[3px] h-3 rounded-[0.5px] ${darkMode ? 'bg-slate-200' : 'bg-black'}`} />
          </div>

          {/* Wifi */}
          <Wifi size={15} strokeWidth={2.6} className={`${darkMode ? 'text-slate-200' : 'text-black'} ml-0.5`} />

          {/* Battery pill with 100 */}
          <div className="flex items-center ml-0.5">
            <div className={`h-[14px] px-1.5 rounded-[4.5px] text-[9px] font-black flex items-center justify-center leading-none tracking-tighter ${
              darkMode ? 'bg-slate-100 text-slate-900' : 'bg-black text-white'
            }`}>
              100
            </div>
            <div className={`w-[1.5px] h-[4px] rounded-r-xs -ml-[0.5px] ${darkMode ? 'bg-slate-100' : 'bg-black'}`} />
          </div>
        </div>
      </div>

      {/* Main Header Bar (Socials on Left, Logo in Center, Theme & Profile on Right) */}
      <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors ${
        darkMode ? 'border-slate-800' : 'border-slate-100'
      }`}>
        {/* Left: 3 Social Circle Buttons */}
        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.26-1.92 1.34-.51.08-1.17.11-3.77-.94-3.32-1.34-5.46-4.71-5.63-4.93-.16-.22-1.34-1.78-1.34-3.4 0-1.62.85-2.42 1.15-2.75.31-.33.67-.41.9-.41.22 0 .45 0 .65.01.21.01.49-.08.77.58.28.67.97 2.37 1.05 2.54.08.17.14.37.03.59-.11.23-.17.37-.34.56-.17.2-.36.44-.51.59-.17.17-.35.35-.15.7.2.34.89 1.47 1.91 2.38 1.31 1.17 2.41 1.53 2.76 1.7.34.17.55.14.75-.08.2-.23.86-1 1.09-1.34.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.57.25.65.4.09.14.09.83-.15 1.51z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        {/* Center: JLD Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="focus:outline-none cursor-pointer hover:opacity-95 transition-opacity px-1"
        >
          <JLDLogo size="sm" darkMode={darkMode} />
        </button>

        {/* Right: Theme Toggle & Admin Profile */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Toggle Pill matching cabeçalho.jld.png */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
            className={`h-[30px] px-2 rounded-full border-[1.5px] flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
              darkMode
                ? 'bg-slate-800 border-cyan-400 text-cyan-300 hover:bg-slate-750 shadow-cyan-950/40'
                : 'bg-white border-[#3B82F6] text-[#0F3D9C] hover:bg-blue-50/50'
            }`}
          >
            <Sun
              size={13}
              strokeWidth={2.4}
              className={!darkMode ? "text-[#0F3D9C]" : "text-slate-500"}
            />
            <Moon
              size={13}
              strokeWidth={2.4}
              className={darkMode ? "text-cyan-400" : "text-[#0F3D9C]"}
            />
          </button>

          {/* User Profile / Admin Icon matching circular stroke in cabeçalho.jld.png */}
          <button
            onClick={() => {
              if (currentScreen === 'admin' || currentScreen === 'client') {
                onNavigate('home');
              } else {
                onOpenLogin();
              }
            }}
            title={currentScreen === 'admin' || currentScreen === 'client' ? "Voltar ao Início" : "Painel de Controle"}
            className={`w-[30px] h-[30px] rounded-full border-[1.8px] flex items-center justify-center transition-colors cursor-pointer ${
              darkMode
                ? 'border-slate-300 text-slate-200 hover:bg-slate-800'
                : 'border-[#0A1F4A] text-[#0A1F4A] hover:bg-slate-50'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

