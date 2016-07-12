const React = require('react');
const Tile = require('./Tile.jsx');

const Grid = React.createClass({

  render: function () {

    let tiles = this.props.tiles;
    tiles = tiles.sort(function (a, b) {
      if (a.position > b.position) {
        return 1;
      }
      if (a.position < b.position) {
        return -1;
      }
      return 0;
    });

    tiles = tiles.map(function (tile) {
      return <Tile key={tile.position}
                   position={tile.position}
                   columns={this.props.columns}
                   gridSize={this.props.tiles.length}
                   editing={this.props.editing}
                   style={tile.style}
                   content={tile.content}
                   userRequestsEdit={this.props.userRequestsEdit}
                   editingContentType={this.props.editingContentType}
                   editingColour={this.props.editingColour}
                   editingText={this.props.editingText}
                   editingImage={this.props.editingImage}
                   editingTileSize={this.props.editingTileSize}
                   userRequestsEdit={this.props.userRequestsEdit}
                   onTextSubmit={this.props.onTextSubmit}
                   changeTileText={this.props.changeTileText}
                   userRequestsEditColour={this.props.userRequestsEditColour}
                   changeTileColour={this.props.changeTileColour}
                   userRequestsAddImage={this.props.userRequestsAddImage}
                   changeImageURL={this.props.changeImageURL}
                   tileSelected={this.props.tileSelected}
                   logDragging={this.props.logDragging}
                   logDragTarget={this.props.logDragTarget}
                   swapPositions={this.props.swapPositions}
                   userRequestsChangeTileSize={this.props.userRequestsChangeTileSize}
                   changeTileSize={this.props.changeTileSize}
              />;
          }.bind(this));

    return (<div className='grid-div'>{ tiles }</div>);
    console.log(tiles);

  }

});

module.exports = Grid;
