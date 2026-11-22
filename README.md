# TaskFlow

Aplicação full stack de gerenciamento de tarefas desenvolvida com Next.js App Router, TypeScript, MongoDB Atlas e NextAuth.js.

## Funcionalidades

- Cadastro de usuário com senha protegida por hash Bcrypt.
- Login e logout com NextAuth.js e sessão JWT.
- Dashboard privado com resumo de tarefas.
- Criar, listar, editar, concluir/reabrir e excluir tarefas.
- Filtros por situação e busca por texto.
- Dados isolados por usuário autenticado.
- Interface responsiva com estados de carregamento, erro e lista vazia.

## Tecnologias

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- MongoDB Atlas e Mongoose
- NextAuth.js (Credentials + JWT)
- TanStack React Query para consultas, mutations e invalidação de cache
- Zustand para estado local da interface (modal, filtro e busca)
- Lucide React para ícones
- Bcryptjs para hash de senhas

## Requisitos

- Node.js 20.9 ou superior
- npm
- Uma instância MongoDB Atlas com usuário, senha e endereço de conexão liberados

## Configuração local

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz, baseado em `.env.example`:

   ```env
   MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster.exemplo.mongodb.net/taskflow?retryWrites=true&w=majority
   NEXTAUTH_SECRET=gere-um-segredo-forte-e-aleatorio
   NEXTAUTH_URL=http://localhost:3000
   ```

   Não compartilhe o `.env.local` e não envie credenciais reais ao GitHub.

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

5. Acesse http://localhost:3000. Crie uma conta e faça login.

## Rotas da aplicação

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Público | Redireciona para login ou dashboard conforme a sessão |
| `/login` | Público | Autenticação |
| `/register` | Público | Cadastro |
| `/dashboard` | Privado | Gerenciamento das tarefas |

## API

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/register` | Cadastra usuário |
| `GET` | `/api/tasks` | Lista tarefas do usuário autenticado |
| `POST` | `/api/tasks` | Cria tarefa |
| `PUT` | `/api/tasks/[id]` | Atualiza tarefa |
| `DELETE` | `/api/tasks/[id]` | Exclui tarefa |

As rotas de tarefas validam a sessão no servidor e filtram os registros pelo identificador do usuário autenticado.

## Organização do frontend

```text
src/
├── app/
│   ├── dashboard/       # Página privada, loading e error
│   ├── login/            # Tela de login
│   ├── register/         # Tela de cadastro
│   ├── api/              # Route Handlers
│   ├── layout.tsx        # Layout raiz e providers
│   └── globals.css       # Estilos globais e responsivos
├── components/
│   ├── auth/             # Formulários de autenticação
│   ├── tasks/            # Dashboard, formulário e item de tarefa
│   └── ui/               # Componentes visuais compartilhados
├── lib/
│   ├── providers/        # Providers do React Query e NextAuth
│   └── ...               # Autenticação, MongoDB e utilitários
├── store/                # Estado de interface com Zustand
├── types/                # Tipos TypeScript
└── models/               # Modelos Mongoose
```

## Build de produção

```bash
npm run build
npm run start
```

## Deploy na Vercel

1. Envie o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Cadastre as variáveis `MONGODB_URI`, `NEXTAUTH_SECRET` e `NEXTAUTH_URL` nas configurações do projeto.
4. Para produção, configure `NEXTAUTH_URL` com a URL pública do projeto.
5. Faça o deploy e teste cadastro, login, CRUD e logout.

As variáveis devem ser cadastradas no painel da Vercel, nunca commitadas no repositório. A publicação deve ser validada com as credenciais e o cluster reais do grupo.
