import React from 'react';

const Media = React.createClass({
  render: function() {
    const { height, UTI, thumbPath, srcPath } = this.props;
    const style = { height: height };
    switch (UTI) {
      case 'com.apple.quicktime-movie':
        return <video style={style} poster={thumbPath} 
          controls onClick={(ev)=> ev.target.play()}>
          <source src={srcPath}/>
        </video>;
      default: 
        return <a href={srcPath}><img style={style} src={thumbPath}/></a>;
    }
  }
})

export const Photo = React.createClass({
  render: function() {
    const { height, photo: { UTI, modelId, imageDate, imageTimeZoneOffsetSeconds } } = this.props;
    const srcPath = `/masters/${modelId}`;
    const thumbPath = `/thumbnails/${modelId}`;

    const captionStyle = {
      height: 25,
      fontSize: 16,
      borderBottom: '1px solid #ccc'
    }

    return <div height={height}>
      <Media height={height-captionStyle.height} UTI={UTI} thumbPath={thumbPath} srcPath={srcPath} />
      <div style={captionStyle}>
        {parseDate(imageDate + imageTimeZoneOffsetSeconds).toString() }
      </div>
    </div>
  }
})

function parseDate(dbDate) {
  return new Date(Math.round(new Date((dbDate + 978307200) * 1000)));
}

