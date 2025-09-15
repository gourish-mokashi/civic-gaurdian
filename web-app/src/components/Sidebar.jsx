import { NavLink } from 'react-router-dom'
import { FiHome, FiAlertTriangle, FiBell, FiBarChart2 } from 'react-icons/fi'

const navItems = [
  { label: 'Dashboard', to: '/', icon: <FiHome className="w-5 h-5" aria-hidden="true" /> },
  { label: 'Issue Management', to: '/issues', icon: <FiAlertTriangle className="w-5 h-5" aria-hidden="true" /> },
  { label: 'Predictive Alerts', to: '/alerts', icon: <FiBell className="w-5 h-5" aria-hidden="true" /> },
  { label: 'Analytics', to: '/analytics', icon: <FiBarChart2 className="w-5 h-5" aria-hidden="true" /> },
]

export default function Sidebar() {
  const baseLink =
    'flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors'

  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-blue-600 hover:text-white'}`

  return (
    <div className="flex flex-col h-full text-white bg-blue-500">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/20">
        <div className="flex items-center justify-center w-8 h-8 text-xs font-medium bg-blue-600 rounded">
          {/* Logo placeholder */}
          JP
        </div>
        <span className="text-lg font-semibold tracking-tight">Johar Prahari</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto" aria-label="Main">
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
