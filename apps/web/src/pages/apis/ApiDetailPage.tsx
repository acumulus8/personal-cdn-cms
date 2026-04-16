import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Api, Project } from '../../gql/graphql';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ApiForm } from './ApiForm';
import { GET_API_DETAIL, DELETE_API } from './apis.gql';

type ApiDetail = Api & { project?: Project | null };

const statusBadge: Record<string, string> = {
  ACTIVE: 'badge-success',
  DRAFT: 'badge-warning',
  INACTIVE: 'badge-neutral',
  ARCHIVED: 'badge-ghost',
};

export function ApiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const apiId = parseInt(id!, 10);

  const { data, loading, error } = useQuery<{ api: ApiDetail }>(GET_API_DETAIL, {
    variables: { id: apiId },
  });

  const api = data?.api;

  const [deleteApi, { loading: deleting }] = useMutation(DELETE_API, {
    onCompleted: () => navigate('/apis'),
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleDelete() {
    if (api?.id == null) return;
    await deleteApi({ variables: { id: api.id } });
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-8 w-64" />
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (error || !api) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error?.message ?? 'API not found.'}</span>
      </div>
    );
  }

  const project = api.project;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/apis">APIs</Link></li>
          <li>{api.name}</li>
        </ul>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold">{api.name}</h1>
          <span className="badge badge-outline">{api.type?.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn btn-sm btn-outline" onClick={() => setEditOpen(true)}>Edit</button>
          <button className="btn btn-sm btn-error btn-outline" onClick={() => setDeleteOpen(true)}>Delete</button>
        </div>
      </div>

      {/* Info + Project grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* API details */}
        <div className="card bg-base-100 shadow lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title text-base">API Details</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-2">
              <div>
                <dt className="text-base-content/50 font-medium">Slug</dt>
                <dd className="font-mono mt-0.5">{api.slug}</dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Type</dt>
                <dd className="mt-0.5">{api.type?.replace(/_/g, ' ')}</dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Created</dt>
                <dd className="mt-0.5">
                  {api.createdAt ? new Date(api.createdAt).toLocaleDateString() : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-base-content/50 font-medium">Updated</dt>
                <dd className="mt-0.5">
                  {api.updatedAt ? new Date(api.updatedAt).toLocaleDateString() : '—'}
                </dd>
              </div>
              {api.description && (
                <div className="col-span-2">
                  <dt className="text-base-content/50 font-medium">Description</dt>
                  <dd className="mt-0.5">{api.description}</dd>
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

      <ApiForm open={editOpen} onClose={() => setEditOpen(false)} api={api} />

      <ConfirmDeleteModal
        open={deleteOpen}
        itemName={api.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
