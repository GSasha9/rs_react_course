import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { getLoadingStatus } from '@/store/selectors/is-loading-selector';
import { toggleLoadingStatus } from '@/store/slices/is-loading-slice';

export const useLoadingStatus = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(getLoadingStatus);

  return {
    loadingStatus,
    toggleLoadingStatus: (isLoading: boolean) =>
      dispatch(toggleLoadingStatus(isLoading)),
  };
};
