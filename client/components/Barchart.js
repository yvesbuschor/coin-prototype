import React from 'react';

const BarElement = React.createClass({

  render() {
    if(this.props.details.value && this.props.details.value > 0) {
      const text = this.props.details.displayText;
      const pct = Math.round(this.props.details.value*100);
      return (
        <div className="barelement">
          <p>{text}, {pct} %</p>
          <div className="bar"><span style={{'width': pct+'%'}}></span></div>
        </div>
      )
    }
    return false;
  }
});

BarElement.propTypes = {
  details: React.PropTypes.object.isRequired
};


const Barchart = React.createClass({
  render() {
    var x = -1;
    const mappedElements = this.props.data.map(function(details, key) {
        x++;
        return (
          <BarElement
            details={details}
            key = {x}
          />
        );
    });
    return (
      <div className='barchart'>
        {mappedElements}
      </div>
    )
  }
});

Barchart.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default Barchart;


/*
{
    '_id': 'IT und Services',
    'displayText': 'IT und Services',
    'value': 11.344475228647183
},*/
