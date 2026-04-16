import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Users', to: '/users' },
  { label: 'Clients', to: '/clients' },
  { label: 'Projects', to: '/projects' },
  { label: 'Sites', to: '/sites' },
  { label: 'Mobile Apps', to: '/mobile-apps' },
  { label: 'APIs', to: '/apis' },
];

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Topbar (mobile) */}
        <header className="navbar bg-base-100 border-b border-base-300 lg:hidden">
          <label htmlFor="sidebar-drawer" className="btn btn-ghost drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <span className="font-semibold text-lg ml-2">CMS</span>
        </header>

        <main className="flex-1 p-4 bg-base-200">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <aside className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <div className="w-64 min-h-full bg-base-100 border-r border-base-300 flex flex-col">
          <div className="p-4 border-b border-base-300">
            <span className="font-bold text-xl">CMS</span>
          </div>

          <nav className="flex-1 p-2">
            <ul className="menu menu-md gap-0.5">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      isActive ? 'active' : ''
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-base-300">
            <p className="text-xs text-base-content/60 truncate mb-2">{user?.email}</p>
            <button className="btn btn-sm btn-outline w-full" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
