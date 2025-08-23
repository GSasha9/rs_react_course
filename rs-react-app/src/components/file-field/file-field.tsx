import { forwardRef } from 'react';
import { type UseFormRegister } from 'react-hook-form';

import { type FormValues } from '@/shared/interfaces/form-values';

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

      const allowedTypes = ['image/png', 'image/jpeg'];

      if (!allowedTypes.includes(file.type)) return;

      if (file.size > 5 * 1024 * 1024) return;

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
