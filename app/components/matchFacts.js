import React from 'react'

import { View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native'

export default class matchFacts extends React.Component {
  constructor() {
  super();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    matcheFacts: ds.cloneWithRows([])
  };
}

componentDidMount(){
    
    fetch(`http://api.football-api.com/2.0/matches/${id}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
    .then(matches => {
      console.log(matches[0]); //check this out
      this.setState({
        matches : this.state.matches.cloneWithRows(matches)
 

      })
    })
  }

}