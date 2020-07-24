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
      amPm: 'AM',
      alarmOn: false,
      alarmTime: defaultAlarmTime,
      alarmAmPm: 'AM'
    };
  }

  getTime() {
    const { isHour12 } = this.state;
    let time = new Date().toLocaleTimeString([], { 
      hour12: isHour12, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    if (isHour12) {
      return time.split(' ');
    }
    return time;
  }

  toggleTimeMode = () => {
    const { isHour12 } = this.state;
    this.setState({
      isHour12: !isHour12
    },
    // Add tick as callback for instant feedback
    () => {
      this.tick();
    });
  }
  
  tick() {
    let time, amPm;
    if (this.state.isHour12) {
      [time, amPm] = this.getTime();
    } else {
      time = this.getTime();
      amPm = this.state.amPm;
    }
    this.setState({
      time: time,
      amPm: amPm
    });
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
    const now = new Date();
    // Should set the alarm to next day if current time is PM and alarm is before (lower PM or any AM) vice versa for AM
    // Should set the alarm to same day if current time is AM and alarm is after (higher AM or any PM) vice versa for PM
    if (alarmTime < now) {
      // Works even at end of month
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
    const msAlarm = alarmTime.getTime() - now.getTime();
    this.setState({ alarmTime: alarmTime }, () => {
      this.timeoutId = setTimeout(() => {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise
          .then(() => {})
          .catch((error) => { console.log(error) });
        }
      }, msAlarm);
    });
  }

  toggleAlarmAmPm = (e) => {
    const alarmAmPm = this.state.alarmAmPm === 'AM' ? 'PM' : 'AM';
    this.setState({
      alarmAmPm: alarmAmPm
    }, () => {
      let { alarmTime } = this.state;
      const now = new Date();
      const hours = alarmTime.getHours();
      // Set alarm to current date and let setAlarmTime handle add days
      const timeOfDay = now.getHours() < 12 ? 'AM' : 'PM';
      alarmTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      // If time AM and toggle alarm to AM, subtract 12h
      // If time PM and toggle alarm to AM, subtract 12h
      if ((timeOfDay === 'AM' && alarmAmPm === 'AM') || (timeOfDay === 'PM' && alarmAmPm === 'AM')) {
        alarmTime.setHours(hours - 12);
      // If time AM and toggle alarm to PM, add 12h
      // If time PM and toggle alarm to PM, add 12h
      } else if ((timeOfDay === 'AM' && alarmAmPm === 'PM') || (timeOfDay === 'PM' && alarmAmPm === 'PM')) {
        alarmTime.setHours(hours + 12);
      }
      this.setAlarmTime(alarmTime);
    });
  }
  
  toggleAlarmOn = (e) => {
    if (e.target.id === 'alarmTime' && e.target.parentNode.className.includes('Alarm active')) {
      // Do not toggle alarm if alarm is already on
      // Only way to turn it off is to press the "ALARM" button
      return;
    }
    const { alarmOn, alarmTime } = this.state;
    this.setState({
      alarmOn: !alarmOn
    }, () => {
      // Must directly reference this.state.alarmOn in callback
      // Destructured alarmOn stays the same after toggle!
      if (this.state.alarmOn) {
        this.setAlarmTime(alarmTime);
      } else {
        clearTimeout(this.timeoutId);
      }
    });
  }

  // Analogous to Angular's onInit
  componentDidMount() {
    this.audio = new Audio(alarmAudio);
    this.audio.loop = true;
    this.audio.type = 'audio/mp3';
    // Fix seamless playback
    this.audio.addEventListener('timeupdate', function() {
      const buffer = 0.1;
      if(this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
      }
    });
    this.audio.load();
    this.setState({
      time: this.getTime()
    });
    // Calls tick every second
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // Analogous to Angular's onDestroy
  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
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
      toggleAlarmOn,
      toggleAlarmAmPm
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
        setAlarmTime={setAlarmTime}
        toggleAlarmOn={toggleAlarmOn}
        toggleAlarmAmPm={toggleAlarmAmPm}/>
      </div>
    );
  }
}

export default App;
