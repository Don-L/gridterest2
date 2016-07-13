const React = require('react');
const Grid = require('./Grid.jsx');
const Nav = require('./Nav.jsx');
const Gridfunc = require('./Gridfunc.js');
const SampleTiles = require('./sample_tiles.js');
const Prototile = require('./Prototile.js');

const Gridterest = React.createClass({

  getInitialState: function () {
    return (
      {
        tiles: [],
        columns: 5,
        tileWidth: null,
        tileHeight: null,
        tileMargin: null,
        tileMarginBottom: null,
        selectedTiles: [],
        usingNav: null,
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
    let width = tiles[0].style.width;
    let height = tiles[0].style.height;
    let margin = tiles[0].style.margin;
    let marginBottom = tiles[0].style.marginBottom;
    this.setState({ tiles: SampleTiles,
                    tileWidth: width,
                    tileHeight: height,
                    tileMargin: margin,
                    tileMarginBottom: marginBottom
                 })
  },

  render: function () {
    return (
      <div>
        <Nav usingNav={this.state.usingNav}
             setUsingNav={this.setUsingNav}
             onNavSelect={this.onNavSelect}
        />
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

  setUsingNav: function () {
    if (this.state.usingNav) {
      this.setState({ usingNav: null });
    } else this.setState({ usingNav: true });
  },

  onNavSelect: function (e) {
    if (e.target.value === 'Add more tiles') {
      this.setUsingNav();
      this.addTiles(this.state.tiles.length + 1, this.state.tileWidth, this.state.tileHeight, this.state.tileMargin, this.state.tileMarginBottom);
    } else if (e.target.value === 'Switch grid type') {
        this.setUsingNav();
        this.switchGrid();
    } else this.setUsingNav();
  },

  switchGrid: function (e) {
    let newTiles = this.state.tiles;
    if (this.state.tileWidth === '250px') {
      newTiles = newTiles.map(function (tile) {
        return (
                { position: tile.position,
                  style: {
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#98c377',
                    display: 'inline-block',
                    margin: '3px',
                    marginBottom: '-1px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    alignContent: 'center',
                    zIndex: 0

                  },
                  content: {
                    text: tile.content.text,
                    textLink: tile.content.textLink,
                    image: tile.content.image,
                    imageCaption: tile.content.imageCaption,
                    imageLink: tile.content.imageLink,
                    style: {
                      backgroundColor: tile.content.style.backgroundColor,
                      width: tile.content.style.width,
                      margin: '0 auto'
                    }
                  }
                }
               );
      });
      this.setState({ tiles: newTiles,
                      tileWidth: '100px',
                      tileHeight: '100px',
                      columns: 12
                    })
    } else {
      newTiles = newTiles.map(function (tile) {
        return (
                { position: tile.position,
                  style: {
                    width: '250px',
                    height: '350px',
                    backgroundColor: '#98c377',
                    display: 'inline-block',
                    margin: '3px',
                    marginBottom: '-1px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    alignContent: 'center',
                    zIndex: 0

                  },
                  content: {
                    text: tile.content.text,
                    textLink: tile.content.textLink,
                    image: tile.content.image,
                    imageCaption: tile.content.imageCaption,
                    imageLink: tile.content.imageLink,
                    style: {
                      backgroundColor: tile.content.style.backgroundColor,
                      width: tile.content.style.width,
                      margin: '0 auto'
                    }
                  }
                }
      );
    });
    this.setState({ tiles: newTiles,
                    tileWidth: '250px',
                    tileHeight: '350px',
                    columns: 5
                  })
    }
  },

  addTiles: function (tilePosition, tileWidth, tileHeight, tileMargin, tileMarginBottom) {
    let extraTiles = Prototile.makeLots(tilePosition, tileWidth, tileHeight, tileMargin, tileMarginBottom);
    let existingTiles = this.state.tiles;
    let allTiles = existingTiles.concat(extraTiles);
    this.setState({ tiles: allTiles });
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
    let rowMarginMultiple = (rows - 1) * 2;
    tile.content.style.backgroundColor = 'inherit';
    tile.content.style.width = `calc((${this.state.tileWidth} * ${columns}) + (3px * ${columnMarginMultiple}))`;
    tile.content.style.height = `calc((${this.state.tileHeight} * ${rows}) + (3px * ${rowMarginMultiple}))`;
    tile.content.style.position = 'absolute';
    tile.content.style.zIndex = 1;
    tile.content.style.pointerEvents = 'none';
    tile.content.style.borderRadius = '3px';
    tile.content.style.overflow = 'hidden';
    tile.content.style.display = 'inline-block';
    newTiles.push(tile);
    this.setState({ tiles: newTiles });
  }

});

module.exports = Gridterest;
