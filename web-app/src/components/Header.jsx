import { useState } from 'react'
import { FiBell, FiChevronDown } from 'react-icons/fi'

export default function Header({ title = 'Dashboard' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200">
      {/* Left: Page title */}
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      {/* Right: Search, notifications, profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-56 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <FiBell className="h-5 w-5" />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
              JP
            </span>
            <FiChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <a href="#" role="menuitem" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
              <a href="#" role="menuitem" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
              <div className="my-1 h-px bg-gray-200" />
              <button role="menuitem" className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
