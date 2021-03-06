const Gridfunc = {

  adjacentTop: function (position) {
    if (position - 5 > 0) {
      return position - 5;
    } else return false;
  },

  adjacentBottom: function (position, gridSize) {
    if ((position + 5 > 0) && (position + 5 <= gridSize)) {
      return position + 5;
    } else return false;
  },

  adjacentLeft: function (position) {
    if (position === 0) {
      return false;
    } else if ((position - 1) % 5 === 0) {
      return false;
    } else return position - 1;
  },

  adjacentRight: function (position, gridSize) {
    if (position + 1 > gridSize) {
      return false;
    } else if (position % 5 === 0) {
      return false;
    } else return position + 1;
  },

  adjacent: function (position1, position2, gridSize) {
    if (
      (this.adjacentTop(position1) === position2) ||
      (this.adjacentBottom(position1, gridSize) === position2) ||
      (this.adjacentLeft(position1) === position2) ||
      (this.adjacentRight(position1, gridSize) === position2)
    ) {
      return true;
    } else return false;
  },

  singleTile: function (array) {
    if (array.length === 1) {
      return true;
    } else return false;
  },

  twoAdjacentTiles: function (array, gridSize) {
    if (array.length != 2) {
      return false;
    } else if (this.adjacent(array[0], array[1], gridSize)) {
      return true;
    } else return false;
  },

  threeAdjacentTiles: function (array, gridSize) {
    if (array.length != 3) {
      return false;
    } else if (!(this.twoAdjacentTiles([array[0], array[1]], gridSize))) {
      return false;
    } else if (
      (array[1] === this.adjacentBottom(array[0], gridSize)) && (array[2] === this.adjacentBottom(array[1], gridSize)) ||
      (array[1] === this.adjacentRight(array[0], gridSize)) && (array[2] === this.adjacentRight(array[1], gridSize))
    ) {
      return true;
    } else return false;
  },

  fourAdjacentTiles: function (array, gridSize) {
    if (array.length != 4) {
      return false;
    } else if (!(this.threeAdjacentTiles([array[0], array[1], array[2]], gridSize))) {
      return false;
    } else if (
      (array[2] === this.adjacentBottom(array[1], gridSize)) && (array[3] === this.adjacentBottom(array[2], gridSize)) ||
      (array[2] === this.adjacentRight(array[1], gridSize)) && (array[3] === this.adjacentRight(array[2], gridSize))
    ) {
      return true;
    } else return false;
  },

  twoByTwoSquare: function (array, gridSize) {
    if (array.length != 4) {
      return false;
    } else if (
      (this.adjacent(array[0], array[1], gridSize)) &&
      (this.adjacent(array[2], array[3], gridSize)) &&
      (this.adjacentBottom(array[0], gridSize) === array[2])
    ) {
      return true;
    } else return false;
  },

  validSelectionGroup: function (array, gridSize) {
    if (
      this.singleTile(array) ||
      this.twoAdjacentTiles(array, gridSize) ||
      this.threeAdjacentTiles(array, gridSize) ||
      this.fourAdjacentTiles(array, gridSize) ||
      this.twoByTwoSquare(array, gridSize)
    ) {
      return true;
    } else return false;
  },

//returns [lst tile in row, number of free tiles in row]
  freeTilesInRow: function (position, columns) {
    if (position % columns === 0) {
      return [position, 1];
    } else {
      var i = 0;
      while (i < columns) {
        var lastTile = position + i;
        if (lastTile % columns === 0) {
          break;
        }
        i++;
      }
    } return [lastTile, i + 1];
  },

  freeTilesInColumn: function (position, columns, tiles) {
    var lastInRow = this.freeTilesInRow(position, columns);
    var lastInRow = lastInRow[0];
    return 1 + ((tiles - lastInRow) / columns);
  },

  createGroupSizeStrings: function (position, cols, tiles) {
    var columns = this.freeTilesInRow(position, cols);
    var columns = columns[1];
    var rows = this.freeTilesInColumn(position, cols, tiles);
    var colStrings = [];
    var i = 1;
    while (i <= columns) {
      colStrings.push(`${i}x`);
      i++;
    }
    var colsAndRows = [];
    for (var col of colStrings) {
      var j = 1;
      while (j <= rows) {
        colsAndRows.push(`${col}${j}`);
        j++;
      }
    }
    return colsAndRows;
  },

  convertStringsToPairs: function (array) {
    var pairs = [];
    for (var string of array) {
      pairs.push([string.split('x')[0], string.split('x')[1]]);
    }
    return pairs;
  },

  makeArrayOfPairsAndStrings: function (position, cols, tiles) {
    var strings = this.createGroupSizeStrings(position, cols, tiles);
    var pairs = this.convertStringsToPairs(strings);
    var array = pairs.map(function (pair, i) {
      return [pairs[i], strings[i]];
    });
    return array;
  },

  findRow: function (position, columns, tiles) {
    var rows = tiles / columns;
    var row = parseInt((position / rows) + 1);
    return row;
  }

};


module.exports = Gridfunc;
