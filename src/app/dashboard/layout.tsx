import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}