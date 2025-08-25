export const FORM_ERRORS = {
  name: {
    required: 'Name is required',
    pattern: 'Name must start with an uppercase letter',
  },
  age: {
    number: 'Age must be a number',
    negative: 'Age cannot be negative',
  },
  email: {
    invalid: 'Invalid email',
  },
  password: {
    min: 'Password must be at least 8 characters',
    upper: 'At least one uppercase letter required',
    lower: 'At least one lowercase letter required',
    number: 'At least one number required',
    special: 'At least one special character required',
  },
  r_password: {
    mismatch: 'Passwords must match',
  },
  gender: {
    required: 'Gender is required',
  },
  acceptTC: {
    required: 'You must accept terms',
  },
  country: {
    required: 'Select a country',
  },
  file: {
    required: 'File is required',
    type: 'Only PNG or JPEG allowed',
  },
};
