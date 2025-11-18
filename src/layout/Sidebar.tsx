import {Home, Brain } from "lucide-react";

type SectionType = "finance" | "poupai";

interface SidebarProps {
    current: SectionType;
    onChange: (value: SectionType) => void;
}

export const Sidebar = ({current, onChange} : SidebarProps) => {
    return (
        <div className="fixed left-0 top-0 h-full w-20 bg-black/90 text-white flex flex-col items-center py-6 gap-6">
            <button onClick={() => onChange("finance")} className={`p-3 rounded-xl transition cursor-pointer ${current === "finance" ? "bg-white/20" : "bg-white-5"}`}>
                <Home size={28} />
            </button>

            <button onClick={() => onChange("poupai")} className={`p-3 rounded-xl transition cursor-pointer ${current === "poupai" ? "bg-white/20" : "bg-white-5"}`}>
                <Brain scale={28} />
            </button>
        </div>
    )
}