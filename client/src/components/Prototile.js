module.exports = {

  create: function (tilePosition, tileWidth, tileHeight, tileMargin, tileMarginBottom) {
    return { position: tilePosition,
      style: {
        width: tileWidth,
        height: tileHeight,
        backgroundColor: '#f6faf3',
        display: 'inline-block',
        margin: tileMargin,
        marginBottom: tileMarginBottom,
        borderRadius: '3px',
        overflow: 'hidden',
        alignContent: 'center',
        zIndex: 0
      },
      content: {
        text: '',
        textLink: '',
        image: '',
        imageCaption: '',
        imageLink: '',
        style: {
          backgroundColor: '',
          width: '100%'
        }
      }
    }
  },

  makeLots: function (startingTilePosition, tileWidth, tileHeight, tileMargin, tileMarginBottom) {
    let lots = [];
    let i = 0;
    while (i < 100) {
      let newTile = this.create(startingTilePosition + i, tileWidth, tileHeight, tileMargin, tileMarginBottom);
      lots.push(newTile);
      i++;
    } return lots;
  }

};
