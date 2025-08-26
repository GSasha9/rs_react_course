import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import FormUncontrolled from './form-uncontrolled';

import { setupStore } from '@/store';

describe('Form', () => {
  const user = userEvent.setup();

  it('render form with all required fields', () => {
    render(
      <Provider store={setupStore()}>
        <FormUncontrolled handleClose={vi.fn()} />
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

  it('all fields validate correctly and error messages disappear after correct input', async () => {
    render(
      <Provider store={setupStore()}>
        <FormUncontrolled handleClose={vi.fn()} />
      </Provider>
    );

    const nameField = screen.getByLabelText(/name/i);

    const ageField = screen.getByPlaceholderText(/enter your age/i);

    const emailField = screen.getByLabelText(/enter email/i);

    const passwordField = screen.getByPlaceholderText(/enter password/i);

    const repeatPasswordField = screen.getByPlaceholderText(/repeat password/i);

    const acceptCheckbox = screen.getByLabelText(/accept terms/i);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameField, 'dasha');
    await user.click(submitButton);
    expect(
      await screen.findByText('Name must start with an uppercase letter')
    ).toBeInTheDocument();

    await user.clear(nameField);
    await user.type(nameField, 'Dasha');

    await user.type(ageField, 'abc');
    await user.click(submitButton);
    expect(
      await screen.findByText('Age cannot be negative')
    ).toBeInTheDocument();

    await user.clear(ageField);
    await user.type(ageField, '25');

    await user.type(emailField, 'invalid-email');
    await user.click(submitButton);
    expect(await screen.findByText('Invalid emil')).toBeInTheDocument();

    await user.clear(emailField);
    await user.type(emailField, 'test@example.com');

    await user.type(passwordField, 'short');
    await user.click(submitButton);
    expect(
      await screen.findByText('At least one special character required')
    ).toBeInTheDocument();

    await user.clear(passwordField);
    await user.type(passwordField, 'Test@1234');

    await user.clear(repeatPasswordField);
    await user.type(repeatPasswordField, 'Test@1234');
    await user.click(submitButton);
    expect(
      await screen.findByText('You must accept terms')
    ).toBeInTheDocument();

    await user.click(acceptCheckbox);
    await user.click(submitButton);
    expect(await screen.findByText('Select a country')).toBeInTheDocument();

    await user.type(repeatPasswordField, 'Mismatch123!');
    await user.click(submitButton);
    expect(await screen.findByText('Passwords must match')).toBeInTheDocument();
  });

  it('submit successfully with the correct data', async () => {
    const store = setupStore();
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <FormUncontrolled handleClose={handleClose} />
      </Provider>
    );

    const nameField = screen.getByLabelText(/name/i);
    const ageField = screen.getByPlaceholderText(/enter your age/i);
    const emailField = screen.getByLabelText(/enter email/i);
    const passwordField = screen.getByPlaceholderText(/enter password/i);
    const repeatPasswordField = screen.getByPlaceholderText(/repeat password/i);
    const acceptCheckbox = screen.getByLabelText(/accept terms/i);
    const countryInput = screen.getByLabelText(/select country/i);
    const fileInput = screen.getByLabelText(/choose image/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameField, 'Dasha');
    await user.type(ageField, '25');
    await user.type(emailField, 'test@example.com');
    await user.type(passwordField, 'Test@1234');
    await user.type(repeatPasswordField, 'Test@1234');
    await user.type(countryInput, 'Austria');
    await user.click(acceptCheckbox);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    await user.upload(fileInput, file);

    await user.click(submitButton);

    const state = store.getState().formData;

    expect(state.uncontrolledForm).toEqual(
      expect.objectContaining({
        name: 'Dasha',
        age: '25',
        email: 'test@example.com',
        password: 'Test@1234',
        r_password: 'Test@1234',
        country: 'Austria',
        acceptTC: 'yes',
        file: expect.stringContaining('data:image/png;base64'),
      })
    );

    expect(handleClose).toHaveBeenCalled();
  });
});
