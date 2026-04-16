import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { ClientsPage } from './pages/clients/ClientsPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { ProjectDetailPage } from './pages/projects/ProjectDetailPage';
import { SitesPage } from './pages/sites/SitesPage';
import { SiteDetailPage } from './pages/sites/SiteDetailPage';
import { MobileAppsPage } from './pages/mobile-apps/MobileAppsPage';
import { ApisPage } from './pages/apis/ApisPage';
import { ApiDetailPage } from './pages/apis/ApiDetailPage';
import { UsersPage } from './pages/users/UsersPage';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          element={
            <AuthGuard>
              <AppLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="sites" element={<SitesPage />} />
          <Route path="sites/:id" element={<SiteDetailPage />} />
          <Route path="mobile-apps" element={<MobileAppsPage />} />
          <Route path="apis" element={<ApisPage />} />
          <Route path="apis/:id" element={<ApiDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
