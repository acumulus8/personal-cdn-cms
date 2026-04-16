import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client/react';
import type { Site } from '../../gql/graphql';
import { CREATE_SITE, UPDATE_SITE, GET_SITES } from './sites.gql';
import { GET_CLIENTS } from '../clients/clients.gql';
import { GET_PROJECTS } from '../projects/projects.gql';

interface SiteFormValues {
  name: string;
  slug: string;
  domain: string;
  host: string;
  description: string;
  type: string;
  clientId: string;
  projectId: string;
}

interface SiteFormProps {
  open: boolean;
  onClose: () => void;
  site?: Site | null;
}

const SITE_TYPES = ['BLOG', 'ECOMMERCE', 'OTHER', 'PORTFOLIO', 'WEB_APP'];

export function SiteForm({ open, onClose, site }: SiteFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!site;

  const { data: clientsData } = useQuery<{ clients: { id: number; name: string }[] }>(GET_CLIENTS, { skip: !open });
  const { data: projectsData } = useQuery<{ projects: { id: number; name: string }[] }>(GET_PROJECTS, { skip: !open });
  const clients = clientsData?.clients ?? [];
  const projects = projectsData?.projects ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SiteFormValues>();

  const [createSite, { error: createError }] = useMutation(CREATE_SITE, { refetchQueries: [GET_SITES] });
  const [updateSite, { error: updateError }] = useMutation(UPDATE_SITE, { refetchQueries: [GET_SITES] });
  const mutationError = createError ?? updateError;

  useEffect(() => {
    if (open) {
      reset({
        name: site?.name ?? '',
        slug: site?.slug ?? '',
        domain: site?.domain ?? '',
        host: site?.host ?? '',
        description: site?.description ?? '',
        type: site?.type ?? 'OTHER',
        clientId: '',
        projectId: site?.projectId?.toString() ?? '',
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, site, reset]);

  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit && open) {
      setValue('slug', nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [nameValue, isEdit, open, setValue]);

  async function onSubmit(values: SiteFormValues) {
    if (isEdit && site?.id != null) {
      await updateSite({
        variables: {
          id: site.id,
          input: {
            name: values.name,
            slug: values.slug,
            domain: values.domain,
            host: values.host,
            description: values.description || undefined,
            type: values.type,
          },
        },
      });
    } else {
      await createSite({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            domain: values.domain,
            host: values.host,
            description: values.description || undefined,
            type: values.type,
            clientId: parseInt(values.clientId, 10),
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
        <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit Site' : 'New Site'}</h3>

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
              <legend className="fieldset-legend">Domain *</legend>
              <input type="text" placeholder="example.com" className={`input input-bordered w-full ${errors.domain ? 'input-error' : ''}`}
                {...register('domain', { required: 'Domain is required' })} />
              {errors.domain && <p className="fieldset-label text-error">{errors.domain.message}</p>}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Host *</legend>
              <input type="text" placeholder="vercel" className={`input input-bordered w-full ${errors.host ? 'input-error' : ''}`}
                {...register('host', { required: 'Host is required' })} />
              {errors.host && <p className="fieldset-label text-error">{errors.host.message}</p>}
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Type</legend>
            <select className="select select-bordered w-full" {...register('type')}>
              {SITE_TYPES.map((t) => (
                <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </fieldset>

          {!isEdit && (
            <div className="grid grid-cols-2 gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Client *</legend>
                <select className={`select select-bordered w-full ${errors.clientId ? 'select-error' : ''}`}
                  {...register('clientId', { required: 'Client is required' })}>
                  <option value="">Select…</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.clientId && <p className="fieldset-label text-error">{errors.clientId.message}</p>}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Project *</legend>
                <select className={`select select-bordered w-full ${errors.projectId ? 'select-error' : ''}`}
                  {...register('projectId', { required: 'Project is required' })}>
                  <option value="">Select…</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.projectId && <p className="fieldset-label text-error">{errors.projectId.message}</p>}
              </fieldset>
            </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea className="textarea textarea-bordered w-full" rows={2} {...register('description')} />
          </fieldset>

          <div className="modal-action mt-2">
            <form method="dialog">
              <button className="btn btn-ghost mr-2" disabled={isSubmitting}>Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : isEdit ? 'Save changes' : 'Create site'}
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
