import { createLazyFileRoute } from '@tanstack/react-router';
import { useUsers } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withUsersAsyncState } from '@/components/hoc/with-async-state';
import { DialogEditUser } from '@/components/ui/dialogs/dialog-edit-user';
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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.isAdmin && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium">
                      Админ
                    </span>
                  )}
                  <DialogEditUser user={user}>
                    <Button variant="outline" size="sm">
                      Управление
                    </Button>
                  </DialogEditUser>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Email:</span>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Телефон:</span>
                  <p className="mt-1">{user.phone}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Регистрация:</span>
                  <p className="mt-1">
                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                {user.website && (
                  <div className="md:col-span-3">
                    <span className="font-medium text-muted-foreground">Сайт:</span>
                    <p className="mt-1">
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
                {user.bio && (
                  <div className="md:col-span-3">
                    <span className="font-medium text-muted-foreground">О себе:</span>
                    <p className="mt-1 text-muted-foreground">{user.bio}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Пользователи не найдены</p>
          </div>
        )}
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

export const Route = createLazyFileRoute('/users')({
  component: UsersPage,
});
