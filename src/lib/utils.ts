export function getErrorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") return data.error;
  return fallback;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(value));
}
