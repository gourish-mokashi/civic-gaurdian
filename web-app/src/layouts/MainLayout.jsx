import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom'

export default function MainLayout({ children }) {
  const { pathname } = useLocation()
  const title = (() => {
    if (pathname === '/' || pathname === '') return 'Dashboard'
    if (pathname.startsWith('/issues')) return 'Issue Management'
    if (pathname.startsWith('/alerts')) return 'Predictive Alerts'
    if (pathname.startsWith('/analytics')) return 'Analytics'
    // Fallback: convert path segment to Title Case
    const seg = pathname.split('/').filter(Boolean)[0] || 'Dashboard'
    return seg
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
  })()

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white fixed inset-y-0 left-0">
        <Sidebar />
      </aside>

      {/* Main content wrapper with left padding to account for fixed sidebar */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <Header title={title} />
        </header>

        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
