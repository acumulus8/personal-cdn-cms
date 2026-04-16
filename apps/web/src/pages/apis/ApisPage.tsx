import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Api } from '../../gql/graphql';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Pagination';
import { TableSkeleton } from '../../components/TableSkeleton';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ApiForm } from './ApiForm';
import { GET_APIS, DELETE_API } from './apis.gql';

const PAGE_SIZE = 10;

export function ApisPage() {
  const { data, loading, error } = useQuery<{ apis: Api[] }>(GET_APIS);
  const apis = data?.apis ?? [];

  const [deleteApi, { loading: deleting }] = useMutation(DELETE_API, {
    refetchQueries: [GET_APIS],
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [deletingApi, setDeletingApi] = useState<Api | null>(null);

  const { page, totalPages, totalItems, pageItems, setPage } = usePagination(apis, PAGE_SIZE);

  async function handleDelete() {
    if (deletingApi?.id == null) return;
    await deleteApi({ variables: { id: deletingApi.id } });
    setDeletingApi(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">APIs</h1>
        <div className="flex items-center gap-3">
          <span className="badge badge-neutral">{loading ? '…' : `${totalItems} total`}</span>
          <button className="btn btn-primary btn-sm" onClick={() => setCreateOpen(true)}>+ New API</button>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>Failed to load APIs: {error.message}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Slug</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton columns={7} />
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-base-content/50 py-8">
                    No APIs found. <button className="link" onClick={() => setCreateOpen(true)}>Create one</button>.
                  </td>
                </tr>
              ) : (
                pageItems.map((api) => (
                  <tr key={api.id ?? `api-${api.slug}`} className="hover">
                    <td className="font-mono text-sm">{api.id}</td>
                    <td>
                      <Link to={`/apis/${api.id}`} className="font-medium link link-hover">
                        {api.name}
                      </Link>
                    </td>
                    <td>
                      <span className="badge badge-outline badge-sm">{api.type?.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="max-w-xs truncate text-base-content/70">{api.description ?? '—'}</td>
                    <td className="font-mono text-sm text-base-content/70">{api.slug}</td>
                    <td className="text-sm text-base-content/60">
                      {api.createdAt ? new Date(api.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/apis/${api.id}`} className="btn btn-xs btn-ghost">View</Link>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => setDeletingApi(api)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div className="px-4 pb-4">
            <Pagination page={page} totalPages={totalPages} totalItems={totalItems} pageSize={PAGE_SIZE} onPageChange={setPage} />
          </div>
        )}
      </div>

      <ApiForm open={createOpen} onClose={() => setCreateOpen(false)} api={null} />

      <ConfirmDeleteModal
        open={!!deletingApi}
        itemName={deletingApi?.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingApi(null)}
      />
    </div>
  );
}
