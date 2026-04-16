import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Client } from '../../gql/graphql';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Pagination';
import { TableSkeleton } from '../../components/TableSkeleton';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ClientForm } from './ClientForm';
import { GET_CLIENTS, DELETE_CLIENT } from './clients.gql';

const PAGE_SIZE = 10;

export function ClientsPage() {
  const { data, loading, error } = useQuery<{ clients: Client[] }>(GET_CLIENTS);
  const clients = data?.clients ?? [];

  const [deleteClient, { loading: deleting }] = useMutation(DELETE_CLIENT, {
    refetchQueries: [GET_CLIENTS],
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  const { page, totalPages, totalItems, pageItems, setPage } = usePagination(clients, PAGE_SIZE);

  function openCreate() {
    setEditingClient(null);
    setFormOpen(true);
  }

  function openEdit(client: Client) {
    setEditingClient(client);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingClient(null);
  }

  async function handleDelete() {
    if (deletingClient?.id == null) return;
    await deleteClient({ variables: { id: deletingClient.id } });
    setDeletingClient(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex items-center gap-3">
          <span className="badge badge-neutral">{loading ? '…' : `${totalItems} total`}</span>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>+ New Client</button>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>Failed to load clients: {error.message}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton columns={6} />
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-base-content/50 py-8">
                    No clients found. <button className="link" onClick={openCreate}>Create one</button>.
                  </td>
                </tr>
              ) : (
                pageItems.map((client) => (
                  <tr key={client.id ?? `client-${client.slug}`} className="hover">
                    <td className="font-mono text-sm">{client.id}</td>
                    <td className="font-medium">{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td className="font-mono text-sm text-base-content/70">{client.slug}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-xs btn-ghost" onClick={() => openEdit(client)}>Edit</button>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => setDeletingClient(client)}>Delete</button>
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

      <ClientForm open={formOpen} onClose={closeForm} client={editingClient} />

      <ConfirmDeleteModal
        open={!!deletingClient}
        itemName={deletingClient?.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingClient(null)}
      />
    </div>
  );
}
