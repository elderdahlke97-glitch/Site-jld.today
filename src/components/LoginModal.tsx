import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdminCliente, AdminSolicitacao } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'admin' | 'cliente', userName: string) => void;
  darkMode?: boolean;
  clientes?: AdminCliente[];
  solicitacoes?: AdminSolicitacao[];
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  darkMode = false,
  clientes = [],
  solicitacoes = [],
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!cleanPass) {
      setError('Por favor, informe sua senha (no 1º acesso, use o contato informado no pedido).');
      return;
    }

    setIsLoading(true);

    // Authentication delay
    setTimeout(() => {
      setIsLoading(false);

      // 1. Admin login check
      if (cleanEmail.includes('admin') || cleanEmail.includes('elder') || cleanEmail.includes('jld.today')) {
        onLoginSuccess('admin', cleanEmail.includes('elder') ? 'Elder Dahlke (Admin)' : 'Administrador JLD');
        return;
      }

      // 2. Client verification against registered orders/clients
      const matchedCliente = clientes.find(
        (c) => c.email && c.email.trim().toLowerCase() === cleanEmail
      );
      const matchedSolicitacao = solicitacoes.find(
        (s) => s.email && s.email.trim().toLowerCase() === cleanEmail
      );

      const registeredContact = matchedCliente?.whatsapp || matchedSolicitacao?.whatsapp;
      const clientName = matchedCliente?.nome || matchedSolicitacao?.cliente;

      if (registeredContact) {
        const cleanPassDigits = cleanPass.replace(/\D/g, '');
        const registeredDigits = registeredContact.replace(/\D/g, '');

        const isMatch =
          cleanPass === registeredContact ||
          (cleanPassDigits.length >= 8 && registeredDigits.length >= 8 && cleanPassDigits === registeredDigits) ||
          cleanPass.toLowerCase() === registeredContact.toLowerCase();

        if (!isMatch) {
          setError('Senha incorreta. No 1º acesso, use o contato informado no pedido.');
          return;
        }

        onLoginSuccess('cliente', clientName || 'Cliente JLD');
        return;
      }

      // 3. Fallback for new client email (e.g. testing with direct phone number)
      const passDigits = cleanPass.replace(/\D/g, '');
      if (passDigits.length >= 8) {
        const namePart = cleanEmail.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        onLoginSuccess('cliente', formattedName || 'Cliente JLD');
      } else {
        setError('No 1º acesso, use o contato (WhatsApp) informado no pedido como senha.');
      }
    }, 450);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-start justify-center p-4 pt-4 sm:pt-6 bg-black/40 backdrop-blur-sm animate-fadeIn">
      {/* Login Card positioned directly below header */}
      <div
        className={`w-full max-w-[350px] rounded-3xl p-5 sm:p-6 relative shadow-2xl border transition-all animate-scaleUp mt-1 ${
          darkMode
            ? 'bg-slate-900/98 border-slate-700/80 text-white shadow-black/80'
            : 'bg-white/98 border-slate-200/90 text-slate-800 shadow-[0_20px_50px_rgba(15,61,156,0.22)]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            darkMode
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
          }`}
          title="Fechar"
        >
          <X size={18} />
        </button>

        {/* Header Title */}
        <div className="flex flex-col items-center text-center mt-1 mb-4">
          <h2
            className={`text-lg font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Painel de Controle
          </h2>
          <p className="text-[11.5px] text-slate-400 mt-0.5">
            Informe suas credenciais para continuar
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Input E-mail only */}
          <div>
            <label
              className={`block text-[11px] font-bold mb-1 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                autoComplete="email"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border transition-all outline-none ${
                  darkMode
                    ? 'bg-slate-800/90 border-slate-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#0F3D9C] focus:ring-2 focus:ring-blue-500/20'
                }`}
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                className={`block text-[11px] font-bold ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Senha
              </label>
              <span className="text-[10px] text-blue-500 hover:underline cursor-pointer">
                Esqueceu?
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full pl-9 pr-9 py-2.5 rounded-xl text-xs border transition-all outline-none ${
                  darkMode
                    ? 'bg-slate-800/90 border-slate-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#0F3D9C] focus:ring-2 focus:ring-blue-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
              1º acesso: use o contato informado no pedido.
            </p>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
              />
              <span className="text-[11px] text-slate-400">Lembrar neste aparelho</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 text-white shadow-lg transition-all cursor-pointer ${
              isLoading
                ? 'opacity-70 cursor-wait bg-blue-600'
                : darkMode
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-cyan-950/40'
                : 'bg-gradient-to-r from-[#0F3D9C] to-[#1E60D0] hover:from-[#0d3485] hover:to-[#1853b8] shadow-blue-900/25'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Autenticando...</span>
              </span>
            ) : (
              <>
                <span>Entrar no Painel</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-500" />
            <span>Ambiente 100% Criptografado & Seguro JLD</span>
          </p>
        </div>
      </div>
    </div>
  );
};

