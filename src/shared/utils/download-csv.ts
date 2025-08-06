import type { Card } from '@/store/slices/selected-cards-slice';

export function downloadCSV(data: Card[], filename: string) {
  if (data.length === 0) return;

  try {
    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(','),
      ...data.map((row) => {
        return headers
          .map((fieldName) => {
            let value = row[fieldName as keyof Card];

            if (typeof value === 'string') {
              value = value.replace(/"/g, '""');

              if (value.search(/("|,|\n)/g) >= 0) {
                value = `"${value}"`;
              }
            }

            return value;
          })
          .join(',');
      }),
    ];

    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate or download CSV:', error);
  }
}
