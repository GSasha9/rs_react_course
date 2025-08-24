import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import InputField from './input-field';

import type { FormValues } from '@/shared/types/form-values';
import { setupStore } from '@/store';

const MockInputFieldData = {
  type: 'text',
  name: 'name' as keyof FormValues,
  label: 'Name',
  id: 'name',
  placeholder: 'Enter your name',
  required: true,
  error: 'Only letters allowed',
};

describe('InputField', () => {
  it('renders name field', () => {
    render(
      <Provider store={setupStore()}>
        <InputField {...MockInputFieldData} />
      </Provider>
    );

    const label = screen.getByText(/name/i);

    expect(label).toBeInTheDocument();
  });

  it('render name field with register', () => {
    const TestComponent = () => {
      const methods = useForm<FormValues>();

      return (
        <FormProvider {...methods}>
          <InputField {...MockInputFieldData} register={methods.register} />
        </FormProvider>
      );
    };

    render(
      <Provider store={setupStore()}>
        <TestComponent />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Enter your name/i);

    expect(input).toBeInTheDocument();
  });
});
