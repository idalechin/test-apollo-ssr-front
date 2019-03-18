import React, { Component } from 'react';
import {Radio} from 'react-radio-group'

import './style.scss';

export default class RadioButton extends Component{

  constructor(props){
    super(props);

    this.state ={
      isChecked : props.checked
    };

  }

  componentWillReceiveProps(newProps) {
    const { checked } = newProps;
    this.setState({isChecked : checked});
  }

  render() {

    const isDisabled = this.props.disabled;
    const checkedClass = this.state.isChecked ? 'styled-radio-btn__checked' : '';
    const className = this.props.className ? this.props.className : '';
    const size = this.props.size === 'small' ? 'styled-radio-btn--small' : '';

    return (
      <label className={`styled-radio-btn clearfix ${checkedClass} ${className} ${size} ${isDisabled ? "disabled" : ''}`}>
        <Radio value={this.props.value} disabled={isDisabled} />
        <span className="styled-radio-btn__fake">
					<span className="styled-radio-btn__fake-circle"/>
				</span>
        <span className="styled-radio-btn__title">{this.props.label}</span>
      </label>
    );
  }
}
