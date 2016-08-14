import React from 'react';
import {connect} from 'react-redux';
import Infinite from 'react-infinite';
import { Photo } from './Photo';
import * as actionCreators from '../action-creators';

export const Home = React.createClass({
  render: function() {
    const { photos, offset, limit, loadPhotos } = this.props;
    const mediaHeight = 235;
    return (
      <Infinite
        elementHeight={mediaHeight}
        infiniteLoadBeginEdgeOffset={window.innerHeight}
        useWindowAsScrollContainer
        onInfiniteLoad={function() {
          if (this.isInfiniteLoading) return;
          let ofs = photos.length === 0 ? 0 : offset + limit;
          loadPhotos(ofs, limit);
      }}>
      {photos.map(photo => <Photo key={photo.modelId} height={mediaHeight} photo={photo} />)}
      </Infinite>
    );
  }
})

function mapStateToProps(state, props) {
  return {
    photos: state.viewer.photos || [],
    offset: state.viewer.offset || 0,
    limit: state.viewer.limit || 10,
  };
}

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);
