const Gridfunc = require('../Gridfunc');
var assert = require('assert');

describe('Gridfunc', function () {
  beforeEach(function () {

        gridSize = 30;

  });
  it('can tell that tile number 1 is above tile number 6', function () {

      var tile = Gridfunc.adjacentTop(6);
      assert.equal(1, tile);

  });
  it('can tell that there is no tile above tile number 3', function () {

      var tile = Gridfunc.adjacentTop(3);
      assert.equal(false, tile);

  });
  it('knows there is no tile to the left of tile 16', function () {

      var tile = Gridfunc.adjacentLeft(16);
      assert.equal(false, tile);

  });
  it('returns the position of the left adjacent tile where one exists', function () {

      var tile = Gridfunc.adjacentLeft(17);
      assert.equal(16, tile);

  });
  it('knows when a tile has no adjacent tile to its right', function () {

      var tile = Gridfunc.adjacentRight(15, gridSize);
      assert.equal(false, tile);

  });
  it('returns the position of the right adjacent tile where on exists', function () {

      var tile = Gridfunc.adjacentRight(14, gridSize);
      assert.equal(15, tile);

  });
  it('knows when a tile has no adjacent tile below it', function () {

      var tile = Gridfunc.adjacentBottom(28, gridSize);
      assert.equal(false, tile);

  });
  it('returns the position of the bottom adjacent tile where one exists', function () {

      var tile = Gridfunc.adjacentBottom(14, gridSize);
      assert.equal(19, tile);

  });
  it('knows that a tile at the end of a row is not adjacent to the tile at the start of the next row', function () {

      var tile = Gridfunc.adjacent(15, 16, gridSize);
      assert.equal(false, tile);

  });
  it('knows that tiles in the same row and adjacent columns are adjacent', function () {

      var tile = Gridfunc.adjacent(14, 15, gridSize);
      assert.equal(true, tile);

  });
  it('knows that tiles in the same column and adjacent rows are adjacent', function () {

      var tile = Gridfunc.adjacent(14, 19, gridSize);
      assert.equal(true, tile);

  });
  it('knows when an array of positions represents a single tile', function () {

      var tile = Gridfunc.singleTile([9]);
      assert.equal(true, tile);

  });
  it('knows when an array of positions does not represent a single tile', function () {

      var tiles = Gridfunc.singleTile([9,19,3]);
      assert.equal(false, tiles);

  });
  it('knows when an array of positions represents two adjacent tiles', function () {

      var tiles1 = Gridfunc.twoAdjacentTiles([9,10], gridSize);
      assert.equal(true, tiles1);
      var tiles2 = Gridfunc.twoAdjacentTiles([8,9,10], gridSize);
      assert.equal(false, tiles2)
      var tiles3 = Gridfunc.twoAdjacentTiles([10, 11], gridSize);
      assert.equal(false, tiles3)
  });
  it('knows when an array of positions represents three adjacent tiles', function () {

      var tiles1 = Gridfunc.threeAdjacentTiles([8,9,10], gridSize);
      assert.equal(true, tiles1);
      var tiles2 = Gridfunc.threeAdjacentTiles([7,8,9,10], gridSize);
      assert.equal(false, tiles2)
      var tiles3 = Gridfunc.threeAdjacentTiles([10, 11, 12], gridSize);
      assert.equal(false, tiles3)
      var tiles4 = Gridfunc.threeAdjacentTiles([10, 15, 20], gridSize);
      assert.equal(true, tiles4)
  });
  it('knows when an array of positions represents four adjacent tiles', function () {

      var tiles1 = Gridfunc.fourAdjacentTiles([6,7,8,9], gridSize);
      assert.equal(true, tiles1);
      var tiles2 = Gridfunc.fourAdjacentTiles([6,7,8,9,10], gridSize);
      assert.equal(false, tiles2)
      var tiles3 = Gridfunc.fourAdjacentTiles([10, 11, 12, 13], gridSize);
      assert.equal(false, tiles3)
      var tiles4 = Gridfunc.fourAdjacentTiles([10, 15, 20, 25], gridSize);
      assert.equal(true, tiles4)
  });
  it('knows when an array of positions represents a two by two square', function () {

      var tiles1 = Gridfunc.twoByTwoSquare([6,7,11,12], gridSize);
      assert.equal(true, tiles1);
      var tiles2 = Gridfunc.twoByTwoSquare([6,7,11,12,13], gridSize);
      assert.equal(false, tiles2)
      var tiles3 = Gridfunc.twoByTwoSquare([1, 2, 7, 8], gridSize);
      assert.equal(false, tiles3)
      var tiles4 = Gridfunc.twoByTwoSquare([11, 12, 21, 22], gridSize);
      assert.equal(false, tiles4)
      var tiles5 = Gridfunc.twoByTwoSquare([11, 12, 16, 29], gridSize);
      assert.equal(false, tiles5)
  });
  it('can identify a valid selection group', function () {

      var tiles1 = Gridfunc.validSelectionGroup([6], gridSize);
      assert.equal(true, tiles1);
      var tiles2 = Gridfunc.validSelectionGroup([6,7,8,10], gridSize);
      assert.equal(false, tiles2)
      var tiles3 = Gridfunc.validSelectionGroup([1, 2, 7, 8,9], gridSize);
      assert.equal(false, tiles3)
      var tiles4 = Gridfunc.validSelectionGroup([11, 12, 21, 22], gridSize);
      assert.equal(false, tiles4)
      var tiles5 = Gridfunc.validSelectionGroup([10, 12, 16, 29], gridSize);
      assert.equal(false, tiles5)
      var tiles6 = Gridfunc.validSelectionGroup([22,23], gridSize);
      assert.equal(true, tiles6)
      var tiles7 = Gridfunc.validSelectionGroup([10, 15,20], gridSize);
      assert.equal(true, tiles7)
      var tiles8 = Gridfunc.validSelectionGroup([11,12,13,14], gridSize);
      assert.equal(true, tiles8)
  });
});
