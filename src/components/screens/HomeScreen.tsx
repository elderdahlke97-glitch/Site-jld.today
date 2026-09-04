import React from 'react';
import { CalendarDays, ClipboardList, Puzzle, Check, ArrowRight, Smartphone } from 'lucide-react';
import { ScreenType } from '../../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  darkMode?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, darkMode = false }) => {
  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* BANNER DE SAUDAÇÃO JLD (COMPACTO) */}
      <section className="px-4 pt-2.5">
        <div
          className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 border relative overflow-hidden transition-all ${
            darkMode
              ? 'bg-slate-800/95 border-slate-700/80 text-white shadow-md shadow-black/20'
              : 'bg-white border-[#E2E8F0] text-slate-800 shadow-xs'
          }`}
        >
          {/* Subtle decorative glow */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none -z-0 ${
              darkMode ? 'bg-cyan-500/10' : 'bg-blue-500/5'
            }`}
          />

          <div className="relative z-10 space-y-1.5">
            {/* Saudação e Título agrupados de forma compacta */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  darkMode
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/70'
                    : 'bg-blue-50 text-[#0F3D9C] border border-blue-100'
                }`}
              >
                <span>Olá! Que bom ter você por aqui!</span>
                <span className="text-xs">👋</span>
              </span>

              <h1
                className={`text-sm sm:text-base font-black tracking-tight ${
                  darkMode ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                Você está na{' '}
                <span className={darkMode ? 'text-cyan-400' : 'text-[#0F3D9C]'}>
                  JLD Digital Solutions
                </span>
              </h1>
            </div>

            {/* Descrição e Convite */}
            <p
              className={`text-[11.5px] sm:text-xs leading-relaxed font-normal ${
                darkMode ? 'text-slate-300' : 'text-[#64748B]'
              }`}
            >
              Criamos soluções digitais, aplicativos e automações para tornar negócios mais organizados, eficientes e fáceis de gerenciar.
            </p>

            <p
              className={`text-xs sm:text-[13px] font-semibold leading-normal ${
                darkMode ? 'text-cyan-300' : 'text-[#0F3D9C]'
              }`}
            >
              Descubra o que podemos fazer pelo seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUTOS SECTION */}
      <section className="px-4 space-y-3">
        {/* Section Title with blue line */}
        <div className="flex items-center justify-between">
          <h2 className={`text-base sm:text-lg font-black tracking-tight uppercase ${
            darkMode ? 'text-white' : 'text-[#0F172A]'
          }`}>
            PRODUTOS
          </h2>
          <div className={`w-10 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-[#0F3D9C]'}`} />
        </div>

        {/* 3 STACKED PRODUCT CARDS (COMPACTADOS) */}
        <div className="space-y-2.5">
          {/* Card 1: Agenda JLD */}
          <div className={`rounded-xl p-3 sm:p-3.5 border shadow-xs hover:shadow-md transition-all relative overflow-hidden ${
            darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
          }`}>
            {/* Top row: Icon + Title + Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                  darkMode ? 'bg-cyan-950/50 border-cyan-800 text-cyan-400' : 'bg-blue-50 border-blue-200 text-[#0F3D9C]'
                }`}>
                  <CalendarDays size={18} strokeWidth={2.2} />
                </div>
                <h3 className={`text-sm sm:text-base font-black truncate ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Agenda JLD
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider shrink-0 shadow-2xs ${
                darkMode ? 'bg-cyan-600 text-white' : 'bg-[#0F3D9C] text-white'
              }`}>
                PRODUTO PRINCIPAL
              </span>
            </div>

            {/* Description */}
            <p className={`text-[11px] sm:text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-[#64748B]'}`}>
              <span className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Chega de depender do WhatsApp para marcar horários!
              </span>
              <br />
              Sistema de agendamento online com site próprio e seu app personalizado. Seus clientes agendam, você só atende.
            </p>

            {/* Quadros lado a lado em uma só linha */}
            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div
                title="Site próprio: suaempresa.jld.today"
                className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                  darkMode ? 'bg-blue-950/60 border-blue-800 text-blue-300' : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]'
                }`}
              >
                <span className="shrink-0 text-[10px]">✏️</span>
                <span className="truncate">Site: suaempresa.jld.today</span>
              </div>
              <div
                title="App instalável: Android & iOS"
                className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                  darkMode ? 'bg-blue-950/60 border-blue-800 text-blue-300' : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]'
                }`}
              >
                <Smartphone size={11} className="shrink-0" />
                <span className="truncate">App: Android & iOS</span>
              </div>
            </div>

            {/* Bottom Row: Checklist & Action */}
            <div className={`pt-2 border-t flex items-center justify-between gap-2 ${
              darkMode ? 'border-slate-700/80' : 'border-slate-100'
            }`}>
              <div className={`flex items-center gap-1 text-[10px] min-[360px]:text-[10.5px] font-medium truncate ${
                darkMode ? 'text-cyan-300' : 'text-[#1E3A8A]'
              }`}>
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-cyan-900/60 text-cyan-400' : 'bg-blue-100 text-[#0F3D9C]'
                }`}>
                  <Check size={9} strokeWidth={3} />
                </div>
                <span className="truncate">Agendamento online 24h</span>
              </div>

              <button
                onClick={() => onNavigate('plans')}
                className={`h-7.5 px-3 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shrink-0 shadow-xs transition-colors cursor-pointer ${
                  darkMode ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#0A1F4A] hover:bg-[#0F3D9C]'
                }`}
              >
                <span>CONHEÇA</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Card 2: OS JLD (Vem Aí) */}
          <div className={`rounded-xl p-3 sm:p-3.5 border shadow-xs relative overflow-hidden ${
            darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
          }`}>
            {/* Top row: Icon + Title + Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                  darkMode ? 'bg-amber-950/40 border-amber-800 text-amber-400' : 'bg-amber-50 border-amber-200 text-[#D97706]'
                }`}>
                  <ClipboardList size={18} strokeWidth={2.2} />
                </div>
                <h3 className={`text-sm sm:text-base font-black truncate ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  OS JLD
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F59E0B] text-white text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider shrink-0 shadow-2xs">
                VEM AÍ
              </span>
            </div>

            {/* Description */}
            <p className={`text-[11px] sm:text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-[#64748B]'}`}>
              <span className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Organize sua operação de ponta a ponta.
              </span>
              <br />
              Sistema completo de gestão de Ordens de Serviço — serviços, prazos, status e histórico de atendimentos, tudo centralizado.
            </p>

            {/* Quadros lado a lado em uma só linha */}
            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                darkMode ? 'bg-amber-950/50 border-amber-800 text-amber-300' : 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
              }`}>
                <Smartphone size={11} className="shrink-0" />
                <span className="truncate">PWA: Celular, tablet e PC</span>
              </div>
              <div className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                darkMode ? 'bg-amber-950/50 border-amber-800 text-amber-300' : 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
              }`}>
                <span className="shrink-0 text-[10px]">💬</span>
                <span className="truncate">WhatsApp & estoque</span>
              </div>
            </div>
          </div>

          {/* Card 3: Solicite sua Solução (Sob Medida) */}
          <div className={`rounded-xl p-3 sm:p-3.5 border shadow-xs hover:shadow-md transition-shadow relative overflow-hidden ${
            darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
          }`}>
            {/* Top row: Icon + Title + Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                  darkMode ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-[#15803D]'
                }`}>
                  <Puzzle size={18} strokeWidth={2.2} />
                </div>
                <h3 className={`text-sm sm:text-base font-black truncate ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Solicite sua Solução
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#22C55E] text-white text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider shrink-0 shadow-2xs">
                SOB MEDIDA
              </span>
            </div>

            {/* Description */}
            <p className={`text-[11px] sm:text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-[#64748B]'}`}>
              <span className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Tem um processo manual travando seu negócio?
              </span>
              <br />
              A gente transforma isso em tecnologia. Aplicativos e sites feitos sob medida.
            </p>

            {/* Quadros lado a lado em uma só linha */}
            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                darkMode ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300' : 'bg-[#DCFCE7] border-[#BBF7D0] text-[#166534]'
              }`}>
                <span className="shrink-0 text-[10px]">💬</span>
                <span className="truncate">Mapeamento sem custo extra</span>
              </div>
              <div className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-[10.5px] font-bold border leading-none min-w-0 ${
                darkMode ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300' : 'bg-[#DCFCE7] border-[#BBF7D0] text-[#166534]'
              }`}>
                <span className="shrink-0 text-[10px]">💻</span>
                <span className="truncate">App sob medida</span>
              </div>
            </div>

            {/* Checklist */}
            <div className={`flex items-center gap-1 text-[10px] min-[360px]:text-[10.5px] font-medium py-1 px-2 rounded-lg border ${
              darkMode ? 'bg-emerald-950/30 text-emerald-300 border-emerald-900/60' : 'bg-emerald-50/70 text-[#166534] border-emerald-100'
            }`}>
              <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0">
                <Check size={9} strokeWidth={3} />
              </div>
              <span className="truncate">Sem compromisso • Análise gratuita</span>
            </div>

            {/* Bottom Row */}
            <div className={`mt-2.5 pt-2 border-t flex items-center justify-between gap-2 ${
              darkMode ? 'border-slate-700/80' : 'border-slate-100'
            }`}>
              <span className={`text-[10px] min-[360px]:text-[10.5px] font-medium truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Retorno em 24h úteis
              </span>
              <button
                onClick={() => onNavigate('solucao')}
                className="h-7.5 px-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-[11px] font-bold flex items-center gap-1 shrink-0 shadow-xs transition-colors cursor-pointer"
              >
                <span>SOLICITAR AGORA</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
