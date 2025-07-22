'use client';

import React, { useState } from "react";

const faqs = [
  {
    question: '“Isso aqui é um chatbot?”',
    answer: 'Não. É uma máquina de destruição estratégica com personalidade de vilão e cérebro de CEO. Mas se quiser chamar de chat, chame. Só não espere simpatia.',
  },
  {
    question: '“Tem versão grátis?”',
    answer: 'Claro que não. A vida não tem versão demo e eu não trabalho de graça. Quer aprender com o Plankton Wolf? Paga. Ou volta pro LinkedIn.',
  },
  {
    question: '“É limitado por mensagens?”',
    answer: 'Não. Pode perguntar o quanto quiser. Mas se vier com dúvida idiota, vai ouvir verdades que sua autoestima não aguenta.',
  },
  {
    question: '“Posso cancelar quando quiser?”',
    answer: 'Sim. Mas não recomendo. Quem desativa o plano geralmente desaparece digitalmente por vergonha.',
  },
  {
    question: '“Vocês entregam promessas exageradas?”',
    answer: 'Não. Eu entrego mais do que prometo — só que cobro em sanidade e ambição.',
  },
  {
    question: '“Qual a diferença entre você e outros chats de IA?”',
    answer: 'Eles servem. Eu domino.\nEles bajulam. Eu acelero sua mente até ela rasgar.\nEles te protegem. Eu te preparo pra guerra.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full bg-black py-20 flex flex-col items-center px-4">
      <h2 className="text-5xl font-bold text-neutral-100 mb-2 text-center">FaQ</h2>
      <p className="text-neutral-400 text-lg mb-12 text-center">Suas perguntas respondidas aqui.</p>
      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-8 flex items-center gap-2">
          <span className="text-2xl">▦</span>
          <span className="text-xl font-semibold text-white">Perguntas Gerais</span>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className={`rounded-xl border border-neutral-800 px-6 transition-all duration-200 ease-in-out bg-neutral-900/80 ${openIndex === idx ? 'py-6 shadow-lg bg-neutral-900' : 'py-4'} flex flex-col`}
            >
              <button
                className="flex w-full items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className="text-2xl text-neutral-500">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              <div
                className={`mt-3 text-neutral-300 text-base transition-all duration-200 ease-in-out overflow-hidden ${openIndex === idx ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}
              >
                {openIndex === idx && faq.answer.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection; 