import { motion } from "framer-motion";
import { useUIStore } from "../store/useUIStore";
import { useFinanceStore } from "../store/useFinanceStore";
import { useState } from "react";

export const AddTransactionSheet = () => {
  const isOpen = useUIStore((s) => s.addModalOpen);
  const close = useUIStore((s) => s.closeAddModal);

  const addTransaction = useFinanceStore((s) => s.addTransaction);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !amount || Number(amount) <= 0) return;

    addTransaction({
      name,
      amount: Number(amount),
      type,
      category: category || "Geral",
    });

    setName("");
    setAmount("");
    setCategory("");
    setType("income");
    close();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Bottom Sheet */}
      <motion.div
        className="
          fixed bottom-0 left-0 right-0 
          bg-white rounded-t-3xl p-6 
          shadow-xl z-50
        "
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Drag Handle */}
        <div className="mx-auto w-12 h-1.5 bg-gray-300 rounded-full mb-4" />

        <h2 className="text-xl font-semibold mb-4 text-center cursor-default">
          Nova transação
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <input
            className="border p-3 rounded-xl"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 rounded-xl"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Tipo */}
          <div className="flex gap-2">
            <button
              className={`flex-1 p-3 rounded-xl border ${
                type === "income"
                  ? "bg-green-100 border-green-400 text-green-600"
                  : "bg-white"
              }`}
              onClick={() => setType("income")}
            >
              Entrada
            </button>

            <button
              className={`flex-1 p-3 rounded-xl border ${
                type === "expense"
                  ? "bg-red-100 border-red-400 text-red-600"
                  : "bg-white"
              }`}
              onClick={() => setType("expense")}
            >
              Saída
            </button>
          </div>

          <input
            className="border p-3 rounded-xl"
            placeholder="Categoria (opcional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Botão salvar */}
        <button
          onClick={handleSubmit}
          className="
            mt-5 w-full bg-purple-700 
            text-white p-4 rounded-xl 
            font-semibold active:scale-95
          "
        >
          Adicionar
        </button>
      </motion.div>
    </>
  );
};
