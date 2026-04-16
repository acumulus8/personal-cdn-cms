import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Api, Client, MobileApp, Project, Site } from '../../gql/graphql';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ProjectForm } from './ProjectForm';
import { GET_PROJECT_DETAIL, DELETE_PROJECT } from './projects.gql';
import { GET_CLIENT_BY_ID } from '../clients/clients.gql';

const statusBadge: Record<string, string> = {
  ACTIVE: 'badge-success',
  DRAFT: 'badge-warning',
  INACTIVE: 'badge-neutral',
  ARCHIVED: 'badge-ghost',
};

type ProjectDetail = Project & {
  sites?: Site[];
  mobileApps?: MobileApp[];
  apis?: Api[];
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id!, 10);

  const { data, loading, error } = useQuery<{ project: ProjectDetail }>(GET_PROJECT_DETAIL, {
    variables: { id: projectId },
  });

  const project = data?.project;

  const { data: clientData } = useQuery<{ client: Client }>(GET_CLIENT_BY_ID, {
    variables: { id: project?.clientId },
    skip: !project?.clientId,
  });

  const client = clientData?.client;

  const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT, {
    onCompleted: () => navigate('/projects'),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleDelete() {
    if (project?.id == null) return;
    await deleteProject({ variables: { id: project.id } });
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-8 w-64" />
        <div className="skeleton h-48 w-full" />
        <div className="skeleton h-48 w-full" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error?.message ?? 'Project not found.'}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/projects">Projects</Link></li>
          <li>{project.name}</li>
        </ul>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <span className={`badge ${statusBadge[project.status ?? ''] ?? 'badge-ghost'}`}>
            {project.status}
          </span>
          <span className="badge badge-outline">{project.type?.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn btn-sm btn-outline" onClick={() => setEditOpen(true)}>Edit</button>
          <button className="btn btn-sm btn-error btn-outline" onClick={() => setDeleteOpen(true)}>Delete</button>
        </div>
      </div>

      {/* Info + Client grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project details */}
        <div className="card bg-base-100 shadow lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-base">Project Details</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-2">
              <div>
                <dt className="text-base-content/50 font-medium">Slug</dt>
                <dd className="font-mono mt-0.5">{project.slug}</dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Client ID</dt>
                <dd className="mt-0.5">{project.clientId ?? '—'}</dd>
              </div>
              {project.description && (
                <div className="col-span-2">
                  <dt className="text-base-content/50 font-medium">Description</dt>
                  <dd className="mt-0.5">{project.description}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Client info */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-base">Client</h2>
            {client ? (
              <dl className="flex flex-col gap-2 text-sm mt-2">
                <div>
                  <dt className="text-base-content/50 font-medium">Name</dt>
                  <dd className="font-semibold mt-0.5">{client.name}</dd>
                </div>
                <div>
                  <dt className="text-base-content/50 font-medium">Email</dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${client.email}`} className="link link-primary">{client.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-base-content/50 font-medium">Phone</dt>
                  <dd className="mt-0.5">{client.phone}</dd>
                </div>
                {client.description && (
                  <div>
                    <dt className="text-base-content/50 font-medium">Description</dt>
                    <dd className="mt-0.5 text-base-content/70">{client.description}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="text-sm text-base-content/50 mt-2">No client linked.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sites */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h2 className="card-title text-base">
              Sites
              <span className="badge badge-neutral badge-sm ml-1">{project.sites?.length ?? 0}</span>
            </h2>
            <Link to="/sites" className="btn btn-xs btn-ghost">Manage →</Link>
          </div>
          {!project.sites?.length ? (
            <p className="text-sm text-base-content/50">No sites for this project.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Domain</th>
                    <th>Type</th>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {project.sites.map((site) => (
                    <tr key={site.id ?? site.slug} className="hover">
                      <td className="font-medium">{site.name}</td>
                      <td>
                        <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="link link-primary text-sm">
                          {site.domain}
                        </a>
                      </td>
                      <td>
                        <span className="badge badge-outline badge-xs">{site.type?.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="font-mono text-xs text-base-content/60">{site.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Apps */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h2 className="card-title text-base">
              Mobile Apps
              <span className="badge badge-neutral badge-sm ml-1">{project.mobileApps?.length ?? 0}</span>
            </h2>
            <Link to="/mobile-apps" className="btn btn-xs btn-ghost">Manage →</Link>
          </div>
          {!project.mobileApps?.length ? (
            <p className="text-sm text-base-content/50">No mobile apps for this project.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Platform</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {project.mobileApps.map((app) => (
                    <tr key={app.id ?? app.slug} className="hover">
                      <td className="font-medium">{app.name}</td>
                      <td>
                        <span className="badge badge-outline badge-xs">{app.platform?.replace(/_/g, ' ')}</span>
                      </td>
                      <td>{app.category?.replace(/_/g, ' ')}</td>
                      <td>{app.type?.replace(/_/g, ' ')}</td>
                      <td className="font-mono text-xs text-base-content/60">{app.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* APIs */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h2 className="card-title text-base">
              APIs
              <span className="badge badge-neutral badge-sm ml-1">{project.apis?.length ?? 0}</span>
            </h2>
            <Link to="/apis" className="btn btn-xs btn-ghost">Manage →</Link>
          </div>
          {!project.apis?.length ? (
            <p className="text-sm text-base-content/50">No APIs for this project.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {project.apis.map((api) => (
                    <tr key={api.id ?? api.slug} className="hover">
                      <td className="font-medium">{api.name}</td>
                      <td>
                        <span className="badge badge-outline badge-xs">{api.type?.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="max-w-xs truncate text-base-content/70 text-sm">{api.description ?? '—'}</td>
                      <td className="font-mono text-xs text-base-content/60">{api.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <ProjectForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={project}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        itemName={project.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
