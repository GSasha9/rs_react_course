import { type UseFormRegister } from 'react-hook-form';

import { type FormValues } from '@/shared/interfaces/form-values';

interface AutocompleteFieldProps {
  htmlFor: string;
  listID: string;
  id: string;
  name: string;
  options: string[];
  register?: UseFormRegister<FormValues>;
}

const AutocompleteField = ({
  htmlFor,
  listID,
  id,
  name,
  options,
}: AutocompleteFieldProps) => {
  return (
    <div className="autocomplete-field">
      <label htmlFor={htmlFor}>Select Country</label>
      <input list={listID} id={id} name={name} />
      <datalist id={listID}>
        {options.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
};

export default AutocompleteField;
