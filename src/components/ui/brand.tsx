import Link from "next/link";
import { CheckCheck } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="TaskFlow início">
      <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><CheckCheck size={21} /></span>
      {!compact && <span className="text-xl font-bold tracking-tight text-slate-900">task<span className="text-indigo-600">flow</span></span>}
    </Link>
  );
}
