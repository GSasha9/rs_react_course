import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import Tile from './tile';

import { setupStore } from '@/store';
import { MockFormData } from '@/tests/constants/mock-form-data';

describe('Tile', () => {
  it('render tile', () => {
    render(
      <Provider store={setupStore()}>
        <Tile {...MockFormData} />
      </Provider>
    );

    const tileNameFields = screen.getByText('Your name: John');

    expect(tileNameFields).toBeInTheDocument();
  });
});
