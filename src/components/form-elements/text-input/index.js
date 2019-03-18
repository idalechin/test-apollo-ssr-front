import React from 'react';

import Icon from '../../icon';
import Button from '../../button';

import './style.scss';


export default (field) => {

  const idPostfix = (Math.random() + Math.random()).toString();
  function renderLabel(){

    const { label} = field;

    return (
      <label className="text-input__label">{label}</label>
    )
  }

  function renderIcon(){

    const { icon, iconColor } = field;

    return (
      <label htmlFor={defaultText + idPostfix}>
        <Icon id={icon} className='text-input__icon' style={iconColor ? {fill: iconColor} : null}/>
      </label>
    )
  }

  function renderButton(){
    const { buttonText} = field;
    return(
      <Button text={buttonText} className="text-input__btn"/>
    )
  }

  function renderDefaultText(){
    const { defaultText} = field;

    return(
      <label htmlFor={defaultText + idPostfix} className='text-input__default-text'>{defaultText}</label>
    )
  }

  function renderBorderBottom(){
    return(
      <span className="text-input__border-bottom"/>
    )
  }

  function onKeyPress(event){    
    if(field.onlyNumbers){
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
      if (/\D/.test(keyValue)) event.preventDefault();
    }
  }

  const {icon, buttonText, label, error, defaultText, validate, pattern, disclaimer, disabled } = field;
  const className = field.className ? field.className : '';
  const placeholder = field.placeholder ? field.placeholder : '';
  const type = field.type ? field.type : 'text';
  const onChange = field.onChange ? field.onChange : null;

  const isError = field.meta && field.meta.touched && field.meta.error;
  const errorClass = isError || error ? "has-error" : "";
  const iconClass = icon ? 'text-input__input--icon' : '';
  const paddingLeftClass = defaultText ? 'text-input__input--padding-left-0' : '';

  return(
    <div className={`text-input ${buttonText ? 'text-input--with-button' : ''} `}>
      <div>
        { label ? renderLabel() : null }
      </div>
      <div className="flex flex--full-width text-input__wrapper">
        { defaultText ? renderDefaultText() : null }
        <input
          id={defaultText + idPostfix}
          className={`text-input__input ${iconClass} ${className} ${errorClass} ${paddingLeftClass}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          pattern={pattern}
          onKeyPress={e => onKeyPress(e)}
          disabled = {disabled ? 'disabled' : false}
          {...field.field} />
        { validate ? validate : null}
        { defaultText ? renderBorderBottom() : null }
        { icon ? renderIcon() : null}
        { buttonText ? renderButton() : null}
        { isError ? <span className="text-danger error">{field.meta && field.meta.error}</span> : null}
      </div>
      {
        disclaimer && !isError ?
        <p className='text-input__disclaimer'>{disclaimer}</p> :
        null
      }
    </div>
  );

};


