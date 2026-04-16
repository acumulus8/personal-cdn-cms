import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client/react';
import type { Api } from '../../gql/graphql';
import { CREATE_API, UPDATE_API, GET_APIS } from './apis.gql';
import { GET_PROJECTS } from '../projects/projects.gql';

interface ApiFormValues {
  name: string;
  slug: string;
  description: string;
  type: string;
  projectId: string;
}

interface ApiFormProps {
  open: boolean;
  onClose: () => void;
  api?: Api | null;
}

const API_TYPES = ['CDN', 'CMS', 'COMPONENT_LIBRARY', 'ECOMMERCE', 'OTHER', 'THEME_LIBRARY'];

export function ApiForm({ open, onClose, api }: ApiFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!api;

  const { data: projectsData } = useQuery<{ projects: { id: number; name: string }[] }>(GET_PROJECTS, { skip: !open });
  const projects = projectsData?.projects ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApiFormValues>();

  const [createApi, { error: createError }] = useMutation(CREATE_API, { refetchQueries: [GET_APIS] });
  const [updateApi, { error: updateError }] = useMutation(UPDATE_API, { refetchQueries: [GET_APIS] });
  const mutationError = createError ?? updateError;

  useEffect(() => {
    if (open) {
      reset({
        name: api?.name ?? '',
        slug: api?.slug ?? '',
        description: api?.description ?? '',
        type: api?.type ?? 'OTHER',
        projectId: api?.projectId?.toString() ?? '',
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, api, reset]);

  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit && open) {
      setValue('slug', nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [nameValue, isEdit, open, setValue]);

  async function onSubmit(values: ApiFormValues) {
    if (isEdit && api?.id != null) {
      await updateApi({
        variables: {
          id: api.id,
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            type: values.type,
          },
        },
      });
    } else {
      await createApi({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            type: values.type,
            projectId: parseInt(values.projectId, 10),
          },
        },
      });
    }
    onClose();
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-full max-w-lg">
        <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit API' : 'New API'}</h3>

        {mutationError && (
          <div role="alert" className="alert alert-error mb-4 text-sm">
            <span>{mutationError.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name *</legend>
            <input type="text" className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="fieldset-label text-error">{errors.name.message}</p>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Slug *</legend>
            <input type="text" className={`input input-bordered w-full ${errors.slug ? 'input-error' : ''}`}
              {...register('slug', { required: 'Slug is required' })} />
            {errors.slug && <p className="fieldset-label text-error">{errors.slug.message}</p>}
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Type</legend>
              <select className="select select-bordered w-full" {...register('type')}>
                {API_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </fieldset>

            {!isEdit && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Project *</legend>
                <select className={`select select-bordered w-full ${errors.projectId ? 'select-error' : ''}`}
                  {...register('projectId', { required: 'Project is required' })}>
                  <option value="">Select…</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.projectId && <p className="fieldset-label text-error">{errors.projectId.message}</p>}
              </fieldset>
            )}
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea className="textarea textarea-bordered w-full" rows={2} {...register('description')} />
          </fieldset>

          <div className="modal-action mt-2">
            <form method="dialog">
              <button className="btn btn-ghost mr-2" disabled={isSubmitting}>Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : isEdit ? 'Save changes' : 'Create API'}
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
