'use client';

import React, { useState } from "react";
import { supabase } from '../../lib/supabaseClient';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Login no Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }
    // Se login OK, verifica se já existe registro na tabela 'cadastro'
    const user = data.user;
    if (user) {
      const { data: cadastro, error: selectError } = await supabase
        .from('cadastro')
        .select('id')
        .eq('id', user.id)
        .single();
      if (!cadastro) {
        // Se não existe, cria o registro
        const { error: insertError } = await supabase.from('cadastro').insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || '',
            phone: user.user_metadata?.phone || '',
            is_paid: false,
            payment_date: null,
          }
        ]);
        if (insertError) {
          setLoading(false);
          setError('Erro ao criar perfil: ' + insertError.message);
          return;
        }
      }
    }
    setLoading(false);
    // Redirecionar ou mostrar sucesso
    window.location.href = "/"; // ajuste para onde quiser redirecionar após login
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
        <p className="text-gray-400 text-sm">
          Enter your credentials to access your account
        </p>
      </div>
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            placeholder="Enter your email"
            required
          />
        </div>
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-white">
            Remember me
          </label>
        </div>
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Login'}
        </button>
      </form>
      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <p className="text-white text-sm">
          Not a member?{" "}
          <a href="/cadastro" className="text-gray-300 hover:text-white underline transition-colors duration-200">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 