import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import timepicker from 'timepicker';
import 'timepicker/jquery.timepicker.css';
import './Alarm.css';

export class Alarm extends React.Component {
  render() {
    const { 
      alarmOn, 
      alarmTime, 
      alarmAmPm, 
      isHour12,
      toggleAlarmOn,
      setAlarm
    } = this.props;
    $('#alarmTime').timepicker({ 
      'timeFormat': 'G:i',
    });
    $('#alarmTime').timepicker('setTime', alarmTime);
    return (
      <div className="Alarm">
        <span className={alarmOn ? "active" : "inactive"} onClick={toggleAlarmOn.bind(this)}>ALARM</span>
        <input id="alarmTime"></input>
        {/* <form onSubmit={(e) => {e.preventDefault()}}>
          <input 
          type="time" 
          name="alarmTime" 
          value={alarmTime}
          onChange={setAlarm.bind(this)}
          onFocus={toggleAlarmOn.bind(this)}
          className={`alarmTime ${alarmOn ? "activeAlarm" : "inactiveAlarm"}`}
          readOnly={!alarmOn}
          />
        </form> */}
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
  setAlarm: PropTypes.func.isRequired
}

export default Alarm;