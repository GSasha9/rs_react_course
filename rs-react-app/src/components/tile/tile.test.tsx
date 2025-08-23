import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import Tile from './tile';

import { setupStore } from '@/store';
import { MockTileData } from '@/tests/utils/mock-tile-data';

describe('Tile', () => {
  it('render tile', () => {
    render(
      <Provider store={setupStore()}>
        <Tile {...MockTileData} />
      </Provider>
    );

    const tileNameFields = screen.getByText('Your name: John');

    expect(tileNameFields).toBeInTheDocument();
  });
});
