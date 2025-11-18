import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ChatPage } from "../features/poupAI/components/ChatPage";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState<"finance" | "poupai">("finance");

  return (
    <div className="flex">
      <Sidebar current={section} onChange={setSection} />

      <main className="ml-20 w-full h-screen overflow-hidden flex flex-col">
        {section === "finance" && (
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        )}

        {section === "poupai" && (
          <div className="w-full h-screen overflow-hidden">
            <ChatPage />
          </div>
        )}
      </main>
    </div>
  );
};
