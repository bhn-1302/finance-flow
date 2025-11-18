import { type Message, useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  m: Message;
}

export const ChatBubble = ({ m }: ChatBubbleProps) => {
  const isUser = m.author === "user";
  const removeMessage = useChatStore((s) => s.removeMessage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 mb-3 ${
        isUser ? "justify-end flex-row-reverse" : "justify-start"
      }`}
    >
      <img
        src={isUser ? "/avatars/user.png" : "/avatars/bot.png"}
        alt={isUser ? "Você" : "Bot"}
        className="w-8 h-8 rounded-full shadow-sm"
      />
      <div
        className={`max-w-[75%]
  px-4 py-2 
  rounded-2xl 
  text-sm md:text-base 
  shadow-sm 
  cursor-default
  break-all
  overflow-hidden
  relative
        ${
          isUser
            ? "bg-emerald-500 text-white rounded-br-none"
            : "bg-white text-slate-900 rounded-bl-none border border-slate-200"
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{m.text}</div>
        <div className="text-[10px] opacity-60 mt-1 text-right">
          {new Date(m.ts).toLocaleTimeString()}
        </div>

        {/* Botão de apagar visível ao passar o mouse */}
        <button
          onClick={() => removeMessage(m.id)}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 opacity-0 group-hover:opacity-100 transition cursor-pointer"
          title="Apagar"
        >
          <X size={12} />
        </button>
      </div>
    </motion.div>
  );
};
