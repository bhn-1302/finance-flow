import type { Message } from "../store/useChatStore";

const KEY = "poupai_chat_v1";

export function saveMessages(messages: Message[]) {
  localStorage.setItem(KEY, JSON.stringify(messages));
}

export function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn("Erro ao carregar mensagens do localStorage");
    return [];
  }
}
