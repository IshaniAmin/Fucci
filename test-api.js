import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TextInput, Button } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor() {
  super();
  this.state = {
    matches: ''
  };
}

  componentDidMount(){
    fetch("http://api.football-api.com/2.0/matches?match_date=26.04.2017&to_date=26.04.2017&Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76")
    .then(res => res.json())
    .then(matches => {
      console.log(matches); //check this out
      // this.setState({
      //   matches : this.state.matches.cloneWithRows(matches)
      // })
    })
  }
  
 
   };

  render() {
    return()
  }