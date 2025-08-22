import { type UseFormRegister } from 'react-hook-form';

import { type FormValues } from '@/shared/interfaces/form-values';

export interface FileFieldProps {
  register?: UseFormRegister<FormValues>;
}

const FileField = ({ register }: FileFieldProps) => {
  return (
    <div className="file-input">
      <label htmlFor="file" className="file-label">
        Choose image
      </label>
      <input
        {...(register ? register('file') : {})}
        type="file"
        id="file"
        name="file"
        hidden
      />
      <span>name</span>
    </div>
  );
};

export default FileField;
