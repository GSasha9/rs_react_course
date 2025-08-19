import { useState } from 'react';

import InputField from '../form/input-field/input-field';

import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';
import { INITIAL_FORM_DATA } from '@/shared/constants/initial-form-data';

const FormControlled = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [gender, setGender] = useState('male');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(
      formData.name,
      formData.age,
      formData.email,
      gender,
      formData.password,
      formData.r_password,
      acceptTerms,
      country
    );
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setGender('male');
    setAcceptTerms(false);
    setCountry('');
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="App">
      <h1>Complete the form</h1>
      <fieldset>
        <form action="#" method="get">
          {FORM_INPUT_FIELDS.map((el) => {
            return (
              <InputField
                key={el.name}
                label={el.label}
                type={el.type}
                name={el.name}
                id={el.id}
                value={formData[el.name as keyof typeof formData]}
                onChange={(value) => handleChange(el.name, value)}
                placeholder={el.placeholder}
                required={el.required}
              />
            );
          })}
          <label htmlFor="gender">Gender*</label>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="other"
            id="other"
            checked={gender === 'other'}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
          <label htmlFor="acceptTerms">
            Accept Terms & Conditions agreement?*
          </label>
          <input
            type="checkbox"
            name="status"
            value="yes"
            id="yes"
            checked={acceptTerms === true}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
          Yes
          <button type="reset" value="reset" onClick={() => handleReset()}>
            Reset
          </button>
          <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default FormControlled;
