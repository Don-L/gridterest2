const React = require('react');

const TileContent = React.createClass({

  render: function () {

    let picDivStyle = this.props.content.style;
    picDivStyle.objectFit = 'contain';
    picDivStyle.display = 'flex'; //new stuff these three lines
    picDivStyle.justifyContent = 'center';
    // picDivStyle.alignItems = 'center';

    let picStyle = {objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', margin: '0 auto'}

    if (this.props.content.fill) {
      picDivStyle.objectFit = 'fill';
      picStyle = {objectFit: 'fill', margin: '0 auto'}
    }

    if (this.props.content.image) {
      return <div style={picDivStyle}>
              <img src={this.props.content.image} style={picStyle}/>
             </div>;
    } else {
      let markUp = function () {
        return { __html: this.props.content.text };
      }.bind(this);

      return <div style={this.props.content.style}
                dangerouslySetInnerHTML={markUp()}>
           </div>;
    }
  }
});

module.exports = TileContent;
