import { createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '@/lib/auth/auth-guards';
import { useCurrentUser } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { withProfileAsyncState } from '@/components/hoc/with-async-state';
import type { AuthUser } from '@/lib/types';

interface ProfileContentProps {
  user: AuthUser;
}

function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Профиль пользователя</h1>

      <div className="grid gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              {user.isAdmin && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  Администратор
                </span>
              )}
            </div>
            <Button variant="outline">
              Редактировать профиль
            </Button>
          </div>

          {user.bio && (
            <div className="mb-6">
              <p className="text-foreground">{user.bio}</p>
            </div>
          )}
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm mt-1">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Телефон</label>
              <p className="text-sm mt-1">{user.phone}</p>
            </div>

            {user.website && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Веб-сайт</label>
                <p className="text-sm mt-1">
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Информация об аккаунте</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Дата регистрации</label>
              <p className="text-sm mt-1">
                {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Последний вход</label>
              <p className="text-sm mt-1">
                {new Date(user.lastLoginAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileContentWithState = withProfileAsyncState(ProfileContent);

function ProfilePage() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (!isLoading && !error && !user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">Пользователь не найден</div>
      </div>
    );
  }

  return (
    <ProfileContentWithState
      user={user!}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: ProfilePage,
});
