'use client';

import DetailedPageUid from './detailed-page-uid';

import { useAppSelector } from '@/store/redux-hooks';
import { getSelectedItem } from '@/store/selectors/selected-item.selector';

const DetailedPageUidClient = () => {
  const selectItem = useAppSelector(getSelectedItem);

  if (!selectItem.uid) return null;

  return <DetailedPageUid uid={selectItem.uid} page={selectItem.page} />;
};

export default DetailedPageUidClient;
