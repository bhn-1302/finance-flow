import { useFinanceStore } from "../store/useFinanceStore";
import { motion } from "framer-motion";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export const BalanceCard = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const formatMoney = useFinanceStore((s) => s.formatMoney);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income - expense;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white mx-4 mt-4 p-5 rounded-2xl shadow-xl flex flex-col gap-3 cursor-default"
    >
      <p className="text-gray-500 text-sm font-medium">Saldo disponível</p>

      <p
        className={`text-3xl font-semibold ${
          total >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {formatMoney(total)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <ArrowUpCircle className="text-green-500" size={20} />
          <div className="flex flex-col leading-4">
            <span className="text-xs text-gray-500">Entradas</span>
            <span className="text-sm font-semibold text-green-600">
              {formatMoney(income)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowDownCircle className="text-red-500" size={20} />
          <div className="flex flex-col leading-4">
            <span className="text-xs text-gray-500">Saídas</span>
            <span className="text-sm font-semibold text-red-600">
              {formatMoney(expense)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
