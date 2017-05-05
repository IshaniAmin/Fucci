// 'use strict'

// import React from 'react'
// import {StyleSheet, View, Component, Text} from 'react-native'


// const styles = StyleSheet.create({
// 	description: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		color: 'blue',
// 	},
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'white',
// 	},
// })

// export default class LineUp extends React.Component {

// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			// lineUp: this.props.matchInfo._bodyInit
// 		}
// 	}

// 	componentWillMount(){
// 		// console.log(this.state.lineUp)
// 	}
// 	render() {
// 		return (
// 			<View style={styles.container}>

// 			<Text style={styles.description}>Line Up</Text>

// 			</View>
// 		)
// 	}
// }

'use strict'
import React from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native';


export default class LineUp extends React.Component {
  constructor(props) {
  super(props);

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    teamInfo1: ds.cloneWithRows([]),
    teamInfo2: ds.cloneWithRows([]),
    teamName1: '',
    teamName2: ''

  }
  // this.handleShowMatchFacts = this.handleShowMatchFacts.bind(this);

}

componentDidMount(){

  fetch(`http://api.football-api.com/2.0/team/9260?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(teamInfo => {
      let lineUp = teamInfo.squad
      lineUp.map(function(match, index){
          if(lineUp[index].position == 'G'){
            lineUp[index].position = 'GoalKeeper'
            return lineUp[index].position
          }else if(lineUp[index].position == 'D'){
            lineUp[index].position = 'Defender'
            return lineUp[index].position
          }else if(lineUp[index].position == 'M'){
            lineUp[index].position = 'MidFielder'
            return lineUp[index].position
          }else if(lineUp[index].position == 'F'){
            lineUp[index].position = 'Forward'
            return lineUp[index].position
          }
          return lineUp[index]
        })
        
        this.setState({
          teamInfo1: this.state.teamInfo1.cloneWithRows(lineUp)
        })
      })
      
    fetch(`http://api.football-api.com/2.0/team/9270?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(teamInfo2 => {
      let lineUp2 = teamInfo2.squad
      lineUp2.map(function(match, index){
          if(lineUp2[index].position == 'G'){
            lineUp2[index].position = 'GoalKeeper'
            return lineUp2[index].position
          }else if(lineUp2[index].position == 'D'){
            lineUp2[index].position = 'Defender'
            return lineUp2[index].position
          }else if(lineUp2[index].position == 'M'){
            lineUp2[index].position = 'MidFielder'
            return lineUp2[index].position
          }else if(lineUp2[index].position == 'F'){
            lineUp2[index].position = 'Forward'
            return lineUp2[index].position
          }
          return lineUp2[index]
        })
        
        this.setState({
          teamInfo2: this.state.teamInfo2.cloneWithRows(lineUp2)
        })
      }
    )


    fetch(`http://api.football-api.com/2.0/team/9260?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(name => {
        console.log('name', name.name)

        let teamName = name.name;
        
        this.setState({
          teamName1: teamName
        })
        
   })
   
       fetch(`http://api.football-api.com/2.0/team/9270?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(name => {
        console.log('name', name.name)

        let teamName2 = name.name;
        
        this.setState({
          teamName2: teamName2
        })
        
   })
  }

render() {

    return (

     <View style={styles.mainContainer}>
        <Text>{this.state.teamName1}</Text>
        <ListView
          style={styles.matches}
          dataSource={this.state.teamInfo1}
          renderRow={(team) =>
          <View>
            <Text>{team.name} - {team.position} </Text>
          </View>
          }
        />
        <Text>{this.state.teamName2}</Text>
        <ListView
          dataSource={this.state.teamInfo2}
          renderRow={(team) =>
          <View>
            
            <Text>{team.name} - {team.position} </Text>
          </View>
          }
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  matches: {
    marginBottom: 20,
  },
});
