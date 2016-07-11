const React = require('react');
const TileEditor = require('./TileEditor.jsx');
const Gridfunc = require('./Gridfunc.js');
const TileContent = require('./TileContent.jsx');

const Tile = React.createClass({

  render: function () {

    if (this.props.position != this.props.editing) { //tile not being edited
      return <div style={this.props.style} onDoubleClick={this.onDoubleClick}>
                <TileContent content={this.props.content}/>
             </div>;
    //tile being edited
    } else return <div style={this.props.style} onDoubleClick={this.onDoubleClick}>
              <TileEditor editingContentType={this.props.editingContentType}
                          editingColour={this.props.editingColour}
                          editingText={this.props.editingText}
                          editingImage={this.props.editingImage}
                          userRequestsEdit={this.userRequestsEdit}
                          position={this.props.position}
                          onTextSubmit={this.props.onTextSubmit}
                          content={this.props.content}
                          changeTileText={this.props.changeTileText}
                          userRequestsEditColour={this.props.userRequestsEditColour}
                          changeTileColour={this.props.changeTileColour}/>
           </div>;

  },

  onDoubleClick: function () {
    this.props.userRequestsEdit(this.props.position);
  }

});

module.exports = Tile;
