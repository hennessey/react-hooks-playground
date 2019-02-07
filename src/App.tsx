import React, { Component } from 'react';
import logo from './logo.svg';
import TheOneWithState from './TheOneWithState'
import TheOneWithEffectfulLifecycles from './TheOneWithEffectfulLifecycles'
import TheOneWithACustomHook from './TheOneWithACustomHook'
import TheOneThatsReduxy from './TheOneThatsReduxy'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TheOneWithState />
          <TheOneWithEffectfulLifecycles SomeProp={true}/>
          <TheOneWithACustomHook />
          <TheOneThatsReduxy />
        </header>
      </div>
    );
  }
}

export default App;
