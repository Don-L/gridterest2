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
        editing: null,
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
              editing={this.state.editing}
              editingContentType={this.state.editingContentType}
              editingColour={this.state.editingColour}
              editingText={this.state.editingText}
              editingImage={this.state.editingImage}
              userRequestsEdit={this.userRequestsEdit}
              onTextSubmit={this.onTextSubmit}
              changeTileText={this.changeTileText}
              userRequestsEditColour={this.userRequestsEditColour}
        />
      </div>
    );
  },

  userRequestsEdit: function (position) {
    if (this.state.editing === position) {
      this.setAllEditingToNull();
    } else this.setState({ editing: position,
                           editingContentType: true });
  },

  setAllEditingToNull: function () {
    this.setState({ editing: null,
                    editingContentType: null,
                    editingColour: null,
                    editingText: null,
                    editingImage: null });
  },

  changeTileText: function (position, text) {
    let allTiles = this.state.tiles;
    let editedTile = allTiles.filter(function (tile) {
      return tile.position === position;
    }
    );
    editedTile = editedTile[0];
    editedTile.content.text = text;
    let tilesMinusEditedTile = allTiles.filter(function (tile) {
      return tile.position != position;
    }
    );
    tilesMinusEditedTile.push(editedTile);
    let amendedTiles = tilesMinusEditedTile;
    this.setState({ tiles: amendedTiles });
  },

  onTextSubmit: function (position) {
    this.setAllEditingToNull();
  },

  userRequestsEditColour: function (position) {
    this.setState({ editingColour: true,
                    editingContentType: null });
  },

  getTileForEdit: function (position) {
    let tileForEdit = this.state.tiles.filter(function (tile) {
      return tile.position === position;
    });
    return tileForEdit;
  },

  removeTileForEdit: function (position) {
    let tilesMinusEditedTile = this.state.tiles.filter(function (tile) {
      return tile.position != position;
    });
    return tilesMinusEditedTile;
  }

});

module.exports = Gridterest;
