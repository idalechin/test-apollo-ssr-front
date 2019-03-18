import React from 'react';

import Icon from '../icon';
import PhotoIcon from './ic_camera_alt_black_24px.svg';

import './style.scss';

export default function NoImage (props) {
  return (
    <div className="image-wrapper image-wrapper__no-image">
      <Icon id={PhotoIcon}/>
    </div>
  );
}
