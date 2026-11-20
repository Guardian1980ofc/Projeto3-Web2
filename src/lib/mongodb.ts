import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, defina a variável MONGODB_URI no arquivo .env.local"
  );
}

// Declaração de tipo para o cache global (evita erros de TypeScript)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Usa uma variável global para preservar a conexão entre hot reloads em desenvolvimento
let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Se já existe uma conexão, retorna ela
  if (cached.conn) {
    return cached.conn;
  }

  // Se não existe uma promise de conexão, cria uma
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Aguarda a promise resolver e guarda a conexão
    cached.conn = await cached.promise;
  } catch (e) {
    // Se der erro, limpa a promise para tentar de novo
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
