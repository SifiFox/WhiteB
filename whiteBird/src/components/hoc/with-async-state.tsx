import { type ComponentType } from 'react';

interface AsyncStateProps {
  isLoading?: boolean;
  error?: Error | null;
  data?: unknown;
}

interface WithAsyncStateOptions {
  loadingMessage?: string;
  errorMessage?: string;
  minHeight?: string;
  showErrorDetails?: boolean;
}

export function withAsyncState<T extends object>(
  Component: ComponentType<T>,
  options: WithAsyncStateOptions = {},
) {
  const {
    loadingMessage = 'Загрузка...',
    errorMessage = 'Произошла ошибка',
    minHeight = 'min-h-[400px]',
    showErrorDetails = true,
  } = options;

  return function WrappedComponent(props: T & AsyncStateProps) {
    const { isLoading, error, ...componentProps } = props;

    if (isLoading) {
      return (
        <div className={`flex justify-center items-center ${minHeight}`}>
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-lg text-muted-foreground">{loadingMessage}</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`flex justify-center items-center ${minHeight}`}>
          <div className="text-center">
            <div className="text-lg text-destructive mb-2">{errorMessage}</div>
            {showErrorDetails && (
              <div className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'Неизвестная ошибка'}
              </div>
            )}
          </div>
        </div>
      );
    }

    return <Component {...(componentProps as T)} />;
  };
}

export const withUsersAsyncState = <T extends object>(Component: ComponentType<T>) =>
  withAsyncState(Component, {
    loadingMessage: 'Загрузка пользователей...',
    errorMessage: 'Ошибка загрузки пользователей',
  });

export const withPostsAsyncState = <T extends object>(Component: ComponentType<T>) =>
  withAsyncState(Component, {
    loadingMessage: 'Загрузка постов...',
    errorMessage: 'Ошибка загрузки постов',
  });

export const withProfileAsyncState = <T extends object>(Component: ComponentType<T>) =>
  withAsyncState(Component, {
    loadingMessage: 'Загрузка профиля...',
    errorMessage: 'Ошибка загрузки профиля',
  });

export const withCommentsAsyncState = <T extends object>(Component: ComponentType<T>) =>
  withAsyncState(Component, {
    loadingMessage: 'Загрузка комментариев...',
    errorMessage: 'Ошибка загрузки комментариев',
    minHeight: 'min-h-[200px]',
  });

export const withPostDetailAsyncState = <T extends object>(Component: ComponentType<T>) =>
  withAsyncState(Component, {
    loadingMessage: 'Загрузка поста...',
    errorMessage: 'Пост не найден',
    minHeight: 'min-h-[400px]',
    showErrorDetails: false,
  });
