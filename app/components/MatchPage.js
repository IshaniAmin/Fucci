'use strict'
import React from 'react'
import { StyleSheet, View, Component, Text, TabBarIOS, ListView } from 'react-native'
import LineUp from './TabBar/LineUp.js'
import ChatRoom from './TabBar/ChatRoom.js'
import MatchFacts from './TabBar/matchFacts.js'


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class MatchPage extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';

  constructor(props) {
    super(props)
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selectedTab: 'matchFacts',
      matchInfo: {},
      gameTime: '',
      events: ds.cloneWithRows([])
    }

  }
  

  componentWillMount(){
   //this is the prop that was navigated over from matchPage

  console.log(this.props.matchFacts)

  //console.log(this.props.matchFacts)


    //console.log(matchInfo) 
  
        this.setState({
          matchInfo : this.props.matchFacts
        })
      


  }

  componentDidMount(){
  
    //display score
      let game= '';

      if(this.state.matchInfo.localteam_score === "?"){
       console.log('gametime', this.state.matchInfo.time)
       game = this.state.matchInfo.time
        // game = this.state.matchInfo.time;
        // console.log('game', game)
         // return game;
    }else{
      var localScore = this.state.matchInfo.localteam_score;
      var awayScore = this.state.matchInfo.visitorteam_score;
      console.log(localScore)
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
            })
        }  

        this.setState({
          events: this.state.events.cloneWithRows(events)
        })


        
          events.map(function(event, index){
            if(event.type == 'subst'){
              let playerIn = event.player;
              let playerOut = event.assist;

              console.log('Out: ' + playerOut + ' In: ' + playerIn);
            }

          })
 


 }




  render() {

    return (
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


        {/*<TabBarIOS       
       
        <TabBarIOS
          unselectedTintColor="black"
          tintColor="black"
          unselectedItemTintColor="red"
          barTintColor="#004f8a">
          <TabBarIOS.Item
            icon={{uri: base64Icon, scale: 3}}
            renderAsOriginal
            title="LineUp"
            selected={this.state.selectedTab === 'lineUp'}
            onPress={() => {
              this.setState({
                selectedTab: 'lineUp',
              });
            }}>
            <Welcome />
          </TabBarIOS.Item>
          
          <TabBarIOS.Item
            icon={{uri: base64Icon, scale: 3}}
            title="Match Facts"
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            badgeColor="black"
            selected={this.state.selectedTab === 'matchFacts'}
            onPress={() => {
              this.setState({
                selectedTab: 'matchFacts',
              });
            }}>
           
           {/*<MatchFacts propsToCall={this.props.matchFacts} />*/}
          
          {/*</TabBarIOS.Item>
          <TabBarIOS.Item
            icon={{uri: base64Icon, scale: 3}}
            renderAsOriginal
            title="Chat Room"
            selected={this.state.selectedTab === 'chatRoom'}
            onPress={() => {
              this.setState({
                selectedTab: 'chatRoom',
              });
            }}>
            <ChatRoom />
          </TabBarIOS.Item>
        </TabBarIOS>*/}
      </View>
  
    );
  }
}



var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facts: {
    fontSize: 50,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'black',
    margin: 50,
  },
});
