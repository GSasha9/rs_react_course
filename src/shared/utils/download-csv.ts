import { generateCSV } from '@/app/actions/generate-csv';
import { Card } from '@/store/slices/selected-cards-slice';

async function downloadCSV(cards: Card[]) {
  const csvString = await generateCSV(cards);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${cards.length}_items.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default downloadCSV;
