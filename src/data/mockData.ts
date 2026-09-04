import { PlanItem, AdminProduct, AdminPlan, AdminSolicitacao, AdminCliente } from '../types';

export const PLANS_DATA: PlanItem[] = [
  {
    id: 'agenda-base',
    name: 'Agenda JLD',
    tagline: 'Para começar',
    price: 'R$ 39,90',
    monthlyPriceNumeric: 39.9,
    setupPrice: 'R$ 300,00',
    setupPriceNumeric: 300,
    features: [
      { text: 'Site online com domínio próprio (suaempresa.jld.today) + hospedagem inclusa', included: true },
      { text: 'Aplicativo instalável em Android e iOS', included: true },
      { text: 'Cadastro automático de clientes', included: true },
      { text: 'Limite de 30 agendamentos online/mês', included: true },
      { text: '1 profissional cadastrado', included: true },
      { text: 'Painel do profissional', included: true },
      { text: 'Gestão de serviços', included: true },
      { text: 'Notificações automáticas sobre agendamentos e cancelamentos', included: true },
      { text: 'Link personalizado para compartilhar com seus clientes', included: true },
      { text: 'Relatórios financeiros', included: false },
      { text: 'Histórico e gestão de clientes', included: true },
      { text: 'Suporte especializado', included: true },
    ],
  },
  {
    id: 'agenda-pro',
    name: 'Agenda JLD Pro',
    tagline: 'Para crescer',
    price: 'R$ 59,90',
    monthlyPriceNumeric: 59.9,
    setupPrice: 'R$ 500,00',
    setupPriceNumeric: 500,
    highlighted: true,
    popularBadge: 'Mais popular',
    features: [
      { text: 'Site online com domínio próprio (suaempresa.jld.today) + hospedagem inclusa', included: true },
      { text: 'Aplicativo instalável em Android e iOS', included: true },
      { text: 'Cadastro automático de clientes', included: true },
      { text: 'Personalizado com a identidade da sua marca', included: true },
      { text: 'Agendamentos online ilimitados', included: true },
      { text: 'Até 5 profissionais cadastrados', included: true },
      { text: 'Painel do profissional', included: true },
      { text: 'Gestão de serviços e profissionais', included: true },
      { text: 'Notificações automáticas sobre agendamentos e cancelamentos', included: true },
      { text: 'Relatórios financeiros', included: true },
      { text: 'Histórico e gestão de clientes', included: true },
      { text: 'Suporte especializado', included: true },
    ],
  },
  {
    id: 'agenda-plus',
    name: 'Agenda JLD Plus',
    tagline: 'Para escalar',
    price: 'R$ 119,90',
    monthlyPriceNumeric: 119.9,
    setupPrice: 'R$ 900,00',
    setupPriceNumeric: 900,
    features: [
      { text: 'Site online com domínio próprio (suaempresa.jld.today) + hospedagem inclusa', included: true },
      { text: 'Aplicativo instalável em Android e iOS', included: true },
      { text: 'Cadastro automático de clientes', included: true },
      { text: 'Personalizado com a identidade da sua marca', included: true },
      { text: 'Agendamentos online ilimitados', included: true },
      { text: 'Até 15 profissionais cadastrados', included: true },
      { text: 'Painel do profissional', included: true },
      { text: 'Gestão de serviços e profissionais', included: true },
      { text: 'Notificações automáticas sobre agendamentos e cancelamentos', included: true },
      { text: 'Relatórios financeiros', included: true },
      { text: 'Histórico e gestão de clientes', included: true },
      { text: 'Suporte especializado', included: true },
    ],
  },
];

export const INITIAL_PRODUCTS: AdminProduct[] = [
  { id: 1, nome: "Agenda JLD (Produto Principal)", preco: "A partir de R$ 39,90", img: null },
  { id: 2, nome: "OS JLD (Vem Aí)", preco: "Em breve", img: null },
  { id: 3, nome: "Solicite sua Solução (Sob Medida)", preco: "Sob consulta", img: null },
];

export const INITIAL_PLANS: AdminPlan[] = [
  { id: 1, nome: "Agenda JLD Base", valor: "R$ 39,90/mês", parcelas: "Implantação R$ 300", detalhe: "Produto Principal" },
  { id: 2, nome: "Agenda JLD Pro", valor: "R$ 59,90/mês", parcelas: "Implantação R$ 500", detalhe: "Mais vendido" },
  { id: 3, nome: "Agenda JLD Plus", valor: "R$ 119,90/mês", parcelas: "Implantação R$ 900", detalhe: "Completo" },
];

export const INITIAL_SOLICITACOES: AdminSolicitacao[] = [
  { id: 1023, cliente: "Estúdio Beleza & Co", produto: "Agenda JLD Pro", status: "pendente", valor: "R$ 500,00", data: "Hoje às 14:32", whatsapp: "(11) 99999-9999", email: "beleza@exemplo.com", slug: "belezaco.jld.today" },
  { id: 1022, cliente: "Clínica Dental Prime", produto: "Agenda JLD Plus", status: "pago", valor: "R$ 900,00", data: "Ontem às 10:15", whatsapp: "(11) 98888-7777", email: "dental@exemplo.com", slug: "dentalprime.jld.today" },
  { id: 1021, cliente: "Barbearia Vintage", produto: "Agenda JLD Base", status: "analise", valor: "R$ 300,00", data: "17/05/2025", whatsapp: "(21) 97777-6666", email: "vintage@exemplo.com", slug: "barbeariavintage.jld.today" },
  { id: 1020, cliente: "Auto Center Express", produto: "Solução Sob Medida (OS)", status: "pendente", valor: "Sob Consulta", data: "16/05/2025", whatsapp: "(31) 96666-5555", email: "autocenter@exemplo.com" },
];

export const INITIAL_CLIENTES: AdminCliente[] = [
  { id: 1, nome: "Estúdio Beleza & Co", plano: "Pro", vencimento: "20/05/2025", status: "ativo", investimento: "pendente", valorInvest: "R$ 500,00", pago: "R$ 59,90", whatsapp: "(11) 99999-9999", email: "beleza@exemplo.com" },
  { id: 2, nome: "Clínica Dental Prime", plano: "Plus", vencimento: "15/04/2025", status: "vencido", investimento: "pago", valorInvest: "R$ 900,00", pago: "R$ 119,90", whatsapp: "(11) 98888-7777", email: "dental@exemplo.com" },
  { id: 3, nome: "Barbearia Vintage", plano: "Base", vencimento: "22/05/2025", status: "ativo", investimento: "pendente", valorInvest: "R$ 300,00", pago: "R$ 39,90", whatsapp: "(21) 97777-6666", email: "vintage@exemplo.com" },
  { id: 4, nome: "Studio Pilates Harmonia", plano: "Pro", vencimento: "02/05/2025", status: "ativo", investimento: "pago", valorInvest: "R$ 500,00", pago: "R$ 59,90", whatsapp: "(41) 95555-4444", email: "pilates@exemplo.com" },
];
