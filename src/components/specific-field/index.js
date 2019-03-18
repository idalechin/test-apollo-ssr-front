import React from 'react';
import _find from 'lodash/find';

import Icon from '../../components/icon';

import './style.scss';

export default (props) => {
  const { icon, optionName, option, category, onlyIcon, approximately } = props;

  if(!option) return null;

  const categoryVenue = _find(category, {'id': 1});
  const specificFields = categoryVenue.vendor_specific_fields;
  
  const fieldValue = () => {
    if(typeof option === 'string'){
      return option;
    } else {
      const specificField = _find(specificFields, {'name': optionName});
      const specificFieldOption = _find(specificField.options, {'id': option});
      return specificFieldOption.option;
    }
  };
  
  return (
    <div className="specific-fields__item">
      { icon && <Icon className={`specific-fields__icon ${!onlyIcon ? 'specific-fields__icon--margin-right' : ''}`} id={icon}/> }
      { approximately && <span className="venue-specific-fields__approximately" >&#8776;</span>}
      { !onlyIcon && <span className='specific-fields__text'>{fieldValue()}</span>}
    </div>
  )
}
