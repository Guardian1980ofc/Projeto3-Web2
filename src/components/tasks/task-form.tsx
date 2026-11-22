"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, LoaderCircle } from "lucide-react";
import { useTaskUI } from "@/store/task-ui";
import type { Task } from "@/types/task";
import { getErrorMessage } from "@/lib/utils";

export function TaskForm({ task }: { task?: Task }) {
  const closeForm = useTaskUI((s) => s.closeForm);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [error, setError] = useState("");
  useEffect(() => { setTitle(task?.title ?? ""); setDescription(task?.description ?? ""); }, [task]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(task ? `/api/tasks/${task._id}` : "/api/tasks", {
        method: task ? "PUT" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task ? { title, description, status: task.status } : { title, description }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(getErrorMessage(data, "Não foi possível salvar a tarefa."));
      return data;
    },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ["tasks"] }); closeForm(); },
    onError: (err) => setError(err instanceof Error ? err.message : "Erro ao salvar tarefa."),
  });

  function submit(event: FormEvent) { event.preventDefault(); setError(""); mutation.mutate(); }

  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeForm(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="task-form-title" className="modal-card">
      <div className="mb-6 flex items-start justify-between"><div><p className="eyebrow">SUA ORGANIZAÇÃO</p><h2 id="task-form-title" className="mt-2 text-xl font-bold text-slate-900">{task ? "Editar tarefa" : "Nova tarefa"}</h2></div><button onClick={closeForm} className="icon-button" aria-label="Fechar"><X size={19}/></button></div>
      <form onSubmit={submit} className="space-y-5"><label className="field-label">Título<input autoFocus className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Estudar para a avaliação" required maxLength={100}/></label><label className="field-label">Descrição <span className="font-normal text-slate-400">(opcional)</span><textarea className="field-input min-h-28 resize-y" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Adicione alguns detalhes..." maxLength={500}/></label>{error && <p role="alert" className="text-sm text-rose-600">{error}</p>}<div className="flex justify-end gap-3"><button type="button" className="secondary-button" onClick={closeForm}>Cancelar</button><button className="primary-button" disabled={mutation.isPending}>{mutation.isPending && <LoaderCircle size={17} className="animate-spin"/>}{task ? "Salvar alterações" : "Criar tarefa"}</button></div></form>
    </section>
  </div>;
}
