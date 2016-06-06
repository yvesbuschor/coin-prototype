import React from 'react';
import Map from './Map';
import $ from 'jquery';

const App = React.createClass({
  getInitialState() {
    return {
      markers: []
    }
  },

  componentDidMount() {
    $.get('/twitter')
    .then((markers) => {
      this.setState({
        markers
      });
    });
  },

  render() {
    return (
      <div>
        <header>
          <div className="page-header">
            <h1>COIN Prototype <small>Group 6</small></h1>
          </div>
        </header>
        <div className="map">
          <Map markers={this.state.markers} />
        </div>
      </div>
    )
  }
});

export default App;
