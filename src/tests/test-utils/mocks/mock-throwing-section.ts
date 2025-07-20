import { vi } from 'vitest';

export const mockThrowingSection = async () => {
  vi.doMock('@/shared/ui/section/section', () => ({
    default: () => {
      throw new Error('mock error');
    },
  }));

  return (await import('@/shared/ui/section/section')).default;
};
