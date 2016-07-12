const React = require('react');
const TileEditor = require('./TileEditor.jsx');
const Gridfunc = require('./Gridfunc.js');
const TileContent = require('./TileContent.jsx');

const Tile = React.createClass({

  render: function () {

    if (this.props.position != this.props.editing) { //tile not being edited
      if (!(this.props.content.text || this.props.content.image)) { //empty tile
        return <div
                 style={this.props.style}
                 onDoubleClick={this.onDoubleClick}
                 onClick={this.onClick}
                 onDragStart={this.onDragStart}
                 onDragEnter={this.onDragEnter}
                 onDragEnd={this.onDragEnd}
               >
                 <TileContent content={this.props.content}/>
               </div>;
               //tile has contents
      } else return <div
                      style={this.props.style}
                      onDoubleClick={this.onDoubleClick}
                      onDragStart={this.onDragStart}
                      onDragEnter={this.onDragEnter}
                      onDragEnd={this.onDragEnd}
                    >
                      <TileContent content={this.props.content}/>
                    </div>;
    //tile being edited
    } else return <div
                    style={this.props.style}
                    onDoubleClick={this.onDoubleClick}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDragEnd={this.onDragEnd}
                  >
                    <TileEditor editingContentType={this.props.editingContentType}
                                editingColour={this.props.editingColour}
                                columns={this.props.columns}
                                gridSize={this.props.gridSize}
                                editingText={this.props.editingText}
                                editingImage={this.props.editingImage}
                                editingTileSize={this.props.editingTileSize}
                                userRequestsEdit={this.userRequestsEdit}
                                position={this.props.position}
                                onTextSubmit={this.props.onTextSubmit}
                                content={this.props.content}
                                changeTileText={this.props.changeTileText}
                                userRequestsEditColour={this.props.userRequestsEditColour}
                                changeTileColour={this.props.changeTileColour}
                                userRequestsAddImage={this.props.userRequestsAddImage}
                                changeImageURL={this.props.changeImageURL}
                                userRequestsChangeTileSize={this.props.userRequestsChangeTileSize}
                                changeTileSize={this.props.changeTileSize}
                                />
                  </div>;

  },

  onDoubleClick: function () {
    this.props.userRequestsEdit(this.props.position);
  },

  onClick: function (e) {
    if (e.shiftKey === true) {
      this.props.tileSelected(this.props.position);
    }
  },

  onDragStart: function () {
    this.props.logDragging(this.props.position);
  },

  onDragEnter: function () {
    this.props.logDragTarget(this.props.position);
  },

  onDragEnd: function () {
    this.props.swapPositions(this.props.position);
  }

});

module.exports = Tile;
