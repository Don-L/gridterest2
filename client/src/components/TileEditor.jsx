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
                   <option>Change tile size</option>
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
    } else if (this.props.editingImage) { //editing image
      return <div>
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
    } else if (this.props.editingGroupSize) {
      
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
    console.log(e.target.value === 'Add image')
    if (e.target.value === 'Change tile colour') {
      this.props.userRequestsEditColour(this.props.position);
    } else if (e.target.value === 'Add image') {
      this.props.userRequestsAddImage(this.props.position);
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
