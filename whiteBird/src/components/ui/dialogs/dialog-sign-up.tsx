import { useState } from 'react';
import { Button } from '../button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../dialog';
import { FormSignUp } from '../forms/form-sign-up';
import { AUTH_CONFIG } from '@/lib/configs/navbar-config';

export const DialogSignUp = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          {AUTH_CONFIG.signup.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Регистрация</DialogTitle>
        </DialogHeader>
        <FormSignUp onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};
