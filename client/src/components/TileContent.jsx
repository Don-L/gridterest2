const React = require('react');

const TileContent = React.createClass({

  render: function () {

    let markUp = function () {
      return { __html: this.props.content.text };
    }.bind(this);

    return <div style={this.props.content.style}
                dangerouslySetInnerHTML={markUp()}>
           </div>;
  }
});

module.exports = TileContent;
