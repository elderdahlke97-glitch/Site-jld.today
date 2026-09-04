export type ScreenType = 'home' | 'plans' | 'checkout' | 'solucao' | 'admin' | 'client' | 'sobre';

export type AdminTabType = 'dados' | 'site' | 'solicitacoes' | 'clientes';
export type AdminSiteSubTabType = 'homepage' | 'agenda';

export interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  monthlyPriceNumeric: number;
  setupPrice: string;
  setupPriceNumeric: number;
  highlighted?: boolean;
  popularBadge?: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

export interface AdminProduct {
  id: number;
  nome: string;
  preco: string;
  img: string | null;
}

export interface AdminPlan {
  id: number;
  nome: string;
  valor: string;
  parcelas: string;
  detalhe?: string;
}

export interface AdminSolicitacao {
  id: number;
  cliente: string;
  produto: string;
  status: 'pago' | 'pendente' | 'analise' | 'cancelado';
  valor: string;
  data: string;
  whatsapp?: string;
  email?: string;
  slug?: string;
}

export interface AdminCliente {
  id: number;
  nome: string;
  plano: string;
  vencimento: string;
  status: 'ativo' | 'vencido' | 'bloqueado';
  investimento: 'pago' | 'pendente';
  valorInvest: string;
  pago: string;
  whatsapp?: string;
  email?: string;
}

export interface CheckoutFormData {
  planId: string;
  companyName: string;
  email: string;
  whatsapp: string;
  logoUrl: string | null;
  slug: string;
  professionalsCount: number;
  professionals: string[];
  servicesCount: number;
  services: string[];
  paymentMethod: 'pix' | 'cartao';
}
