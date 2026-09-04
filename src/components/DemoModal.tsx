import React, { useState } from 'react';
import { X, Calendar, Clock, User, Check, Sparkles } from 'lucide-react';
import { PlanItem } from '../types';

interface DemoModalProps {
  plan: PlanItem | null;
  onClose: () => void;
  onStartPlan: (planId: string) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ plan, onClose, onStartPlan }) => {
  const [step, setStep] = useState<'service' | 'time' | 'confirmed'>('service');
  const [selectedService, setSelectedService] = useState('Corte Masculino Premium');
  const [selectedProfessional, setSelectedProfessional] = useState('Mariana S.');
  const [selectedTime, setSelectedTime] = useState('14:30');

  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-[350px] w-full overflow-hidden shadow-2xl animate-scaleUp border border-slate-200">
        {/* Modal Top Bar */}
        <div className="bg-[#0A1F4A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-[#8DB0FF]">
                Demonstração Interativa
              </div>
              <div className="text-xs font-bold text-white">suaempresa.jld.today</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Demo Content */}
        <div className="p-4 space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F3D9C] text-[10px] font-extrabold mb-1">
              <Sparkles size={11} /> Visão do seu Cliente Final
            </div>
            <h3 className="text-sm font-black text-slate-900">
              Agendamento Online Simplificado
            </h3>
            <p className="text-[11px] text-slate-500">
              Seu cliente escolhe o serviço e horário em menos de 1 minuto sem precisar baixar nada.
            </p>
          </div>

          {step === 'service' && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-500">
                  1. Escolha o Serviço
                </label>
                <div className="space-y-1.5 mt-1">
                  {[
                    { name: 'Corte Masculino Premium', price: 'R$ 60,00', time: '40 min' },
                    { name: 'Barba Terapia Completa', price: 'R$ 45,00', time: '30 min' },
                    { name: 'Combo Cabelo + Barba', price: 'R$ 95,00', time: '60 min' },
                  ].map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedService(s.name)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        selectedService === s.name
                          ? 'border-[#0F3D9C] bg-blue-50/70 font-bold text-[#0F3D9C]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div>{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{s.time}</div>
                      </div>
                      <div className="font-black">{s.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-500">
                  2. Escolha o Profissional
                </label>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {['Mariana S.', 'Carlos E.'].map((prof) => (
                    <button
                      key={prof}
                      onClick={() => setSelectedProfessional(prof)}
                      className={`p-2 rounded-xl border text-center text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedProfessional === prof
                          ? 'border-[#0F3D9C] bg-blue-50/70 font-bold text-[#0F3D9C]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <User size={13} />
                      <span>{prof}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep('time')}
                className="w-full h-10 rounded-xl bg-[#0F3D9C] text-white text-xs font-bold shadow-sm hover:bg-[#0A2E7A] cursor-pointer"
              >
                Avançar para Horário →
              </button>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <Calendar size={12} /> Data Selecionada
                </label>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 text-center mt-1">
                  Hoje • Quarta-feira, 21 de Maio
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <Clock size={12} /> Horários Disponíveis
                </label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {['09:00', '10:30', '14:00', '14:30', '16:00', '17:30'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedTime === time
                          ? 'bg-[#22C55E] border-[#22C55E] text-white shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setStep('service')}
                  className="w-1/3 h-10 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep('confirmed')}
                  className="flex-1 h-10 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-black cursor-pointer shadow-sm"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center space-y-3 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check size={26} strokeWidth={3} />
              </div>
              <h4 className="text-sm font-black text-slate-900">Agendamento Realizado!</h4>
              <p className="text-xs text-slate-600">
                Seu cliente recebe confirmação instantânea no WhatsApp e você é notificado na hora!
              </p>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-left space-y-1 text-slate-700">
                <div><strong>Serviço:</strong> {selectedService}</div>
                <div><strong>Profissional:</strong> {selectedProfessional}</div>
                <div><strong>Horário:</strong> Hoje às {selectedTime}</div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onStartPlan(plan.id);
                  }}
                  className="w-full h-10 rounded-xl bg-[#0F3D9C] hover:bg-[#0A2E7A] text-white text-xs font-bold cursor-pointer"
                >
                  Quero essa Solução para Minha Empresa
                </button>
                <button
                  onClick={() => setStep('service')}
                  className="text-xs text-slate-500 hover:underline cursor-pointer"
                >
                  Testar novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
