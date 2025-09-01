import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import InputField from '../../input/input';

import '../forms.scss';

import AutocompleteField from '@/components/autocomplete-field/autocomplete-field';
import FileField from '@/components/file-field/file-field';
import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';
import { INITIAL_FORM_DATA } from '@/shared/constants/initial-form-data';
import type { FormValues } from '@/shared/types/form-values';
import { validatedFormSchema } from '@/shared/utils/form-schema';
import { useAppDispatch } from '@/store/redux-hooks';
import { getCountries } from '@/store/selectors/country.selector';
import { addFormUncontrolledData } from '@/store/slices/form-data-slice';

interface FormUncontrolledProps {
  handleClose: () => void;
}

const FormUncontrolled = ({ handleClose }: FormUncontrolledProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<string>('');

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = useSelector(getCountries);

  useEffect(() => {
    const input = document.getElementById('name') as HTMLInputElement | null;

    input?.focus();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      name: String(formData.get('name') || INITIAL_FORM_DATA.name),
      age: String(formData.get('age') || INITIAL_FORM_DATA.age),
      email: String(formData.get('email') || INITIAL_FORM_DATA.email),
      password: String(formData.get('password') || INITIAL_FORM_DATA.password),
      r_password: String(
        formData.get('r_password') || INITIAL_FORM_DATA.r_password
      ),
      gender: String(formData.get('gender') || INITIAL_FORM_DATA.gender),
      acceptTC: String(formData.get('acceptTC') || INITIAL_FORM_DATA.acceptTC),
      country: String(formData.get('country')),
      file: fileRef.current,
    };

    const result = validatedFormSchema.safeParse(data);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[String(err.path[0])] = err.message;
        } else {
          newErrors['r_password'] = err.message;
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
          <div className="acceptTerms-checkbox-wrapper">
            <label htmlFor="acceptTC">
              Accept Terms & Conditions agreement?*
            </label>
            <span>Yes</span>
            <input type="checkbox" name="acceptTC" value="yes" id="acceptTC" />
          </div>
          {errors.acceptTC && <p className="error">{errors.acceptTC}</p>}
        </div>

        <div className="field-wrapper">
          <FileField
            onFileSelect={(base64) => {
              fileRef.current = base64;
            }}
          />
          {errors.file && <p className="error error-image">{errors.file}</p>}
        </div>

        <div className="field-wrapper">
          <AutocompleteField
            htmlFor="country"
            listID="countries"
            id="country"
            name="country"
            options={countries[0].countries}
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
