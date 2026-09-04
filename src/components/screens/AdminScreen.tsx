import React, { useState } from 'react';
import {
  ShieldCheck,
  Settings,
  ClipboardList,
  Users,
  Eye,
  EyeOff,
  ChartColumn,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Tag,
  CalendarDays,
  ChevronDown,
  Info,
  House,
  Upload,
  Plus,
  Save,
  Search,
  MessageCircle,
} from 'lucide-react';
import { JLDLogo } from '../JLDLogo';
import {
  AdminTabType,
  AdminSiteSubTabType,
  AdminProduct,
  AdminPlan,
  AdminSolicitacao,
  AdminCliente,
  ScreenType,
} from '../../types';

interface AdminScreenProps {
  onNavigate: (screen: ScreenType) => void;
  products: AdminProduct[];
  setProducts: React.Dispatch<React.SetStateAction<AdminProduct[]>>;
  plans: AdminPlan[];
  setPlans: React.Dispatch<React.SetStateAction<AdminPlan[]>>;
  solicitacoes: AdminSolicitacao[];
  setSolicitacoes: React.Dispatch<React.SetStateAction<AdminSolicitacao[]>>;
  clientes: AdminCliente[];
  setClientes: React.Dispatch<React.SetStateAction<AdminCliente[]>>;
  whatsappContact?: string;
  setWhatsappContact?: React.Dispatch<React.SetStateAction<string>>;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  onNavigate,
  products,
  setProducts,
  plans,
  setPlans,
  solicitacoes,
  setSolicitacoes,
  clientes,
  setClientes,
  whatsappContact: whatsappContactProp,
  setWhatsappContact: setWhatsappContactProp,
}) => {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<AdminTabType>('dados');
  const [siteSubTab, setSiteSubTab] = useState<AdminSiteSubTabType>('homepage');

  // Security / Admin Access State
  const [adminEmail] = useState('admin@jld.com.br');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Site Settings State (Homepage Contacts & Banners)
  const [internalWhatsappContact, setInternalWhatsappContact] = useState('https://wa.me/5551996837623');
  const whatsappContact = whatsappContactProp ?? internalWhatsappContact;
  const setWhatsappContact = setWhatsappContactProp ?? setInternalWhatsappContact;
  const [instagramContact, setInstagramContact] = useState('https://instagram.com/jldsolutions');
  const [emailContact, setEmailContact] = useState('contato@jld.today');
  const [facebookContact, setFacebookContact] = useState('https://facebook.com/jldsolutions');
  const [bannerHome, setBannerHome] = useState<string | null>(null);
  const [bannerInvest, setBannerInvest] = useState<string | null>(null);

  // Solicitações State
  const [searchSolicitacao, setSearchSolicitacao] = useState('');
  const [selectedSolicitacaoId, setSelectedSolicitacaoId] = useState<number | null>(
    solicitacoes.length > 0 ? solicitacoes[0].id : null
  );

  // Clientes State
  const [filterVencidos, setFilterVencidos] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(
    clientes.length > 0 ? clientes[0].id : null
  );

  // Financial Filter Dropdowns State
  const [filterDropdown, setFilterDropdown] = useState<string | null>(null);
  const [faturamentoFilter, setFaturamentoFilter] = useState('Todos os meses');
  const [vendasFilter, setVendasFilter] = useState('Todos os meses');
  const [ticketFilter, setTicketFilter] = useState('Todos os meses');
  const [anoFilter, setAnoFilter] = useState('Todos os anos');

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
      showToast('Imagem carregada com sucesso!');
    }
  };

  const filteredSolicitacoes = solicitacoes.filter(
    (s) =>
      s.cliente.toLowerCase().includes(searchSolicitacao.toLowerCase()) ||
      s.produto.toLowerCase().includes(searchSolicitacao.toLowerCase()) ||
      String(s.id).includes(searchSolicitacao)
  );

  const selectedSolicitacao = solicitacoes.find((s) => s.id === selectedSolicitacaoId);
  const filteredClientes = filterVencidos ? clientes.filter((c) => c.status === 'vencido') : clientes;
  const selectedCliente = clientes.find((c) => c.id === selectedClienteId);

  return (
    <div className="min-h-screen w-full bg-[#EEF2FF] flex justify-center pb-24 text-slate-800">
      <div className="relative w-full max-w-[390px] bg-white min-h-screen shadow-md overflow-x-hidden flex flex-col">
        {/* 1. Header Fixo */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[72px] bg-white z-[60] border-b border-slate-100 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <JLDLogo size="sm" />
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#0F3D9C] border border-[#BFDBFE] hover:bg-[#DBEAFE] cursor-pointer"
          >
            ← Ir ao Site Público
          </button>
        </div>

        {/* 2. Barra de Navegação por Ícones (4 abas) */}
        <div className="fixed top-[72px] left-1/2 -translate-x-1/2 w-full max-w-[390px] z-[55] bg-[#F1F5FF] border-b border-[#D0DDFB]">
          <div className="grid grid-cols-4 gap-[4px] p-[8px] h-[86px] w-full">
            {/* Aba 1: Dados */}
            <button
              onClick={() => setActiveTab('dados')}
              className={`flex flex-col items-center justify-center rounded-[14px] border-[1.5px] transition-all px-1 py-[6px] gap-[3px] cursor-pointer ${
                activeTab === 'dados'
                  ? 'bg-white border-[#0F3D9C] text-[#0F3D9C] shadow-[0_2px_8px_rgba(15,61,156,0.12)]'
                  : 'bg-transparent border-transparent text-[#64748B] hover:bg-white/60'
              }`}
            >
              <span
                className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${
                  activeTab === 'dados' ? 'bg-[#0F3D9C] text-white' : 'bg-white border border-[#D0DDFB] text-[#0F3D9C]'
                }`}
              >
                <ShieldCheck size={18} strokeWidth={2.2} />
              </span>
              <span className="text-[9px] font-[800] tracking-[-0.02em] leading-none uppercase">
                Dados
              </span>
            </button>

            {/* Aba 2: Site */}
            <button
              onClick={() => setActiveTab('site')}
              className={`flex flex-col items-center justify-center rounded-[14px] border-[1.5px] transition-all px-1 py-[6px] gap-[3px] cursor-pointer ${
                activeTab === 'site'
                  ? 'bg-white border-[#0F3D9C] text-[#0F3D9C] shadow-[0_2px_8px_rgba(15,61,156,0.12)]'
                  : 'bg-transparent border-transparent text-[#64748B] hover:bg-white/60'
              }`}
            >
              <span
                className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${
                  activeTab === 'site' ? 'bg-[#0F3D9C] text-white' : 'bg-white border border-[#D0DDFB] text-[#0F3D9C]'
                }`}
              >
                <Settings size={18} strokeWidth={2.2} />
              </span>
              <span className="text-[9px] font-[800] tracking-[-0.02em] leading-none uppercase">
                Site
              </span>
            </button>

            {/* Aba 3: Solicitações */}
            <button
              onClick={() => setActiveTab('solicitacoes')}
              className={`flex flex-col items-center justify-center rounded-[14px] border-[1.5px] transition-all px-1 py-[6px] gap-[3px] cursor-pointer ${
                activeTab === 'solicitacoes'
                  ? 'bg-white border-[#0F3D9C] text-[#0F3D9C] shadow-[0_2px_8px_rgba(15,61,156,0.12)]'
                  : 'bg-transparent border-transparent text-[#64748B] hover:bg-white/60'
              }`}
            >
              <span
                className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center relative ${
                  activeTab === 'solicitacoes'
                    ? 'bg-[#0F3D9C] text-white'
                    : 'bg-white border border-[#D0DDFB] text-[#0F3D9C]'
                }`}
              >
                <ClipboardList size={18} strokeWidth={2.2} />
                {solicitacoes.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center">
                    {solicitacoes.length}
                  </span>
                )}
              </span>
              <span className="text-[9px] font-[800] tracking-[-0.02em] leading-none uppercase">
                Solicitações
              </span>
            </button>

            {/* Aba 4: Clientes */}
            <button
              onClick={() => setActiveTab('clientes')}
              className={`flex flex-col items-center justify-center rounded-[14px] border-[1.5px] transition-all px-1 py-[6px] gap-[3px] cursor-pointer ${
                activeTab === 'clientes'
                  ? 'bg-white border-[#0F3D9C] text-[#0F3D9C] shadow-[0_2px_8px_rgba(15,61,156,0.12)]'
                  : 'bg-transparent border-transparent text-[#64748B] hover:bg-white/60'
              }`}
            >
              <span
                className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${
                  activeTab === 'clientes'
                    ? 'bg-[#0F3D9C] text-white'
                    : 'bg-white border border-[#D0DDFB] text-[#0F3D9C]'
                }`}
              >
                <Users size={18} strokeWidth={2.2} />
              </span>
              <span className="text-[9px] font-[800] tracking-[-0.02em] leading-none uppercase">
                Clientes
              </span>
            </button>
          </div>

          {/* Sub-Abas quando 'Site' está selecionado */}
          {activeTab === 'site' && (
            <div className="px-[8px] pb-[8px] flex gap-[6px]">
              <button
                onClick={() => setSiteSubTab('homepage')}
                className={`flex-1 h-[30px] rounded-full text-[11px] font-bold flex items-center justify-center gap-[5px] border transition-all cursor-pointer ${
                  siteSubTab === 'homepage'
                    ? 'bg-[#0F3D9C] text-white border-[#0F3D9C]'
                    : 'bg-white text-[#0F3D9C] border-[#D0DDFB]'
                }`}
              >
                <House size={12} />
                <span>Homepage</span>
              </button>
              <button
                onClick={() => setSiteSubTab('agenda')}
                className={`flex-1 h-[30px] rounded-full text-[11px] font-bold flex items-center justify-center gap-[5px] border transition-all cursor-pointer ${
                  siteSubTab === 'agenda'
                    ? 'bg-[#0F3D9C] text-white border-[#0F3D9C]'
                    : 'bg-white text-[#0F3D9C] border-[#D0DDFB]'
                }`}
              >
                <CalendarDays size={12} />
                <span>Agenda JLD</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Barra de Status Fixa */}
        <div
          className="fixed left-1/2 -translate-x-1/2 w-full max-w-[390px] z-[54] bg-[#F0FDF4] border-b border-[#BBF7D0] h-[28px] flex items-center px-[12px] gap-[6px]"
          style={{ top: activeTab === 'site' ? '196px' : '158px' }}
        >
          <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[9px] font-[700] tracking-[0.06em] uppercase text-[#15803D]">
            Painel Mobile 390px tempo real
          </span>
          <span className="ml-auto text-[8px] text-[#15803D]/70 font-medium">
            {activeTab === 'site'
              ? siteSubTab === 'homepage'
                ? 'Homepage ativa'
                : 'Agenda JLD ativa'
              : `Aba ${activeTab} ativa`}
          </span>
        </div>

        {/* Feedback Toast */}
        {feedbackMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[80] bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xl animate-fadeIn">
            {feedbackMessage}
          </div>
        )}

        {/* 4. Conteúdo Principal das Abas */}
        <div
          className="px-[12px] pb-[80px]"
          style={{ marginTop: activeTab === 'site' ? '232px' : '194px' }}
        >
          {/* ================= ABA DADOS ================= */}
          {activeTab === 'dados' && (
            <div className="space-y-[12px] animate-fadeIn">
              {/* Card Acesso Admin */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[14px] shadow-xs">
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#94A3B8] mb-[10px]">
                  Acesso Admin
                </div>

                <div className="space-y-[10px]">
                  <div>
                    <label className="text-[9px] font-bold uppercase text-[#64748B]">Login</label>
                    <div className="mt-[4px] h-[36px] rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] px-[10px] flex items-center text-[12px] font-medium text-[#0F172A]">
                      {adminEmail}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="text-[9px] font-bold uppercase text-[#64748B]">Senha</label>
                      <div className="mt-[4px] h-[36px] rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] px-[10px] flex items-center gap-2">
                        <span className="text-[12px] tracking-[0.2em] font-mono">
                          {showPassword ? 'jld2025!' : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-auto text-[#0F3D9C] p-1 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="ml-[8px] mt-[16px] h-[36px] px-[12px] rounded-[10px] bg-[#0F3D9C] hover:bg-[#0A2E7A] text-white text-[10px] font-bold uppercase transition-colors cursor-pointer"
                    >
                      Trocar
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Resumo Financeiro (Deep Navy Blue Card) */}
              <div className="rounded-[20px] bg-[#0A2458] p-[14px] border border-[#123072] shadow-[0_8px_30px_rgba(10,36,88,0.35)] text-white">
                {/* Header */}
                <div className="flex items-start gap-[10px] mb-[14px]">
                  <div className="w-[32px] h-[32px] rounded-[8px] bg-[#1E4DB7] flex items-center justify-center shrink-0 border border-[#2B5EDB]/30">
                    <ChartColumn size={16} className="text-white" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[800] tracking-[-0.01em] leading-[14px] text-white">
                      RESUMO FINANCEIRO
                    </div>
                    <div className="text-[10px] font-[500] leading-[12px] text-[#93A8D6] mt-[3px]">
                      Visão geral do seu desempenho
                    </div>
                  </div>
                  <div className="w-[20px] h-[20px] rounded-full bg-white/10 flex items-center justify-center">
                    <span className="w-[3px] h-[3px] rounded-full bg-[#22C55E] animate-pulse" />
                  </div>
                </div>

                {/* Grid 2x2 Metric Cards */}
                <div className="grid grid-cols-2 gap-[10px]">
                  {/* Metric 1: Faturamento do Mês */}
                  <div className="rounded-[14px] bg-[#15326E] border border-[#1E4DB7]/40 p-[11px] flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="w-[26px] h-[26px] rounded-full bg-[#1E4DB7] border border-[#2F5FDB]/50 flex items-center justify-center">
                        <DollarSign size={13} className="text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="mt-[10px] text-[8.5px] font-[700] tracking-[0.08em] uppercase leading-none text-[#8AA0CC]">
                      FATURAMENTO DO MÊS
                    </div>
                    <div className="mt-[6px] text-[18px] font-[900] leading-none tracking-[-0.02em] text-white">
                      R$ 9,4 mil
                    </div>
                    <div className="mt-[8px] inline-flex items-center gap-[4px] px-[7px] py-[3px] rounded-full bg-[#065F46] border border-[#10B981]/30 w-fit">
                      <TrendingUp size={10} className="text-[#10B981]" />
                      <span className="text-[8.5px] font-[700] leading-none text-[#6EE7B7]">
                        ↑ 12% vs mês anterior
                      </span>
                    </div>

                    <div className="mt-[10px] relative">
                      <button
                        onClick={() =>
                          setFilterDropdown(filterDropdown === 'fat' ? null : 'fat')
                        }
                        className="w-full h-[28px] rounded-[8px] bg-[#0A1F4A] border border-[#1E3A8A] flex items-center justify-between px-[8px] text-[9.5px] font-[600] text-[#9DB1D9] cursor-pointer"
                      >
                        <span className="flex items-center gap-[5px] truncate">
                          <CalendarDays size={11} className="text-[#5B7DD1]" /> {faturamentoFilter}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-[#5B7DD1] transition-transform ${
                            filterDropdown === 'fat' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {filterDropdown === 'fat' && (
                        <div className="absolute left-0 right-0 top-[32px] z-20 rounded-[8px] bg-[#0F2D6B] border border-[#1E3A8A] overflow-hidden shadow-xl">
                          {['Todos os meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'].map(
                            (m) => (
                              <button
                                key={m}
                                onClick={() => {
                                  setFaturamentoFilter(m);
                                  setFilterDropdown(null);
                                }}
                                className="w-full text-left px-[10px] py-[7px] text-[10px] text-[#C2D0EA] hover:bg-[#1A3A7A] cursor-pointer"
                              >
                                {m}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metric 2: Vendas no Mês */}
                  <div className="rounded-[14px] bg-[#15326E] border border-[#1E4DB7]/40 p-[11px] flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="w-[26px] h-[26px] rounded-full bg-[#1E4DB7] border border-[#2F5FDB]/50 flex items-center justify-center">
                        <ShoppingCart size={13} className="text-white" strokeWidth={2.2} />
                      </div>
                    </div>
                    <div className="mt-[10px] text-[8.5px] font-[700] tracking-[0.08em] uppercase leading-none text-[#8AA0CC]">
                      VENDAS NO MÊS
                    </div>
                    <div className="mt-[6px] text-[18px] font-[900] leading-none tracking-[-0.02em] text-white">
                      23
                    </div>
                    <div className="mt-[8px] inline-flex items-center gap-[4px] px-[7px] py-[3px] rounded-full bg-[#065F46] border border-[#10B981]/30 w-fit">
                      <TrendingUp size={10} className="text-[#10B981]" />
                      <span className="text-[8.5px] font-[700] leading-none text-[#6EE7B7]">
                        ↑ 4 vs mês anterior
                      </span>
                    </div>

                    <div className="mt-[10px] relative">
                      <button
                        onClick={() =>
                          setFilterDropdown(filterDropdown === 'vendas' ? null : 'vendas')
                        }
                        className="w-full h-[28px] rounded-[8px] bg-[#0A1F4A] border border-[#1E3A8A] flex items-center justify-between px-[8px] text-[9.5px] font-[600] text-[#9DB1D9] cursor-pointer"
                      >
                        <span className="flex items-center gap-[5px] truncate">
                          <CalendarDays size={11} className="text-[#5B7DD1]" /> {vendasFilter}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-[#5B7DD1] transition-transform ${
                            filterDropdown === 'vendas' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {filterDropdown === 'vendas' && (
                        <div className="absolute left-0 right-0 top-[32px] z-20 rounded-[8px] bg-[#0F2D6B] border border-[#1E3A8A] overflow-hidden shadow-xl">
                          {['Todos os meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'].map(
                            (m) => (
                              <button
                                key={m}
                                onClick={() => {
                                  setVendasFilter(m);
                                  setFilterDropdown(null);
                                }}
                                className="w-full text-left px-[10px] py-[7px] text-[10px] text-[#C2D0EA] hover:bg-[#1A3A7A] cursor-pointer"
                              >
                                {m}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metric 3: Ticket Médio */}
                  <div className="rounded-[14px] bg-[#15326E] border border-[#1E4DB7]/40 p-[11px] flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="w-[26px] h-[26px] rounded-full bg-[#1E4DB7] border border-[#2F5FDB]/50 flex items-center justify-center">
                        <Tag size={13} className="text-white" strokeWidth={2.2} />
                      </div>
                    </div>
                    <div className="mt-[10px] text-[8.5px] font-[700] tracking-[0.08em] uppercase leading-none text-[#8AA0CC]">
                      TICKET MÉDIO
                    </div>
                    <div className="mt-[6px] text-[18px] font-[900] leading-none tracking-[-0.02em] text-white">
                      R$ 409,57
                    </div>
                    <div className="mt-[8px] inline-flex items-center gap-[4px] px-[7px] py-[3px] rounded-full bg-[#065F46] border border-[#10B981]/30 w-fit">
                      <TrendingUp size={10} className="text-[#10B981]" />
                      <span className="text-[8.5px] font-[700] leading-none text-[#6EE7B7]">
                        ↑ 5,8% por venda
                      </span>
                    </div>

                    <div className="mt-[10px] relative">
                      <button
                        onClick={() =>
                          setFilterDropdown(filterDropdown === 'ticket' ? null : 'ticket')
                        }
                        className="w-full h-[28px] rounded-[8px] bg-[#0A1F4A] border border-[#1E3A8A] flex items-center justify-between px-[8px] text-[9.5px] font-[600] text-[#9DB1D9] cursor-pointer"
                      >
                        <span className="flex items-center gap-[5px] truncate">
                          <CalendarDays size={11} className="text-[#5B7DD1]" /> {ticketFilter}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-[#5B7DD1] transition-transform ${
                            filterDropdown === 'ticket' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {filterDropdown === 'ticket' && (
                        <div className="absolute left-0 right-0 top-[32px] z-20 rounded-[8px] bg-[#0F2D6B] border border-[#1E3A8A] overflow-hidden shadow-xl">
                          {['Todos os meses', 'Janeiro', 'Fevereiro', 'Março'].map((m) => (
                            <button
                              key={m}
                              onClick={() => {
                                setTicketFilter(m);
                                setFilterDropdown(null);
                              }}
                              className="w-full text-left px-[10px] py-[7px] text-[10px] text-[#C2D0EA] hover:bg-[#1A3A7A] cursor-pointer"
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metric 4: Faturamento no Ano */}
                  <div className="rounded-[14px] bg-[#15326E] border border-[#1E4DB7]/40 p-[11px] flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="w-[26px] h-[26px] rounded-full bg-[#1E4DB7] border border-[#2F5FDB]/50 flex items-center justify-center">
                        <CalendarDays size={13} className="text-white" strokeWidth={2.2} />
                      </div>
                    </div>
                    <div className="mt-[10px] text-[8.5px] font-[700] tracking-[0.08em] uppercase leading-none text-[#8AA0CC]">
                      FATURAMENTO NO ANO
                    </div>
                    <div className="mt-[6px] text-[18px] font-[900] leading-none tracking-[-0.02em] text-white">
                      R$ 112 mil
                    </div>
                    <div className="mt-[8px] inline-flex items-center gap-[4px] px-[7px] py-[3px] rounded-full bg-[#0F2D6B] border border-[#1E4DB7]/50 w-fit">
                      <span className="w-[14px] h-[14px] rounded-full bg-[#1E4DB7] flex items-center justify-center">
                        <ChartColumn size={8} className="text-white" />
                      </span>
                      <span className="text-[8.5px] font-[700] leading-none text-[#8DB0FF]">
                        284 vendas
                      </span>
                    </div>

                    <div className="mt-[10px] relative">
                      <button
                        onClick={() =>
                          setFilterDropdown(filterDropdown === 'ano' ? null : 'ano')
                        }
                        className="w-full h-[28px] rounded-[8px] bg-[#0A1F4A] border border-[#1E3A8A] flex items-center justify-between px-[8px] text-[9.5px] font-[600] text-[#9DB1D9] cursor-pointer"
                      >
                        <span className="flex items-center gap-[5px] truncate">
                          <CalendarDays size={11} className="text-[#5B7DD1]" /> {anoFilter}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-[#5B7DD1] transition-transform ${
                            filterDropdown === 'ano' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {filterDropdown === 'ano' && (
                        <div className="absolute left-0 right-0 top-[32px] z-20 rounded-[8px] bg-[#0F2D6B] border border-[#1E3A8A] overflow-hidden shadow-xl">
                          {['Todos os anos', '2025', '2024', '2023'].map((y) => (
                            <button
                              key={y}
                              onClick={() => {
                                setAnoFilter(y);
                                setFilterDropdown(null);
                              }}
                              className="w-full text-left px-[10px] py-[7px] text-[10px] text-[#C2D0EA] hover:bg-[#1A3A7A] cursor-pointer"
                            >
                              {y}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer updated live banner */}
                <div className="mt-[14px] h-[28px] rounded-[10px] bg-[#0A1F4A]/80 border border-[#1E3A8A]/40 flex items-center justify-center gap-[6px]">
                  <Info size={12} className="text-[#6B84B8]" />
                  <span className="text-[9px] font-[500] tracking-[0.02em] text-[#7A94C4]">
                    Dados atualizados em tempo real
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= ABA SITE (HOMEPAGE) ================= */}
          {activeTab === 'site' && siteSubTab === 'homepage' && (
            <div className="space-y-[12px] animate-fadeIn">
              {/* Card Link Contatos */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F172A] mb-[10px]">
                  LINK CONTATOS
                </div>
                <div className="flex flex-col gap-[8px]">
                  <input
                    value={whatsappContact}
                    onChange={(e) => setWhatsappContact(e.target.value)}
                    placeholder="https://wa.me/5551996837623"
                    className="w-full h-[40px] rounded-xl border border-gray-200 bg-white px-[12px] text-[12px] font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F3D9C]"
                  />
                  <input
                    value={instagramContact}
                    onChange={(e) => setInstagramContact(e.target.value)}
                    placeholder="Instagram URL"
                    className="w-full h-[40px] rounded-xl border border-gray-200 bg-white px-[12px] text-[12px] font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F3D9C]"
                  />
                  <input
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    placeholder="Email contato"
                    className="w-full h-[40px] rounded-xl border border-gray-200 bg-white px-[12px] text-[12px] font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F3D9C]"
                  />
                  <input
                    value={facebookContact}
                    onChange={(e) => setFacebookContact(e.target.value)}
                    placeholder="facebook.com/suaempresa"
                    className="w-full h-[40px] rounded-xl border border-gray-200 bg-white px-[12px] text-[12px] font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F3D9C]"
                  />
                </div>
              </div>

              {/* Card Banner Apresentação */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                <div className="flex items-center justify-between mb-[8px]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
                    Banner Apresentação
                  </div>
                  <label className="h-[28px] px-[10px] rounded-full bg-[#F1F5FF] border border-[#D0DDFB] text-[#0F3D9C] text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#DBEAFE]">
                    <Upload size={12} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setBannerHome)}
                    />
                  </label>
                </div>
                <div className="h-[110px] rounded-[12px] bg-[#F8FAFC] border border-dashed border-[#CBD5E1] flex items-center justify-center overflow-hidden">
                  {bannerHome ? (
                    <img src={bannerHome} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#94A3B8]">
                      Nenhum banner personalizado (1200x600)
                    </span>
                  )}
                </div>
              </div>

              {/* Card Produtos */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                <div className="flex items-center justify-between mb-[12px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#0F172A]">
                    PRODUTOS ({products.length})
                  </div>
                  <button
                    onClick={() => {
                      setProducts([
                        ...products,
                        {
                          id: Date.now(),
                          nome: 'Novo Produto JLD',
                          preco: 'R$ 0,00',
                          img: null,
                        },
                      ]);
                      showToast('Novo produto adicionado!');
                    }}
                    className="w-[28px] h-[28px] rounded-full bg-[#0F3D9C] text-white flex items-center justify-center shadow-xs hover:bg-[#0A2E7A] transition-colors cursor-pointer"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-[10px]">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-[#E2E8F0] rounded-xl p-[12px] flex flex-row gap-[10px] items-start shadow-2xs"
                    >
                      {/* Image Upload Label */}
                      <label className="w-[52px] h-[52px] rounded-[10px] bg-[#F9FAFB] border border-dashed border-[#D1D5DB] flex items-center justify-center overflow-hidden cursor-pointer shrink-0 hover:bg-gray-50 transition-colors">
                        {p.img ? (
                          <img
                            src={p.img}
                            className="w-full h-full object-cover"
                            alt={p.nome}
                          />
                        ) : (
                          <Upload size={20} className="text-[#9CA3AF]" strokeWidth={2} />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setProducts(
                                products.map((item) =>
                                  item.id === p.id ? { ...item, img: url } : item
                                )
                              );
                              showToast('Imagem atualizada!');
                            }
                          }}
                        />
                      </label>

                      {/* Fields */}
                      <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                        <input
                          value={p.nome}
                          onChange={(e) =>
                            setProducts(
                              products.map((item) =>
                                item.id === p.id ? { ...item, nome: e.target.value } : item
                              )
                            )
                          }
                          className="w-full h-[32px] rounded-lg border border-[#E2E8F0] bg-white px-[8px] text-[11px] font-bold text-[#0F172A] focus:outline-none focus:border-[#0F3D9C]"
                          placeholder="Nome do produto"
                        />
                        <div className="flex gap-[6px] items-center">
                          <input
                            value={p.preco}
                            onChange={(e) =>
                              setProducts(
                                products.map((item) =>
                                  item.id === p.id ? { ...item, preco: e.target.value } : item
                                )
                              )
                            }
                            className="flex-1 h-[30px] rounded-lg border border-[#E2E8F0] bg-white px-[8px] text-[11px] text-[#334155] focus:outline-none focus:border-[#0F3D9C]"
                            placeholder="Valor / status"
                          />
                          <button
                            onClick={() => showToast(`Produto ${p.nome} salvo!`)}
                            className="h-[30px] px-[12px] rounded-lg bg-[#1E3A8A] hover:bg-[#172E6E] text-white text-[10px] font-bold shrink-0 transition-colors cursor-pointer"
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => showToast('Homepage salva com sucesso!')}
                  className="mt-[14px] w-full h-[40px] rounded-xl bg-[#0F3D9C] hover:bg-[#0A2E7A] text-white text-[11px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Save size={14} />
                  <span>Salvar Homepage</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= ABA SITE (AGENDA JLD) ================= */}
          {activeTab === 'site' && siteSubTab === 'agenda' && (
            <div className="space-y-[12px] animate-fadeIn">
              {/* Card Planos Agenda JLD */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8] mb-[10px]">
                  Planos Agenda JLD ({plans.length}) - Valores Oficiais
                </div>

                <div className="space-y-[10px]">
                  {plans.map((pl) => (
                    <div
                      key={pl.id}
                      className="rounded-[12px] bg-[#F8FAFC] border border-[#F1F5F9] p-[10px]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          value={pl.nome}
                          onChange={(e) =>
                            setPlans(
                              plans.map((item) =>
                                item.id === pl.id ? { ...item, nome: e.target.value } : item
                              )
                            )
                          }
                          className="flex-1 h-[30px] rounded-[8px] border border-[#E2E8F0] px-[8px] text-[11px] font-bold bg-white"
                        />
                        {pl.detalhe && (
                          <span className="text-[8px] font-bold uppercase px-[6px] py-[2px] rounded-full bg-[#DBEAFE] text-[#0F3D9C] shrink-0">
                            {pl.detalhe}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-[6px] mt-[6px]">
                        <input
                          value={pl.valor}
                          onChange={(e) =>
                            setPlans(
                              plans.map((item) =>
                                item.id === pl.id ? { ...item, valor: e.target.value } : item
                              )
                            )
                          }
                          className="h-[28px] rounded-[8px] border border-[#E2E8F0] px-[8px] text-[11px] bg-white font-bold"
                          placeholder="Valor mensal"
                        />
                        <input
                          value={pl.parcelas}
                          onChange={(e) =>
                            setPlans(
                              plans.map((item) =>
                                item.id === pl.id ? { ...item, parcelas: e.target.value } : item
                              )
                            )
                          }
                          className="h-[28px] rounded-[8px] border border-[#E2E8F0] px-[8px] text-[11px] bg-white"
                          placeholder="Implantação"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-[10px] p-[8px] rounded-[10px] bg-[#F1F5FF] border border-[#D0DDFB] text-[9px] text-[#0F3D9C] leading-[13px]">
                  <span className="font-bold">Checkout:</span> Base R$ 39,90 + R$300 implantação • Pro R$ 59,90 + R$500 • Plus R$ 119,90 + R$900
                </div>
              </div>

              {/* Card Banner Investimento */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                <div className="flex items-center justify-between mb-[8px]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
                    Banner Investimento
                  </div>
                  <label className="h-[28px] px-[10px] rounded-full bg-[#F1F5FF] border border-[#D0DDFB] text-[#0F3D9C] text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#DBEAFE]">
                    <Upload size={12} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setBannerInvest)}
                    />
                  </label>
                </div>
                <div className="h-[110px] rounded-[12px] bg-[#F8FAFC] border border-dashed border-[#CBD5E1] flex items-center justify-center overflow-hidden">
                  {bannerInvest ? (
                    <img
                      src={bannerInvest}
                      alt="Banner Investimento"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-[#94A3B8]">
                      Banner investimento (1200x600)
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => showToast('Agenda JLD salva com sucesso!')}
                className="w-full h-[40px] rounded-[12px] bg-[#0F3D9C] hover:bg-[#0A2E7A] text-white text-[11px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Save size={14} />
                <span>Salvar Agenda JLD</span>
              </button>
            </div>
          )}

          {/* ================= ABA SOLICITAÇÕES ================= */}
          {activeTab === 'solicitacoes' && (
            <div className="space-y-[10px] animate-fadeIn">
              {/* Search + Counter */}
              <div className="flex gap-[6px]">
                <div className="flex-1 h-[34px] rounded-[10px] border border-[#E2E8F0] bg-white flex items-center px-[10px] gap-[6px]">
                  <Search size={12} className="text-[#94A3B8]" />
                  <input
                    value={searchSolicitacao}
                    onChange={(e) => setSearchSolicitacao(e.target.value)}
                    placeholder="Buscar pedido ou cliente"
                    className="flex-1 text-[11px] bg-transparent outline-none"
                  />
                </div>
                <div className="h-[34px] px-[10px] rounded-[10px] bg-[#F1F5FF] border border-[#D0DDFB] text-[10px] font-bold text-[#0F3D9C] flex items-center">
                  {filteredSolicitacoes.length} pedidos
                </div>
              </div>

              {/* List of Orders */}
              <div className="space-y-[6px]">
                {filteredSolicitacoes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSolicitacaoId(s.id)}
                    className={`w-full text-left p-[10px] rounded-[12px] border flex items-center justify-between transition-all cursor-pointer ${
                      selectedSolicitacaoId === s.id
                        ? 'bg-[#0F3D9C] text-white border-[#0F3D9C] shadow-sm'
                        : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-[11px] font-bold">
                        #{s.id} • {s.cliente}
                      </div>
                      <div
                        className={`text-[10px] ${
                          selectedSolicitacaoId === s.id ? 'text-white/70' : 'text-[#64748B]'
                        }`}
                      >
                        {s.produto} • {s.data}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] font-black">{s.valor}</div>
                      <div
                        className={`text-[8px] uppercase font-bold px-[6px] py-[2px] rounded-full mt-[2px] inline-block ${
                          s.status === 'pago'
                            ? 'bg-[#22C55E] text-white'
                            : s.status === 'pendente'
                            ? 'bg-[#F59E0B] text-white'
                            : 'bg-[#94A3B8] text-white'
                        }`}
                      >
                        {s.status}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Details Card */}
              {selectedSolicitacao && (
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] mt-[4px] shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8] mb-[8px]">
                    Detalhes Checkout #{selectedSolicitacao.id}
                  </div>

                  <div className="space-y-[8px] text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Cliente</span>
                      <span className="font-bold">{selectedSolicitacao.cliente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Produto</span>
                      <span className="font-bold">{selectedSolicitacao.produto}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Valor</span>
                      <span className="font-bold">{selectedSolicitacao.valor}</span>
                    </div>
                    {selectedSolicitacao.email && (
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">E-mail Painel</span>
                        <span className="font-bold text-slate-700">
                          {selectedSolicitacao.email}
                        </span>
                      </div>
                    )}
                    {selectedSolicitacao.whatsapp && (
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">WhatsApp</span>
                        <span className="font-bold text-emerald-600">
                          {selectedSolicitacao.whatsapp}
                        </span>
                      </div>
                    )}
                    {selectedSolicitacao.slug && (
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Link App</span>
                        <span className="font-bold text-blue-600">
                          {selectedSolicitacao.slug}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Data</span>
                      <span className="font-medium">{selectedSolicitacao.data}</span>
                    </div>
                  </div>

                  <div className="mt-[10px]">
                    <label className="text-[9px] font-bold uppercase text-[#64748B]">
                      Status do Pedido
                    </label>
                    <select
                      value={selectedSolicitacao.status}
                      onChange={(e) => {
                        const newStat = e.target.value as AdminSolicitacao['status'];
                        setSolicitacoes(
                          solicitacoes.map((item) =>
                            item.id === selectedSolicitacao.id
                              ? { ...item, status: newStat }
                              : item
                          )
                        );
                        showToast(`Status alterado para ${newStat}!`);
                      }}
                      className="mt-[4px] w-full h-[36px] rounded-[10px] border border-[#E2E8F0] px-[10px] text-[11px] font-bold bg-[#F8FAFC] focus:outline-none focus:border-[#0F3D9C]"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="analise">Em análise</option>
                      <option value="pago">Pago</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= ABA CLIENTES ================= */}
          {activeTab === 'clientes' && (
            <div className="space-y-[10px] animate-fadeIn">
              {/* Filter + Counter */}
              <div className="flex gap-[6px]">
                <button
                  onClick={() => setFilterVencidos(!filterVencidos)}
                  className={`h-[32px] px-[12px] rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                    filterVencidos
                      ? 'bg-[#EF4444] text-white border-[#EF4444]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0]'
                  }`}
                >
                  {filterVencidos ? 'Mostrando: Vencidos' : 'Filtro: Vencidos'}
                </button>
                <div className="ml-auto h-[32px] px-[10px] rounded-full bg-[#F1F5FF] border border-[#D0DDFB] text-[10px] font-bold text-[#0F3D9C] flex items-center">
                  {clientes.length} clientes
                </div>
              </div>

              {/* Client List */}
              <div className="grid grid-cols-1 gap-[6px]">
                {filteredClientes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClienteId(c.id)}
                    className={`w-full text-left p-[10px] rounded-[12px] border flex items-center gap-[10px] transition-all cursor-pointer ${
                      selectedClienteId === c.id
                        ? 'bg-[#0F3D9C] text-white border-[#0F3D9C] shadow-sm'
                        : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[12px] font-black ${
                        selectedClienteId === c.id
                          ? 'bg-white/20'
                          : c.status === 'vencido'
                          ? 'bg-[#FEE2E2] text-[#DC2626]'
                          : 'bg-[#DBEAFE] text-[#0F3D9C]'
                      }`}
                    >
                      {c.nome[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold leading-none">
                        {c.nome} • {c.plano}
                      </div>
                      <div
                        className={`text-[9px] mt-[3px] ${
                          selectedClienteId === c.id ? 'text-white/70' : 'text-[#64748B]'
                        }`}
                      >
                        Venc: {c.vencimento} • {c.status}
                      </div>
                    </div>
                    <div
                      className={`text-[8px] font-bold uppercase px-[6px] py-[2px] rounded-full ${
                        c.investimento === 'pago'
                          ? 'bg-[#22C55E] text-white'
                          : 'bg-[#F59E0B] text-white'
                      }`}
                    >
                      {c.investimento}
                    </div>
                  </button>
                ))}
              </div>

              {/* Client Details Card */}
              {selectedCliente && (
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-[12px] shadow-xs">
                  <div className="flex items-center justify-between mb-[10px]">
                    <div className="text-[11px] font-black">{selectedCliente.nome}</div>
                    <span
                      className={`text-[8px] font-bold uppercase px-[8px] py-[3px] rounded-full ${
                        selectedCliente.status === 'vencido'
                          ? 'bg-[#FEE2E2] text-[#DC2626]'
                          : 'bg-[#DCFCE7] text-[#15803D]'
                      }`}
                    >
                      {selectedCliente.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-[8px]">
                    <div className="rounded-[10px] bg-[#F8FAFC] border border-[#F1F5F9] p-[8px]">
                      <div className="text-[8px] uppercase font-bold text-[#94A3B8]">
                        Investimento Pendente
                      </div>
                      <div className="text-[13px] font-black mt-[2px] text-[#D97706]">
                        {selectedCliente.valorInvest}
                      </div>
                    </div>
                    <div className="rounded-[10px] bg-[#F8FAFC] border border-[#F1F5F9] p-[8px]">
                      <div className="text-[8px] uppercase font-bold text-[#94A3B8]">Pago</div>
                      <div className="text-[13px] font-black mt-[2px] text-[#15803D]">
                        {selectedCliente.pago}
                      </div>
                    </div>
                  </div>

                  <div className="mt-[10px] space-y-[6px] text-[11px]">
                    {selectedCliente.email && (
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">E-mail Painel</span>
                        <span className="font-bold text-slate-700">{selectedCliente.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Plano</span>
                      <span className="font-bold">{selectedCliente.plano}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Vencimento</span>
                      <span className="font-medium">{selectedCliente.vencimento}</span>
                    </div>
                  </div>

                  <div className="mt-[12px] grid grid-cols-2 gap-[6px]">
                    <a
                      href={`https://wa.me/55${(selectedCliente.whatsapp || '11999999999').replace(
                        /\D/g,
                        ''
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[36px] rounded-[10px] bg-[#22C55E] text-white text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-[#16A34A] cursor-pointer"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <select
                      value={selectedCliente.status}
                      onChange={(e) => {
                        const newSt = e.target.value as AdminCliente['status'];
                        setClientes(
                          clientes.map((item) =>
                            item.id === selectedCliente.id ? { ...item, status: newSt } : item
                          )
                        );
                        showToast(`Status de ${selectedCliente.nome} alterado!`);
                      }}
                      className="h-[36px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold px-[8px] focus:outline-none"
                    >
                      <option value="ativo">Ativo</option>
                      <option value="vencido">Vencido</option>
                      <option value="bloqueado">Bloqueado</option>
                    </select>
                  </div>

                  <div className="mt-[8px] text-[10px] text-[#64748B]">
                    Pagamentos: Pix confirmado em 18/05, cartão em análise
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 5. Rodapé Fixo do Painel */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[52px] bg-white border-t border-[#E2E8F0] z-[60] flex flex-col justify-center">
          <div className="h-[28px] bg-[#0F3D9C] text-white flex items-center justify-center gap-[14px] text-[9.5px] font-bold tracking-[0.12em] uppercase">
            <button
              onClick={() => onNavigate('home')}
              className="hover:underline cursor-pointer"
            >
              Início
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onNavigate('sobre')}
              className="hover:underline cursor-pointer"
            >
              Sobre
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onNavigate('solucao')}
              className="hover:underline cursor-pointer"
            >
              Produtos
            </button>
          </div>
        </div>

        {/* Modal: Trocar Senha */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setIsPasswordModalOpen(false)}
            />
            <div className="relative w-full max-w-[320px] bg-white rounded-[18px] p-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-scaleUp">
              <div className="text-[12px] font-black uppercase tracking-[0.08em] text-[#0F172A] mb-[12px]">
                Trocar Senha
              </div>
              <div className="space-y-[10px]">
                <div>
                  <label className="text-[9px] font-bold uppercase text-[#64748B]">
                    Senha atual
                  </label>
                  <input
                    type="password"
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    className="mt-[4px] w-full h-[36px] rounded-[10px] border border-[#E2E8F0] px-[10px] text-[12px] focus:outline-none focus:border-[#0F3D9C]"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-[#64748B]">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="mt-[4px] w-full h-[36px] rounded-[10px] border border-[#E2E8F0] px-[10px] text-[12px] focus:outline-none focus:border-[#0F3D9C]"
                  />
                </div>
              </div>
              <div className="mt-[14px] grid grid-cols-2 gap-[8px]">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="h-[38px] rounded-[12px] border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setCurrentPasswordInput('');
                    setNewPasswordInput('');
                    showToast('Senha alterada com sucesso!');
                  }}
                  className="h-[38px] rounded-[12px] bg-[#0F3D9C] hover:bg-[#0A2E7A] text-white text-[11px] font-bold cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
