import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useFinanceStore } from "../store/useFinanceStore";
import { motion } from "framer-motion";

export const TransactionChart = () => {
  const transactions = useFinanceStore((s) => s.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [
    { name: "Entrada", value: income },
    { name: "Saída", value: expense },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl p-4 mx-4 mt-4"
    >
      <h2 className="text-lg font-semibold mb-3 cursor-default text-[#4c1d95]">
        Entradas vs Saídas
      </h2>

      <div className="w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Gradientes Roxo e Vermelho Premium */}
            <defs>
              {/* Entrada Roxo Nubank */}
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6d28d9" stopOpacity={1} />
              </linearGradient>

              {/* Saída Vermelho Premium */}
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b21a8", fontSize: 14 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                background: "white",
                padding: "8px 12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))
              }
            />

            {/* Barra com cantos arredondados */}
            <Bar
              dataKey="value"
              radius={[12, 12, 12, 12]}
              animationDuration={700}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.name === "Entrada"
                      ? "url(#incomeGradient)"
                      : "url(#expenseGradient)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
