import React, { Component } from 'react';
import Truncate from 'react-text-truncate';
import FontFaceObserver from 'font-face-observer';
import AnimateHeight from 'react-animate-height';

import './style.scss';
import canUseDom from "can-use-dom";

import {generateRandomID} from '../../functions';

export default class TextTruncate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showText: false,
      isMounted: false,
      minHeight: 1,
      randomID: null
    }
  }
  
  componentDidMount(){
    this.setState({isMounted: true, randomID: generateRandomID()});
  }

  componentWillUnmount(){
    this.setState({isMounted: false});
  }

  onEllipsisClick(){
    const {expanded} = this.props
    this.setState({isMounted: true,});
    const { onClick } = this.props ;
    onClick && onClick(!expanded);
  }

  startTimer(){
    const { isMounted } = this.state;
    if(isMounted) this.timer = setTimeout(() => {
      const textEl = document.getElementById(`text-truncate${this.state.randomID}`);
      const elHeight = textEl && textEl.offsetHeight;
      this.setState({
        showText: true,
        minHeight: elHeight ? elHeight : 1
      })
    }, 500);
  }

  stopTimer(){
    clearTimeout(this.timer);
  }

  render(){
    const { text, expanded, className } = this.props ;
    if(!canUseDom){
      return (
        <div className={`text-truncate ${className ? className : ''}`}>
          <div className="text-truncate__text-wrapper" id={`text-truncate${this.state.randomID}`}>
            {text}
          </div>
        </div>
      );
    }

    const _t = this;
    const { showText, isMounted, minHeight } = this.state;
    const lines = this.props.lines || 3;
    const fontObserver = new FontFaceObserver('Open Sans', { weight: 400});

    !isMounted && this.stopTimer();

    if(!showText){
      fontObserver.check('РФ').then(() => {
        _t.startTimer();
      })
    }

    if(!showText || !text || !text.length) return null;

    return (
      <div className={`text-truncate ${className ? className : ''}`}>
        {
          !expanded &&
          <div className="text-truncate__text-wrapper" id={`text-truncate${this.state.randomID}`}>
            <Truncate
              line={lines}
              text= { text }
              truncateText = {'...  '}
              textTruncateChild={<span className='text-truncate__ellipsis' onClick={this.onEllipsisClick.bind(this)}>Show more</span>}
              // className = 'text-truncate__text'
            />
          </div>
        }
        <AnimateHeight
          duration={150}
          height={ expanded ? 'auto' : minHeight }
        >
          <span className='text-truncate__text text-truncate__text--expand'>
            {text}
            <span className='text-truncate__ellipsis text-truncate__ellipsis--expand' onClick={this.onEllipsisClick.bind(this)}> Show less</span>
          </span>
        </AnimateHeight>
      </div>
    )
  }
}
