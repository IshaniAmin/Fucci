import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Button, Video } from 'react-native';
import Main from './main';
import FavTeams from './favTeams';
import Registration from './Registration';

export default class Home extends React.Component {
  constructor(){
      super(); //call the React Component that we're extending

      //initialize username so we can hold onto the username that the user types into the input
      //isLoading boolean to toggle the spinner
      //error boolean to allow us to show an error message if something happens
      this.state = {
          username: '',
          password: '',
      }

      this.handleChange = this.handleChange.bind(this);

      this.handleLogin = this.handleLogin.bind(this);

      this.registration = this.registration.bind(this);

      this.handleGuest = this.handleGuest.bind(this);
  }

  handleChange(event){
    this.setState({
      //we grab the text from the input (TextInput below) because we binded scope to this from the input.
        username: event.nativeEvent.text.toLowerCase()
    })
  }

  handleLogin(){
    this.props.navigator.push({
      title: 'Your Teams',
      // title: this.state.username + "'s Teams",
      component: FavTeams
    })
  }

  handleGuest(){
      this.props.navigator.push({
      title: 'Fucci',
      component: Main
    })
  }

  registration(){
      this.props.navigator.push({
      title: 'Profile Registration',
      component: Registration
    })
  }


  render() {
    return (

      <View style={styles.mainContainer}>

 
   {/* <Video source={uri: "https://www.youtube.com/watch?v=KY2uGNFSL_o"}   
    //    rate={1.0}                     // 0 is paused, 1 is normal. 
    //    volume={1.0}                   // 0 is muted, 1 is normal. 
    //    muted={true}                  // Mutes the audio entirely. 
    //    paused={false}                 // Pauses playback entirely. 
    //    resizeMode="cover"             // Fill the whole screen at aspect ratio. 
    //    repeat={true}                  // Repeat forever. 
    //    playInBackground={true}       // Audio continues to play when app entering background. 
    //    playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 
    //    progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms) 
    //    onLoadStart={this.loadStart}   // Callback when video starts to load 
    //    onLoad={this.setDuration}      // Callback when video loads 
    //    onProgress={this.setTime}      // Callback every ~250ms with currentTime 
    //    onEnd={this.onEnd}             // Callback when playback finishes 
    //    onError={this.videoError}      // Callback when video cannot be loaded 
    //    onBuffer={this.onBuffer} // Callback when remote video is buffering 
    //    style={styles.backgroundVideo} />*/}
 

        <Text style={styles.header}>Fucci</Text>
        <Text style={styles.title}> Login </Text>
        <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.handleChange}
            />
        <TextInput
            style={styles.searchInput}
            value={this.state.password}
            onChange={this.handleChange}

            />  

        <TouchableHighlight
            style={styles.button}
            onPress={this.handleLogin}
            underlayColor="lightpink">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
        <Button title="Register Profile" onPress={this.registration} />
        <Button title="Continue As Guest" onPress={this.handleGuest} />
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    header : {
        marginBottom: 40,
        fontSize: 60,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
  },
});


