import React from 'react';
import {connect} from 'react-redux';
import Infinite from 'react-infinite';
import * as actionCreators from '../action-creators';

export const Viewer = React.createClass({
  render: function() {
    const {
      page, photos
    } = this.props;
    console.log(page, photos);

    var elemHeight = 235;


    const elemStyle = {
      height: `${elemHeight}px`,
      overflow: 'hidden'
    }

    const imgStyle = {
      maxHeight: '200px'
    }

    const captionStyle = {
      height: '25px',
      fontSize: '16px',
      borderBottom: '1px solid #ccc'
    }

    return (
      <Infinite containerHeight={window.innerHeight} elementHeight={elemHeight}
        useWindowAsScrollContainer>
      
        {photos.map(photo => <div style={elemStyle} key={photo.modelId}>
          <img style={imgStyle} src={'/thumbnails/'+photo.modelId}/>
          <div style={captionStyle}>Hello</div>
        </div>)}
      </Infinite>
    );
  }
})

function mapStateToProps(state, props) {
  return {
    photos: state.viewer.photos || [],
    page: state.viewer.page
  };
}

export const ViewerContainer = connect(
  mapStateToProps,
  actionCreators
)(Viewer);
