import type { RequestResults } from '@/shared/models/interfaces';

export interface SearchFormProps {
  onResults: (response: RequestResults) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError?: (error: Error) => void;
  pageNumber: number;
}
