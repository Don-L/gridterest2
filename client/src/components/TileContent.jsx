const React = require('react');

const TileContent = React.createClass({

  render: function () {

    if (this.props.content.image) {
      return <div objectFit='contain' height='100%'>
              <img src={this.props.content.image} height='100%'/>
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
