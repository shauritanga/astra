import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, FileText, Settings, User, Briefcase, ListChecks, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { apiPost } from '../lib/api'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/quotes', label: 'Quotes', icon: FileText },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/website/services', label: 'Services', icon: Briefcase },
  { to: '/website/jobs', label: 'Jobs', icon: ListChecks },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function ConsoleLayout() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await apiPost('logout.php')
    } finally {
      setUser(null)
      navigate('/login')
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 flex-shrink-0 flex-col bg-navy-950 text-white">
        <div className="px-6 py-6">
          <p className="font-display text-lg font-black uppercase tracking-tight">
            Astra Nova <span className="text-accent-500">Admin</span>
          </p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-accent-500 text-navy-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 px-3 py-4">
          <p className="truncate px-3 text-xs text-slate-400">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
