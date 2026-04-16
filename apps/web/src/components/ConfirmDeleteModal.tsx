import { useEffect, useRef } from 'react';

interface ConfirmDeleteModalProps {
  open: boolean;
  itemName: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDeleteModal({ open, itemName, loading, onConfirm, onClose }: ConfirmDeleteModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return (
    <dialog ref={ref} className="modal" onClose={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm deletion</h3>
        <p className="py-4">
          Are you sure you want to delete <span className="font-semibold">{itemName}</span>? This
          action cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost mr-2" disabled={loading}>Cancel</button>
          </form>
          <button className="btn btn-error" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'Delete'}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
