import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
import type { Project } from '../../gql/graphql';
import { CREATE_PROJECT, UPDATE_PROJECT, GET_PROJECTS } from './projects.gql';
import { GET_CLIENTS } from '../clients/clients.gql';

interface ProjectFormValues {
  name: string;
  slug: string;
  description: string;
  status: string;
  type: string;
  clientId: string;
}

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

const PROJECT_STATUSES = ['ACTIVE', 'DRAFT', 'INACTIVE', 'ARCHIVED'];
const PROJECT_TYPES = ['API', 'LIBRARY', 'MOBILE_APP', 'OTHER', 'WEBSITE'];

export function ProjectForm({ open, onClose, project }: ProjectFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!project;

  const { data: clientsData } = useQuery<{ clients: { id: number; name: string }[] }>(
    GET_CLIENTS,
    { skip: !open },
  );
  const clients = clientsData?.clients ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>();

  const [createProject, { error: createError }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const [updateProject, { error: updateError }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  const mutationError = createError ?? updateError;

  useEffect(() => {
    if (open) {
      reset({
        name: project?.name ?? '',
        slug: project?.slug ?? '',
        description: project?.description ?? '',
        status: project?.status ?? 'DRAFT',
        type: project?.type ?? 'OTHER',
        clientId: project?.clientId?.toString() ?? '',
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, project, reset]);

  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit && open) {
      setValue('slug', nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [nameValue, isEdit, open, setValue]);

  async function onSubmit(values: ProjectFormValues) {
    if (isEdit && project?.id != null) {
      await updateProject({
        variables: {
          id: project.id,
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            status: values.status,
            type: values.type,
          },
        },
      });
    } else {
      await createProject({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            status: values.status,
            type: values.type,
            clientId: parseInt(values.clientId, 10),
          },
        },
      });
    }
    onClose();
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-full max-w-lg">
        <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit Project' : 'New Project'}</h3>

        {mutationError && (
          <div role="alert" className="alert alert-error mb-4 text-sm">
            <span>{mutationError.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name *</legend>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="fieldset-label text-error">{errors.name.message}</p>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Slug *</legend>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.slug ? 'input-error' : ''}`}
              {...register('slug', { required: 'Slug is required' })}
            />
            {errors.slug && <p className="fieldset-label text-error">{errors.slug.message}</p>}
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Status *</legend>
              <select
                className="select select-bordered w-full"
                {...register('status', { required: true })}
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Type *</legend>
              <select
                className="select select-bordered w-full"
                {...register('type', { required: true })}
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </fieldset>
          </div>

          {!isEdit && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Client *</legend>
              <select
                className={`select select-bordered w-full ${errors.clientId ? 'select-error' : ''}`}
                {...register('clientId', { required: 'Client is required' })}
              >
                <option value="">Select a client…</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.clientId && <p className="fieldset-label text-error">{errors.clientId.message}</p>}
            </fieldset>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea className="textarea textarea-bordered w-full" rows={3} {...register('description')} />
          </fieldset>

          <div className="modal-action mt-2">
            <form method="dialog">
              <button className="btn btn-ghost mr-2" disabled={isSubmitting}>Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : isEdit ? 'Save changes' : 'Create project'}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
