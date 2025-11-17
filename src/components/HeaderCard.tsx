import { useFinanceStore } from "../store/useFinanceStore";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "../store/useUIStore";

export const HeaderCard = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const formatMoney = useFinanceStore((s) => s.formatMoney);
  const open = useUIStore((s) => s.openAddModal)

  const balance = transactions.reduce(
    (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <div className="
      bg-linear-to-br from-purple-700 to-purple-900
      text-white p-6 rounded-3xl shadow-lg mx-4 mt-4
    ">
      {/* label */}
      <p className="text-lg opacity-80 tracking-wide cursor-default">
        Saldo atual
      </p>

      {/* valor animado */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={balance}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className={`text-4xl font-semibold mt-1 cursor-default ${
            balance < 0 ? "text-red-300" : "text-white"
          }`}
        >
          {formatMoney(balance)}
        </motion.h2>
      </AnimatePresence>

      {/* botão adicionar */}
      <button
        onClick={open}
        className="
          cursor-pointer
          mt-4 px-4 py-2 rounded-xl bg-white/10
          backdrop-blur-sm border border-white/20
          hover:bg-white/20 transition
        "
      >
        + Adicionar transação
      </button>
    </div>
  );
};
