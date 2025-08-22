import { useForm } from 'react-hook-form';

import AutocompleteField from '@/components/autocomplete-field/autocomplete-field';
import FileField from '@/components/file-field/file-field';
import InputField from '@/components/input-field/input-field';
import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';
import { type FormValues } from '@/shared/interfaces/form-values';
import { useAppDispatch } from '@/store/redux-hooks';
import { addHookFormData } from '@/store/slices/form-data-slice';

const HookForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  return (
    <fieldset>
      <h2>Hook Form</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          console.log(data);

          dispatch(addHookFormData(data));
        })}
      >
        {FORM_INPUT_FIELDS.map((el) => {
          return (
            <InputField
              key={el.name}
              label={el.label}
              type={el.type}
              name={el.name as keyof FormValues}
              id={el.id}
              placeholder={el.placeholder}
              required={el.required}
              register={register}
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

        <FileField register={register} />

        <AutocompleteField
          htmlFor="country"
          listID="countries"
          id="country"
          name="country"
          options={['Belarus', 'Poland', 'Belgium']}
          register={register}
        />

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

export default HookForm;
