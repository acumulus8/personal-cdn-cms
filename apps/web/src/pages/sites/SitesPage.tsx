import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Site } from '../../gql/graphql';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Pagination';
import { TableSkeleton } from '../../components/TableSkeleton';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { SiteForm } from './SiteForm';
import { GET_SITES, DELETE_SITE } from './sites.gql';

const PAGE_SIZE = 10;

export function SitesPage() {
  const { data, loading, error } = useQuery<{ sites: Site[] }>(GET_SITES);
  const sites = data?.sites ?? [];

  const [deleteSite, { loading: deleting }] = useMutation(DELETE_SITE, {
    refetchQueries: [GET_SITES],
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [deletingSite, setDeletingSite] = useState<Site | null>(null);

  const { page, totalPages, totalItems, pageItems, setPage } = usePagination(sites, PAGE_SIZE);

  async function handleDelete() {
    if (deletingSite?.id == null) return;
    await deleteSite({ variables: { id: deletingSite.id } });
    setDeletingSite(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <div className="flex items-center gap-3">
          <span className="badge badge-neutral">{loading ? '…' : `${totalItems} total`}</span>
          <button className="btn btn-primary btn-sm" onClick={() => setCreateOpen(true)}>+ New Site</button>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>Failed to load sites: {error.message}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Domain</th>
                <th>Host</th>
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
                    No sites found. <button className="link" onClick={() => setCreateOpen(true)}>Create one</button>.
                  </td>
                </tr>
              ) : (
                pageItems.map((site) => (
                  <tr key={site.id ?? `site-${site.slug}`} className="hover">
                    <td className="font-mono text-sm">{site.id}</td>
                    <td>
                      <Link to={`/sites/${site.id}`} className="font-medium link link-hover">
                        {site.name}
                      </Link>
                    </td>
                    <td>
                      <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="link link-primary text-sm">
                        {site.domain}
                      </a>
                    </td>
                    <td className="font-mono text-sm text-base-content/70">{site.host}</td>
                    <td>
                      <span className="badge badge-outline badge-sm">{site.type?.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="font-mono text-sm text-base-content/70">{site.slug}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/sites/${site.id}`} className="btn btn-xs btn-ghost">View</Link>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => setDeletingSite(site)}>Delete</button>
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

      <SiteForm open={createOpen} onClose={() => setCreateOpen(false)} site={null} />

      <ConfirmDeleteModal
        open={!!deletingSite}
        itemName={deletingSite?.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingSite(null)}
      />
    </div>
  );
}
