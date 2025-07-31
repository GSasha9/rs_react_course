import './selected-card-flyout.scss';

import { useAppSelector } from '@/hooks/redux-hooks';
import Button from '@/shared/ui/button/button';

const SelectedCardFlyout = () => {
  const cards = useAppSelector((state) => state.selectedCardsCount);

  return (
    <div className="flyout">
      <p>{cards.cardUID.length} items are selected</p>
      <div className="flyout__buttons">
        <Button type="button" text="Unselect All"></Button>
        <Button type="button" text="Download"></Button>
      </div>
    </div>
  );
};

export default SelectedCardFlyout;
