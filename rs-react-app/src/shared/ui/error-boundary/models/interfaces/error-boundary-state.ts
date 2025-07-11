export interface ErrorBoundaryState {
  hasErrors: boolean;
  message: string;
  fallback: React.ReactNode;
  children?: React.ReactNode;
}
