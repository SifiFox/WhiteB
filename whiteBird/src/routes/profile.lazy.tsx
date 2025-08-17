import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useCurrentUser } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { withProfileAsyncState } from '@/components/hoc/with-async-state';
import { DialogEditProfile } from '@/components/ui/dialogs/dialog-edit-profile';
import { FavoritePosts } from '@/components/widgets/profile/favorite-posts';
import { Users, Settings, Calendar, Mail, Phone, Globe, User } from 'lucide-react';
import type { AuthUser } from '@/lib/types';

interface ProfileContentProps {
  user: AuthUser;
}

function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8 flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        {user.isAdmin && (
          <Button asChild variant="outline" className="gap-2">
            <Link to="/users">
              <Users className="h-4 w-4" />
              Управление пользователями
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-start flex-col md:flex-row gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-4 flex-col md:flex-row gap-4">
                <div className="w-full md:w-fit">
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <p className="text-muted-foreground mb-2 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    @{user.username}
                  </p>
                  {user.isAdmin && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      Администратор
                    </span>
                  )}
                </div>
                <DialogEditProfile user={user}>
                  <Button variant="outline" className="gap-2 w-full md:w-fit">
                    <Settings className="h-4 w-4" />
                    Редактировать
                  </Button>
                </DialogEditProfile>
              </div>

              {user.bio && (
                <div className="bg-muted/30 rounded-md p-3">
                  <p className="text-sm text-foreground leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Контактная информация
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Телефон</label>
                <p className="text-sm font-medium">{user.phone}</p>
              </div>
            </div>

            {user.website && (
              <div className="md:col-span-2 flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Веб-сайт</label>
                  <p className="text-sm font-medium">
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors"
                    >
                      {user.website}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Информация об аккаунте
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Дата регистрации</label>
                <p className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Последний вход</label>
                <p className="text-sm font-medium">
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

        <FavoritePosts user={user} />
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

export const Route = createLazyFileRoute('/profile')({
  component: ProfilePage,
});
