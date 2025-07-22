import React from "react";

const plans = [
  {
    name: "Plano Parasita",
    price: "R$19,90",
    period: "/mês",
    description: "Use com cautela. Abuse com inteligência.",
    button: "Acessar a mente",
    features: [
      "Estratégias exclusivas de marketing blackhat ",
      "Geração de funis e copys",
      "Linguagem agressiva, sem censura e sem piedade",
      "Sem limite de mensagens",
    ],
    highlight: true,
    buttonStyle: "border border-neutral-700 bg-gradient-to-r from-black-400 to-blue-600 text-white hover:from-neutral-900 hover:to-black-300",
  }
];

const PricingSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-900 to-black py-20 flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full px-4 justify-center">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative flex-1 rounded-xl p-8 bg-black/60 backdrop-blur-md border border-neutral-700 shadow-xl flex flex-col items-center transition-all duration-300 ${
              plan.highlight
                ? "scale-105 border border-neutral-150 bg-gradient-to-b from-neutral-900/80 to-black/80 z-10"
                : ""
            }`}
            style={{ minWidth: 380, maxWidth: 470 }}
          >
            {/* Title */}
            <h3 className="text-white text-2xl font-semibold mb-2">{plan.name}</h3>
            {/* Price */}
            <div className="flex items-end mb-2">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-neutral-400 ml-1 mb-1">{plan.period}</span>
            </div>
            {/* Description */}
            <p className="text-neutral-300 text-base mb-6 text-center min-h-[48px]">{plan.description}</p>
            {/* Button */}
            <button
              className={`w-full py-3 rounded-xl font-medium text-base mb-8 transition easy-in-out duration-200 ${plan.buttonStyle}`}
            >
              {plan.button}
            </button>
            {/* Divider */}
            <div className="w-full flex items-center gap-2 mb-4">
              <span className="flex-1 h-px bg-neutral-700" />
              <span className="text-neutral-400 text-xs tracking-widest">FEATURES</span>
              <span className="flex-1 h-px bg-neutral-700" />
            </div>
            {/* Features */}
            <ul className="w-full flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-neutral-200 text-base">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-400"><circle cx="10" cy="10" r="10" fill="#222"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection; 