"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Circle, Pencil, Trash2, LoaderCircle } from "lucide-react";
import { useTaskUI } from "@/store/task-ui";
import { formatDate, getErrorMessage } from "@/lib/utils";
import type { Task } from "@/types/task";

export function TaskItem({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const openEdit = useTaskUI((s) => s.openEdit);
  const mutation = useMutation({
    mutationFn: async ({ method, status }: { method: "PUT" | "DELETE"; status?: "pending" | "done" }) => {
      const response = await fetch(`/api/tasks/${task._id}`, { method, headers: { "Content-Type": "application/json" }, ...(status ? { body: JSON.stringify({ title: task.title, description: task.description, status }) } : {}) });
      const data = method === "DELETE" ? null : await response.json();
      if (!response.ok) throw new Error(getErrorMessage(data, "Não foi possível atualizar a tarefa."));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
  return <article className={`task-row ${task.status === "done" ? "task-done" : ""}`}>
    <button className={`task-check ${task.status === "done" ? "task-check-done" : ""}`} onClick={() => mutation.mutate({ method: "PUT", status: task.status === "done" ? "pending" : "done" })} aria-label={task.status === "done" ? "Reabrir tarefa" : "Concluir tarefa"} disabled={mutation.isPending}>{mutation.isPending ? <LoaderCircle size={17} className="animate-spin"/> : task.status === "done" ? <Check size={17}/> : <Circle size={19}/>}</button>
    <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-slate-800">{task.title}</h3>{task.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{task.description}</p>}<p className="mt-2 text-xs text-slate-400">Criada em {formatDate(task.createdAt)}</p></div>
    <div className="flex items-center gap-1"><button className="icon-button" onClick={() => openEdit(task._id)} aria-label="Editar tarefa"><Pencil size={16}/></button><button className="icon-button hover:!text-rose-600" onClick={() => { if (window.confirm("Deseja realmente excluir esta tarefa?")) mutation.mutate({ method: "DELETE" }); }} aria-label="Excluir tarefa"><Trash2 size={16}/></button></div>
    {mutation.isError && <p className="basis-full text-xs text-rose-600">{mutation.error.message}</p>}
  </article>;
}
