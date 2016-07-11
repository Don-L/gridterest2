const React = require('react');
const TileEditor = require('./TileEditor.jsx');
const Gridfunc = require('./Gridfunc.js');

const Tile = React.createClass({

  render: function () {
    return <h1 style={this.props.style}></h1>;
  }
});

module.exports = Tile;
