import { useContext } from 'react';

import { deleteAllCards } from '../../../store/selected-cards/slices/selected-cards-slice';

import './selected-card-flyout.scss';

import { ThemeContext } from '@/contexts/theme-context';
import Button from '@/shared/ui/button/button';
import { downloadCSV } from '@/shared/utils/download-csv';
import { useAppSelector } from '@/store/redux-hooks';
import { useAppDispatch } from '@/store/redux-hooks';
import { getSelectedCards } from '@/store/selectors/selectedCardSelector';

const SelectedCardFlyout = () => {
  const cards = useAppSelector(getSelectedCards);
  const { nightTheme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const handleUnselect = () => {
    dispatch(deleteAllCards());
  };

  const handleDownload = () => {
    try {
      downloadCSV(cards, `${cards.length}_items.csv`);
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  const flyoutClass =
    cards.length > 0
      ? nightTheme
        ? 'flyout night-theme'
        : 'flyout'
      : 'flyout hidden';

  const numberOfSelectedItems = cards.length;

  return (
    <div className={flyoutClass}>
      <p>{numberOfSelectedItems} items are selected</p>
      <div className="flyout__buttons">
        <Button
          type="button"
          text="Unselect All"
          callback={handleUnselect}
        ></Button>
        <Button
          type="button"
          text="Download"
          callback={handleDownload}
        ></Button>
      </div>
    </div>
  );
};

export default SelectedCardFlyout;
