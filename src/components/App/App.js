//REACT
import React, { Component } from 'react';
import Header from '../Header';
import Tweets from '../Tweets';
import './App.css';
import io from 'socket.io-client';
// import Highlighter from 'react-highlight-words';

// //AXIOS
// const axios = require('axios');

class App extends Component {
  constructor() {
    super()
    this.state = {
      tweets: []
    }
  }
  
  componentWillMount() {
    console.log('about to connect');
    const socket = io()
    console.log('connected');
    socket.on('tweets', (tweets) => {
      console.log(tweets)
      this.setState({tweets: tweets})
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Tweets tweets={this.state.tweets} />
        
      </div>
    );
  }
}

export default App;