import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import FormUncontrolled from './form-uncontrolled';

import { setupStore } from '@/store';

describe('Form', () => {
  it('render form with all required fields', () => {
    render(
      <Provider store={setupStore()}>
        <FormUncontrolled />
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/repeat password/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/yes/i)).toBeInTheDocument();
    expect(screen.getByText(/select country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
