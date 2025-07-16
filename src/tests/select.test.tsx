import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import Select from '@/shared/ui/select/select';

const mockData = {
  company: 'company',
  comicStrip: 'comicStrip',
  organization: 'organization',
  soundtrack: 'soundtrack',
  character: 'character',
};

const mockDataArray = Object.entries(mockData).map(([value]) => ({
  key: value,
  value,
}));

test('Select renders whith given options', () => {
  const { container, rerender } = render(
    <Select options={mockDataArray} value={mockDataArray[0].value}></Select>
  );

  const select = container.querySelector('select');

  const length = select?.options.length;

  expect(length).toEqual(5);

  mockDataArray.push({ key: 'dog', value: 'dog' });

  rerender(
    <Select options={mockDataArray} value={mockDataArray[0].value}></Select>
  );

  const selectAfter = container.querySelector('select');

  expect(selectAfter?.options.length).toBe(6);
});
