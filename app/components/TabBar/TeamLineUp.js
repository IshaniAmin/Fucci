'use strict'
import React from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'


export default class Away extends React.Component {
  constructor(props) {
  super(props);

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    teamFacts: {},
    teamInfo1: ds.cloneWithRows([]),
    teamInfo2: ds.cloneWithRows([]),
    teamName1: '',
    teamName2: ''

  }
  // this.handleShowMatchFacts = this.handleShowMatchFacts.bind(this);

}

// componentWillMount(){
  
//   this.setState({
//       teamFacts : this.props.teamFacts
//     })
//   }

// componentDidMount(){

//   let localTeam = this.state.teamFacts.localteam_id;
//   let awayTeam = this.state.teamFacts.visitorteam_id;
//   fetch(`http://api.football-api.com/2.0/team/${localTeam}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
//     .then(res => res.json())
//       .then(teamInfo => {
//       let lineUp = teamInfo.squad
//       lineUp.map(function(match, index){
//           if(lineUp[index].position == 'G'){
//             lineUp[index].position = 'GoalKeeper'
//             return lineUp[index].position
//           }else if(lineUp[index].position == 'D'){
//             lineUp[index].position = 'Defender'
//             return lineUp[index].position
//           }else if(lineUp[index].position == 'M'){
//             lineUp[index].position = 'MidFielder'
//             return lineUp[index].position
//           }else if(lineUp[index].position == 'F'){
//             lineUp[index].position = 'Forward'
//             return lineUp[index].position
//           }
//           return lineUp[index]
//         })
        
//         this.setState({
//           teamInfo1: this.state.teamInfo1.cloneWithRows(lineUp)
//         })
//       })
      
//     fetch(`http://api.football-api.com/2.0/team/${awayTeam}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
//     .then(res => res.json())
//       .then(teamInfo2 => {
//       let lineUp2 = teamInfo2.squad
//       lineUp2.map(function(match, index){
//           if(lineUp2[index].position == 'G'){
//             lineUp2[index].position = 'GoalKeeper'
//             return lineUp2[index].position
//           }else if(lineUp2[index].position == 'D'){
//             lineUp2[index].position = 'Defender'
//             return lineUp2[index].position
//           }else if(lineUp2[index].position == 'M'){
//             lineUp2[index].position = 'MidFielder'
//             return lineUp2[index].position
//           }else if(lineUp2[index].position == 'F'){
//             lineUp2[index].position = 'Forward'
//             return lineUp2[index].position
//           }
//           return lineUp2[index]
//         })
        
//         this.setState({
//           teamInfo2: this.state.teamInfo2.cloneWithRows(lineUp2)
//         })
//       }
//     )


//     fetch(`http://api.football-api.com/2.0/team/${localTeam}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
//     .then(res => res.json())
//       .then(name => {
//         // console.log('name', name.name)

//         let teamName1 = name.name;
        
//         this.setState({
//           teamName1: teamName1
//         })
        
//    })
   
//     fetch(`http://api.football-api.com/2.0/team/${awayTeam}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
//     .then(res => res.json())
//       .then(name => {
//         // console.log('name', name.name)

//         let teamName2 = name.name;
        
//         this.setState({
//           teamName2: teamName2
//         })
//     })
//   }

render() {

    return (
      <View style={styles.body}>
       <NavBar style={styles.navBar}>
          <NavButton>
            <NavButtonText>
              {"Home"}
            </NavButtonText>
          </NavButton>
          <NavButton>
            <NavButtonText>
              {"Away"}
            </NavButtonText>
          </NavButton>
        </NavBar>
 
    </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 50,
  },
  mainContainer: {
    alignItems: 'center',
  },
  matches: {
    // padding: 20,
  },
  teamName: {
    fontSize: 20,
  },
});
