"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function HeroSectionOne() {
  const [loading, setLoading] = useState(false);

  const handleAcessarMente = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pagamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.checkoutUrl) {
        // Redirecionar para o checkout do AbacatePay
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Erro ao gerar cobrança');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black pt-32">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 pt-15px">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 py-10 md:py-20 w-full">
        <h1 className="relative z-10 mx-auto max-w-6xl tracking-tighter text-center text-2xl font-light text-white md:text-4xl lg:text-8xl dark:text-white">
          {"Você não precisa estudar, só aplicar o veneno."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-300 dark:text-neutral-400"
        >
          Você não precisa de mais conteúdo, precisa de um plano maldito que venda antes de pensar.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button 
            onClick={handleAcessarMente}
            disabled={loading}
            className="w-60 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-60"
          >
            {loading ? 'Carregando...' : 'Acessar a mente'}
          </button>

        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-900 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('inicio');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    
    // Scroll para a seção correspondente
    switch(link) {
      case 'inicio':
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'pricing':
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'faq':
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-black/70 backdrop-blur-md border border-neutral-800 rounded-2xl mx-auto mt-4 max-w-4xl shadow-lg" style={{left: '50%', transform: 'translateX(-50%)'}}>
      {/* Logo e nome */}
      <div className="flex items-center gap-3">
        <div className="size-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-md">
          {/* Ícone de escudo (SVG) */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#paint0_linear_1_2)"/>
            <path d="M12 6L17 8.5V12.5C17 16 12 18 12 18C12 18 7 16 7 12.5V8.5L12 6Z" fill="white"/>
            <defs>
              <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFA726"/>
                <stop offset="1" stopColor="#FB8C00"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-xl font-semibold text-white">Plankton Wolf</span>
      </div>
      {/* Links centrais */}
      <div className="flex gap-6 items-center">
        <button 
          onClick={() => handleLinkClick('inicio')}
          className={`text-white text-base font-medium transition-all duration-200 ${activeLink === 'inicio' ? 'bg-neutral-800/80 px-6 py-2 rounded-xl shadow-inner border border-neutral-700' : ''}`}
        >
          Início
        </button>
        <button 
          onClick={() => handleLinkClick('pricing')}
          className={`text-white text-base font-medium transition-all duration-200 ${activeLink === 'pricing' ? 'bg-neutral-800/80 px-6 py-2 rounded-xl shadow-inner border border-neutral-700' : ''}`}
        >
          Pricing
        </button>
        <button 
          onClick={() => handleLinkClick('faq')}
          className={`text-white text-base font-medium transition-all duration-200 ${activeLink === 'faq' ? 'bg-neutral-800/80 px-6 py-2 rounded-xl shadow-inner border border-neutral-700' : ''}`}
        >
          FAQ
        </button>
      </div>
      {/* Botão à direita */}
      <div className="flex gap-3">
      <a href="#trial" className="px-6 py-2 rounded-xl bg-gradient-to-r from-white to-gray-300 text-black font-medium border border-gray-200 shadow hover:from-gray-100 hover:to-gray-200 transition">Login</a>
      <a href="/cadastro" className="px-6 py-2 rounded-xl bg-neutral-800/80 text-white font-medium border border-neutral-700 shadow hover:bg-neutral-700 transition">Cadastrar</a>

      </div>
           
      
    </nav>
  );
}; 