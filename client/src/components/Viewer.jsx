import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

export const Viewer = React.createClass({
  render: function() {
    const {
      page, photos
    } = this.props;
    console.log(page, photos);
    return (
      <div>
        {photos.map(photo => <div key={photo.uuid}>
          <pre>{JSON.stringify(photo, null, 4)}</pre>
        </div>)}
      </div>
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
