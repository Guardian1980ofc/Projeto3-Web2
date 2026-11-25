# TaskFlow - Gerenciador de Tarefas

Aplicação fullstack de gerenciamento de tarefas desenvolvida como projeto final da disciplina de Web II.

## 🚀 Tecnologias Utilizadas

- **Next.js 16 (App Router)** - Framework Fullstack
- **TypeScript** - Tipagem estática
- **MongoDB Atlas + Mongoose** - Banco de dados na nuvem
- **NextAuth.js (v5)** - Autenticação com JWT
- **Bcrypt.js** - Criptografia de senhas
- **React Query (TanStack)** - Gerenciamento de estado do servidor e cache
- **Zustand** - Gerenciamento de estado global da UI
- **Tailwind CSS + ShadCN/UI** - Estilização e componentes
- **Vercel** - Deploy e hospedagem

## ✨ Funcionalidades

- ✅ Cadastro de usuário com senha protegida por hash (Bcrypt).
- ✅ Login e logout com NextAuth.js e sessão JWT.
- ✅ Dashboard privado com resumo de tarefas (Total, Pendentes, Concluídas).
- ✅ CRUD completo de tarefas (Criar, Listar, Editar, Concluir/Reabrir e Excluir).
- ✅ Filtros por situação (Todas, Pendentes, Concluídas) e busca por texto.
- ✅ Dados isolados por usuário autenticado (segurança em camadas).
- ✅ Interface responsiva com estados de carregamento (`loading.tsx`) e erro (`error.tsx`).

## 🛠️ Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Guardian1980ofc/Projeto3-Web2.git