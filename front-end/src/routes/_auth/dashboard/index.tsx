import { DashboardScreen } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/dashboard/')({
  component: DashboardScreen,
});
