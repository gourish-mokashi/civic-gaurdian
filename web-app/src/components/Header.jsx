import { useState } from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { signOut } from '../lib/auth-client';

export default function Header({ title = 'Dashboard' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between px-4 bg-white border-b border-gray-200 h-14">
      {/* Left: Page title */}
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      {/* Right: Search, notifications, profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-56 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md h-9 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-700 rounded-full">
              <img src={logo} alt="logo" />
            </span>
            <FiChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg w-44"
            >
              <button
                role="menuitem"
                className="block w-full px-3 py-2 text-sm text-left text-red-600 cursor-pointer hover:bg-red-50"
                onClick={async () => {
                  await signOut();
                  window.location.href = '/signin';
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
