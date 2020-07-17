import React from 'react';
import './Alarm.css'

export class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmOn: false,
      setAlarmMode: false,
      alarmTime: '7:00'
    };
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

  componentDidMount() {
    
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

  onClickAlarm = () => {
    const { alarmOn, setAlarmMode } = this.state;
    if (!alarmOn) {
      this.setState({
        alarmOn: !alarmOn,
        setAlarmMode: !setAlarmMode
      })
    } else {
      this.setState({
        setAlarmMode: !setAlarmMode
      })
    }
  }

  render() {
    return (
      <div className="Alarm">
        <span className={this.state.alarmOn ? "active" : "inactive"} onClick={this.toggleAlarmOn.bind(this)}>ALARM</span>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <input 
          type="text" 
          name="alarmTime" 
          value={this.state.alarmTime}
          onChange={this.setAlarm.bind(this)}
          onFocus={this.toggleAlarmOn.bind(this)}
          className={`alarmTime ${this.state.alarmOn ? "activeAlarm" : "inactiveAlarm"}`}
          readOnly={!this.state.alarmOn}
          />
        </form>
        {/* <span className={this.state.alarmOn ? 'activeAlarm' : 'inactiveAlarm'} onClick={this.onClickAlarm.bind(this)}>7:00</span> */}
      </div>
    );
  }
}

export default Alarm;