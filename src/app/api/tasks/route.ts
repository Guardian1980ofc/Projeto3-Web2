import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await connectDB();
    const tasks = await Task.find({ userId: (session.user as any).id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { title, description } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 });
    }

    await connectDB();
    const newTask = await Task.create({
      title,
      description,
      userId: (session.user as any).id,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 });
  }
}