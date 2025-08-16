import { useState } from 'react';
import { Button } from '../button/button';
import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle } from '../dialog';
import { FormSignIn } from '../forms/form-sign-in';
import { AUTH_CONFIG } from '@/lib/configs/navbar-config';

export const DialogSignIn = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          {AUTH_CONFIG.login.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>
        <FormSignIn onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};
