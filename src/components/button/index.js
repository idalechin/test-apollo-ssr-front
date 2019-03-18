import React, { Component } from 'react';
import Icon from '../../components/icon';

import './style.scss';

export default class Button extends Component {

  constructor(props) {
    super(props);

    this.state ={
      active: false
    };
  }

  renderIcon(){
    const {icon, activeIcon} = this.props;

    if(activeIcon && this.state.active){
      return(
        <Icon id={activeIcon} className="btn__icon"/>
      )
    }
    else {
      return(
        <Icon id={icon} className="btn__icon"/>
      )
    }

  }

  onClickFunction(e){

    const { toggle, onClick } = this.props;

    if(!toggle && !onClick) return false;

    if(toggle){
      this.setState({
        active: !this.state.active
      })
    } else if ( onClick ){
      onClick(e);
    }
  }

  render() {

    const {className, text, icon, onClick, toggle, disable, type} = this.props;
    const { active } = this.state;

    return(
      <button
        type={type}
        className={`btn ${className ? className : ''} ${ active ? 'active' : ''} ${disable ? 'disabled' : ''}`}
        onClick={ e => this.onClickFunction(e) }>

        { icon ? this.renderIcon() : null }
        <span className='btn__text'>{ text }</span>

      </button>
    );
  };
}
