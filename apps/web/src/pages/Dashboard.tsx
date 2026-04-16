import { Link } from 'react-router';

const resources = [
  {
    label: 'Users',
    to: '/users',
    description: 'Manage system users and roles',
  },
  {
    label: 'Clients',
    to: '/clients',
    description: 'Manage clients and their contact details',
  },
  {
    label: 'Projects',
    to: '/projects',
    description: 'View and manage client projects',
  },
  {
    label: 'Sites',
    to: '/sites',
    description: 'Manage websites and their pages',
  },
  {
    label: 'Mobile Apps',
    to: '/mobile-apps',
    description: 'Manage mobile application projects',
  },
  {
    label: 'APIs',
    to: '/apis',
    description: 'Manage API configurations and endpoints',
  },
];

export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {resources.map(({ label, to, description }) => (
          <Link key={to} to={to} className="card bg-base-100 shadow hover:shadow-md transition-shadow">
            <div className="card-body">
              <h2 className="card-title">{label}</h2>
              <p className="text-base-content/70 text-sm">{description}</p>
              <div className="card-actions justify-end mt-2">
                <span className="btn btn-sm btn-primary">View</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
