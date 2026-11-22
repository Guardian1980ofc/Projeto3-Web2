"use client";
export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><h2 className="text-xl font-bold text-slate-900">Algo não saiu como esperado</h2><p className="mt-2 text-sm text-slate-500">Ocorreu um problema ao abrir esta página. Tente novamente.</p><button className="primary-button mt-6" onClick={() => reset()}>Tentar novamente</button></section></main>;
}
