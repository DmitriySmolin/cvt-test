import React from 'react';
import classes from './input.module.scss';
import openEye from '../../../assets/icons/open-eye.svg';
import hideEye from '../../../assets/icons/hide-eye.svg';

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched;
};

const Input = props => {

  const inputType = props.type || 'text';
  const cls = [classes.input, classes[props.type]];
  const htmlFor = `${inputType}-${Math.random()}`;


  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        className={isInvalid(props) && props.value !== '' ? classes.error : ''}
        type={inputType}
        placeholder={props.placeholder}
        required={props.required}
        pattern={props.pattern}
        id={htmlFor}
        value={props.value}
        checked={props.remember}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
      />
      {props.eye
        &&
        <img
          className={classes.eye}
          src={props.hidePassword ? hideEye : openEye}
          alt={'eye'}
          onClick={props.onClick}
        />}
      {props.type === 'checkbox' && <span>Запомнить</span>}
      {isInvalid(props) && props.value !== '' && <span>{props.errorMessage || 'Введите верное значение'}</span>}
    </div>
  );
};

export default Input;
