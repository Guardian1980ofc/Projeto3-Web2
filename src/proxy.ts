import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isApiTasksRoute = req.nextUrl.pathname.startsWith("/api/tasks");

  // Se for rota de API protegida e não estiver logado, retorna 401
  if (isApiTasksRoute && !isLoggedIn) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Se tentar acessar o dashboard sem estar logado, manda pro login
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Se estiver logado e tentar acessar login/register, manda pro dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
