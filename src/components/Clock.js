import React from 'react';
import './Clock.css';
import PropTypes from 'prop-types';

export class Clock extends React.Component {
  setTime() {
    const { timeMode } = this.props;
    let time = new Date().toLocaleTimeString([], { 
      hour12: timeMode === '12', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    if (timeMode === '12') {
      // Remove AM/PM indicator
      return time.split(' ')[0];
    }
    return time;
  }

  state = {
    time: this.setTime()
  };
  
  tick() {
    this.setState({ time: this.setTime() });
  }

  // Analogous to Angular's onInit
  componentDidMount() {
    // Calls tick every second
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // Analogous to Angular's onDestroy
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render () {
    return (
      <div className="Clock">
        <h1>{this.state.time}</h1>
        <div className="hourMode">

        </div>
      </div>
    )
  }
}

Clock.propTypes = {
  timeMode: PropTypes.object.isRequired
}

export default Clock;