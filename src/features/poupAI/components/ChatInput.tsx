import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Trash2 } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
};

export const ChatInput = ({ onSend }: Props) => {
  const [text, setText] = useState("");
  const reset = useChatStore((s) => s.reset);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleClear = () => {
    if (confirm("Tem certeza que deseja apagar todas as mensagens?")) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-white border-t border-slate-200 w-full overflow-hidden"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva sua mensagem..."
        className="flex-1 min-w-0 rounded-full px-4 py-2 text-sm md:text-base 
             border border-slate-300 focus:outline-none focus:ring-2 
             focus:ring-emerald-400"
      />
      <button
        type="submit"
        className="bg-emerald-500 text-white px-4 py-2 rounded-full font-medium hover:bg-emerald-600 transition cursor-pointer hover:scale-95"
      >
        Enviar
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
        title="Apagar todas as mensagens"
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
};
