export interface SearchFormProps {
  onResults: (data: Record<string, unknown>[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError?: (error: Error) => void;
}
