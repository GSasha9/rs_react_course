import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootSate } from '@/store/store';

export const UseAppDispatch = useDispatch.withTypes<AppDispatch>();

export const UseAppSelector = useSelector.withTypes<RootSate>();
