import { useRef } from 'react';

import InputField from '../form/input-field/input-field';

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
    <div className="App">
      <h1>Complete the form</h1>
      <fieldset>
        <form onSubmit={(e) => onSubmit(e)} ref={formRef}>
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
          <label htmlFor="acceptTerms">
            Accept Terms & Conditions agreement?*
          </label>
          <input
            type="checkbox"
            name="acceptTerms"
            value="yes"
            id="acceptTerms"
          />
          Yes
          <button type="reset" value="reset">
            Reset
          </button>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default FormUncontrolled;
