import React, { useState } from 'react';
import { Check, ArrowRight, MessageCircle, Info, ShieldCheck, Lock, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenType } from '../../types';

interface SolucaoScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddSolicitacao?: (item: { cliente: string; produto: string; valor: string; whatsapp: string; email?: string }) => void;
}

export const SolucaoScreen: React.FC<SolucaoScreenProps> = ({
  onNavigate,
  onAddSolicitacao,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [diaPreferido, setDiaPreferido] = useState('Segunda-feira');
  const [horarioPreferido, setHorarioPreferido] = useState('Manhã 09-12h');
  const [horarioEspecifico, setHorarioEspecifico] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Phone mask
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let masked = raw;
    if (raw.length > 2) {
      masked = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      masked = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    setWhatsapp(masked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    if (onAddSolicitacao) {
      onAddSolicitacao({
        cliente: companyName || 'Empresa Sob Medida',
        produto: 'Solução Sob Medida (PWA)',
        valor: 'Sob Consulta',
        whatsapp: whatsapp,
        email: email,
      });
    }

    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-5 px-4 pt-5 pb-24 animate-fadeIn">
      {/* Header Section */}
      <div className="space-y-2">
        {/* Badge SOB MEDIDA */}
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#15803D] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
          <span>SOB MEDIDA</span>
        </div>

        {/* Title with puzzle emoji */}
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight flex items-center gap-2">
          <span>Solicite sua Solução</span>
          <span className="text-2xl">🧩</span>
        </h1>

        {/* Subtitle */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            Tem um processo manual? Nós transformamos em tecnologia.
          </p>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Solução sob medida, do mapeamento à implantação.
          </p>
        </div>
      </div>

      {/* Main White Card Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-md space-y-4">
        {/* Nome da Empresa */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#0F172A] mb-1">
            NOME DA EMPRESA (COMO APARECER NO APP)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Ex: Clínica Sorriso Perfeito"
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D]"
          />
        </div>

        {/* E-mail (Acesso ao Painel de Controle) */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#0F172A] mb-1">
            E-MAIL (ACESSO AO PAINEL DE CONTROLE)<span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 pointer-events-none">
              <Mail size={14} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              className="w-full h-11 pl-11 pr-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D]"
            />
          </div>
          <p className="text-[9.5px] text-slate-400 mt-1 font-medium">
            Este e-mail será utilizado para você acessar o Painel de Controle.
          </p>
        </div>

        {/* Contato (WhatsApp) with embedded WhatsApp icon */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#0F172A] mb-1">
            Contato (Whatsapp):<span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center text-white pointer-events-none">
              <MessageCircle size={14} fill="white" className="text-[#22C55E]" />
            </div>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full h-11 pl-11 pr-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D]"
            />
          </div>
        </div>

        {/* Descreva brevemente seu problema */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#0F172A] mb-1">
            Descreva brevemente seu problema / processo:<span className="text-red-500">*</span>
          </label>
          <textarea
            required
            maxLength={500}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Tenho uma planilha de controle de clientes..."
            className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-[#0F172A] resize-none focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D]"
          />
          <div className="text-right text-[10px] font-semibold text-slate-400 mt-0.5">
            {description.length}/500
          </div>
        </div>

        {/* Disponibilidade de horário para reunião */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-black text-[#0F172A] leading-tight">
              Disponibilidade de horário para reunião (horário comercial):<span className="text-red-500">*</span>
            </label>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
              Quando podemos te chamar? Segunda a Sexta 09h às 18h
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-extrabold uppercase text-slate-500 mb-1">
                Dia preferido
              </label>
              <select
                value={diaPreferido}
                onChange={(e) => setDiaPreferido(e.target.value)}
                className="w-full h-10 px-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:border-[#15803D]"
              >
                <option value="Segunda-feira">Segunda-feira</option>
                <option value="Terça-feira">Terça-feira</option>
                <option value="Quarta-feira">Quarta-feira</option>
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Sexta-feira">Sexta-feira</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-extrabold uppercase text-slate-500 mb-1">
                Horário preferido
              </label>
              <select
                value={horarioPreferido}
                onChange={(e) => setHorarioPreferido(e.target.value)}
                className="w-full h-10 px-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:border-[#15803D]"
              >
                <option value="Manhã 09-12h">Manhã 09-12h</option>
                <option value="Tarde 13-18h">Tarde 13-18h</option>
                <option value="Qualquer horário">Qualquer horário</option>
              </select>
            </div>
          </div>

          <div>
            <input
              type="text"
              value={horarioEspecifico}
              onChange={(e) => setHorarioEspecifico(e.target.value)}
              placeholder="Melhor horário específico __:__"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
            />
          </div>

          <div className="flex items-start gap-1.5 text-[10px] text-slate-500 pt-1">
            <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
            <span>
              Reuniões de 30 min online, para avaliarmos a sua necessidade e propor solução.
            </span>
          </div>
        </div>

        {/* SLA Blue Box */}
        <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-start gap-2.5 text-xs text-[#1E3A8A] shadow-xs">
          <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Check size={12} strokeWidth={3} />
          </div>
          <div className="font-semibold leading-relaxed">
            Retorno pelo WhatsApp em até 24 horas úteis. <br />
            <span className="font-normal text-slate-600">Análise gratuita, sem compromisso.</span>
          </div>
        </div>

        {/* Big Green Submit Button */}
        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-[#15803D] hover:bg-[#166534] active:scale-[0.99] text-white text-sm font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>ENVIAR SOLICITAÇÃO</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        {/* Privacy Note */}
        <div className="text-center">
          <p className="text-[10px] font-semibold text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Seus dados estão seguros. Não enviamos spam.
          </p>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-inner">
              <Check size={32} strokeWidth={3} />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#0F172A]">Solicitação Enviada!</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Recebemos sua solicitação para a empresa <strong>{companyName || 'Sua Empresa'}</strong>. Entraremos em contato via WhatsApp no número <strong>{whatsapp || '(não informado)'}</strong> em até 24h úteis.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-left space-y-1 text-slate-700">
              <div><strong>E-mail (Acesso):</strong> {email || '(não informado)'}</div>
              <div><strong>Dia preferido:</strong> {diaPreferido}</div>
              <div><strong>Horário:</strong> {horarioPreferido} ({horarioEspecifico || 'Flexível'})</div>
              <div><strong>Análise:</strong> 100% Gratuita e personalizada</div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('admin');
                }}
                className="w-full h-10 rounded-xl bg-[#0F3D9C] text-white text-xs font-bold shadow-md hover:bg-[#0A2E7A] cursor-pointer"
              >
                Ver no Painel Administrativo
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('home');
                }}
                className="w-full h-9 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Voltar à Página Inicial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
