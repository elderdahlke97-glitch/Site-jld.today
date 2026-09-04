import React, { useState } from 'react';
import {
  Check,
  Lock,
  Link as LinkIcon,
  Users,
  Star,
  Calendar,
  Rocket,
  CreditCard,
  ShieldCheck,
  Zap,
  ChevronDown,
  Upload,
  ExternalLink,
  Plus,
  Trash2,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLANS_DATA } from '../../data/mockData';
import { ScreenType, CheckoutFormData } from '../../types';

interface CheckoutScreenProps {
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onAddSolicitacao?: (item: { cliente: string; produto: string; valor: string; whatsapp: string; email?: string; slug: string }) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  selectedPlanId,
  onSelectPlan,
  onNavigate,
  onAddSolicitacao,
}) => {
  const currentPlan = PLANS_DATA.find((p) => p.id === selectedPlanId) || PLANS_DATA[1];

  // Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    planId: currentPlan.id,
    companyName: '',
    email: '',
    whatsapp: '',
    logoUrl: null,
    slug: '',
    professionalsCount: currentPlan.id === 'agenda-base' ? 1 : currentPlan.id === 'agenda-pro' ? 5 : 15,
    professionals: [],
    servicesCount: 0,
    services: [],
    paymentMethod: 'pix',
  });

  // Collapsible toggles
  const [openProfissionais, setOpenProfissionais] = useState(false);
  const [openServicos, setOpenServicos] = useState(false);
  const [newProfName, setNewProfName] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Phone Mask Helper
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let masked = raw;
    if (raw.length > 2) {
      masked = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      masked = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: masked }));
  };

  // Slug cleaner
  const handleSlugChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData((prev) => ({ ...prev, slug: clean }));
  };

  // Sample Logo generator
  const handleSampleLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=60',
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logoUrl: URL.createObjectURL(file) }));
    }
  };

  const handleAddProf = () => {
    if (newProfName.trim()) {
      setFormData((prev) => ({
        ...prev,
        professionals: [...prev.professionals, newProfName.trim()],
      }));
      setNewProfName('');
    }
  };

  const handleRemoveProf = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      professionals: prev.professionals.filter((_, i) => i !== idx),
    }));
  };

  const handleAddService = () => {
    if (newServiceName.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newServiceName.trim()],
      }));
      setNewServiceName('');
    }
  };

  const handleRemoveService = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx),
    }));
  };

  const handleFinalizar = (e: React.FormEvent) => {
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
        cliente: formData.companyName || 'Nova Empresa',
        produto: currentPlan.name,
        valor: currentPlan.setupPrice,
        whatsapp: formData.whatsapp,
        email: formData.email,
        slug: `${formData.slug || 'suaempresa'}.jld.today`,
      });
    }

    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-5 px-4 pt-4 pb-24 animate-fadeIn">
      {/* 4-STEP BREADCRUMB */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[9px] font-black uppercase tracking-wider overflow-x-auto no-scrollbar">
        <span className="text-[#0F3D9C] border-b-2 border-[#0F3D9C] pb-1 shrink-0">
          ESCOLHA DO PLANO
        </span>
        <span className="text-slate-300 px-1">→</span>
        <span className="text-slate-400 shrink-0">DESENVOLVENDO</span>
        <span className="text-slate-300 px-1">→</span>
        <span className="text-slate-400 shrink-0">IMPLANTAÇÃO</span>
        <span className="text-slate-300 px-1">→</span>
        <span className="text-slate-400 shrink-0">AGENDAMENTOS</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-[#0F172A] leading-tight">
          Escolha o plano que combina com o seu negócio.
        </h1>
      </div>

      {/* Plan Selected Pill */}
      <div className="bg-[#F1F5FF] border border-[#BFDBFE] rounded-2xl p-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#0F3D9C] text-white flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            Plano selecionado: <strong className="text-[#0F3D9C] font-black">{currentPlan.name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
          <Lock size={10} className="text-amber-500" />
          <span>travado</span>
        </div>
      </div>

      {/* FORM SECTIONS */}
      <form onSubmit={handleFinalizar} className="space-y-4">
        {/* 01 Dados da empresa */}
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#0F172A] border-b border-slate-100 pb-2">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
              01
            </div>
            <span>Dados da empresa</span>
          </div>

          {/* Nome da Empresa */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-[#64748B] mb-1">
              NOME DA EMPRESA (COMO APARECER NO APP)*
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Ex: Estúdio Beleza & Co"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F3D9C] focus:ring-1 focus:ring-[#0F3D9C]"
            />
          </div>

          {/* E-mail (Acesso ao Painel de Controle) */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-[#64748B] mb-1">
              E-MAIL (ACESSO AO PAINEL DE CONTROLE)*
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
                <Mail size={14} />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu-email@exemplo.com"
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F3D9C] focus:ring-1 focus:ring-[#0F3D9C]"
              />
            </div>
            <p className="text-[9.5px] text-slate-400 mt-1">
              Este e-mail será utilizado para você acessar o Painel de Controle e gerenciar seus agendamentos.
            </p>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-[#64748B] mb-1">
              WHATSAPP *
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F3D9C] focus:ring-1 focus:ring-[#0F3D9C]"
            />
          </div>

          {/* Logo da Empresa */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-extrabold uppercase text-[#64748B]">
                LOGO DA EMPRESA (PARA O SITE) - PLANO PRO E PLUS
              </label>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Este logo aparecerá no site personalizado. Disponível nos planos Pro e Plus. Nos demais, usamos o nome da empresa.
            </p>

            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slate-200 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Upload size={16} />
                  </div>
                )}
                <div>
                  <div className="text-[11px] font-bold text-slate-800">Logo da empresa</div>
                  <div className="text-[9px] text-slate-400">PNG, JPG até 5MB • Fundo transparente</div>
                </div>
              </div>

              <label className="h-8 px-3 rounded-lg bg-[#0F3D9C] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#0A2E7A] transition-colors shrink-0">
                <Upload size={12} />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <button
              type="button"
              onClick={handleSampleLogo}
              className="mt-2 w-full h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
            >
              Selecionar logo de exemplo
            </button>
          </div>
        </div>

        {/* 02 Seu link .jld.today */}
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#0F172A] border-b border-slate-100 pb-2">
            <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
              <LinkIcon size={12} strokeWidth={2.5} />
            </div>
            <span>02 Seu link .jld.today</span>
          </div>

          <div>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-[#0F3D9C] focus-within:ring-1 focus-within:ring-[#0F3D9C]">
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="suaempresa"
                className="flex-1 h-10 px-3 text-xs font-black text-[#0F172A] focus:outline-none"
              />
              <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-2.5 border-l border-slate-200">
                .jld.today
              </span>
              <div className="px-2.5 py-1 text-[10px] font-black text-[#15803D] bg-emerald-50 flex items-center gap-1 border-l border-emerald-200">
                <Check size={11} strokeWidth={3} />
                <span>Disponível</span>
              </div>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>💡 Esse link vai na bio do Instagram, Google e WhatsApp.</span>
              <span className="font-bold text-slate-700">{formData.slug || 'suaempresa'}.jld.today</span>
            </div>

            {/* Dark Navy Preview Box */}
            <div className="mt-2.5 h-10 rounded-xl bg-[#0A1F4A] text-white px-3 flex items-center justify-between text-xs font-bold shadow-inner">
              <span className="text-[#8DB0FF]">Preview:</span>
              <span className="font-mono text-emerald-400 tracking-wide">
                {formData.slug || 'suaempresa'}.jld.today
              </span>
              <ExternalLink size={13} className="text-[#8DB0FF]" />
            </div>
          </div>
        </div>

        {/* 03 Profissionais (Opcional, Collapsible) */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenProfissionais(!openProfissionais)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center">
                <Users size={12} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-black uppercase text-[#0F172A]">03 Profissionais</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">
                Opcional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0F3D9C] text-[10px] font-bold">
                até {formData.professionalsCount} profissionais
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openProfissionais ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {/* Subtext info */}
          <div className="px-4 pb-3 -mt-2 text-[10px] text-slate-500">
            Não é obrigatório preencher agora, você pode configurar depois na implantação
          </div>

          {openProfissionais && (
            <div className="p-4 pt-0 border-t border-slate-100 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProfName}
                  onChange={(e) => setNewProfName(e.target.value)}
                  placeholder="Nome do profissional / Cargo"
                  className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F3D9C]"
                />
                <button
                  type="button"
                  onClick={handleAddProf}
                  className="h-9 px-3 rounded-lg bg-[#0F3D9C] text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={14} /> Adicionar
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.professionals.map((prof, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium"
                  >
                    <span>{prof}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProf(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 04 Serviços (Opcional, Collapsible) */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenServicos(!openServicos)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center">
                <Star size={12} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-black uppercase text-[#0F172A]">04 Serviços</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">
                Opcional
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                {formData.services.length} serviço{formData.services.length !== 1 ? 's' : ''}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${openServicos ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          <div className="px-4 pb-3 -mt-2 text-[10px] text-slate-500">
            Não é obrigatório preencher agora, você pode configurar depois na implantação
          </div>

          {openServicos && (
            <div className="p-4 pt-0 border-t border-slate-100 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Nome do serviço e valor (Ex: Corte R$ 50)"
                  className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F3D9C]"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="h-9 px-3 rounded-lg bg-[#0F3D9C] text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={14} /> Adicionar
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.services.map((svc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium"
                  >
                    <span>{svc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 05 Modo de pagamento */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#0F172A] px-1">
            <div className="w-6 h-6 rounded-full bg-[#0F3D9C] text-white flex items-center justify-center">
              <Calendar size={12} strokeWidth={2.5} />
            </div>
            <span>05 Modo de pagamento</span>
          </div>

          {/* Card Mensalidade (1º MÊS GRÁTIS) */}
          <div className="bg-white rounded-2xl p-4 border border-[#BFDBFE] shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#0F3D9C] tracking-wider">
                  MENSALIDADE
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  Mensalidade começa a valer somente 30 dias após o dia da IMPLANTAÇÃO
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#22C55E] text-white text-[9px] font-black uppercase tracking-wider shrink-0 shadow-xs">
                1º MÊS GRÁTIS
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#0F172A]">{currentPlan.price}</span>
              <span className="text-xs text-slate-500 font-medium">/mês</span>
            </div>

            <div className="mt-2 text-[10px] text-slate-400">
              Plano selecionado: <strong className="text-slate-700">{currentPlan.name}</strong> • Cobrança só após 30 dias da implantação
            </div>
          </div>

          {/* Card IMPLANTAÇÃO (Highlight Golden / Yellow gradient) */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7] border-2 border-[#F59E0B] shadow-md space-y-3.5">
            {/* Header with Rocket */}
            <div className="flex items-start gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Rocket size={20} strokeWidth={2.2} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#D97706] tracking-wider">
                  IMPLANTAÇÃO
                </span>
                <h3 className="text-xs sm:text-sm font-black text-[#92400E] leading-snug">
                  Sem risco e sem surpresas, você só paga depois de ver tudo pronto!
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#78350F] leading-relaxed">
              Você recebe o link do seu aplicativo pronto no dia da implantação e só então realiza o pagamento da implantação.
            </p>

            {/* Main Price */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                {currentPlan.setupPrice}
              </span>
              <span className="text-[11px] font-extrabold text-[#0F3D9C] uppercase">
                • {currentPlan.name}
              </span>
            </div>

            {/* Checklist INCLUSO NA IMPLANTAÇÃO */}
            <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 border border-amber-200 shadow-xs space-y-2.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#92400E]">
                INCLUSO NA IMPLANTAÇÃO:
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {currentPlan.id === 'agenda-base' ? (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Configuração inicial da agenda:</strong>{' '}
                        Estruturamos a agenda de acordo com a rotina e os serviços do seu negócio.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Link Personalizado:</strong>{' '}
                        link personalizado, para compartilhar com seus clientes.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Orientação e treinamento:</strong>{' '}
                        Reunião online para apresentar a solução, esclarecer dúvidas e orientar sobre o uso das principais funcionalidades.
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Configuração inicial da agenda:</strong>{' '}
                        Estruturamos a agenda de acordo com a rotina e os serviços do seu negócio.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Personalização da solução:</strong>{' '}
                        Aplicação de cores, logotipo e link personalizado para fortalecer a identidade da sua marca.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Orientação e treinamento:</strong>{' '}
                        Reunião online para apresentar a solução, esclarecer dúvidas e orientar sobre o uso das principais funcionalidades.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Consultoria operacional:</strong>{' '}
                        Análise do funcionamento do negócio e das redes sociais, com orientações para melhorar a presença digital e a experiência dos clientes.
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Suporte personalizado por 30 dias:</strong>{' '}
                        Acompanhamento próximo durante o primeiro mês para auxiliar na utilização da solução, esclarecer dúvidas e apoiar os ajustes necessários.
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Informative 3-plan comparative badges (read-only) */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {PLANS_DATA.map((p) => {
                const isCurrent = p.id === currentPlan.id;
                return (
                  <div
                    key={p.id}
                    className={`py-1.5 px-1 rounded-lg text-[9.5px] font-bold text-center border select-none ${
                      isCurrent
                        ? 'bg-[#0F3D9C] text-white border-[#0F3D9C] shadow-sm'
                        : 'bg-white/80 text-slate-500 border-amber-200/90'
                    }`}
                  >
                    <div>{p.name.replace('Agenda JLD ', '') || 'JLD'}:</div>
                    <div className="font-extrabold">{p.setupPrice}</div>
                  </div>
                );
              })}
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-[#15803D] bg-[#DCFCE7] py-1.5 px-3 rounded-xl border border-[#BBF7D0]">
              <Check size={14} strokeWidth={3} />
              <span>Sem risco • Pague só após ver pronto</span>
            </div>
          </div>

          {/* Payment Method Selector Box */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <div className="text-xs">
                <span className="font-black text-slate-900">Modo de pagamento:</span>{' '}
                <span className="text-slate-600 font-medium">
                  Pix com 20% desconto ou parcelado no cartão de crédito
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.paymentMethod === 'pix'
                    ? 'border-[#22C55E] bg-emerald-50/50 ring-1 ring-[#22C55E]'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-[11px] font-black text-[#15803D] flex items-center justify-between">
                  <span>PIX (À VISTA)</span>
                  <span className="text-[9px] bg-[#22C55E] text-white px-1.5 py-0.2 rounded font-black">
                    -20% OFF
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                  R$ {(currentPlan.setupPriceNumeric * 0.8).toFixed(2).replace('.', ',')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cartao' })}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-center transition-all cursor-pointer ${
                  formData.paymentMethod === 'cartao'
                    ? 'border-[#0F3D9C] bg-blue-50/50 ring-1 ring-[#0F3D9C]'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-[11px] font-black text-[#0F3D9C]">CARTÃO DE CRÉDITO</div>
              </button>
            </div>
          </div>

          {/* Big Finalizar Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-[#0F3D9C] hover:bg-[#0A2E7A] active:scale-[0.99] text-white text-sm font-black uppercase tracking-wider shadow-lg shadow-blue-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>FINALIZAR</span>
          </button>

          {/* Retorno SLA & Trust Badges */}
          <div className="text-center space-y-3 pt-1">
            <p className="text-xs text-slate-500 font-semibold">Retorno em 24 horas úteis</p>

            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-emerald-600" /> Site seguro
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-blue-600" /> SSL
              </span>
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-amber-500" /> Ativação rápida
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check size={32} strokeWidth={3} />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#0F172A]">Solicitação Enviada!</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Parabéns! Sua solicitação para o plano <strong>{currentPlan.name}</strong> para a empresa <strong>{formData.companyName || 'Sua Empresa'}</strong> foi recebida com sucesso.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-left space-y-1 text-slate-700">
              <div><strong>Link reservado:</strong> {formData.slug || 'suaempresa'}.jld.today</div>
              <div><strong>E-mail (Acesso):</strong> {formData.email || '(não informado)'}</div>
              <div><strong>WhatsApp:</strong> {formData.whatsapp || '(não informado)'}</div>
              <div><strong>Implantação:</strong> {currentPlan.setupPrice} (Pague só após pronto)</div>
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
