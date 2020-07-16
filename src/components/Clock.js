import React from 'react';
import './Clock.css';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHour12: false,
      time: this.setTime.bind(this)
    };
  }

  setTime = () => {
    const { isHour12 } = this.state;
    let time = new Date().toLocaleTimeString([], { 
      hour12: isHour12, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    if (isHour12) {
      // Remove AM/PM indicator
      return time.split(' ')[0];
    }
    return time;
  }

  toggleTimeMode = () => {
    this.setState({
      isHour12: !this.state.isHour12
    },
    // Add tick as callback for instant feedback
    () => this.tick());
  }
  
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
    const { isHour12 } = this.state;
    return (
      <div className="Clock">
        <h1>{this.state.time}</h1>
        <div className="timeMode">
          <span 
          className={!isHour12 ? "activeTimeMode" : "inactiveTimeMode"}
          onClick={this.toggleTimeMode.bind(this)}>
            24H
          </span>
          <span 
          className={isHour12 ? "activeTimeMode" : "inactiveTimeMode"}
          onClick={this.toggleTimeMode.bind(this)}>
            12H
          </span>
        </div>
      </div>
    )
  }
}

export default Clock;