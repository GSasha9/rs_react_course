import type { RootState } from '@/tests/test-utils/utils/setup-store';

export const getLoadingStatus = (state: RootState) => state.isLoading.isLoading;
