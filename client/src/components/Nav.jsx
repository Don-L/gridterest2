const React = require('react');

const Nav = React.createClass({

  render: function () {
    if (this.props.usingNav === true) {
      return <div className='nav-div'
                  onDoubleClick={this.props.setUsingNav}
             >
               <h3>gridterest</h3>
               <div>
                 <form>
                   <select onChange={this.props.onNavSelect}>
                     <option>what do you want?</option>
                     <option>Add more tiles</option>
                     <option>Switch grid type</option>
                   </select>
                 </form>
               </div>
             </div>
    } else return (<div className='nav-div'
                        onDoubleClick={this.props.setUsingNav}
                   >
                   <h3>gridterest</h3>
                   </div>);
          }

});

module.exports = Nav;
