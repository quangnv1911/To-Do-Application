import { createFileRoute } from '@tanstack/react-router';
import { LOGIN_PATH } from '@/utils/constants';
import { DashboardScreen } from '@/pages';

export const Route = createFileRoute(LOGIN_PATH)({
  component: () => <DashboardScreen />,
});
