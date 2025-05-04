import { DashboardScreen } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/forgot-pass/')({
  component: DashboardScreen,
});
