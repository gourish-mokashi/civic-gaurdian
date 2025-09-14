import { NavLink } from 'react-router-dom'
import { FiHome, FiAlertTriangle, FiBell, FiBarChart2 } from 'react-icons/fi'

const navItems = [
  { label: 'Dashboard', to: '/', icon: <FiHome className="h-5 w-5" aria-hidden="true" /> },
  { label: 'Issue Management', to: '/issues', icon: <FiAlertTriangle className="h-5 w-5" aria-hidden="true" /> },
  { label: 'Predictive Alerts', to: '/alerts', icon: <FiBell className="h-5 w-5" aria-hidden="true" /> },
  { label: 'Analytics', to: '/analytics', icon: <FiBarChart2 className="h-5 w-5" aria-hidden="true" /> },
]

export default function Sidebar() {
  const baseLink =
    'flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors'

  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-blue-600 hover:text-white'}`

  return (
    <div className="h-full flex flex-col bg-blue-500 text-white">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-xs font-medium">
          {/* Logo placeholder */}
          JP
        </div>
        <span className="text-lg font-semibold tracking-tight">Johar Prahari</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1" aria-label="Main">
        {navItems.map(({ label, to, icon }) => (
          <NavLink key={to} to={to} className={linkClass} end>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
