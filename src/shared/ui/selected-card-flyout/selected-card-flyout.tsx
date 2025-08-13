import './selected-card-flyout.scss';

import { useSelectedCards } from '@/hooks/use-selected-cards';
import { useTheme } from '@/hooks/use-theme';
import Button from '@/shared/ui/button/button';
import { downloadCSV } from '@/shared/utils/download-csv';

const SelectedCardFlyout = () => {
  const { cards, deleteAllCards } = useSelectedCards();
  const { nightTheme } = useTheme();

  const handleUnselect = () => {
    deleteAllCards();
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
