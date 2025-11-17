import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: number;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: string) => void;
  clearAll: () => void;
  formatMoney: (n: number) => string;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],

      //transação com validação
      addTransaction: (t) => {
        if (!t.name.trim()) return;
        if (t.amount <= 0) return;

        const newTransaction: Transaction = {
          id: uuidv4(),
          date: Date.now(),
          ...t,
        };

        set((state) => ({
          //mais nova primeiro!
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      //remove transação
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      //limpar tudo
      clearAll: () => set({ transactions: [] }),

      //formatação da moeda
      formatMoney: (value: number) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value),
    }),
    {
      name: "finance-flow-storage",
    }
  )
);
