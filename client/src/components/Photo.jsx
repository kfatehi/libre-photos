import React from 'react';

export const Photo = React.createClass({
  render: function() {
    console.log(this.props);
    const { params: { modelId } } = this.props;
    const imgSrc = `/masters/${modelId}`;
    const imgStyle = {
      width:'100%',
      height:'100%'
    };
    return <a href={imgSrc}><img style={imgStyle} src={imgSrc}/></a>;
  }
})
