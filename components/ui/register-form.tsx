'use client';

import React, { useState, useEffect } from "react";
import { supabase } from '../../lib/supabaseClient';
import { useSearchParams } from 'next/navigation';

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFromPayment, setIsFromPayment] = useState(false);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar se veio do pagamento
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      setIsFromPayment(true);
      setSuccess('Pagamento realizado com sucesso! Agora complete seu cadastro para acessar a mente.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // Cadastro no Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone }
      }
    });
    
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // Se veio do pagamento, marcar como pagante
    if (isFromPayment && data.user) {
      const { error: insertError } = await supabase.from('cadastro').insert([
        {
          id: data.user.id,
          email,
          name,
          phone,
          is_paid: true, // Marcar como pagante
          payment_date: new Date().toISOString(),
        }
      ]);
      
      if (insertError) {
        console.error('Erro ao criar perfil pagante:', insertError);
        // Não falhar o cadastro se der erro no perfil
      }
    }

    setLoading(false);
    if (isFromPayment) {
      setSuccess('Cadastro realizado com sucesso! Você já tem acesso à mente. Faça login para começar.');
    } else {
      setSuccess('Cadastro realizado! Verifique seu e-mail para confirmar a conta e depois faça login.');
    }
    setName(""); setPhone(""); setEmail(""); setPassword("");
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isFromPayment ? 'Complete seu Cadastro' : 'Cadastro'}
        </h1>
        <p className="text-gray-400 text-sm">
          {isFromPayment 
            ? 'Preencha seus dados para acessar a mente'
            : 'Preencha os dados para criar sua conta'
          }
        </p>
      </div>
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-400 text-center">{success}</div>}
      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Digite seu nome"
            required
          />
        </div>
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Digite seu telefone"
            required
          />
        </div>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Digite seu email"
            required
          />
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Digite sua senha"
            required
          />
        </div>
        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : (isFromPayment ? 'Completar Cadastro' : 'Cadastrar')}
        </button>
      </form>
      {/* Login Link */}
      <div className="text-center mt-8">
        <p className="text-white text-sm">
          Já tem uma conta?{' '}
          <a href="/login" className="text-gray-300 hover:text-white underline transition-colors duration-200">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 