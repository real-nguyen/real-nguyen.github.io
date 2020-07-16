import React from 'react';
import './Clock.css';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHour12: false,
      time: '',
      amPm: ''
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

  setAmPm = () => {
    const date = new Date().toLocaleTimeString([], {hour12: true});
    return date.split(' ')[1];
  }

  toggleTimeMode = () => {
    this.setState({
      isHour12: !this.state.isHour12
    },
    // Add tick as callback for instant feedback
    () => {
      this.tick();
      if (this.state.isHour12) {
        this.setState({
          amPm: this.setAmPm()
        })
      }
    });
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
    const { isHour12, amPm, time } = this.state;
    return (
      <div className="Clock">
        <div className="timeMode">
          <span 
          className={!isHour12 ? "active" : "inactive"}
          onClick={this.toggleTimeMode.bind(this)}>
            24H
          </span>
          <span 
          className={isHour12 ? "active" : "inactive"}
          onClick={this.toggleTimeMode.bind(this)}>
            12H
          </span>
        </div>
        <h1>{time}</h1>
        <div className={`amPm ${!isHour12 ? "hidden" : ""}`}>
          <span className={amPm === 'AM' ? 'active' : 'inactive'}>AM</span>
          <span className={amPm === 'PM' ? 'active' : 'inactive'}>PM</span>
        </div>
      </div>
    )
  }
}

export default Clock;