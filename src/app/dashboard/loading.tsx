export default function DashboardLoading() {
  return <main className="min-h-screen bg-slate-50 p-6 md:p-10"><div className="mx-auto max-w-5xl"><div className="skeleton mb-8 h-12 w-56 rounded-xl"/><div className="skeleton mb-8 h-44 rounded-3xl"/><div className="grid gap-4 md:grid-cols-3">{[1,2,3].map((n) => <div key={n} className="skeleton h-28 rounded-2xl"/>)}</div><div className="skeleton mt-8 h-80 rounded-3xl"/></div></main>;
}
