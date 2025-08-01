import { deleteAllCards } from './selected-card-slice';
import { downloadCSV } from './utils/download-csv';

import './selected-card-flyout.scss';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useAppDispatch } from '@/hooks/redux-hooks';
import Button from '@/shared/ui/button/button';

const SelectedCardFlyout = () => {
  const cards = useAppSelector((state) => state.selectedCard);

  console.log(cards);
  const dispatch = useAppDispatch();

  const handleUnselectButton = () => {
    dispatch(deleteAllCards());
  };

  const handleDownloadButton = () => {
    downloadCSV(cards.cards, `${cards.cards.length}_items.csv`);
  };

  return (
    <div className={cards.cards.length > 0 ? 'flyout' : 'flyout hidden'}>
      <p>{cards.cards.length} items are selected</p>
      <div className="flyout__buttons">
        <Button
          type="button"
          text="Unselect All"
          callback={handleUnselectButton}
        ></Button>
        <Button
          type="button"
          text="Download"
          callback={handleDownloadButton}
        ></Button>
      </div>
    </div>
  );
};

export default SelectedCardFlyout;
