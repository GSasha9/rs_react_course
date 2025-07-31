const getNavLink = ({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) => {
  return isActive ? 'active' : isPending ? 'pending' : '';
};

export default getNavLink;
