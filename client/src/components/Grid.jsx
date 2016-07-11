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
                   style={tile.style}
                   content={tile.content}
                   contentStyle={tile.contentStyle}
              />;
          });

    return (<div className='grid-div'>{ tiles }</div>);
    console.log(tiles);

  }

});

module.exports = Grid;
