import React, {Component} from 'react';
import NoSliderImage from './no-slider-image';
import IconRoll from '../Rolling.svg';
import Icon from '../../icon';

import './style.scss';

export default class ImageForSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false,
      prefix: ''
    }
  }

  onLoad = () => {
    this.setState({
      loaded: true,
      error: false,
      prefix: ''
    });
    this.stopTimer();
  };

  onError = () => {
    this.setState({
      error: true,
      loaded: false
    });
    this.startTimer();
  };

  startTimer(){
    this.timer = setTimeout(() => this.setState({prefix: "?timestamp="  + new Date().getTime()}), 2000);
  }

  stopTimer(){
    clearTimeout(this.timer);
  }

  render(){
    const { image, errorText } = this.props;
    const { loaded, error, prefix } = this.state;
    const src = image + prefix;    

    if(image){
      return (
        <div className={`video-preview ${!loaded || error ? 'video-preview--loading' : ''}`}>
          <img className='video-preview__simple-image' src={src} onLoad={this.onLoad} onError={this.onError}/>
          { !loaded || error ? <Icon id={IconRoll} className='video-preview__icon'/> : null}
        </div>
      );
    }

    return <NoSliderImage {...props} />
  }
}