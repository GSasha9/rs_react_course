import DetailedPage from '@/shared/components/search-page/detailed/detailed-page';

interface DetailedPageUidProps {
  uid: string;
  page: number;
}

const DetailedPageUid = ({ uid, page }: DetailedPageUidProps) => {
  if (!uid) return null;

  return <DetailedPage uid={uid} page={page} />;
};

export default DetailedPageUid;
