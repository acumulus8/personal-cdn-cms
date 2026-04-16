import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import type { Client } from '../../gql/graphql';
import { CREATE_CLIENT, UPDATE_CLIENT, GET_CLIENTS } from './clients.gql';

interface ClientFormValues {
  name: string;
  email: string;
  phone: string;
  slug: string;
  description: string;
}

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  client?: Client | null;
}

export function ClientForm({ open, onClose, client }: ClientFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEdit = !!client;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>();

  const [createClient, { error: createError }] = useMutation(CREATE_CLIENT, {
    refetchQueries: [GET_CLIENTS],
  });
  const [updateClient, { error: updateError }] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [GET_CLIENTS],
  });

  const mutationError = createError ?? updateError;

  useEffect(() => {
    if (open) {
      reset({
        name: client?.name ?? '',
        email: client?.email ?? '',
        phone: client?.phone ?? '',
        slug: client?.slug ?? '',
        description: client?.description ?? '',
      });
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, client, reset]);

  // Auto-generate slug from name in create mode
  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit && open) {
      setValue(
        'slug',
        nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      );
    }
  }, [nameValue, isEdit, open, setValue]);

  async function onSubmit(values: ClientFormValues) {
    if (isEdit && client?.id != null) {
      await updateClient({
        variables: {
          id: client.id,
          input: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            slug: values.slug,
            description: values.description || undefined,
          },
        },
      });
    } else {
      await createClient({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            slug: values.slug,
            description: values.description || undefined,
          },
        },
      });
    }
    onClose();
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-full max-w-lg">
        <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit Client' : 'New Client'}</h3>

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
            <legend className="fieldset-legend">Email *</legend>
            <input
              type="email"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
            />
            {errors.email && <p className="fieldset-label text-error">{errors.email.message}</p>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone *</legend>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && <p className="fieldset-label text-error">{errors.phone.message}</p>}
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

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              {...register('description')}
            />
          </fieldset>

          <div className="modal-action mt-2">
            <form method="dialog">
              <button className="btn btn-ghost mr-2" disabled={isSubmitting}>Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : isEdit ? 'Save changes' : 'Create client'}
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
