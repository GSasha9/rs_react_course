import { forwardRef } from 'react';
import { type UseFormRegister } from 'react-hook-form';

import { ALLOWED_TYPES } from '@/shared/constants/allowed-types';
import { type FormValues } from '@/shared/types/form-values';

const mb = 1024 * 1024;
const maxFileSize = 5 * mb;

export interface FileFieldProps {
  register?: UseFormRegister<FormValues>;
  onFileSelect?: (base64: string) => void;
}

const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
  ({ register, onFileSelect }, ref) => {
    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) return;

      if (file.size > maxFileSize) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result as string;

        if (onFileSelect) {
          onFileSelect(base64);
        }
      };
      reader.readAsDataURL(file);
    };

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
          onChange={handleFileChange}
          ref={ref}
        />
        <span>name</span>
      </div>
    );
  }
);

FileField.displayName = 'FileField';

export default FileField;
