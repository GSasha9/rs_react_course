import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootSate } from '@/store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootSate>();
