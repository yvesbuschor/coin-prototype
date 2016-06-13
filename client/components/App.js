import React from 'react';
import Map from './Map';
import Checkboxes from './Checkboxes';
import Barchart from './Barchart';
import $ from 'jquery';

import {allSectors} from '../data/linkedin-sectors/all_sectors';

const App = React.createClass({
  getInitialState() {
    return {
      markers: [],
      twitterFilter: {'filter': ['homeoffice','remote work']},
      twitterCheckboxes: [
        {'label':'freelancer','title':'freelancer','checked':true},
        {'label':'freelancers','title':'freelancers','checked':true},
        {'label':'freelancing','title':'freelancing','checked':true},
        {'label':'home-office','title':'home-office','checked':true},
        {'label':'homeoffice','title':'homeoffice','checked':true},
        {'label':'remote work','title':'remote work','checked':true},
        {'label':'#remote #work','title':'#remote #work','checked':true},
        {'label':'work at home','title':'work at home','checked':true}
      ]
    }
  },

  componentDidMount() {
    this.getTwitterMarkers();
  },

  getTwitterMarkers() {
    const query = {'filter':[]};
    this.state.twitterCheckboxes.forEach(function (checkbox) {
      if(checkbox.checked){
        query.filter.push(checkbox.title);
      }
    });


    $.get('/twitter', query)
    .then((markers) => {
      this.setState({markers: []});
      this.setState({
        markers
      });
    });
  },

  twitterFilterChange(index) {
    var newState = this.state.twitterCheckboxes.slice();
    newState[index].checked = !newState[index].checked;
    this.setState({twitterCheckboxes: newState}, function(){
      this.getTwitterMarkers();
    })
  },

  render() {
    return (
      <div>
        <header>
          <div className="page-header">
            <h1>COIN Prototype <small>Group 6</small></h1>
          </div>
        </header>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Twitter Analysis</h3>
            <p>Localisation of different Hashtags relevant to the topic<br/><i>slow due to huge amount of data</i></p>
            <hr/>
            <Checkboxes elements={this.state.twitterCheckboxes} filterChange={this.twitterFilterChange} />
          </div>
          <div className="panel-body map">
            <Map markers={this.state.markers} />
          </div>
          <div className="panel-footer">Russia and China are not very popular in this visualisation due to the existing language barrier</div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">LinkedIn IT-Jobs by Sector</h3>
            <p>Crawling IT-Job Listings from LinkedIn allows us to visualise different industrial sectors based on theri popularity.</p>
            <p>The critical number was calculated as a ratio of Job Applications to the Number of people who viewd the Listing.</p>
            <hr/>
          </div>
          <div className="panel-body">
            <Barchart data={allSectors} />
          </div>
          <div className="panel-footer">Not surprisingly only a few of the sectors have an application rate over 50%. But it is interesting
          to see that next to genereal IT Service-Jobs, specialised sectors like retail or library systems have such a high application rate.</div>
        </div>

      </div>
    )
  }
});

export default App;
