import Sidebar from "@/components/SideBar";
import { SidebarActionProvider } from "../../../context/SidebarActionContext";

// src/app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarActionProvider>
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-black p-0 flex">
        <Sidebar />
        {children}
      </main>
    </SidebarActionProvider>
  );
}
