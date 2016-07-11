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
        editingContentType: null,
        editingColour: null,
        editingText: null,
        editingImage: null
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
              changeTileColour={this.changeTileColour}
              userRequestsAddImage={this.userRequestsAddImage}
              changeImageURL={this.changeImageURL}
              tileSelected={this.tileSelected}
        />
      </div>
    );
  },

  tileSelected: function (position) {
    if (this.checkTileInSelected(position)) { //tile already selected
      let tile = this.getTileForEdit(position);
      let tiles = this.removeTileForEdit(position);
      tile.style.outline = '';
      tiles.push(tile);
      this.setState({ tiles: tiles });
      let amendedSelect = this.removeTileFromSelected(position);
      this.setState({ selectedTiles: amendedSelect });
    } else { let tile = this.getTileForEdit(position); //tile not selected
      let tiles = this.removeTileForEdit(position);
      tile.style.outline = 'black 1px solid';
      tiles.push(tile);
      this.setState({ tiles: tiles });
      let newSelectedTiles = this.state.selectedTiles;
      newSelectedTiles.push(position);
      this.setState({ selectedTiles: newSelectedTiles });
    }
  },

  userRequestsEdit: function (position) {
    if (this.state.editing === position) {
      this.setAllEditingToNull();
    } else this.setState({ editing: position,
                           editingContentType: true });
  },

  userRequestsAddImage: function () {
    this.setState({ editingImage: true, editingContentType: null });
  },

  changeImageURL: function (position, urlText) {
    let tile = this.getTileForEdit(position);
    let filteredTiles = this.removeTileForEdit(position);
    tile.content.image = urlText;
    filteredTiles.push(tile);
    this.setState({ tiles: filteredTiles });
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

  onTextSubmit: function () {
    this.setAllEditingToNull();
  },

  userRequestsEditColour: function (position) {
    this.setState({ editingColour: true,
                    editingContentType: null });
  },

  changeTileColour: function (position, colour) {
    let tile = this.getTileForEdit(position);
    let remainingTiles = this.removeTileForEdit(position);
    tile.style.backgroundColor = colour;
    tile.content.style.backgroundColor = colour;
    remainingTiles.push(tile);
    this.setState({ tiles: remainingTiles });
  },

  setAllEditingToNull: function () {
    this.setState({ editing: null,
                    editingContentType: null,
                    editingColour: null,
                    editingText: null,
                    editingImage: null });
  },

  getTileForEdit: function (position) {
    let tileForEdit = this.state.tiles.filter(function (tile) {
      return tile.position === position;
    });
    return tileForEdit[0];
  },

  removeTileForEdit: function (position) {
    let tilesMinusEditedTile = this.state.tiles.filter(function (tile) {
      return tile.position != position;
    });
    return tilesMinusEditedTile;
  },

  checkTileInSelected: function (position) {
    let tiles = this.state.selectedTiles;
    tiles = tiles.filter(function (number) {
      return number === position;
    });
    if (tiles.length === 1) {
      return true;
    } else return false;
  },

  removeTileFromSelected: function (position) {
    let tiles = this.state.selectedTiles;
    tiles = tiles.filter(function (number) {
      return number != position;
    });
    return tiles;
  }

});

module.exports = Gridterest;
