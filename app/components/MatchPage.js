'use strict'
import React from 'react'
import { StyleSheet, View, Component, Text, TabBarIOS, ListView } from 'react-native'
import HomeFacts from './TabBar/HomeTeamFacts.js'
import ChatRoom from './TabBar/ChatRoom.js'
import MatchFacts from './TabBar/matchFacts.js'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'



export default class MatchPage extends React.Component {
  // static title = '<TabBarIOS>';
  // static description = 'Tab-based navigation.';
  // static displayName = 'TabBarExample';

  constructor(props) {
    super(props)
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // selectedTab: 'matchFacts',
      matchInfo: {},
      gameTime: '',
      events: ds.cloneWithRows([])
    }

      this.handleChatRoom = this.handleChatRoom.bind(this);
      this.handleLineUp = this.handleLineUp.bind(this);

  }
  

  componentWillMount(){

   //this is the prop that was navigated over from matchPage

  console.log(this.props.matchFacts)
  
        this.setState({
          matchInfo : this.props.matchFacts
        })
  }

  componentDidMount(){
  
    //display score
      let game= '';

      if(this.state.matchInfo.localteam_score === "?"){
       // console.log('gametime', this.state.matchInfo.time)
       game = this.state.matchInfo.time
        // game = this.state.matchInfo.time;
        // console.log('game', game)
         // return game;
        }else{
          var localScore = this.state.matchInfo.localteam_score;
          var awayScore = this.state.matchInfo.visitorteam_score;
          // console.log(localScore)
          game = localScore + ' - ' + awayScore;
      } 

    console.log('did mount ' + this.state.matchInfo)
    this.setState({
      gameTime: game
    })

//displays the event
  const events = this.state.matchInfo.events;

      if(events == []){
        console.log('nothing')
      } else{
          events.map(function(event, index){
            return events[index]

              if(event.type == 'subst'){
                let playerIn = event.player;
                let playerOut = event.assist;

                // console.log('Out: ' + playerOut + ' In: ' + playerIn);
              }   
          })
      }  

        this.setState({
          events: this.state.events.cloneWithRows(events)
        })


        
          events.map(function(event, index){
            if(event.type == 'subst'){
              let playerIn = event.player;
              let playerOut = event.assist;

              // console.log('Out: ' + playerOut + ' In: ' + playerIn);
            }

          })
 


 }

  handleChatRoom() {
      this.props.navigator.push({
      title: 'Chat Room',
      component: ChatRoom
   })
  }

  handleLineUp(id) {
    console.log('match id', id)

    fetch(`http://api.football-api.com/2.0/matches/${id}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(teamInfo => {
      this.props.navigator.push({
      title: "Home",
      component: HomeFacts,
      passProps: {teamFacts: teamInfo}
      })
    })
  }


  render() {

    return (
      <View style={styles.body}>
        <NavBar style={styles.navBar}>
          <NavButton 

          onPress={() => 

            this.handleLineUp(this.state.matchInfo.id)}>
            <NavButtonText>
              {"Line Up"}
            </NavButtonText>
          </NavButton>
          {/*<NavButton>
            <NavButtonText>
              {"Match Facts"}
            </NavButtonText>
          </NavButton>*/}
          <NavButton onPress={() => 
            this.handleChatRoom()}>
            <NavButtonText>
              {"Chat Room"}
            </NavButtonText>
          </NavButton>
        </NavBar>
      <View style={styles.mainContainer}>
        
          <Text style={styles.facts}>{this.state.gameTime}</Text>
          <Text>{this.state.matchInfo.localteam_name} vs {this.state.matchInfo.visitorteam_name}</Text>

            <ListView
              style={styles.matches}
              dataSource={this.state.events}
              renderRow={(event) =>
            <View>
              <Text>{'Action: ' + event.type}</Text>
              <Text>{'Player: ' + event. player}</Text>
            </View>
            }
            />
        </View>
      </View>


    );
  }
}



var styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 50,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  facts: {
    fontSize: 30,
  },
  navBar: {
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',

    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingRight: 8,
    // paddingLeft: 8,
  },
  title: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#626262',
    fontWeight: '500',
    textAlign: 'center',
  },
});