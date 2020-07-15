import React from 'react';
import './App.css';
import Clock from './components/Clock';

export class App extends React.Component {
  state = {
    timeMode: '24'
  };
  
  render() {
    return (
      <div className="App">
        <Clock timeMode={this.state.timeMode}/>
      </div>
    );
  }
}

export default App;
