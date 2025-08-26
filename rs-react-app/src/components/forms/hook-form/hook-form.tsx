import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import AutocompleteField from '@/components/autocomplete-field/autocomplete-field';
import FileField from '@/components/file-field/file-field';
import InputField from '@/components/input-field/input-field';
import { FORM_INPUT_FIELDS } from '@/shared/constants/form-input-fields';
import { type FormValues } from '@/shared/types/form-values';
import { validatedFormSchema } from '@/shared/utils/form-schema';
import { useAppDispatch } from '@/store/redux-hooks';
import { getCountries } from '@/store/selectors/country.selector';
import { addHookFormData } from '@/store/slices/form-data-slice';

interface HookFormProps {
  handleClose: () => void;
}

const HookForm = ({ handleClose }: HookFormProps) => {
  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(validatedFormSchema),
    reValidateMode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const { errors, isValid } = formState;

  const countries = useSelector(getCountries);

  return (
    <fieldset>
      <h2>Hook Form</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          dispatch(addHookFormData(data));

          handleClose();
        })}
      >
        {FORM_INPUT_FIELDS.map((el) => {
          return (
            <div className="field-wrapper" key={el.name}>
              {' '}
              <InputField
                key={el.name}
                label={el.label}
                type={el.type}
                name={el.name as keyof FormValues}
                id={el.id}
                placeholder={el.placeholder}
                register={register}
              />{' '}
              {errors[el.name as keyof FormValues] && (
                <p className="error">
                  {errors[el.name as keyof FormValues]?.message as string}
                </p>
              )}
            </div>
          );
        })}
        <div className="field-wrapper">
          {' '}
          <label htmlFor="gender">Gender*</label>
          <div className="gender-inputs">
            <input
              type="radio"
              value="male"
              id="male"
              {...register('gender')}
            />
            Male
            <input
              type="radio"
              value="female"
              id="female"
              defaultChecked={true}
              {...register('gender')}
            />
            Female
            <input
              type="radio"
              value="other"
              id="other"
              {...register('gender')}
            />
            Other
          </div>{' '}
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <div className="field-wrapper">
          <div className="acceptTerms-checkbox-wrapper">
            {' '}
            <label htmlFor="acceptTC">
              Accept Terms & Conditions agreement?*
            </label>
            <span>Yes</span>
            <input
              type="checkbox"
              value="yes"
              id="acceptTC"
              {...register('acceptTC')}
            />
          </div>{' '}
          {errors.acceptTC && (
            <p className="error">{errors.acceptTC.message}</p>
          )}
        </div>

        <div className="field-wrapper">
          {' '}
          <FileField
            register={register}
            onFileSelect={(base64) => {
              setValue('file', base64);
            }}
          />{' '}
          {errors.file && (
            <p className="error error-image">{errors.file.message}</p>
          )}
        </div>

        <div className="field-wrapper">
          {' '}
          <AutocompleteField
            htmlFor="country"
            listID="countries"
            id="country"
            name="country"
            options={countries[0].countries}
            register={register}
          />
          {errors.country && (
            <p className="error error-country">{errors.country.message}</p>
          )}
        </div>

        <button type="reset" value="reset">
          Reset
        </button>
        <button type="submit" value="Submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </fieldset>
  );
};

export default HookForm;
