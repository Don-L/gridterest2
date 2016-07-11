const React = require('react');
const Grid = require('./Grid.jsx');
const Nav = require('./Nav.jsx');
const Gridfunc = require('./Gridfunc.js');
const SampleTiles = require('./sample_tiles.js');

const Gridterest = React.createClass({

  getInitialState: function () {
    return (
      {
        tiles: [],
        selectedTiles: [],
        editing: false,
        editingContentType: false,
        editingColour: false,
        editingText: false,
        editingImage: false
      }
    );
  },

  componentDidMount: function () {
    let tiles = SampleTiles;
    this.setState({ tiles: SampleTiles });
  },

  render: function () {
    return (
      <div>
        <Nav/>
        <Grid tiles={this.state.tiles}
              selectedTiles={this.state.selectedTiles}
              editingContentType={this.state.editingContentType}
              editingColour={this.state.editingColour}
              editingText={this.state.editingText}
              editingImage={this.state.editingImage}
        />
      </div>
    );
  }

});

module.exports = Gridterest;
