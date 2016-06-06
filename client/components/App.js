import React from 'react';
import Map from './Map';

import {markers} from '../data/markers';

const App = React.createClass({
  render() {
    return (
      <div>
        <header>
          <div className="page-header">
            <h1>COIN Prototype <small>Group 6</small></h1>
          </div>
        </header>
        <div className="map">
          <Map markers={markers} />
        </div>
      </div>
    )
  }
});

export default App;
