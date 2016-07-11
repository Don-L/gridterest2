const React = require('react');

const TileEditor = React.createClass({

  render: function () {
    if (this.props.editingContentType) { //initial select
      return <div>
               <form onSubmit={this.onTextSubmit}>
                 <select onChange={this.onInitialSelect}>
                   <option>Add/edit text</option>
                   <option>Change tile colour</option>
                   <option>Add image</option>
                 </select>
                 <textarea value={this.props.content.text}
                           onChange={this.changeTileText}
                 />
                 <input type='Submit'/>
               </form>
             </div>;
    } else if (this.props.editingColour) { //colour edit
      return <div>
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

  onInitialSelect: function (e) {
    if (e.target.value === 'Change tile colour') {
      this.props.userRequestsEditColour(this.props.position);
    }
  },

  onColourSelect: function (e) {
    e.preventDefault();
    console.log(e.target.value)
    this.props.changeTileColour(this.props.position, e.target.value);
  },

  onColourSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit();

  }


});

module.exports = TileEditor;
