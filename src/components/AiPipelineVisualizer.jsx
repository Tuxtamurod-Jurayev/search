import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Database, GitMerge, LineChart, ShieldCheck, ListOrdered } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    id: 1,
    title: 'Talabni tushunish (NLP)',
    description: 'Budjet, maqsad, ustuvorliklar ajratilmoqda...',
    icon: Sparkles
  },
  {
    id: 2,
    title: 'Ko‘p manbali qidiruv',
    description: 'Uzum, Asaxiy, Olcha, Texnomart, OLX skan qilinmoqda...',
    icon: Database
  },
  {
    id: 3,
    title: 'Entity Resolution',
    description: 'Bir xil mahsulotlar birlashtirilmoqda, dublikatlar tozalanmoqda...',
    icon: GitMerge
  },
  {
    id: 4,
    title: 'Narxlar tahlili (Median)',
    description: '30 kunlik narx tarixi va bozor mediasi hisoblanmoqda...',
    icon: LineChart
  },
  {
    id: 5,
    title: 'Sotuvchilar shaffofligi',
    description: 'Reyting, kafolat, qaytarish qoidalari tekshirilmoqda...',
    icon: ShieldCheck
  },
  {
    id: 6,
    title: 'AI Reyting & Sabablar',
    description: 'Optimal 3–5 ta variant va "Nega aynan bu?" izohi tuzilmoqda...',
    icon: ListOrdered
  }
];

export function AiPipelineVisualizer({ isSearching, onComplete }) {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (!isSearching) {
      setActiveStep(6);
      return;
    }

    setActiveStep(1);
    const intervals = [
      setTimeout(() => setActiveStep(2), 350),
      setTimeout(() => setActiveStep(3), 700),
      setTimeout(() => setActiveStep(4), 1050),
      setTimeout(() => setActiveStep(5), 1350),
      setTimeout(() => {
        setActiveStep(6);
        if (onComplete) onComplete();
      }, 1650)
    ];

    return () => intervals.forEach(clearTimeout);
  }, [isSearching]);

  if (!isSearching && activeStep === 6) {
    return null; // hide or minimize after finishing to show clean results
  }

  return (
    <div className="pipeline-overlay">
      <div className="pipeline-card">
        <div className="pipeline-header">
          <div className="pipeline-badge">
            <Sparkles size={14} className="sparkle-anim text-cyan" />
            <span>TOPDIM AI Shopping Engine</span>
          </div>
          <h3 className="pipeline-title">Bozor real vaqtda tahlil qilinmoqda</h3>
          <p className="pipeline-desc">
            Internetdagi do‘konlar ma’lumotlari yig‘ilib, mos variantlar saralanmoqda
          </p>
        </div>

        <div className="pipeline-steps-grid">
          {PIPELINE_STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = activeStep > step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div 
                key={step.id} 
                className={`pipeline-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
              >
                <div className="step-icon-wrap">
                  {isDone ? (
                    <CheckCircle2 size={18} className="text-emerald" />
                  ) : isCurrent ? (
                    <Loader2 size={18} className="spin-anim text-cyan" />
                  ) : (
                    <Icon size={18} className="text-muted" />
                  )}
                </div>
                <div className="step-info">
                  <div className="step-name">{step.title}</div>
                  <div className="step-state">{isDone ? 'Bajarildi' : isCurrent ? step.description : 'Kutilmoqda'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
