import React from 'react';
import './App.css';
import Clock from './components/Clock';
import Alarm from './components/Alarm';

export class App extends React.Component {
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
    this.setState({
      time: this.setTime()
    });
    // Calls tick every second
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // Analogous to Angular's onDestroy
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { isHour12, amPm, time } = this.state;
    return (
      <div className="App">
        <Clock 
        isHour12={isHour12} 
        amPm={amPm} 
        time={time}
        toggleTimeMode={this.toggleTimeMode}/>
        <Alarm />
      </div>
    );
  }
}

export default App;
