import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import NoMatches from '../no-matches';
import Loader from '../loader'

import {scrollTo} from '../../functions';
import './style.scss';
import canUseDom from "can-use-dom";

export default class ServerPagination extends Component {

  changeCurrentPage(item, type){
    const { onChangePage } = this.props;

    onChangePage && onChangePage(item, type);

    if(!canUseDom) return;
    const root = document.getElementById("root");
    const offsetTop = root && root.offsetTop
    scrollTo(document.documentElement, offsetTop, 200);
  }

  renderControl(pagesArray, page) {
    return(
      <div className='server-pagination__control-wrapper '>
        <ul className='server-pagination__control'>
          {
            pagesArray.map( (item ,i) => {
              if(item === 'prev'){
                return <li
                  key={`server-pagination-button_${i}`}
                  className={`btn btn--extra-small btn--secondary server-pagination__button`}
                  onClick = { this.changeCurrentPage.bind(this, page - 1, '_PREVIOUS') }
                >
                        <span>
                          {`< `}
                          <span className='server-pagination__button-full'>Previous</span>
                        </span>
                </li>
              } else if (item === 'next'){
                return <li
                  key={`server-pagination-button_${i}`}
                  className={`btn btn--extra-small btn--secondary server-pagination__button`}
                  onClick = { this.changeCurrentPage.bind(this, page + 1, '_NEXT' )}
                >
                        <span>
                          <span className='server-pagination__button-full'>Next</span>
                          {` >`}
                        </span>
                </li>
              }
              return <li
                key={`server-pagination-button_${i}`}
                className={`btn btn--extra-small btn--secondary server-pagination__button ${item === page ? 'active' : ''}`}
                onClick = { this.changeCurrentPage.bind(this, item, '') }>
                {item}
              </li>
            })
          }
        </ul>
      </div>
    )
  };

  render() {
    const { className, currentPage, pageNumber, children, loading } = this.props;
    const page = +currentPage;
    const pagesArray = [];

    page !== 1 && pageNumber !== 1 && pagesArray.push( `prev` );

    for(let i = 1; i <= pageNumber; i++){
      if(i >= page - 3 && i <= page + 3){
        pagesArray.push( i )
      }
    }

    page !== pageNumber && pageNumber !== 1 && pagesArray.push( 'next' );

    if(loading) return <Loader/>

    if(!children || !children.length) return <NoMatches/>;

    return(
      <div className='server-pagination' id='server-pagination'>
        <ul className={`server-pagination__list ${className ? className : ''}`}>
          <ReactCSSTransitionGroup
            transitionName="server-pagination"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            { children }
          </ReactCSSTransitionGroup>
        </ul>
        {
          pagesArray && pagesArray.length && pagesArray.length > 1 ?
            this.renderControl(pagesArray, page) :
            null
        }
      </div>
    );
  };
}
