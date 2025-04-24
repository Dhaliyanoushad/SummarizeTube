import Sidebar from "@/components/SideBar";
import { SidebarActionProvider } from "../../../context/SidebarActionContext";
import Navbar from "@/components/Navbar";

// src/app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarActionProvider>
      <Navbar />
      <main className="min-h-screen bg-[#D4C9BE] pt-16 flex">
        <Sidebar />
        {children}
      </main>
    </SidebarActionProvider>
  );
}
