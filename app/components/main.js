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
        matches : this.state.matches.cloneWithRows(matches)
 

      })
    })
  }
  
  render() {
    return (
    <View style={styles.mainContainer}>
    <Text style={styles.header}>Todays Matches</Text>
    <ListView
        style={styles.matches}
        dataSource={this.state.matches}
        renderRow={(match) => <Text style={styles.item}>Home: {match.localteam_name} | Away: {match.visitorteam_name} </Text>}

        renderRow={(match) => <Text style={styles.item}>{match.localteam_name} {match.localteam_score} - {match.visitorteam_score} {match.visitorteam_name} </Text>}

      />
              
              
    </View>
  
    );
  }
}

const styles = StyleSheet.create({
  mainContainer : {
    flex: 1,
    padding: 20
  },
  header : {
    marginBottom: 50,
    textAlign: 'center'
  },
  item : {
    textAlign: 'center',
    marginBottom: 5
     borderRadius: 4,
    borderWidth: 5,
    borderColor: 'green',
  },
  item : {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 20,
    textAlign: 'center',
  }
});
