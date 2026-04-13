import AdminProviders from '@/components/admin/AdminProviders'
import AdminGuard from '@/components/admin/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminGuard>
        <div className="flex min-h-screen bg-obsidian-950">
          <AdminSidebar />
          {/* pt-14 offsets the fixed mobile top bar; lg resets it */}
          <main className="flex-1 overflow-auto pt-14 lg:pt-0">
            <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
              {children}
            </div>
          </main>
        </div>
      </AdminGuard>
    </AdminProviders>
  )
}
