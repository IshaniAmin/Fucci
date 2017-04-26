import React from 'react';
import Button from 'react-native-animated-button';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Navigator } from 'react-native';
import Main from './main';

export default class Home extends React.Component {
  constructor(props){
      super(props); //call the React Component that we're extending

      //initialize username so we can hold onto the username that the user types into the input
      //isLoading boolean to toggle the spinner
      //error boolean to allow us to show an error message if something happens
      this.state = {
          username: '',
          password: '',
      }
      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      this.setState({
        //we grab the text from the input (TextInput below) because we binded scope to this from the input.
          username: event.nativeEvent.text.toLowerCase()
      })
  }

  handleSubmit(){
    this.props.navigator.push({
      component: Main
    })
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Fucci</Text>
        <Text style={styles.title}> Login </Text>
        <TextInput
            style={styles.searchInput}/>
        <TextInput
            style={styles.searchInput}/>  
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit}
            underlayColor="lightpink">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>

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
});

