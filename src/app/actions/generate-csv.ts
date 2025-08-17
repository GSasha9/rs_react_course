import type { Card } from '@/store/slices/selected-cards-slice';

export async function generateCSV(cards: Card[]): Promise<string> {
  if (cards.length === 0) return '';

  const headers = Object.keys(cards[0]);
  const csvRows = [
    headers.join(','),
    ...cards.map((row) =>
      headers
        .map((fieldName) => {
          let value = row[fieldName as keyof Card];

          if (typeof value === 'string') {
            value = value.replace(/"/g, '""');

            if (value.search(/("|,|\n)/g) >= 0) value = `"${value}"`;
          }

          return value;
        })
        .join(',')
    ),
  ];

  return csvRows.join('\n');
}
