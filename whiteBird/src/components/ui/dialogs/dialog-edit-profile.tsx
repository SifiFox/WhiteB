import { useState } from 'react';
import { Button } from '../button/button';
import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle } from '../dialog';
import { FormEditProfile } from '../forms/form-user/form-edit-profile';
import type { AuthUser } from '@/lib/types';

interface DialogEditProfileProps {
  user: AuthUser;
  children?: React.ReactNode;
}

export function DialogEditProfile({ user, children }: DialogEditProfileProps) {
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
          <Button variant="outline">
            Редактировать профиль
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>
        <FormEditProfile
          user={user}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
