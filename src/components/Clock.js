import React from 'react';
import './Clock.css';

export class Clock extends React.Component {
  render () {
    return (
      <div className="Clock">
        <h1>{this.props.time}</h1>
      </div>
    )
  }
}

export default Clock;