import { AddEditModalProps } from '../../models/Index.js';

function AddEditModal({ open, onClose }: AddEditModalProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <h2>Edit Car</h2>
      </div>
    </div>
  );
}

export default AddEditModal;
