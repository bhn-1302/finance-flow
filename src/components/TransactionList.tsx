import { useFinanceStore } from "../store/useFinanceStore";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transaction } from "../store/useFinanceStore";
import {
  Utensils,
  ShoppingCart,
  Car,
  Heart,
  Film,
  House,
  Gift,
  Sparkles,
  Receipt,
  Circle,
} from "lucide-react";
import type { JSX } from "react";

export const TransactionList = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const formatMoney = useFinanceStore((s) => s.formatMoney);
  const removeTransaction = useFinanceStore((s) => s.removeTransaction);

  // ---- Formatador de rótulo da data ----
  const formatDateLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    if (isSameDay(date, today)) return "Hoje";
    if (isSameDay(date, yesterday)) return "Ontem";

    return date.toLocaleDateString("pt-BR");
  };

  // ---- Agrupar por dia ----
  const grouped = transactions.reduce<Record<string, Transaction[]>>(
    (acc, t) => {
      const label = formatDateLabel(t.date);
      if (!acc[label]) acc[label] = [];
      acc[label].push(t);
      return acc;
    },
    {}
  );

  // ---- Ordenar grupos ----
  const groupEntries = Object.entries(grouped)
    .map(([label, items]) => {
      const sorted = [...items].sort((a, b) => b.date - a.date);
      const keyDate = sorted[0]?.date ?? 0;
      return { label, items: sorted, keyDate };
    })
    .sort((a, b) => b.keyDate - a.keyDate);

  if (transactions.length === 0)
    return (
      <p className="text-center text-gray-400 mt-8 cursor-default">
        Nenhuma transação adicionada ainda.
      </p>
    );

  const categoryIcons: Record<string, JSX.Element> = {
    Alimentação: <Utensils size={20} className="text-purple-500" />,
    Mercado: <ShoppingCart size={20} className="text-purple-500" />,
    Transporte: <Car size={20} className="text-purple-500" />,
    Saúde: <Heart size={20} className="text-purple-500" />,
    Lazer: <Film size={20} className="text-purple-500" />,
    Casa: <House size={20} className="text-purple-500" />,
    Assinaturas: <Receipt size={20} className="text-purple-500" />,
    Presentes: <Gift size={20} className="text-purple-500" />,
    Beleza: <Sparkles size={20} className="text-purple-500" />,

    // fallback para categorias desconhecidas
    Outros: <Circle size={20} className="text-purple-500" />,
  };

  return (
    <div className="px-4 mt-4 pb-20 flex flex-col gap-6 bg-linear-to-b from-purple-700 to-purple-900 min-h-screen">
      <AnimatePresence>
        {groupEntries.map(({ label, items }) => (
          <motion.div
            key={label}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Título do grupo */}
            <p className="text-sm text-gray-900 font-medium mb-1">{label}</p>

            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {items.map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        {categoryIcons[t.category] ?? (
                          <Circle size={20} className="text-purple-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.category}</p>
                      </div>
                    </div>

                    <p
                      className={`font-semibold ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatMoney(t.amount)}
                    </p>

                    <button
                      className="ml-2 text-gray-400 hover:text-red-500 transition"
                      onClick={() => removeTransaction(t.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
