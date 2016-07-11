var React = require('react');
var ReactDOM = require('react-dom');
const Gridterest = require('./components/Gridterest.jsx');

window.onload = function(){
  ReactDOM.render(
    <Gridterest/>,
    document.getElementById('app')
  );
}
