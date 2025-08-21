import { useRef } from 'react';

import InputField from '../../input-field/input-field';

import '../forms.scss';

import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';

const FormUncontrolled = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    console.log(formData.get('name'));
    console.log(formData.get('age'));
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('r_password'));
    console.log(formData.get('gender'));
    console.log(formData.get('acceptTerms'));
  };

  return (
    <fieldset>
      <form className="form" onSubmit={(e) => onSubmit(e)} ref={formRef}>
        {FORM_INPUT_FIELDS.map((el) => {
          return (
            <InputField
              key={el.name}
              label={el.label}
              type={el.type}
              name={el.name}
              id={el.id}
              placeholder={el.placeholder}
              required={el.required}
            />
          );
        })}
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
