import React from 'react'

import { View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native'


export default class Main extends React.Component {
  constructor() {
  super();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    matches: ds.cloneWithRows([]),
    matchFacts: ds.cloneWithRows([])
  };
  this.handleShowMatchFacts.bind(this)
}

  componentDidMount(){
    
    fetch("http://api.football-api.com/2.0/matches?match_date=26.04.2017&to_date=26.04.2017&Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76")
    .then(res => res.json())
    .then(matches => {
      this.setState({
        matches : this.state.matches.cloneWithRows(matches)
      })
    })
  }
  
  handleShowMatchFacts = id => {
    console.log(id)
    return fetch(`http://api.football-api.com/2.0/matches/${id}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
    .then(matchFacts => {
      console.log(matchFacts)
         this.setState({
        matches : this.state.matches.cloneWithRows([]),
        matchFacts : this.state.matchFacts.cloneWithRows(matchFacts)
      })
    })
  }
  
  render() {
    return (
    <View style={styles.mainContainer}>
      <Text 
      style={styles.header}>
      Todays Matches</Text>
      <ListView
          style={styles.matches}
          dataSource={this.state.matches}
          renderRow={(matches) => 
          <TouchableHighlight 
          onPress={() => this.handleShowMatchFacts(matches.id)}
          underlayColor="green"
          ><Text style={styles.item}> {matches.localteam_name} {matches.localteam_score} - {matches.visitorteam_score} {matches.visitorteam_name} </Text>
         </TouchableHighlight>
          }
        />
      <ListView
          style={styles.matches}
          dataSource={this.state.matchFacts}
          renderRow={(match) => 
          <Text style={styles.item}> {match.localteam_name} {match.localteam_score} - {match.visitorteam_score} {match.visitorteam_name} </Text>
          }

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
    textAlign: 'center'
  },
  matches : {
    marginTop: 20
  },
  item : {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'green',
    marginBottom: 5,
    padding: 20,
    textAlign: 'center',
  },
});
