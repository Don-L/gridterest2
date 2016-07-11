const React = require('react');

const TileEditor = React.createClass({

  render: function () {
    if (this.props.editingContentType) {
      return <div>
               <form onSubmit={this.onTextSubmit}>
                 <select>
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
    }
  },

  onTextSubmit: function (e) {
    e.preventDefault();
    this.props.onTextSubmit(this.props.position);
  },

  changeTileText: function (e) {
    e.preventDefault();
    this.props.changeTileText(this.props.position, e.target.value);
  }


});

module.exports = TileEditor;
