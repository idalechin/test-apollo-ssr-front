import React, { Component } from 'react';

import StarIcon from './ic_star_black_24px.svg';
import StarHalfIcon from './ic_star_half_black_24px.svg';
import StarEmptyIcon from './ic_star_border_black_24px.svg';
import Icon from '../../components/icon'

import './style.scss';

export default class Rating extends Component {

  renderStars(rate) {
    const roundedRate = Math.floor(rate);

    const stars = [];
    for (let i=0; i < roundedRate; i++) {
      stars.push(<Icon id={StarIcon} className="star" key={i}/>);
    }

    const rest = rate - roundedRate;
    if( rest && rest < 0.33 ){
      stars.push(<Icon id={StarEmptyIcon} className="star" key={'5'}/>);
    } else if( rest && rest >= 0.33 && rest <= 0.66 ){
      stars.push(<Icon id={StarHalfIcon} className="star" key={'5'}/>);
    } else if (rest && rest > 0.66 ){
      stars.push(<Icon id={StarIcon} className="star" key={'5'}/>);
    }

    const emptyStars = rate ? 5 - stars.length : 5;
    for (let i=0; i < emptyStars; i++) {
      stars.push(<Icon id={StarEmptyIcon} className="star" key={7 + i}/>);
    }

    return stars
  }

  renderSingleStar(rate){
    return (
      <div className="stars__single">
        <Icon id={StarIcon} className="star"/>
        <span className="stars__rate">{rate}</span>
      </div>
    )
  }

  render() {

    const {className, smallView} = this.props;
    const rate = this.props.rate ? this.props.rate : 0;
    return(
      <div className={`stars ${ className ? className : ''}`}>
        {
          smallView ?
            this.renderSingleStar(rate) :
            this.renderStars(rate)
        }
      </div>
    );
  };
}
