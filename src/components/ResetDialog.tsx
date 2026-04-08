interface ResetDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ResetDialog({ open, onConfirm, onCancel }: ResetDialogProps) {
  if (!open) return null;

  return (
    <div className="reset-overlay" onClick={onCancel}>
      <div className="reset-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="reset-dialog-title">Reset All Progress?</h3>
        <p className="reset-dialog-body">
          This will uncheck all collectibles and cannot be undone.
        </p>
        <div className="reset-dialog-actions">
          <button className="reset-dialog-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="reset-dialog-confirm" onClick={onConfirm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetDialog;
