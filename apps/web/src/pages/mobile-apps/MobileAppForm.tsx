import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client/react';
import type { MobileApp } from '../../gql/graphql';
import { CREATE_MOBILE_APP, UPDATE_MOBILE_APP, GET_MOBILE_APPS } from './mobile-apps.gql';
import { GET_PROJECTS } from '../projects/projects.gql';

interface MobileAppFormValues {
  name: string;
  slug: string;
  description: string;
  platform: string;
  category: string;
  type: string;
  projectId: string;
}

interface MobileAppFormProps {
  open: boolean;
  onClose: () => void;
  app?: MobileApp | null;
}

const PLATFORMS = ['ANDROID', 'ANDROID_IOS_WEB', 'ANDROID_WEB', 'IOS', 'IOS_ANDROID', 'IOS_WEB', 'OTHER'];
const CATEGORIES = ['ENTERTAINMENT', 'GAMES', 'OTHER', 'PRODUCTIVITY', 'SOCIAL', 'UTILITIES'];
const APP_TYPES = ['ECOMMERCE', 'GAME', 'OTHER', 'PORTFOLIO'];

export function MobileAppForm({ open, onClose, app }: MobileAppFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!app;

  const { data: projectsData } = useQuery<{ projects: { id: number; name: string }[] }>(GET_PROJECTS, { skip: !open });
  const projects = projectsData?.projects ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MobileAppFormValues>();

  const [createApp, { error: createError }] = useMutation(CREATE_MOBILE_APP, { refetchQueries: [GET_MOBILE_APPS] });
  const [updateApp, { error: updateError }] = useMutation(UPDATE_MOBILE_APP, { refetchQueries: [GET_MOBILE_APPS] });
  const mutationError = createError ?? updateError;

  useEffect(() => {
    if (open) {
      reset({
        name: app?.name ?? '',
        slug: app?.slug ?? '',
        description: app?.description ?? '',
        platform: app?.platform ?? 'IOS',
        category: app?.category ?? 'OTHER',
        type: app?.type ?? 'OTHER',
        projectId: app?.projectId?.toString() ?? '',
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, app, reset]);

  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit && open) {
      setValue('slug', nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [nameValue, isEdit, open, setValue]);

  async function onSubmit(values: MobileAppFormValues) {
    if (isEdit && app?.id != null) {
      await updateApp({
        variables: {
          id: app.id,
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            platform: values.platform,
            category: values.category,
            type: values.type,
          },
        },
      });
    } else {
      await createApp({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || undefined,
            platform: values.platform,
            category: values.category,
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
        <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit Mobile App' : 'New Mobile App'}</h3>

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

          <div className="grid grid-cols-3 gap-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Platform</legend>
              <select className="select select-bordered w-full" {...register('platform')}>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p.replace(/_/g, ' ')}</option>)}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <select className="select select-bordered w-full" {...register('category')}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Type</legend>
              <select className="select select-bordered w-full" {...register('type')}>
                {APP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </fieldset>
          </div>

          {!isEdit && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Project *</legend>
              <select className={`select select-bordered w-full ${errors.projectId ? 'select-error' : ''}`}
                {...register('projectId', { required: 'Project is required' })}>
                <option value="">Select a project…</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              {errors.projectId && <p className="fieldset-label text-error">{errors.projectId.message}</p>}
            </fieldset>
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
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : isEdit ? 'Save changes' : 'Create app'}
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
