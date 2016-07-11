const React = require('react');
const TileEditor = require('./TileEditor.jsx');
const Gridfunc = require('./Gridfunc.js');
const TileContent = require('./TileContent.jsx');

const Tile = React.createClass({

  render: function () {
    return <div style={this.props.style}>
              <TileContent content={this.props.content}/>
           </div>;
  }
});

module.exports = Tile;
