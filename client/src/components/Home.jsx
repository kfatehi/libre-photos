import React from 'react';
import {connect} from 'react-redux';
import Infinite from 'react-infinite';
import { Link } from 'react-router';
import * as actionCreators from '../action-creators';

export const Home = React.createClass({
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
          <Link to={`/photo/${photo.modelId}`}><img style={imgStyle} src={`/thumbnails/${photo.modelId}`}/></Link>
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

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);
