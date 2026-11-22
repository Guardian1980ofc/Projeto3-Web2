"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { getErrorMessage } from "@/lib/utils";

type Mode = "login" | "register";

export function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        const response = await fetch("/api/register", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(getErrorMessage(data, "Não foi possível criar sua conta."));
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) throw new Error("E-mail ou senha inválidos. Confira seus dados e tente novamente.");
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="mb-12"><Brand /></div>
        <div className="mb-8">
          <p className="eyebrow">ORGANIZE SEU DIA</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{isRegister ? "Crie sua conta" : "Que bom ter você de volta"}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{isRegister ? "Comece a organizar suas tarefas em um só lugar." : "Entre para continuar de onde você parou."}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && <label className="field-label">Nome completo<input className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" autoComplete="name" required /></label>}
          <label className="field-label">E-mail<input className="field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" autoComplete="email" required /></label>
          <label className="field-label">Senha<input className="field-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo de 6 caracteres" autoComplete={isRegister ? "new-password" : "current-password"} minLength={6} required /></label>
          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          <button className="primary-button w-full" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : <>{isRegister ? "Criar minha conta" : "Entrar"}<ArrowRight size={18} /></>}</button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">{isRegister ? "Já tem uma conta? " : "Ainda não tem uma conta? "}<Link className="font-semibold text-indigo-600 hover:text-indigo-700" href={isRegister ? "/login" : "/register"}>{isRegister ? "Fazer login" : "Criar conta"}</Link></p>
      </section>
      <aside className="auth-aside"><div className="max-w-md"><div className="mb-8 inline-flex rounded-2xl border border-white/15 bg-white/10 p-4 text-indigo-100"><span className="text-3xl">✦</span></div><p className="text-sm font-semibold uppercase tracking-[.22em] text-indigo-200">Menos correria. Mais clareza.</p><h2 className="mt-4 text-4xl font-bold leading-tight text-white">Suas ideias merecem sair do papel.</h2><p className="mt-5 text-base leading-7 text-indigo-100/80">Planeje suas tarefas, acompanhe seu progresso e tenha mais tranquilidade para fazer acontecer.</p></div><span className="mt-20 text-xs text-indigo-200/70">TASKFLOW · ORGANIZAÇÃO SIMPLES</span></aside>
    </main>
  );
}
