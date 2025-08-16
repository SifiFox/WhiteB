import { useState } from 'react';
import { Button } from '../button/button';
import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle } from '../dialog';
import { FormEditProfile } from '../forms/form-user/form-edit-profile';
import type { User } from '@/lib/types';

interface DialogEditUserProps {
  user: User;
  children?: React.ReactNode;
}

export function DialogEditUser({ user, children }: DialogEditUserProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            Управление
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактирование пользователя: {user.name}</DialogTitle>
        </DialogHeader>
        <FormEditProfile
          user={user}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isCurrentUser={false}
        />
      </DialogContent>
    </Dialog>
  );
}
