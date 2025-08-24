import { useRef } from 'react';
import { useEffect, useState } from 'react';

import InputField from '../../input-field/input-field';

import '../forms.scss';

import AutocompleteField from '@/components/autocomplete-field/autocomplete-field';
import FileField from '@/components/file-field/file-field';
import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';
import type { FormValues } from '@/shared/interfaces/form-values';
import { validatedFormSchema } from '@/shared/utils/form-schema';
import { useAppDispatch } from '@/store/redux-hooks';
import { addFormUncontrolledData } from '@/store/slices/form-data-slice';

interface FormUncontrolledProps {
  handleClose: () => void;
}

const FormUncontrolled = ({ handleClose }: FormUncontrolledProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<string>('');

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const input = document.getElementById('name') as HTMLInputElement | null;

    input?.focus();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      name: String(formData.get('name') || ''),
      age: String(formData.get('age') || ''),
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
      r_password: String(formData.get('r_password') || ''),
      gender: String(formData.get('gender') || ''),
      acceptTC: String(formData.get('acceptTerms') || 'no'),
      country: String(formData.get('country')),
      file: fileRef.current,
    };

    const result = validatedFormSchema.safeParse(data);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[String(err.path[0])] = err.message;
        }
      });

      setErrors(newErrors);

      return;
    }

    dispatch(addFormUncontrolledData(result.data));
    handleClose();
  };

  return (
    <fieldset>
      <h2>Uncontrolled Form</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)} ref={formRef}>
        {FORM_INPUT_FIELDS.map((el) => {
          return (
            <div className="field-wrapper" key={el.name}>
              <InputField
                key={el.name}
                label={el.label}
                type={el.type}
                name={el.name as keyof FormValues}
                id={el.id}
                placeholder={el.placeholder}
              />
              {errors[el.name] && <p className="error">{errors[el.name]}</p>}
            </div>
          );
        })}
        <div className="field-wrapper">
          <label htmlFor="gender">Gender*</label>
          <div className="gender-inputs">
            <input type="radio" name="gender" value="male" id="male" />
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              defaultChecked={true}
            />
            Female
            <input type="radio" name="gender" value="other" id="other" />
            Other
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <div className="field-wrapper">
          {' '}
          <div className="acceptTerms-checkbox-wrapper">
            {' '}
            <label htmlFor="acceptTerms">
              Accept Terms & Conditions agreement?*
            </label>
            <span>Yes</span>
            <input
              type="checkbox"
              name="acceptTerms"
              value="yes"
              id="acceptTerms"
            />
          </div>
          {errors.acceptTC && <p className="error">{errors.acceptTC}</p>}
        </div>

        <div className="field-wrapper">
          {' '}
          <FileField
            onFileSelect={(base64) => {
              fileRef.current = base64;
            }}
          />
          {errors.file && <p className="error error-image">{errors.file}</p>}
        </div>

        <div className="field-wrapper">
          {' '}
          <AutocompleteField
            htmlFor="country"
            listID="countries"
            id="country"
            name="country"
            options={['Belarus', 'Poland', 'Belgium']}
          />
          {errors.country && (
            <p className="error error-country">{errors.country}</p>
          )}
        </div>

        <button type="reset" value="reset">
          Reset
        </button>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </fieldset>
  );
};

export default FormUncontrolled;
