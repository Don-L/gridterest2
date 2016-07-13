const React = require('react');
const Gridfunc = require('./Gridfunc.js');

const TileEditor = React.createClass({

  render: function () {
    if (this.props.editingContentType) { //initial select
      return <div className='select-div'>
               <form onSubmit={this.onTextSubmit}>
                 <select onChange={this.onInitialSelect}>
                   <option>Add/edit text</option>
                   <option>Change tile colour</option>
                   <option>Add image</option>
                   <option>Change tile size</option>
                 </select>
                 <textarea value={this.props.content.text}
                           onChange={this.changeTileText}
                 /><br/>
                 <input type='Submit'/>
               </form>
             </div>;
    } else if (this.props.editingColour) { //colour edit
      return <div className='select-div'>
              <form onSubmit={this.onColourSubmit}>
                <select onChange={this.onColourSelect}>
                  <option>Yellow</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Purple</option>
                </select>
                <input type='submit'/>
              </form>
            </div>;
    } else if (this.props.editingImage) { //editing image
      return <div className='select-div'>
               <form onSubmit={this.onImageSubmit}>
                 <input type='text'
                        placeholder='IMAGE URL'
                        onChange={this.changeImageURL}
                        >
                 </input>
                 <input type='text' placeholder='(OPTIONAL) LINK URL'></input>
                 <input type='text' placeholder='CAPTION'></input>
                 <input type='submit'></input>
               </form>
             </div>;
    } else if (this.props.editingTileSize) { //editing tile size
      let pairsAndStrings = Gridfunc.makeArrayOfPairsAndStrings(this.props.position, this.props.columns, this.props.gridSize);
      let options = pairsAndStrings.map(function (triplet) {
        return <option key={triplet[1]} value={triplet[0]}>{triplet[1]}</option>;
      });
      return <div className='select-div'>
               <form onSubmit={this.onSizeSubmit}>
                 <select onChange={this.onSizeSelect}>
                   {options}
                 </select>
                 <input type='submit'/>
               </form>
             </div>
    }
  },

  changeTileText: function (e) {
    e.preventDefault();
    this.props.changeTileText(this.props.position, e.target.value);
  },

  onTextSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit(this.props.position);
  },

  changeImageURL: function (e) {
    e.preventDefault();
    this.props.changeImageURL(this.props.position, e.target.value);
  },

  onImageSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit();
  },

  onInitialSelect: function (e) {
    if (e.target.value === 'Change tile colour') {
      this.props.userRequestsEditColour(this.props.position);
    } else if (e.target.value === 'Add image') {
      this.props.userRequestsAddImage(this.props.position);
    } else if (e.target.value === 'Change tile size') {
      this.props.userRequestsChangeTileSize(this.props.position);
    }
  },

  onColourSelect: function (e) {
    e.preventDefault();
    this.props.changeTileColour(this.props.position, e.target.value);
  },

  onColourSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit();
  },

  onSizeSelect: function (e) {
    e.preventDefault();
    let colRow = e.target.value;
    colRow = colRow.split(',');
    let columns = parseInt(colRow[0]);
    let rows = parseInt(colRow[1]);
    this.props.changeTileSize(this.props.position, columns, rows);
  },

  onSizeSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit();
  }


});

module.exports = TileEditor;
