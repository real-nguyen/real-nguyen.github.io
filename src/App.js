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
      amPm: '',
      alarmOn: false,
      alarmTime: '7:00',
      alarmAmPm: 'AM'
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

  setAlarm = (e) => {
    let date = new Date();
    const [hour, minute] = e.target.value.split(':');
    date.setHours(hour);
    date.setMinutes(minute);
    const alarmTime = date.toLocaleTimeString([], { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    console.log(alarmTime);
    this.setState({ alarmTime: alarmTime });
  }
  
  toggleAlarmOn = (e) => {
    console.log(e.target);
    if (e.target.className === "alarmTime activeAlarm") {
      // Do not toggle alarm if alarm is already set
      // Only way to turn it off is to press the "ALARM" button
      return;
    }
    this.setState({
      alarmOn: !this.state.alarmOn
    })
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
    const { 
      isHour12, 
      amPm, 
      time,
      alarmOn,
      alarmTime,
      alarmAmPm
     } = this.state;
     const {
      toggleTimeMode,
      setAlarm,
      toggleAlarmOn
     } = this;
    return (
      <div className="App">
        <Clock 
        isHour12={isHour12} 
        amPm={amPm} 
        time={time}
        toggleTimeMode={toggleTimeMode}/>
        <Alarm 
        isHour12={isHour12} 
        alarmAmPm={alarmAmPm}
        alarmOn={alarmOn}
        alarmTime={alarmTime}
        setAlarm={setAlarm}
        toggleAlarmOn={toggleAlarmOn}
        />
      </div>
    );
  }
}

export default App;
