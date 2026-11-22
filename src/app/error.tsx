"use client";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="rounded-3xl bg-white p-8 text-center shadow-sm"><h2 className="text-xl font-bold">Ocorreu um erro inesperado</h2><p className="mt-2 text-sm text-slate-500">Tente carregar a página novamente.</p><button className="primary-button mt-5" onClick={() => reset()}>Recarregar</button></section></main>;
}
