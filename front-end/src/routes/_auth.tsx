import authStore from '@/stores/authState';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const { isAuthenticated } = authStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});
