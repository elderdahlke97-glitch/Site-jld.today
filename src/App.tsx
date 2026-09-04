import { useState, useEffect } from 'react';
import { ScreenType, PlanItem, AdminProduct, AdminPlan, AdminSolicitacao, AdminCliente } from './types';
import { PLANS_DATA, INITIAL_PRODUCTS, INITIAL_PLANS, INITIAL_SOLICITACOES, INITIAL_CLIENTES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { PlansScreen } from './components/screens/PlansScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { SolucaoScreen } from './components/screens/SolucaoScreen';
import { AdminScreen } from './components/screens/AdminScreen';
import { ClientScreen } from './components/screens/ClientScreen';
import { SobreScreen } from './components/screens/SobreScreen';
import { DemoModal } from './components/DemoModal';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('agenda-pro');
  const [demoPlan, setDemoPlan] = useState<PlanItem | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<{ role: 'admin' | 'cliente'; name: string } | null>(null);

  // Shared Admin and Dynamic State
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [plans, setPlans] = useState<AdminPlan[]>(INITIAL_PLANS);
  const [solicitacoes, setSolicitacoes] = useState<AdminSolicitacao[]>(INITIAL_SOLICITACOES);
  const [clientes, setClientes] = useState<AdminCliente[]>(INITIAL_CLIENTES);
  const [whatsappContact, setWhatsappContact] = useState<string>('https://wa.me/5551996837623');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleLoginSuccess = (role: 'admin' | 'cliente', userName: string) => {
    setLoggedUser({ role, name: userName });
    setIsLoginModalOpen(false);
    if (role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('client');
    }
  };

  const handleLogout = () => {
    setLoggedUser(null);
    setCurrentScreen('home');
  };

  // Handler to add new solicitacao from Checkout or Solucao Form
  const handleAddNewSolicitacao = (item: {
    cliente: string;
    produto: string;
    valor: string;
    whatsapp: string;
    email?: string;
    slug?: string;
  }) => {
    const newId = Math.floor(1000 + Math.random() * 9000);
    const newEntry: AdminSolicitacao = {
      id: newId,
      cliente: item.cliente,
      produto: item.produto,
      status: 'pendente',
      valor: item.valor,
      data: 'Agora',
      whatsapp: item.whatsapp,
      email: item.email,
      slug: item.slug,
    };
    setSolicitacoes((prev) => [newEntry, ...prev]);

    // Also add to clientes
    const newCliente: AdminCliente = {
      id: Date.now(),
      nome: item.cliente,
      plano: item.produto.includes('Pro') ? 'Pro' : item.produto.includes('Plus') ? 'Plus' : 'Base',
      vencimento: '30 dias',
      status: 'ativo',
      investimento: 'pendente',
      valorInvest: item.valor,
      pago: 'R$ 0,00',
      whatsapp: item.whatsapp,
      email: item.email,
    };
    setClientes((prev) => [newCliente, ...prev]);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-start transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#EEF2FF] text-[#0F172A]'
      }`}
    >
      {/* Main 390px Mobile Canvas Container */}
      <div
        className={`w-full max-w-[390px] min-h-screen shadow-2xl relative flex flex-col ${
          darkMode
            ? 'bg-slate-900 border-x border-slate-800 shadow-cyan-950/20'
            : 'bg-white border-x border-[#E2E8F0] shadow-[0_10px_40px_rgba(15,61,156,0.08)]'
        }`}
      >
        {/* Public Header (Present on Public Screens) */}
        {currentScreen !== 'admin' && currentScreen !== 'client' && (
          <Header
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setIsLoginModalOpen(false);
              setCurrentScreen(screen);
            }}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onOpenLogin={() => setIsLoginModalOpen((prev) => !prev)}
            isLoggedIn={!!loggedUser}
            whatsappUrl={whatsappContact}
          />
        )}

        {/* Screen Router */}
        <main className="flex-1 w-full overflow-x-hidden relative">
          {currentScreen === 'home' && (
            <HomeScreen onNavigate={setCurrentScreen} darkMode={darkMode} />
          )}

          {currentScreen === 'plans' && (
            <PlansScreen
              onNavigate={setCurrentScreen}
              onSelectPlan={setSelectedPlanId}
              onOpenDemo={(p) => setDemoPlan(p)}
              darkMode={darkMode}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              selectedPlanId={selectedPlanId}
              onSelectPlan={setSelectedPlanId}
              onNavigate={setCurrentScreen}
              onAddSolicitacao={handleAddNewSolicitacao}
            />
          )}

          {currentScreen === 'solucao' && (
            <SolucaoScreen
              onNavigate={setCurrentScreen}
              onAddSolicitacao={handleAddNewSolicitacao}
            />
          )}

          {currentScreen === 'sobre' && (
            <SobreScreen
              onNavigate={setCurrentScreen}
              darkMode={darkMode}
              whatsappUrl={whatsappContact}
            />
          )}

          {currentScreen === 'client' && (
            <ClientScreen
              clientName={loggedUser?.name || 'Barbearia Silva'}
              onNavigate={setCurrentScreen}
              onLogout={handleLogout}
              darkMode={darkMode}
            />
          )}

          {currentScreen === 'admin' && (
            <AdminScreen
              onNavigate={setCurrentScreen}
              products={products}
              setProducts={setProducts}
              plans={plans}
              setPlans={setPlans}
              solicitacoes={solicitacoes}
              setSolicitacoes={setSolicitacoes}
              clientes={clientes}
              setClientes={setClientes}
              whatsappContact={whatsappContact}
              setWhatsappContact={setWhatsappContact}
            />
          )}

          {/* Unified Admin & Client Login Modal - Overlays Homepage content without covering Header or Footer */}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            darkMode={darkMode}
          />
        </main>

        {/* Public Bottom Navigation */}
        {currentScreen !== 'admin' && currentScreen !== 'client' && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setIsLoginModalOpen(false);
              setCurrentScreen(screen);
            }}
            darkMode={darkMode}
          />
        )}
      </div>

      {/* Interactive Booking Demo Modal */}
      <DemoModal
        plan={demoPlan}
        onClose={() => setDemoPlan(null)}
        onStartPlan={(planId) => {
          setSelectedPlanId(planId);
          setCurrentScreen('checkout');
        }}
      />
    </div>
  );
}
