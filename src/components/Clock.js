import React from 'react';
import PropTypes from 'prop-types';
import './Clock.css';

export class Clock extends React.Component {
  render () {
    const { isHour12, amPm, time } = this.props;
    return (
      <div className="Clock">
        <div className="timeMode">
          <span 
          className={!isHour12 ? "active" : "inactive"}
          onClick={this.props.toggleTimeMode.bind(this)}>
            24H
          </span>
          <span 
          className={isHour12 ? "active" : "inactive"}
          onClick={this.props.toggleTimeMode.bind(this)}>
            12H
          </span>
        </div>
        <h1>{time}</h1>
        <div className={`amPm ${!isHour12 ? "hidden" : ""}`}>
          <span className={amPm.toUpperCase() === 'AM' ? 'active' : 'inactive'}>AM</span>
          <span className={amPm.toUpperCase() === 'PM' ? 'active' : 'inactive'}>PM</span>
        </div>
      </div>
    )
  }
}

Clock.propTypes = {
  isHour12: PropTypes.bool.isRequired,
  amPm: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  toggleTimeMode: PropTypes.func.isRequired
}

export default Clock;