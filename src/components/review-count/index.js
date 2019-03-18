import React from 'react';

import './style.scss';

export default (props) => {
  const { className } = props ;
  const reviews = props.reviews ? props.reviews : '0';

  return (
    <span className={`review-count ${className ? className : ''}`}>{reviews + (reviews === 1 ? ' review' : ' reviews')}</span>
  )
}
