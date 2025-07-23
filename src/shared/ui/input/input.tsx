import { useContext } from 'react';

import type { InputProps } from './models/interfaces';

import './input.scss';

import { LoadingContext } from '@/shared/models/contexts';

const Input = (props: InputProps) => {
  const loading = useContext(LoadingContext);

  return (
    <input
      type={props.type || 'text'}
      placeholder={props.placeholder || 'enter your search query'}
      className={props.className || 'input'}
      value={props.value}
      onChange={props.onChange}
      name="inpit-search"
      disabled={loading}
    ></input>
  );
};

export default Input;
