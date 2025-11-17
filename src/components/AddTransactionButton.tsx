import { Plus } from "lucide-react";
import { useUIStore } from "../store/useUIStore";
import {motion} from "framer-motion";

export const AddTransactionButton = () => {
    const open = useUIStore((s) => s.openAddModal)

    return (
        <motion.button whileTap={{scale: 0.9}} className="fixed bottom-6 right-6 bg-purple-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-95 cursor-pointer" onClick={open}>
            <Plus size={28} />
        </motion.button>
    )
}