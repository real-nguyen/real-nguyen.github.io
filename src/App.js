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
      alarmTime: null,
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

  getAlarmTime() {
    let { alarmTime } = this.state;
    // Set default alarm time (next day at 7:00 AM)
    if (!alarmTime) {
    let date = new Date();
      date.setHours(7);
      date.setMinutes(0);
      date.setSeconds(0);
      // TODO: Test end of month values
      date.setDate(date.getDate() + 1);
      alarmTime = date;
    }
    return alarmTime;
  }

  setAlarm = (alarmTime) => {
    // Should set the alarm to next day if current time is PM and alarm is before (lower PM or any AM) vice versa for AM
    // Should set the alarm to same day if current time is AM and alarm is after (higher AM or any PM) vice versa for PM
    const { isHour12, alarmAmPm, time, amPm } = this.state;
    let date = new Date();
    // let [hour, minute] = e.target.value.split(':');
    // if (isHour12 && alarmAmPm === 'PM') {
    //   hour = +hour + 12;
    // }
    // date.setHours(+hour);
    // date.setMinutes(+minute);
    // date.setSeconds(0);
    // let currentTime = time;
    // if (isHour12 && amPm === 'PM') {
    //   // Always work with 24h for simplicity
    //   let split = currentTime.split(':');
    //   split[0] = `${+split[0] + 12}`;
    //   currentTime = split.join(':');
    // }
    // const alarmTime = date.toLocaleTimeString([], { 
    //   hour12: isHour12, 
    //   hour: '2-digit', 
    //   minute: '2-digit' 
    // });
    // console.log(alarmTime);
    // this.setState({ alarmTime: alarmTime });
  }
  
  toggleAlarmOn = (e) => {
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
      time: this.setTime(),
      alarmTime: this.getAlarmTime()
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
        toggleAlarmOn={toggleAlarmOn}/>
      </div>
    );
  }
}

export default App;
