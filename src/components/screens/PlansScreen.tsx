import React from 'react';
import { Check, X, Play, ArrowRight, Info, Tag, Wrench, Rocket, CalendarCheck } from 'lucide-react';
import { ScreenType, PlanItem } from '../../types';
import { PLANS_DATA } from '../../data/mockData';

interface PlansScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectPlan: (planId: string) => void;
  onOpenDemo: (plan: PlanItem) => void;
  darkMode?: boolean;
}

interface SynthesizedFeature {
  text: string;
  included: boolean;
}

interface SynthesizedPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  popular?: boolean;
  theme: 'base' | 'pro' | 'plus';
  features: SynthesizedFeature[];
}

export const PlansScreen: React.FC<PlansScreenProps> = ({
  onNavigate,
  onSelectPlan,
  onOpenDemo,
  darkMode = false,
}) => {
  const handleStartPlan = (planId: string) => {
    onSelectPlan(planId);
    onNavigate('checkout');
  };

  // Synthesized features tailored for the mobile 3-column layout
  const synthesizedPlans: SynthesizedPlan[] = [
    {
      id: 'agenda-base',
      name: 'Agenda JLD',
      tagline: 'Para começar',
      price: 'R$ 39,90',
      theme: 'base',
      features: [
        { text: 'Site próprio + hospedagem', included: true },
        { text: 'App instalável Android / iOS', included: true },
        { text: 'Cadastro auto clientes', included: true },
        { text: 'Até 30 agend./mês', included: true },
        { text: '1 profissional', included: true },
        { text: 'Painel do profissional', included: true },
        { text: 'Gestão de serviços', included: true },
        { text: 'Notificações auto', included: true },
        { text: 'Link personalizado', included: true },
        { text: 'Relatórios financeiros', included: false },
        { text: 'Histórico de clientes', included: true },
        { text: 'Suporte especializado', included: true },
      ],
    },
    {
      id: 'agenda-pro',
      name: 'Agenda JLD Pro',
      tagline: 'Para crescer',
      price: 'R$ 59,90',
      popular: true,
      theme: 'pro',
      features: [
        { text: 'Site próprio + hospedagem', included: true },
        { text: 'App instalável Android / iOS', included: true },
        { text: 'Cadastro auto clientes', included: true },
        { text: 'Personalizado com sua marca', included: true },
        { text: 'Agendamentos ilimitados', included: true },
        { text: 'Até 5 profissionais', included: true },
        { text: 'Painel do profissional', included: true },
        { text: 'Gestão serviços e equipe', included: true },
        { text: 'Notificações auto', included: true },
        { text: 'Relatórios financeiros', included: true },
        { text: 'Histórico de clientes', included: true },
        { text: 'Suporte especializado', included: true },
      ],
    },
    {
      id: 'agenda-plus',
      name: 'Agenda JLD Plus',
      tagline: 'Para escalar',
      price: 'R$ 119,90',
      theme: 'plus',
      features: [
        { text: 'Site próprio + hospedagem', included: true },
        { text: 'App instalável Android / iOS', included: true },
        { text: 'Cadastro auto clientes', included: true },
        { text: 'Personalizado com sua marca', included: true },
        { text: 'Agendamentos ilimitados', included: true },
        { text: 'Até 15 profissionais', included: true },
        { text: 'Painel do profissional', included: true },
        { text: 'Gestão serviços e equipe', included: true },
        { text: 'Notificações auto', included: true },
        { text: 'Relatórios financeiros', included: true },
        { text: 'Histórico de clientes', included: true },
        { text: 'Suporte especializado', included: true },
      ],
    },
  ];

  return (
    <div className="space-y-5 px-2.5 sm:px-3 pt-5 pb-24 animate-fadeIn max-w-[390px] mx-auto">
      {/* Title */}
      <div className="text-center px-1">
        <h1
          className={`text-[17px] sm:text-[19px] font-black tracking-tight leading-snug ${
            darkMode ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          Escolha o plano que combina com o seu negócio.
        </h1>
      </div>

      {/* 3 PRICING CARDS - SINTETIZADOS LADO A LADO EM 3 COLUNAS */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-stretch pt-2">
        {synthesizedPlans.map((plan) => {
          const originalPlan = PLANS_DATA.find((p) => p.id === plan.id) || PLANS_DATA[0];
          const isBase = plan.theme === 'base';
          const isPro = plan.theme === 'pro';
          const isPlus = plan.theme === 'plus';

          const titleColor = isPro
            ? darkMode
              ? 'text-[#818CF8]'
              : 'text-[#4F46E5]'
            : isPlus
            ? darkMode
              ? 'text-[#2DD4BF]'
              : 'text-[#0D9488]'
            : darkMode
            ? 'text-white'
            : 'text-[#0F172A]';

          const priceColor = isPro
            ? darkMode
              ? 'text-[#818CF8]'
              : 'text-[#4F46E5]'
            : isPlus
            ? darkMode
              ? 'text-[#2DD4BF]'
              : 'text-[#0D9488]'
            : darkMode
            ? 'text-white'
            : 'text-[#0F172A]';

          const borderStyle = isPro
            ? darkMode
              ? 'border-[1.5px] border-[#6366F1] shadow-md shadow-indigo-950/40 bg-slate-850'
              : 'border-[1.5px] border-[#6366F1] shadow-md shadow-indigo-100 bg-white'
            : darkMode
            ? 'border border-slate-700/80 bg-slate-800/80 shadow-2xs'
            : 'border border-slate-200 bg-white shadow-2xs';

          return (
            <div
              key={plan.id}
              className={`rounded-[14px] relative flex flex-col justify-between p-1.5 min-[360px]:p-2 transition-all ${borderStyle}`}
            >
              {/* Mais popular badge */}
              {isPro && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#4F46E5] text-white text-[8px] min-[360px]:text-[8.5px] font-extrabold uppercase tracking-wide whitespace-nowrap shadow-xs z-10">
                  Mais popular
                </div>
              )}

              {/* Card Header */}
              <div>
                <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-700/60 pt-0.5">
                  <h3 className={`text-[10.5px] min-[360px]:text-[11.5px] font-black tracking-tight leading-tight ${titleColor}`}>
                    {plan.name}
                  </h3>
                  <p className="text-[8.5px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {plan.tagline}
                  </p>
                  <div className="mt-1.5 flex flex-col items-center justify-center">
                    <span className={`text-[13px] min-[360px]:text-[14px] font-black tracking-tight leading-none ${priceColor}`}>
                      {plan.price}
                    </span>
                    <span className="text-[7.5px] min-[360px]:text-[8px] text-slate-400 font-medium mt-0.5">
                      por mês
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-2 space-y-1.5">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1 text-[8px] min-[360px]:text-[8.5px] leading-[1.2]">
                      {feat.included ? (
                        <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={8} strokeWidth={3.5} />
                        </div>
                      ) : (
                        <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X size={8} strokeWidth={3.5} />
                        </div>
                      )}
                      <span
                        className={
                          feat.included
                            ? darkMode
                              ? 'text-slate-200 font-medium'
                              : 'text-slate-700 font-medium'
                            : 'text-slate-400 dark:text-slate-500'
                        }
                      >
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => handleStartPlan(plan.id)}
                  className="w-full h-7 min-[360px]:h-[30px] rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-[8.5px] min-[360px]:text-[9.5px] font-bold flex items-center justify-center gap-1 shadow-2xs transition-all cursor-pointer px-1"
                >
                  <span className="truncate">Começar agora</span>
                  <ArrowRight size={11} className="shrink-0" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTÃO ÚNICO CENTRALIZADO "VER DEMONSTRAÇÃO" FORA DOS PLANOS */}
      <div>
        <button
          onClick={() => {
            const demoPlan = PLANS_DATA.find((p) => p.id === 'agenda-pro') || PLANS_DATA[0];
            onOpenDemo(demoPlan);
          }}
          className={`w-full h-11 rounded-xl border font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs active:scale-[0.99] ${
            darkMode
              ? 'bg-slate-800/90 border-slate-700 text-white hover:bg-slate-750'
              : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50'
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0">
            <Play size={8} fill="currentColor" className="ml-0.5" />
          </div>
          <span>VER DEMONSTRAÇÃO</span>
        </button>
      </div>

      {/* INFO ALERT BOX */}
      <div
        className={`rounded-xl border p-2.5 min-[360px]:p-3 flex items-start gap-2.5 text-xs shadow-2xs ${
          darkMode
            ? 'bg-blue-950/40 border-blue-900 text-blue-200'
            : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E3A8A]'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Info size={12} strokeWidth={2.5} />
        </div>
        <p className="text-[10px] min-[360px]:text-[10.5px] leading-relaxed">
          A implantação exige um investimento único, conforme o plano escolhido, que acompanha a personalização exclusiva, configuração e orientação de uso. A partir do segundo mês, você paga só a mensalidade.
        </p>
      </div>

      {/* COMO FUNCIONA O INVESTIMENTO */}
      <section className="space-y-3.5 pt-1">
        <div className="text-center">
          <h2
            className={`text-[15px] sm:text-[17px] font-black leading-snug tracking-tight ${
              darkMode ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Como funciona o investimento em nossos produtos:
          </h2>
          <p
            className={`text-[10.5px] sm:text-[11px] mt-0.5 font-medium ${
              darkMode ? 'text-slate-400' : 'text-[#64748B]'
            }`}
          >
            Processo simples, rápido e automatizado para você começar a receber agendamentos
          </p>
        </div>

        {/* 4 Process Steps - Grid 2x2 para encaixar perfeitamente no mobile */}
        <div className="grid grid-cols-2 gap-2">
          {/* Step 01 */}
          <div
            className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0] shadow-2xs'
            }`}
          >
            <div className="h-1 w-full bg-[#2563EB]" />
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#0F3D9C] dark:text-blue-300 flex items-center justify-center shrink-0">
                    <Tag size={13} strokeWidth={2.2} />
                  </div>
                </div>
                <h3
                  className={`text-[10.5px] font-black leading-tight ${
                    darkMode ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Escolha do plano:
                </h3>
                <p
                  className={`text-[9.5px] leading-tight mt-1 ${
                    darkMode ? 'text-slate-400' : 'text-[#64748B]'
                  }`}
                >
                  Escolha o plano que mais combina com sua empresa e seu momento.
                </p>
              </div>

              {/* Step 1 Graphic */}
              <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <svg viewBox="0 0 100 45" className="w-20 h-9" fill="none">
                  <rect x="20" y="5" width="36" height="36" rx="4" fill={darkMode ? '#1E293B' : '#F1F5F9'} stroke={darkMode ? '#334155' : '#CBD5E1'} strokeWidth="1" />
                  <rect x="30" y="2" width="16" height="5" rx="1.5" fill="#2563EB" />
                  <rect x="25" y="13" width="8" height="4" rx="1" fill="#2563EB" />
                  <line x1="36" y1="15" x2="50" y2="15" stroke={darkMode ? '#64748B' : '#94A3B8'} strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="25" y="21" width="8" height="4" rx="1" fill="#22C55E" />
                  <line x1="36" y1="23" x2="50" y2="23" stroke={darkMode ? '#64748B' : '#94A3B8'} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="72" cy="18" r="7" fill={darkMode ? '#334155' : '#DBEAFE'} stroke="#2563EB" strokeWidth="1" />
                  <path d="M62 38c0-5.5 4.5-10 10-10s10 4.5 10 10" fill={darkMode ? '#1E293B' : '#EFF6FF'} stroke="#2563EB" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div
            className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0] shadow-2xs'
            }`}
          >
            <div className="h-1 w-full bg-[#6366F1]" />
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
                    02
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-[#6366F1] dark:text-indigo-300 flex items-center justify-center shrink-0">
                    <Wrench size={13} strokeWidth={2.2} />
                  </div>
                </div>
                <h3
                  className={`text-[10.5px] font-black leading-tight ${
                    darkMode ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Desenvolvendo:
                </h3>
                <p
                  className={`text-[9.5px] leading-tight mt-1 ${
                    darkMode ? 'text-slate-400' : 'text-[#64748B]'
                  }`}
                >
                  Envie sua logo, serviços, horários e equipe. Cuidamos do resto.
                </p>
              </div>

              {/* Step 2 Graphic */}
              <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <svg viewBox="0 0 100 45" className="w-20 h-9" fill="none">
                  <circle cx="30" cy="18" r="6" fill={darkMode ? '#312E81' : '#E0E7FF'} stroke="#6366F1" strokeWidth="1" />
                  <path d="M20 38c0-5.5 4.5-10 10-10s10 4.5 10 10" fill={darkMode ? '#1E1B4B' : '#EEF2FF'} stroke="#6366F1" strokeWidth="1" />
                  <circle cx="68" cy="18" r="6" fill={darkMode ? '#312E81' : '#E0E7FF'} stroke="#6366F1" strokeWidth="1" />
                  <path d="M58 38c0-5.5 4.5-10 10-10s10 4.5 10 10" fill={darkMode ? '#1E1B4B' : '#EEF2FF'} stroke="#6366F1" strokeWidth="1" />
                  <rect x="38" y="7" width="22" height="13" rx="3" fill="#6366F1" />
                  <circle cx="44" cy="13" r="1" fill="white" />
                  <circle cx="49" cy="13" r="1" fill="white" />
                  <circle cx="54" cy="13" r="1" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div
            className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0] shadow-2xs'
            }`}
          >
            <div className="h-1 w-full bg-[#F59E0B]" />
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
                    03
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-[#D97706] dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Rocket size={13} strokeWidth={2.2} />
                  </div>
                </div>
                <h3
                  className={`text-[10.5px] font-black leading-tight ${
                    darkMode ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Implantação:
                </h3>
                <p
                  className={`text-[9.5px] leading-tight mt-1 ${
                    darkMode ? 'text-slate-400' : 'text-[#64748B]'
                  }`}
                >
                  Link do app pronto p/ Instagram, WhatsApp e Google. Sem instalar nada.
                </p>
              </div>

              {/* Step 3 Graphic */}
              <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <svg viewBox="0 0 100 45" className="w-20 h-9" fill="none">
                  <circle cx="28" cy="17" r="6" fill={darkMode ? '#451A03' : '#FEF3C7'} stroke="#F59E0B" strokeWidth="1" />
                  <circle cx="70" cy="17" r="6" fill={darkMode ? '#451A03' : '#FEF3C7'} stroke="#F59E0B" strokeWidth="1" />
                  <path d="M18 37c0-5 4-8.5 10-8.5 2 0 4.5.7 6 1.8" stroke="#F59E0B" strokeWidth="1" />
                  <path d="M80 37c0-5-4-8.5-10-8.5-2 0-4.5.7-6 1.8" stroke="#F59E0B" strokeWidth="1" />
                  <rect x="40" y="22" width="18" height="11" rx="3" fill="#F59E0B" />
                  <path d="M45 25l4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M49 25l4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Step 04 */}
          <div
            className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0] shadow-2xs'
            }`}
          >
            <div className="h-1 w-full bg-[#10B981]" />
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
                    04
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#15803D] dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <CalendarCheck size={13} strokeWidth={2.2} />
                  </div>
                </div>
                <h3
                  className={`text-[10.5px] font-black leading-tight ${
                    darkMode ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Receba os agendamentos:
                </h3>
                <p
                  className={`text-[9.5px] leading-tight mt-1 ${
                    darkMode ? 'text-slate-400' : 'text-[#64748B]'
                  }`}
                >
                  Notificações e gestão financeira automáticas. Você só atende e fatura.
                </p>
              </div>

              {/* Step 4 Graphic */}
              <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <svg viewBox="0 0 100 45" className="w-20 h-9" fill="none">
                  <rect x="22" y="8" width="30" height="28" rx="4" fill={darkMode ? '#064E3B' : '#DCFCE7'} stroke="#10B981" strokeWidth="1" />
                  <rect x="22" y="8" width="30" height="8" rx="2" fill="#10B981" />
                  <path d="M30 24l4 4 8-8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="68" cy="18" r="7" fill={darkMode ? '#064E3B' : '#DCFCE7'} stroke="#10B981" strokeWidth="1" />
                  <path d="M58 38c0-5.5 4.5-10 10-10s10 4.5 10 10" fill={darkMode ? '#022C22' : '#ECFDF5'} stroke="#10B981" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
