import { Layout } from '@/components/ui/layout';
import { Header } from '@/components/widgets/header/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Header />
      <div className="flex-1 container mx-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </Layout>
  ),
});
