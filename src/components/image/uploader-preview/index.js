import React, {Component} from 'react';
import NoSliderImage from '../no-image';
import IconRoll from '../Rolling.svg';
import Icon from '../../icon';

import './style.scss';

export default class UploaderPreview extends Component {
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
    this.timer = setTimeout(() => this.setState({prefix: "?timestamp="  + new Date().getTime()}), 1000);
  }

  stopTimer(){
    clearTimeout(this.timer);
  }

  render(){
    const { image } = this.props;
    const { loaded, error, prefix } = this.state;
    const src = image + prefix;    

    return (
      <div className={`uploader-preview ${!loaded || error ? 'uploader-preview--loading' : ''}`}>
        <img className='uploader-preview__simple-image' src={src} onLoad={this.onLoad} onError={this.onError}/>
        { !loaded || error ? <Icon id={IconRoll} className='uploader-preview__icon'/> : null}
      </div>
    );
  }
}