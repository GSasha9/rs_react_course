import { useContext } from 'react';

import type { SelectProps } from './models/interfaces';

import './select.scss';

import { LoadingContext } from '@/shared/models/contexts';

const Select = (props: SelectProps) => {
  const loading = useContext(LoadingContext);

  return (
    <select
      name="select"
      className="select"
      onChange={props.onChange}
      value={props.value}
      disabled={loading}
    >
      {props.options.map((el, index) => (
        <option key={index}>{el.key}</option>
      ))}
    </select>
  );
};

export default Select;
