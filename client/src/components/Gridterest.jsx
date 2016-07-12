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
        columns: 5,
        selectedTiles: [],
        editing: null,
        editingContentType: null,
        editingColour: null,
        editingText: null,
        editingImage: null,
        editingTileSize: null,
        dragging: null,
        dragTarget: null
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
              columns={this.state.columns}
              selectedTiles={this.state.selectedTiles}
              editing={this.state.editing}
              editingContentType={this.state.editingContentType}
              editingColour={this.state.editingColour}
              editingText={this.state.editingText}
              editingImage={this.state.editingImage}
              editingTileSize={this.state.editingTileSize}
              userRequestsEdit={this.userRequestsEdit}
              onTextSubmit={this.onTextSubmit}
              changeTileText={this.changeTileText}
              userRequestsEditColour={this.userRequestsEditColour}
              changeTileColour={this.changeTileColour}
              userRequestsAddImage={this.userRequestsAddImage}
              changeImageURL={this.changeImageURL}
              tileSelected={this.tileSelected}
              logDragging={this.logDragging}
              logDragTarget={this.logDragTarget}
              swapPositions={this.swapPositions}
              userRequestsChangeTileSize={this.userRequestsChangeTileSize}
              changeTileSize={this.changeTileSize}
        />
      </div>
    );
  },

  logDragging: function (position) {
    this.setState({ dragging: position });
  },

  logDragTarget: function (position) {
    this.setState({ dragTarget: position });
  },

  swapPositions: function () {
    let draggedTile = this.getTileForEdit(this.state.dragging);
    let targetTile = this.getTileForEdit(this.state.dragTarget);
    let newTiles = this.state.tiles.filter(function (tile) {
      return ((tile.position != draggedTile) && (tile.position != targetTile));
    }
    );
    draggedTile.position = this.state.dragTarget;
    targetTile.position = this.state.dragging;
    newTiles.push(draggedTile);
    newTiles.push(targetTile);
    this.setState({ tiles: newTiles });
  },

  tileSelected: function (position) {
    if (this.checkTileInSelected(position)) { //tile already selected
      let tile = this.getTileForEdit(position);
      let tiles = this.removeTileForEdit(position);
      // tile.style.outline = '';
      tiles.push(tile);
      this.setState({ tiles: tiles });
      let newSelectedTiles = this.removeTileFromSelected(position);
      newSelectedTiles = this.sortSelectedTiles(newSelectedTiles);
      this.setState({ selectedTiles: newSelectedTiles });
    } else {
      let tile = this.getTileForEdit(position); //tile not selected
      let tiles = this.removeTileForEdit(position);
      // tile.style.outline = 'black 1px solid';
      tiles.push(tile);
      this.setState({ tiles: tiles });
      let newSelectedTiles = this.state.selectedTiles;
      newSelectedTiles.push(position);
      newSelectedTiles = this.sortSelectedTiles(newSelectedTiles);
      this.setState({ selectedTiles: newSelectedTiles });
    }
  },

  userRequestsEdit: function (position) {
    if (this.state.editing === position) {
      this.setAllEditingToNull();
    } else if (this.state.selectedTiles.length === 0) {
        this.setState({ editing: position,
                             editingContentType: true });
    } else if (this.state.selectedTiles[0] === position) {
        this.setState({ editing: position,
                             editingContentType: true });
    }
  },

  userRequestsAddImage: function () {
    this.setState({ editingImage: true, editingContentType: null });
  },

  userRequestsChangeTileSize: function () {
    this.setState({ editingTileSize: true, editingContentType: null });
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

  onTextSubmit: function (position) {
    //single tile selected for edit
    if (this.state.selectedTiles.length === 0) {
      this.setAllEditingToNull();
      //first tile of selected group selected for edit
    } else if (this.state.selectedTiles.length === 2) {
      let tile = this.getTileForEdit(position);
      let newTiles = this.removeTileForEdit(position);
      tile.content.style.backgroundColor = 'inherit';
      tile.content.style.width = 'calc((95vw / 2.5) + 0.76vw)';
      tile.content.style.height = 'calc(1520vw / 50)';
      tile.content.style.position = 'absolute';
      tile.content.style.zIndex = 1;
      tile.content.style.pointerEvents = 'none';
      tile.content.style.borderRadius = '3px';
      tile.content.style.overflow = 'hidden';
      newTiles.push(tile);
      this.setState({ tiles: newTiles });

      this.setAllEditingToNull();
      for (let entry of this.state.selectedTiles) {
        this.tileSelected(entry);
      }
      //not sure why the above doesn't work as intended
      this.setState({ selectedTiles: [] });
    }

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
                    editingImage: null,
                    editingTileSize: null });
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
  },

  sortSelectedTiles: function (array) {
    array.sort(function (a, b) {
      return a - b;
    }
  );
    return array;
  },

  changeTileSize: function (position, columns, rows) {
    let tile = this.getTileForEdit(position);
    let newTiles = this.removeTileForEdit(position);
    let columnMarginMultiple = (columns - 1) * 2;
    let rowMarginMultiple = (rows) * 2;
    // let tileRow = Gridfunc.findRow(position, 5, 20);
    // tileRow = tileRow - 1;
    // let top = (4 * rows) + (388 * tileRow);
    tile.content.style.backgroundColor = 'inherit';
    tile.content.style.width = `calc((245px * ${columns}) + (4px * ${columnMarginMultiple}))`;
    tile.content.style.height = `calc((245px * ${rows}) + (4px * ${rowMarginMultiple}))`;
    tile.content.style.position = 'absolute';
    tile.content.style.zIndex = 1;
    tile.content.style.pointerEvents = 'none';
    tile.content.style.borderRadius = '3px';
    tile.content.style.overflow = 'hidden';
    tile.content.style.display = 'inline-block';
    // tile.content.style.top = `${top}px`;

    newTiles.push(tile);
    this.setState({ tiles: newTiles });
  }

});

module.exports = Gridterest;
