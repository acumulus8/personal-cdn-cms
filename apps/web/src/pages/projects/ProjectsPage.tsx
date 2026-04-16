import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Project } from '../../gql/graphql';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Pagination';
import { TableSkeleton } from '../../components/TableSkeleton';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ProjectForm } from './ProjectForm';
import { GET_PROJECTS, DELETE_PROJECT } from './projects.gql';

const PAGE_SIZE = 10;

const statusBadge: Record<string, string> = {
  ACTIVE: 'badge-success',
  DRAFT: 'badge-warning',
  INACTIVE: 'badge-neutral',
  ARCHIVED: 'badge-ghost',
};

export function ProjectsPage() {
  const { data, loading, error } = useQuery<{ projects: Project[] }>(GET_PROJECTS);
  const projects = data?.projects ?? [];

  const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const { page, totalPages, totalItems, pageItems, setPage } = usePagination(projects, PAGE_SIZE);

  async function handleDelete() {
    if (deletingProject?.id == null) return;
    await deleteProject({ variables: { id: deletingProject.id } });
    setDeletingProject(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex items-center gap-3">
          <span className="badge badge-neutral">{loading ? '…' : `${totalItems} total`}</span>
          <button className="btn btn-primary btn-sm" onClick={() => setCreateOpen(true)}>+ New Project</button>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>Failed to load projects: {error.message}</span>
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
                <th>Status</th>
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
                    No projects found. <button className="link" onClick={() => setCreateOpen(true)}>Create one</button>.
                  </td>
                </tr>
              ) : (
                pageItems.map((project) => (
                  <tr key={project.id ?? `project-${project.slug}`} className="hover">
                    <td className="font-mono text-sm">{project.id}</td>
                    <td>
                      <Link
                        to={`/projects/${project.id}`}
                        className="font-medium link link-hover"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td>
                      <span className="badge badge-outline badge-sm">{project.type?.replace(/_/g, ' ')}</span>
                    </td>
                    <td>
                      <span className={`badge badge-sm ${statusBadge[project.status ?? ''] ?? 'badge-ghost'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="font-mono text-sm text-base-content/70">{project.slug}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link to={`/projects/${project.id}`} className="btn btn-xs btn-ghost">View</Link>
                        <button className="btn btn-xs btn-ghost text-error" onClick={() => setDeletingProject(project)}>Delete</button>
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

      <ProjectForm open={createOpen} onClose={() => setCreateOpen(false)} project={null} />

      <ConfirmDeleteModal
        open={!!deletingProject}
        itemName={deletingProject?.name ?? ''}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeletingProject(null)}
      />
    </div>
  );
}
