import React from 'react';
import {connect} from 'react-redux';
import Infinite from 'react-infinite';
import * as actionCreators from '../action-creators';

export const Viewer = React.createClass({
  render: function() {
    const { photos } = this.props;

    const mediaHeight = 235;

    const mediaStyle = {
      height: `${mediaHeight}px`,
      overflow: 'hidden'
    }

    const imgStyle = {
      height: '200px'
    }

    const captionStyle = {
      height: '25px',
      fontSize: '16px',
      borderBottom: '1px solid #ccc'
    }

    return (
      <Infinite containerHeight={window.innerHeight} elementHeight={mediaHeight} useWindowAsScrollContainer>
        {photos.map(photo => <div style={mediaStyle} key={photo.modelId}>
          <a href={`/masters/${photo.modelId}`}><img style={imgStyle} src={`/thumbnails/${photo.modelId}`}/></a>
          <div style={captionStyle}>{photo.UTI}</div>
        </div>)}
      </Infinite>
    );
  }
})

function mapStateToProps(state, props) {
  return {
    photos: state.viewer.photos || []
  };
}

export const ViewerContainer = connect(
  mapStateToProps,
  actionCreators
)(Viewer);
