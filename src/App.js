import React from 'react';
import './App.css';
import alarmAudio from './static/alarm.mp3';
import Clock from './components/Clock';
import Alarm from './components/Alarm';

export class App extends React.Component {
  constructor(props) {
    super(props);
    const defaultAlarmTime = this.getDefaultAlarmTime()
    this.state = {
      isHour12: false,
      time: '',
      amPm: '',
      alarmOn: false,
      alarmTime: defaultAlarmTime,
      alarmAmPm: ''
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

  getDefaultAlarmTime() {
    // Set default alarm time (next day at 7:00 AM)
    let date = new Date();
    date.setHours(7);
    date.setMinutes(0);
    date.setSeconds(0);
    // TODO: Test end of month values
    date.setDate(date.getDate() + 1);
    return date;
  }

  setAlarmTime = (alarmTime) => {
    const msAlarm = alarmTime.getTime() - new Date().getTime();
    this.setState({ alarmTime: alarmTime }, () => {
      this.timeoutId = setTimeout(() => {
        const playPromise = document.getElementById("alarmAudio").play();
        if (playPromise !== undefined) {
          playPromise
          .then(() => {})
          .catch((error) => { console.log(error) });
        }

      }, msAlarm);
    });
  }
  
  toggleAlarmOn = (e) => {
    if (e.target.className.includes("alarmTime activeAlarm")) {
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
      setAlarmTime,
      toggleAlarmOn
     } = this;
    return (
      <div className="App">
        <audio id="alarmAudio" src={alarmAudio} type="audio/mp3"></audio>
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
        setAlarmTime={setAlarmTime}
        toggleAlarmOn={toggleAlarmOn}/>
      </div>
    );
  }
}

export default App;
