const ENV = {
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL as string,
};

export { ENV };
