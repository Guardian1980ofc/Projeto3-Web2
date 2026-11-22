import type { Metadata } from "next";
import { Dashboard } from "@/components/tasks/dashboard";
export const metadata: Metadata = { title: "Minhas tarefas | TaskFlow" };
export default function DashboardPage() { return <Dashboard/>; }
