import { createFileRoute } from '@tanstack/react-router';
import { requireAdmin } from '@/lib/auth/auth-guards';
import { useUsers } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withUsersAsyncState } from '@/components/hoc/with-async-state';
import type { User } from '@/lib/types';

interface UsersListProps {
  users: User[];
}

function UsersList({ users }: UsersListProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
          <p className="text-muted-foreground mt-2">
            Административная панель для управления пользователями системы
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Всего пользователей: {users.length}
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      @{user.username} • {user.email}
                      {user.isAdmin && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                          Админ
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                  <Button
                    variant={user.isAdmin ? 'secondary' : 'destructive'}
                    size="sm"
                    disabled={user.isAdmin}
                  >
                    {user.isAdmin ? 'Админ' : 'Заблокировать'}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 md:grid-cols-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Телефон:</span>
                  <p className="mt-1">{user.phone}</p>
                </div>

                {user.website && (
                  <div>
                    <span className="font-medium text-muted-foreground">Сайт:</span>
                    <p className="mt-1">
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate block"
                      >
                        {user.website}
                      </a>
                    </p>
                  </div>
                )}

                <div>
                  <span className="font-medium text-muted-foreground">Регистрация:</span>
                  <p className="mt-1">
                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              {user.bio && (
                <div className="mt-4 pt-4 border-t">
                  <span className="font-medium text-muted-foreground">О себе:</span>
                  <p className="mt-1 text-sm">{user.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const UsersListWithState = withUsersAsyncState(UsersList);

function UsersPage() {
  const { data: users = [], isLoading, error } = useUsers();

  return (
    <UsersListWithState
      users={users}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Route = createFileRoute('/users')({
  beforeLoad: async () => {
    await requireAdmin();
  },
  component: UsersPage,
});
