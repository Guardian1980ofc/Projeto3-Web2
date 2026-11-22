"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { CheckCircle2, Circle, ClipboardList, Plus, Search, LogOut, ListTodo, Sparkles } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskItem } from "@/components/tasks/task-item";
import { useTaskUI } from "@/store/task-ui";
import type { Task } from "@/types/task";

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks", { cache: "no-store" });
  if (!response.ok) throw new Error(response.status === 401 ? "Sua sessão expirou. Entre novamente." : "Não foi possível carregar suas tarefas.");
  return response.json();
}

export function Dashboard() {
  const { data: session } = useSession();
  const { data: tasks = [], isLoading, isError, error, refetch } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const isFormOpen = useTaskUI((s) => s.isFormOpen);
  const editingTaskId = useTaskUI((s) => s.editingTaskId);
  const filter = useTaskUI((s) => s.filter);
  const search = useTaskUI((s) => s.search);
  const setFilter = useTaskUI((s) => s.setFilter);
  const setSearch = useTaskUI((s) => s.setSearch);
  const openCreate = useTaskUI((s) => s.openCreate);
  const editingTask = tasks.find((task) => task._id === editingTaskId);
  const completed = tasks.filter((task) => task.status === "done").length;
  const pending = tasks.length - completed;
  const visibleTasks = useMemo(() => tasks.filter((task) => (filter === "all" || task.status === filter) && `${task.title} ${task.description ?? ""}`.toLowerCase().includes(search.toLowerCase())), [tasks, filter, search]);
  const firstName = session?.user?.name?.split(" ")[0] ?? "pessoa";

  return <div className="dashboard-shell">
    <aside className="sidebar"><Brand/><div className="mt-12"><p className="sidebar-label">MENU</p><div className="sidebar-link sidebar-link-active"><ListTodo size={18}/>Minhas tarefas</div></div><div className="mt-auto rounded-2xl bg-indigo-50 p-4"><div className="mb-2 flex items-center gap-2 text-indigo-700"><Sparkles size={16}/><span className="text-xs font-bold">DICA DO DIA</span></div><p className="text-xs leading-5 text-slate-600">Uma tarefa de cada vez. O importante é continuar avançando.</p></div><button className="sidebar-logout" onClick={() => signOut({ callbackUrl: "/login" })}><LogOut size={17}/>Sair da conta</button></aside>
    <main className="dashboard-main"><header className="dashboard-header"><div><p className="text-sm text-slate-500">Seu espaço de produtividade</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Olá, {firstName} <span aria-hidden="true">✦</span></h1></div><button className="primary-button" onClick={openCreate}><Plus size={18}/>Nova tarefa</button></header>
      <section className="welcome-banner"><div className="relative z-10 max-w-xl"><p className="text-sm font-medium text-indigo-100">UM PASSO DE CADA VEZ</p><h2 className="mt-2 text-2xl font-bold text-white">Vamos fazer o dia valer a pena?</h2><p className="mt-2 text-sm leading-6 text-indigo-100/85">Organize suas prioridades e acompanhe tudo o que você já conquistou.</p></div><div className="banner-decoration" aria-hidden="true"><ClipboardList size={94}/></div></section>
      <section className="stats-grid"><div className="stat-card"><span className="stat-icon bg-indigo-50 text-indigo-600"><ClipboardList size={20}/></span><p className="stat-label">Total de tarefas</p><p className="stat-number">{tasks.length}</p></div><div className="stat-card"><span className="stat-icon bg-amber-50 text-amber-600"><Circle size={20}/></span><p className="stat-label">Pendentes</p><p className="stat-number">{pending}</p></div><div className="stat-card"><span className="stat-icon bg-emerald-50 text-emerald-600"><CheckCircle2 size={20}/></span><p className="stat-label">Concluídas</p><p className="stat-number">{completed}</p></div></section>
      <section className="task-section"><div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-lg font-bold text-slate-900">Suas tarefas</h2><p className="mt-1 text-sm text-slate-500">Tudo o que você precisa acompanhar.</p></div><label className="search-box"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar tarefa..." aria-label="Buscar tarefa"/></label></div>
        <div className="mb-4 flex flex-wrap gap-2">{([ ["all", "Todas"], ["pending", "Pendentes"], ["done", "Concluídas"] ] as const).map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={`filter-chip ${filter === value ? "filter-chip-active" : ""}`}>{label}{value === "all" ? ` (${tasks.length})` : value === "pending" ? ` (${pending})` : ` (${completed})`}</button>)}</div>
        {isLoading ? <div className="space-y-3">{[1,2,3].map((n) => <div key={n} className="skeleton h-20 rounded-2xl"/>)}</div> : isError ? <div className="empty-state"><p className="font-semibold text-slate-800">Não conseguimos carregar suas tarefas.</p><p className="mt-1 text-sm text-slate-500">{error.message}</p><button className="secondary-button mt-4" onClick={() => refetch()}>Tentar novamente</button></div> : visibleTasks.length ? <div className="divide-y divide-slate-100">{visibleTasks.map((task) => <TaskItem key={task._id} task={task}/>)}</div> : <div className="empty-state"><span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><ClipboardList size={23}/></span><p className="font-semibold text-slate-800">{search ? "Nenhuma tarefa encontrada" : filter === "done" ? "Ainda não há tarefas concluídas" : filter === "pending" ? "Tudo em dia por aqui!" : "Sua lista começa aqui"}</p><p className="mt-1 text-sm text-slate-500">{search ? "Tente buscar por outro termo." : "Adicione uma tarefa para começar a organizar seu dia."}</p>{filter === "all" && !search && <button className="primary-button mt-4" onClick={openCreate}><Plus size={17}/>Criar primeira tarefa</button>}</div>}
      </section><footer className="py-8 text-center text-xs text-slate-400">TaskFlow · Feito para deixar sua rotina mais leve</footer>
    </main>
    {isFormOpen && <TaskForm task={editingTask}/>}
  </div>;
}
