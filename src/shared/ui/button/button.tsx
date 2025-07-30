import { useContext } from 'react';

import type { ButtonProps } from './models/interfaces/button-props';

import './button.scss';

import { LoadingContext } from '@/shared/models/contexts';

const Button = (props: ButtonProps) => {
  const loading = useContext(LoadingContext);

  return (
    <button
      className={`button ${props.className ?? ''}`}
      onClick={props.callback}
      type={props.type}
      disabled={loading}
    >
      {props.text}
    </button>
  );
};

export default Button;
