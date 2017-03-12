import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    var options = { month: 'long', day: 'numeric' };

    return (
      <div>
        <h3>{this.state.date.toLocaleDateString('en-US', options)} | {this.state.date.toLocaleTimeString()}</h3>
      </div>
    );
  }
}

export default Clock;