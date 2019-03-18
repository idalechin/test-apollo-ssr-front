import React from 'react';

import './style.scss';

export default (props) => {
  const { pricing, className, color } = props ;

  if (!pricing) return null;

  const pricingArray = [];

  for (let i=0; i < pricing; i++) {
    pricingArray.push('$');
  }

  return (
    <span
      className={`pricing ${className ? className : ''} ${color === 'text' ? 'pricing--text' : ''}`}
    >
      {pricingArray.join('')}
    </span>
  )
}
