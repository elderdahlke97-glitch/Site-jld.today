import React from 'react';
import {
  Target,
  Eye,
  HeartHandshake,
  Check,
  Users,
  BadgeCheck,
  Building2,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface SobreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  darkMode?: boolean;
  whatsappUrl?: string;
}

export const SobreScreen: React.FC<SobreScreenProps> = ({
  darkMode = false,
  whatsappUrl = 'https://wa.me/5551996837623',
}) => {
  return (
    <div
      className={`min-h-full w-full px-5 pt-3 pb-24 transition-colors duration-200 ${
        darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* Badge: POR QUE JLD */}
      <div className="flex flex-col items-start -mt-0.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[11px] font-bold tracking-[0.12em] shadow-xs">
          <span className="w-[6px] h-[6px] rounded-full bg-[#2563EB]" />
          POR QUE JLD
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="mt-2.5 font-extrabold text-[28px] min-[360px]:text-[31px] leading-[1.08] tracking-[-0.02em] pr-1">
        <span className={darkMode ? 'text-white' : 'text-[#0F172A]'}>
          Tecnologia que
        </span>
        <br />
        <span className="text-[#2563EB]">
          descomplica o seu dia a dia
        </span>
      </h1>

      {/* Intro Description */}
      <p
        className={`mt-3 text-[14px] min-[360px]:text-[15px] leading-[1.5] font-normal ${
          darkMode ? 'text-slate-300' : 'text-[#475569]'
        }`}
      >
        <span>Somos a </span>
        <strong className={`font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          JLD Digital Solutions
        </strong>
        <span>
          , da Grande Porto Alegre/RS! Desde 2026, transformamos a rotina de pequenas e médias empresas com aplicativos e sites feitos para celulares e computador. Simples. Eficiente. Acessível.
        </span>
      </p>

      {/* Section: Missão, Visão e Valores */}
      <div className="mt-4">
        <h2
          className={`font-bold text-[15px] ${
            darkMode ? 'text-white' : 'text-[#0F172A]'
          } flex items-center gap-2`}
        >
          <span className="w-1 h-4 rounded-full bg-[#2563EB]" />
          Missão, Visão e Valores
        </h2>

        <div className="mt-2.5 grid gap-2">
          {/* Missão Card */}
          <div
            className={`rounded-[12px] border p-3 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="flex gap-2.5">
              <div
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-blue-500/15' : 'bg-[#DBEAFE]'
                }`}
              >
                <Target className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-[13px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Missão
                </h3>
                <p className={`mt-0.5 text-[12px] leading-[1.4] ${darkMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                  Desenvolver soluções digitais inteligentes que automatizem e simplifiquem processos.
                </p>
              </div>
            </div>
          </div>

          {/* Visão Card */}
          <div
            className={`rounded-[12px] border p-3 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="flex gap-2.5">
              <div
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-violet-500/15' : 'bg-[#EDE9FE]'
                }`}
              >
                <Eye className={`w-4 h-4 ${darkMode ? 'text-violet-400' : 'text-[#7C3AED]'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-[13px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Visão
                </h3>
                <p className={`mt-0.5 text-[12px] leading-[1.4] ${darkMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                  Ser referência em soluções digitais personalizadas na região.
                </p>
              </div>
            </div>
          </div>

          {/* Valores Card */}
          <div
            className={`rounded-[12px] border p-3 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="flex gap-2.5">
              <div
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-emerald-500/15' : 'bg-[#DCFCE7]'
                }`}
              >
                <HeartHandshake className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-[#16A34A]'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-[13px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Valores
                </h3>
                <div className="mt-1.5 grid grid-cols-2 gap-1">
                  {['Ética', 'Compromisso', 'Segurança', 'Melhoria'].map((valor) => (
                    <div key={valor} className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                      <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-200' : 'text-[#0F172A]'}`}>
                        {valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Por que confiar na JLD? */}
      <div className="mt-4">
        <h2 className={`font-bold text-[15px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
          Por que confiar na JLD?
        </h2>

        <div className="mt-2.5 grid gap-2">
          {/* 1. Atendimento humano */}
          <div
            className={`rounded-[12px] border p-3 flex gap-2.5 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-slate-950 border border-slate-750' : 'bg-[#0F172A]'
              }`}
            >
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className={`font-semibold text-[12px] ${darkMode ? 'text-white' : 'text-[#0F172A]'} flex items-center gap-1`}>
                Atendimento 100% humano <BadgeCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              </h4>
              <p className={`text-[11.5px] leading-[1.35] ${darkMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                Sem burocracia. Você fala direto com quem resolve.
              </p>
            </div>
          </div>

          {/* 2. Soluções sob medida */}
          <div
            className={`rounded-[12px] border p-3 flex gap-2.5 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#2563EB] flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className={`font-semibold text-[12px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                Soluções sob medida
              </h4>
              <p className={`text-[11.5px] leading-[1.35] ${darkMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                Planos justos e transparentes para pequenas e médias empresas.
              </p>
            </div>
          </div>

          {/* 3. Atendimento presencial na Grande Porto Alegre/RS */}
          <div
            className={`rounded-[12px] border p-3 flex gap-2.5 shadow-xs transition-colors ${
              darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#10B981] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className={`font-semibold text-[12px] ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                Atendimento presencial na Grande Porto Alegre/RS
              </h4>
              <p className={`text-[11.5px] leading-[1.35] ${darkMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                ou online, em qualquer lugar do Brasil.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA Button */}
      <div className="mt-5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[48px] rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all cursor-pointer"
        >
          <MessageCircle className="w-[18px] h-[18px] fill-white" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
