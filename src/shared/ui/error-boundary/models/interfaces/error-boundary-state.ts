export interface ErrorBoundaryState {
  hasErrors: boolean;
  message: string;
  children?: React.ReactNode;
}
