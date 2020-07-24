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
    date.setHours(+hour);
    date.setMinutes(+minute);
    date.setSeconds(0);
    return date;
  }

  alarmTimeOnChange = (e) => {
    const newAlarmTime = this.getAlarmTime(e.target.value);
    this.props.setAlarmTime(newAlarmTime);
  }

  componentDidMount() {
    const { alarmTime } = this.props;
    $('#alarmTime').timepicker({ 
      'timeFormat': 'G:i',
      'step': 15,
      'disableTimeRanges': []
    });
    $('#alarmTime').timepicker('setTime', alarmTime);
    $('#alarmTime').on('changeTime', (e) => {
      this.alarmTimeOnChange(e);
    });
  }
  render() {
    const { 
      alarmOn, 
      alarmAmPm, 
      isHour12,
      toggleAlarmOn,
      toggleAlarmAmPm
    } = this.props;
    $('#alarmTime').timepicker('option', 'timeFormat', isHour12 ? 'g:i' : 'G:i');
    // console.log($('#alarmTime').timepicker('option', 'timeFormat'));
    // $('#alarmTime').timepicker('option', 'disableTimeRanges', 
    //   isHour12 ?
    //   ['12pm', '11:59pm'] :
    //   []
    // );
    // console.log($('.alarmTime').timepicker('option', 'disableTimeRanges'));
    return (
      <div className={`Alarm ${alarmOn ? "active" : "inactive"}`}>
        <span onClick={toggleAlarmOn.bind(this)}>
          ALARM{` ${alarmOn ? 'ON' : 'OFF'}`}
        </span>
        <input
        id="alarmTime"
        onFocus={toggleAlarmOn.bind(this)}
        onChange={this.alarmTimeOnChange.bind(this)}
        readOnly={!alarmOn}/>
        <div className={`alarmAmPm ${!isHour12 ? "hidden" : ""}`} onClick={toggleAlarmAmPm.bind(this)}>
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
  setAlarmTime: PropTypes.func.isRequired,
  toggleAlarmAmPm: PropTypes.func.isRequired
}

export default Alarm;