import React from 'react';
import './App.css';
import Clock from './components/Clock';

export class App extends React.Component {
  state = {
    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
  };

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
    });
  }

  // Analogous to Angular's onInit
  componentDidMount() {
    // Calls tick every second
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  // Analogous to Angular's onDestroy
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="App">
        <Clock time={this.state.time}/>
      </div>
    );
  }
}

export default App;
