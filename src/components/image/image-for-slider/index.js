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
    }
  }

  onLoad = () => {
    this.setState({loaded: true});
  };

  render(){
    const { image, height } = this.props;
    const { loaded } = this.state;

    const style = loaded ? {width: 'auto', flexBasis: 0,} : { width: height, minWidth: height }

    if(image){
      return (
        <div className={`slider-image ${!loaded ? 'slider-image--loading' : ''}`} style={style}>
          <img className='slider-image__simple-image' src={image} onLoad={this.onLoad}/>
          { !loaded && <Icon id={IconRoll} className='slider-image__icon'/>}
        </div>
      );
    }

    return <NoSliderImage {...props} />
  }
}