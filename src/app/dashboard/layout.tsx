import type { ReactNode } from "react";

// Layout aninhado para agrupar as páginas privadas do TaskFlow.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <section className="min-h-screen">{children}</section>;
}
