import { Button } from '@/components/ui/button/button';

interface FormActionsProps {
  isPending: boolean;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
}

export function FormActions({
  isPending,
  onCancel,
  submitText = 'Сохранить изменения',
  cancelText = 'Отмена',
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="submit"
        disabled={isPending}
        className="flex-1"
      >
        {isPending ? 'Сохранение...' : submitText}
      </Button>

      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          {cancelText}
        </Button>
      )}
    </div>
  );
}
