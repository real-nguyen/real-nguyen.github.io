import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'timepicker/jquery.timepicker';
import 'timepicker/jquery.timepicker.css';
import './Alarm.css';

export class Alarm extends React.Component {
  getAlarmTime(alarmTime) {
    // Workaround; timepicker('getTime') does not work inside
    // changeTime callback if in componentDidMount
    let date = new Date();
    let [hour, minute] = alarmTime.split(':');
    // TODO: Implement solution for 12h mode
    // Should set the alarm to next day if current time is PM and alarm is before (lower PM or any AM) vice versa for AM
    // Should set the alarm to same day if current time is AM and alarm is after (higher AM or any PM) vice versa for PM
    if (date.getHours() > +hour) {
      date.setDate(date.getDate() + 1);
    }
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    return date;
  }

  componentDidMount() {
    const { alarmTime, setAlarmTime } = this.props;
    // TODO: Check if 12h mode
    $('.alarmTime').timepicker({ 
      'timeFormat': 'G:i',
      'step': 15
    });
    $('.alarmTime').timepicker('setTime', alarmTime);
    $('.alarmTime').on('changeTime', (e) => {
      const newAlarmTime = this.getAlarmTime(e.target.value);
      setAlarmTime(newAlarmTime);
    });
  }
  render() {
    const { 
      alarmOn, 
      alarmAmPm, 
      isHour12,
      toggleAlarmOn,
    } = this.props;
    return (
      <div className="Alarm">
        <span className={alarmOn ? "active" : "inactive"} onClick={toggleAlarmOn.bind(this)}>ALARM</span>
        <input
        className={`alarmTime ${alarmOn ? "activeAlarm" : "inactiveAlarm"}`}
        onFocus={toggleAlarmOn.bind(this)}
        readOnly={!alarmOn}/>
        <div className={`alarmAmPm ${!isHour12 ? "hidden" : ""}`}>
          <span className={alarmOn && alarmAmPm.toUpperCase() === 'AM' ? 'active' : 'inactive'}>AM</span>
          <span className={alarmOn && alarmAmPm.toUpperCase() === 'PM' ? 'active' : 'inactive'}>PM</span>
        </div>
      </div>
    );
  }
}

Alarm.propTypes = {
  isHour12: PropTypes.bool.isRequired,
  alarmOn: PropTypes.bool.isRequired,
  alarmTime: PropTypes.object.isRequired,
  alarmAmPm: PropTypes.string.isRequired,
  toggleAlarmOn: PropTypes.func.isRequired,
  setAlarmTime: PropTypes.func.isRequired
}

export default Alarm;