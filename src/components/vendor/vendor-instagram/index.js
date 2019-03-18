import React, { Component } from 'react';
import InstagramCards from '../../cards/instagram-cards';
import ShowMoreList from '../../show-more-list';

import './style.scss';
import _get from "lodash/get";
import _chunk from "lodash/chunk";

export default class VendorInstagram extends Component {

  render(){
    const { media, title } = this.props;

    if (!media || !media.length || !Array.isArray(media)) return null;

    const mediaChunks = _chunk(media, 9);

    return (
      <ShowMoreList
        title={title}
        data={mediaChunks}
        initNumber={1}
        expandText='Show more Instagram media'
        renderItem={(item, i) => <InstagramCards media={item} modalMedia={media} key={i}/>}
      />
    );
  }
}