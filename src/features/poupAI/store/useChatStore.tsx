import { create } from 'zustand'

export type Message = {
  id: string
  author: 'user' | 'bot'
  text: string
  ts: number
}

type ChatState = {
  messages: Message[]
  addMessage: (m: Message) => void
  removeMessage: (id: string) => void
  reset: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  removeMessage: (id) =>
    set((s) => ({ messages: s.messages.filter((msg) => msg.id !== id) })),
  reset: () => set({ messages: [] }),
}))
