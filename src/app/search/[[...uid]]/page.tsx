'use client';

import DetailedPage from '@/shared/components/search-page/detailed/detailed-page';
import { useAppSelector } from '@/store/redux-hooks';
import { getSelectedItem } from '@/store/selectors/selected-item.selector';

const DetailedPageUid = () => {
  const selectItem = useAppSelector(getSelectedItem);

  if (selectItem.uid === '') return;

  return <DetailedPage uid={selectItem.uid} page={selectItem.page} />;
};

export default DetailedPageUid;
