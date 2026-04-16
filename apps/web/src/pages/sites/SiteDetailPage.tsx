import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Page, Project, Site } from '../../gql/graphql';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { SiteForm } from './SiteForm';
import { GET_SITE_DETAIL, DELETE_SITE } from './sites.gql';
import { GET_PROJECT_BY_ID } from '../projects/projects.gql';

type SiteDetail = Site & { pages?: Page[] };

const statusBadge: Record<string, string> = {
  ACTIVE: 'badge-success',
  DRAFT: 'badge-warning',
  INACTIVE: 'badge-neutral',
  ARCHIVED: 'badge-ghost',
};

export function SiteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const siteId = parseInt(id!, 10);

  const { data, loading, error } = useQuery<{ site: SiteDetail }>(GET_SITE_DETAIL, {
    variables: { id: siteId },
  });

  const site = data?.site;

  const { data: projectData } = useQuery<{ project: Project }>(GET_PROJECT_BY_ID, {
    variables: { id: site?.projectId },
    skip: !site?.projectId,
  });

  const project = projectData?.project;

  const [deleteSite, { loading: deleting }] = useMutation(DELETE_SITE, {
    onCompleted: () => navigate('/sites'),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleDelete() {
    if (site?.id == null) return;
    await deleteSite({ variables: { id: site.id } });
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-8 w-64" />
        <div className="skeleton h-40 w-full" />
        <div className="skeleton h-56 w-full" />
      </div>
    );
  }

  if (error || !site) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error?.message ?? 'Site not found.'}</span>
      </div>
    );
  }

  const topLevelPages = site.pages?.filter((p) => !p.parentId) ?? [];
  const childPages = site.pages?.filter((p) => p.parentId) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/sites">Sites</Link></li>
          <li>{site.name}</li>
        </ul>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold">{site.name}</h1>
          <span className="badge badge-outline">{site.type?.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn btn-sm btn-outline" onClick={() => setEditOpen(true)}>Edit</button>
          <button className="btn btn-sm btn-error btn-outline" onClick={() => setDeleteOpen(true)}>Delete</button>
        </div>
      </div>

      {/* Info + Project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Site details */}
        <div className="card bg-base-100 shadow lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-base">Site Details</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-2">
              <div>
                <dt className="text-base-content/50 font-medium">Domain</dt>
                <dd className="mt-0.5">
                  <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="link link-primary">
                    {site.domain}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Host</dt>
                <dd className="font-mono mt-0.5">{site.host}</dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Slug</dt>
                <dd className="font-mono mt-0.5">{site.slug}</dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Type</dt>
                <dd className="mt-0.5">{site.type?.replace(/_/g, ' ')}</dd>
              </div>
              {site.description && (
                <div className="col-span-2">
                  <dt className="text-base-content/50 font-medium">Description</dt>
                  <dd className="mt-0.5">{site.description}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Project info */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-base">Project</h2>
            {project ? (
              <dl className="flex flex-col gap-2 text-sm mt-2">
                <div>
                  <dt className="text-base-content/50 font-medium">Name</dt>
                  <dd className="font-semibold mt-0.5">
                    <Link to={`/projects/${project.id}`} className="link link-primary">
                      {project.name}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-base-content/50 font-medium">Status</dt>
                  <dd className="mt-0.5">
                    <span className={`badge badge-sm ${statusBadge[project.status ?? ''] ?? 'badge-ghost'}`}>
                      {project.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-base-content/50 font-medium">Type</dt>
                  <dd className="mt-0.5">
                    <span className="badge badge-outline badge-sm">{project.type?.replace(/_/g, ' ')}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-base-content/50 font-medium">Slug</dt>
                  <dd className="font-mono text-xs mt-0.5 text-base-content/70">{project.slug}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-base-content/50 mt-2">No project linked.</p>
            )}
          </div>
        </div>
      </div>

      {/* Pages */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h2 className="card-title text-base">
              Pages
              <span className="badge badge-neutral badge-sm ml-1">{site.pages?.length ?? 0}</span>
            </h2>
          </div>

          {!site.pages?.length ? (
            <p className="text-sm text-base-content/50">No pages for this site.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Sub-pages</th>
                  </tr>
                </thead>
                <tbody>
                  {topLevelPages.map((page) => {
                    const children = childPages.filter((c) => c.parentId === page.id);
                    return (
                      <tr key={page.id ?? page.slug} className="hover">
                        <td className="font-medium">{page.title ?? '(untitled)'}</td>
                        <td className="font-mono text-xs text-base-content/60">{page.slug}</td>
                        <td>
                          {children.length > 0 ? (
                            <span className="badge badge-ghost badge-sm">{children.length}</span>
                          ) : (
                            <span className="text-base-content/30">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <SiteForm open={editOpen} onClose={() => setEditOpen(false)} site={site} />

      <ConfirmDeleteModal
        open={deleteOpen}
        itemName={site.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
