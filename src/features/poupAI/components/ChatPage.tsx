import { useEffect, useRef, useState } from "react";
import { useChatStore, type Message } from "../store/useChatStore";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { saveMessages, loadMessages } from "../lib/storage";
import { v4 as uuidv4 } from "uuid";
import TypingIndicator from "./TypingIndicator";
import { geminiModel } from "../../../lib/gemini";
import { systemPrompt } from "../../../lib/systemPrompt";
import { useFinanceStore } from "../../../store/useFinanceStore";

export const ChatPage = () => {
  const { messages, addMessage } = useChatStore();
  const endRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const transactions = useFinanceStore((s) => s.transactions);

  // carregar mensagens do localStorage
  useEffect(() => {
    const loaded = loadMessages();
    if (loaded.length) loaded.forEach((m) => addMessage(m));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // salvar mensagens no localStorage
  useEffect(() => {
    saveMessages(messages);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: uuidv4(),
      author: "user",
      text,
      ts: Date.now(),
    };
    addMessage(userMsg);

    setIsTyping(true);

    try {
      const prompt = `
${systemPrompt}

Transações do usuário (JSON):
${JSON.stringify(transactions, null, 2)}

Pergunta do usuário:
"${text}"
`;

      const result = await geminiModel.generateContent(prompt);

      const replyText =
        result?.response?.text() ||
        "Não consegui gerar uma resposta, tente novamente.";

      addMessage({
        id: uuidv4(),
        author: "bot",
        text: replyText,
        ts: Date.now(),
      });
    } catch (err) {
      console.error("❌ ERRO DO GEMINI:", err);

      addMessage({
        id: uuidv4(),
        author: "bot",
        text: "Desculpe, ocorreu um erro ao acessar a IA. Tente novamente.",
        ts: Date.now(),
      });
    }

    setIsTyping(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 text-slate-900">
      <header className="p-3 bg-indigo-600 text-white shadow">
        <div className="max-w-xl mx-auto items-center gap-3 cursor-default">
          <img
            src="/avatars/bot.png"
            alt="Bot"
            className="w-10 h-10 rounded-full border border-white/30"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-lg">Poup.ai</span>
            <span className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 bg-e rounded-full animate-pulse"></span>
              online
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 bg-slate-50">
        <div className="max-w-xl mx-auto w-full flex flex-col">
          {messages.map((m) => (
            <ChatBubble key={m.id} m={m} />
          ))}

          {isTyping && (
            <div className="flex justify-start mb-3">
              <TypingIndicator />
            </div>
          )}

          <div ref={endRef} />
        </div>
      </main>

      <div className="bg-slate-100">
        <div className="max-w-xl mx-auto">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};
