import React from 'react';

export default (props) => {
  const symbol = props && props.id

  return (
    <svg 
      viewBox={`${symbol.viewBox}`}
      {...{className: props.className, onClick: props.onClick}} 
      style={props.style}
    >
      <use xlinkHref={`#${symbol.id}`} />
    </svg>
  )
}
