import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { title, description, status } = await req.json();
    await connectDB();

    // Garante que o usuário só altere a PRÓPRIA tarefa
    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId: (session.user as any).id },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    await connectDB();
    
    // Garante que o usuário só delete a PRÓPRIA tarefa
    const task = await Task.findOneAndDelete({ 
      _id: params.id, 
      userId: (session.user as any).id 
    });

    if (!task) return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });

    return NextResponse.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar tarefa" }, { status: 500 });
  }
}
