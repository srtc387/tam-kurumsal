import React from 'react';
import { SupplyRequestItem } from '../types';
import Icon from './Icon';

interface BotStatusPanelProps {
  status: SupplyRequestItem['assistantStatus'];
}

const BotStatusPanel: React.FC<BotStatusPanelProps> = ({ status }) => {
  const steps = [
    {
      id: 'searching',
      name: 'Tedarikçi Aranıyor',
      description: 'Asistan, talebinize en uygun doğrulanmış tedarikçileri tarıyor.',
      icon: 'search',
    },
    {
      id: 'collecting',
      name: 'Teklifler Toplanıyor',
      description: 'Potansiyel tedarikçilerden teklifler alınıyor ve ön elemeye tabi tutuluyor.',
      icon: 'file-stack',
    },
    {
      id: 'analyzing',
      name: 'Teklifler Analiz Ediliyor',
      description: 'Asistan, gelen teklifleri fiyat, kalite ve tedarikçi puanına göre analiz ediyor.',
      icon: 'bot',
    },
    {
      id: 'recommendation_ready',
      name: 'Öneri Hazır',
      description: 'En iyi teklifler seçildi ve onayınıza sunuldu. Aşağıdan inceleyebilirsiniz.',
      icon: 'clipboard-check',
    },
    {
      id: 'complete',
      name: 'İşlem Tamamlandı',
      description: 'Anlaşma sağlandı ve pro-forma faturanız oluşturuldu.',
      icon: 'check-circle',
    },
  ];

  const currentStepIndex = status ? steps.findIndex((step) => step.id === status) : -1;

  return (
    <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3">
        <Icon name="bot" className="h-8 w-8 text-blue-600" />
        <div>
          <h3 className="text-lg font-bold text-slate-800">TAM Asistan Devrede</h3>
          <p className="text-sm text-slate-500">Otomasyon süreci sizin için işliyor.</p>
        </div>
      </div>
      <nav aria-label="Progress" className="mt-6">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pb-10' : ''}`}>
              {stepIdx !== steps.length - 1 ? (
                <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-slate-300" />
              ) : null}
              <div className="group relative flex items-start">
                <span className="flex h-9 items-center">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                      stepIdx <= currentStepIndex ? 'bg-blue-600' : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {stepIdx < currentStepIndex ? (
                      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <Icon
                        name={step.icon}
                        className={`h-5 w-5 ${
                          stepIdx === currentStepIndex ? 'text-white' : 'text-slate-500'
                        }`}
                      />
                    )}
                  </span>
                </span>
                <span className="ml-4 flex min-w-0 flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      stepIdx <= currentStepIndex ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-slate-500">{step.description}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BotStatusPanel;
