import React from 'react';
import _get from 'lodash/get';

import VenuesSpecificFieldsBig from './big/index';
import VenuesSpecificFieldsMedium from './medium/index';
import VenuesSpecificFieldsSmall from './small/index';

import './style.scss';

export default (props) => {
  const specificFields = _get(props, 'venue.specific_fields', null);
  const { category, size } = props;

  if(!specificFields || !category) return null;

  if(size === 'big'){
    return <VenuesSpecificFieldsBig category={category} specificFields={specificFields}/>;
  } else if (size === 'medium'){
    return <VenuesSpecificFieldsMedium category={category} specificFields={specificFields}/>;
  } else if (size === 'small'){
    return <VenuesSpecificFieldsSmall category={category} specificFields={specificFields}/>;
  }
}
