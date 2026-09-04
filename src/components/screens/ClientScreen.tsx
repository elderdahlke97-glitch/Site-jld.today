import React, { useState } from 'react';
import {
  CalendarDays,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Settings,
  User,
  ArrowLeft,
} from 'lucide-react';
import { JLDLogo } from '../JLDLogo';
import { ScreenType } from '../../types';

interface ClientScreenProps {
  clientName: string;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
  darkMode?: boolean;
}

export const ClientScreen: React.FC<ClientScreenProps> = ({
  clientName,
  onNavigate,
  onLogout,
  darkMode = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const clientSlug = clientName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'minha-empresa';
  const bookingUrl = `https://${clientSlug}.jld.today`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen pb-24 px-4 pt-4 select-none ${
        darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* Top Bar with Back, Logo and Logout */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
            darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft size={14} />
          <span>Início</span>
        </button>

        <JLDLogo size="sm" darkMode={darkMode} />

        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
          title="Sair do painel"
        >
          <LogOut size={13} />
          <span>Sair</span>
        </button>
      </div>

      {/* User Welcome Card */}
      <div
        className={`mt-4 p-4 rounded-2xl border shadow-sm ${
          darkMode
            ? 'bg-slate-800/80 border-slate-700/80'
            : 'bg-white border-slate-200/80'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-md ${
                darkMode ? 'bg-cyan-600' : 'bg-[#0F3D9C]'
              }`}
            >
              {clientName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-tight">{clientName}</h1>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
                  <CheckCircle2 size={9} />
                  Ativo
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Portal do Cliente JLD Digital</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Product Banner: Agenda JLD Pro */}
      <div
        className={`mt-3 p-4 rounded-2xl border shadow-md relative overflow-hidden ${
          darkMode
            ? 'bg-gradient-to-br from-slate-800 to-slate-850 border-cyan-900/50'
            : 'bg-gradient-to-br from-blue-900 to-[#0F3D9C] border-blue-900 text-white'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <CalendarDays size={18} className="text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xs font-black tracking-wide text-white">Agenda JLD Pro</h2>
              <p className="text-[10px] text-blue-200">Sistema Ativo de Agendamento</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9.5px] font-black tracking-wide uppercase shadow-sm">
            Online
          </span>
        </div>

        {/* Public Booking Link */}
        <div className="mt-3 p-2.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/10">
          <div className="text-[10px] font-bold text-blue-200 mb-1 flex items-center justify-between">
            <span>Seu Link Exclusivo de Clientes:</span>
            <span className="text-[9px] text-emerald-300 font-bold">HTTPS SSL</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white truncate">
              {bookingUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer"
            >
              {copied ? <Check size={11} className="text-emerald-300" /> : <Copy size={11} />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowQr(!showQr)}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <QrCode size={13} />
            <span>QR Code Balcão</span>
          </button>

          <a
            href="https://wa.me/5551996837623"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
          >
            <MessageCircle size={13} />
            <span>Suporte VIP</span>
          </a>
        </div>
      </div>

      {/* QR Code Card Popup if opened */}
      {showQr && (
        <div
          className={`mt-3 p-4 rounded-2xl border text-center animate-fadeIn ${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black">QR Code para o seu Balcão</span>
            <button
              onClick={() => setShowQr(false)}
              className="text-[10px] text-slate-400 hover:text-slate-200"
            >
              Fechar
            </button>
          </div>
          <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow-inner border flex items-center justify-center mb-2">
            <QrCode size={100} className="text-slate-900" />
          </div>
          <p className="text-[10px] text-slate-400">
            Seus clientes apontam a câmera do celular e agendam em segundos.
          </p>
        </div>
      )}

      {/* Plan & Subscription Details */}
      <div
        className={`mt-3 p-4 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80'
        }`}
      >
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <CreditCard size={13} />
          <span>Faturamento & Plano</span>
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-slate-400">Plano Atual:</span>
            <span className="font-bold text-blue-600 dark:text-cyan-400">Agenda JLD Pro</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-slate-400">Mensalidade:</span>
            <span className="font-black text-slate-800 dark:text-white">R$ 49,90 / mês</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <span className="text-slate-400">Próximo Vencimento:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Em 28 dias</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Status Financeiro:</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Pagamento em Dia
            </span>
          </div>
        </div>
      </div>

      {/* Quick Resources & Help */}
      <div
        className={`mt-3 p-4 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80'
        }`}
      >
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles size={13} />
          <span>Recursos Disponíveis</span>
        </h3>

        <div className="space-y-2">
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between ${
              darkMode ? 'bg-slate-900/50 border-slate-700/60' : 'bg-slate-50 border-slate-200/70'
            }`}
          >
            <div className="flex items-center gap-2">
              <Smartphone size={15} className="text-blue-500" />
              <div>
                <div className="text-[11px] font-bold">Aplicativo PWA Instalável</div>
                <div className="text-[9.5px] text-slate-400">Instale no celular sem App Store</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Ativado</span>
          </div>

          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between ${
              darkMode ? 'bg-slate-900/50 border-slate-700/60' : 'bg-slate-50 border-slate-200/70'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={15} className="text-emerald-500" />
              <div>
                <div className="text-[11px] font-bold">Lembretes WhatsApp</div>
                <div className="text-[9.5px] text-slate-400">Avisos automáticos de horários</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Ativado</span>
          </div>
        </div>
      </div>

      {/* Contact & Support Section */}
      <div className="mt-4 text-center">
        <p className="text-[11px] text-slate-400 mb-2">
          Precisa de ajuda ou deseja solicitar um novo módulo?
        </p>
        <a
          href="https://wa.me/5551996837623?text=Ol%C3%A1%2C%20sou%20cliente%20da%20JLD%20Digital%20e%20gostaria%20de%20suporte."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-md hover:bg-emerald-600 transition-all"
        >
          <MessageCircle size={14} />
          <span>Falar com o Suporte JLD no WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
