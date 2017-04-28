import React from 'react'

import { View, Text, StyleSheet, ListView, TextInput } from 'react-native'


export default class Main extends React.Component {
    constructor() {
  super();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    matches: ds.cloneWithRows([])
  };
}

  componentDidMount(){
    
    fetch("http://api.football-api.com/2.0/matches?match_date=26.04.2017&to_date=26.04.2017&Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76")
    .then(res => res.json())
    .then(matches => {
      console.log(matches[0]); //check this out
      this.setState({
        matches : this.state.matchescloneWithRows(matches)
 

      })
    })
  }
  

  render() {
    return (
    <View style={styles.mainContainer}>
    <ListView
        dataSource={this.state.matches}
        //renderRow={(song) => <Text style={styles.item}>Artist: {song.artist} | Song: {song.songName} | Votes: {song.votes}</Text>}
      />
              
              
    </View>
  
    );
  }
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1,
    padding: 20,
    justifyContent: 'center',

  },
});
