import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import type { MobileApp } from '../../gql/graphql';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Pagination';
import { TableSkeleton } from '../../components/TableSkeleton';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { MobileAppForm } from './MobileAppForm';
import { GET_MOBILE_APPS, DELETE_MOBILE_APP } from './mobile-apps.gql';

const PAGE_SIZE = 10;

export function MobileAppsPage() {
  const { data, loading, error } = useQuery<{ mobileApps: MobileApp[] }>(GET_MOBILE_APPS);
  const apps = data?.mobileApps ?? [];

  const [deleteApp, { loading: deleting }] = useMutation(DELETE_MOBILE_APP, {
    refetchQueries: [GET_MOBILE_APPS],
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<MobileApp | null>(null);
  const [deletingApp, setDeletingApp] = useState<MobileApp | null>(null);

  const { page, totalPages, totalItems, pageItems, setPage } = usePagination(apps, PAGE_SIZE);

  function openCreate() {
    setEditingApp(null);
    setFormOpen(true);
  }

  function openEdit(app: MobileApp) {
    setEditingApp(app);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingApp(null);
  }

  async function handleDelete() {
    if (deletingApp?.id == null) return;
    await deleteApp({ variables: { id: deletingApp.id } });
    setDeletingApp(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mobile Apps</h1>
        <div className="flex items-center gap-3">
          <span className="badge badge-neutral">{loading ? '…' : `${totalItems} total`}</span>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>+ New App</button>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>Failed to load mobile apps: {error.message}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Platform</th>
                <th>Category</th>
                <th>Type</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton columns={7} />
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-base-content/50 py-8">
                    No mobile apps found. <button className="link" onClick={openCreate}>Create one</button>.
                  </td>
                </tr>
              ) : (
                pageItems.map((app) => (
                  <tr key={app.id ?? `app-${app.slug}`} className="hover">
                    <td className="font-mono text-sm">{app.id}</td>
                    <td className="font-medium">{app.name}</td>
                    <td>
                      <span className="badge badge-outline badge-sm">{app.platform?.replace(/_/g, ' ')}</span>
                    </td>
                    <td>{app.category?.replace(/_/g, ' ')}</td>
                    <td>{app.type?.replace(/_/g, ' ')}</td>
                    <td className="font-mono text-sm text-base-content/70">{app.slug}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-xs btn-ghost" onClick={() => openEdit(app)}>Edit</button>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => setDeletingApp(app)}>Delete</button>
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

      <MobileAppForm open={formOpen} onClose={closeForm} app={editingApp} />

      <ConfirmDeleteModal
        open={!!deletingApp}
        itemName={deletingApp?.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingApp(null)}
      />
    </div>
  );
}
