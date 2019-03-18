import React, { Component } from 'react';
import Image from '../image';
import Icon from '../icon';
import PhotoIcon from './ic_camera_alt_black_24px.svg';
import RollingIcon from './Rolling.svg';

import './style.scss';

export default class Cover extends Component {

  renderImage(){

    const { media, mediaSize, background, isContain } = this.props;

    let image = null;
    let retinaImage = null;

    if(!media || media.status === 'error'){
      return <div className="cover__empty"><Icon id={PhotoIcon}/></div>
    }

    if (media && media.status === 'loading'){
      return <Icon className="cover__loader" id={RollingIcon} />
    }

    if(media && media.id) {
      image = media.images[mediaSize];
    }

    return  <Image image={image} size={isContain ? 'contain' : 'cover'} background={background ? background : null}/>;
  }

  render() {

    const { size, className} = this.props;

    return(
      <div className={`cover cover--absolute`}>
        { this.renderImage() }
      </div>
    );
  };
}
