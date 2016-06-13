import React from 'react';

const Checkboxes = React.createClass({

  render() {

    var that = this;
    var x = -1;
    const mappedCheckboxed = this.props.elements.map(function(details, key) {
        x++;
        return (
          <Checkbox
            details={details}
            index={x}
            key = {details.title}
            filterChange={that.props.filterChange}
          />
        );
    });
    return (
      <div className='checkboxes'>
        {mappedCheckboxed}
      </div>
    )
  }
});

Checkboxes.propTypes = {
  elements: React.PropTypes.array.isRequired,
  filterChange: React.PropTypes.func.isRequired,
};

const Checkbox = React.createClass({

  render() {
    const details = this.props.details;
    return (
      <label>
        <input type="checkbox"
          checked={details.checked}
          onChange={() => this.props.filterChange(this.props.index)}
          value={details.title} />
        {details.label}
      </label>
    )
  }
});

Checkbox.propTypes = {
  details: React.PropTypes.object.isRequired,
  filterChange: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired
};

export default Checkboxes;
