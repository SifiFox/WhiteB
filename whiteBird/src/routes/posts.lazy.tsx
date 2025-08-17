import { createLazyFileRoute, useSearch, useNavigate } from '@tanstack/react-router';

import { usePosts } from '@/lib/hooks';
import { useUsers } from '@/lib/hooks/use-users';
import { withPostsAsyncState } from '@/components/hoc/with-async-state';
import { PostPreview } from '@/components/widgets/post';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { DialogCreatePost } from '@/components/ui/dialogs/dialog-create-post';
import { Plus, X } from 'lucide-react';
import { useIsAuthenticated } from '@/lib/hooks/use-auth';
import type { Post } from '@/lib/types';

interface PostsListProps {
  posts: Post[];
  selectedUserId?: string;
  onUserFilterChange: (userId: string) => void;
  users: Array<{ id: string; name: string; username: string }>;
}

function PostsList({ posts, selectedUserId, onUserFilterChange, users }: PostsListProps) {
  const isAuthenticated = useIsAuthenticated();

  const selectedUser = users.find(u => u.id.toString() === selectedUserId);

  const userOptions = [
    { value: '', label: 'Все пользователи' },
    ...users.map(user => ({
      value: user.id.toString(),
      label: `${user.name} (@${user.username})`,
    })),
  ];

  const handleClearFilter = () => {
    onUserFilterChange('');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Все посты</h1>
          <p className="text-muted-foreground">
            Делитесь своими мыслями и идеями с сообществом
          </p>
        </div>

        {isAuthenticated && (
          <DialogCreatePost>
            <Button className="gap-2 w-full md:w-auto">
              <Plus className="h-4 w-4" />
              Создать пост
            </Button>
          </DialogCreatePost>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Combobox
            options={userOptions}
            value={selectedUserId || ''}
            onValueChange={onUserFilterChange}
            placeholder="Фильтр по автору"
            searchPlaceholder="Поиск пользователя..."
            emptyMessage="Пользователи не найдены."
            className="w-full sm:w-[250px]"
          />

          {selectedUserId && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilter}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Сбросить
            </Button>
          )}
        </div>

        {selectedUser && (
          <div className="text-sm text-muted-foreground self-center">
            Показаны посты от <span className="font-medium">{selectedUser.name}</span>
          </div>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            {selectedUserId ? 'У этого пользователя пока нет постов' : 'Постов пока нет'}
          </p>
          {isAuthenticated && (
            <DialogCreatePost>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Создать первый пост
              </Button>
            </DialogCreatePost>
          )}
        </div>
      )}
    </div>
  );
}

const PostsListWithState = withPostsAsyncState(PostsList);

function Posts() {
  const search = useSearch({ from: '/posts' });
  const navigate = useNavigate({ from: '/posts' });
  const { data: users = [] } = useUsers();

  const selectedUserId = search.userId;
  const { data: allPosts = [], isLoading, error } = usePosts();

  const filteredPosts = selectedUserId
    ? allPosts.filter(post => post.userId.toString() === selectedUserId)
    : allPosts;

  const posts = filteredPosts.sort((a, b) => (b.priority || 1) - (a.priority || 1));

  const handleUserFilterChange = (userId: string) => {
    navigate({
      search: userId ? { userId } : {},
    });
  };

  return (
    <PostsListWithState
      posts={posts}
      selectedUserId={selectedUserId}
      onUserFilterChange={handleUserFilterChange}
      users={users}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Route = createLazyFileRoute('/posts')({
  component: Posts,
});

