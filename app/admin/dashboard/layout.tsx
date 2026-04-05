import { LogoIcon } from '@/components/Logo'
import { SidebarNav } from '@/components/admin/SidebarNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 gap-2">
          <LogoIcon size={22} />
          <span className="font-bold text-gray-900">Lacet Admin</span>
        </div>
        <SidebarNav />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8">
          <h1 className="text-sm text-gray-400 font-medium">lacet.app / admin</h1>
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
