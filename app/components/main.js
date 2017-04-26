import React from 'react'
import Button from 'react-native-animated-button';
import { View, Text, StyleSheet, ListView, TextInput } from 'react-native'

export default class Main extends React.Component {

  render() {
    return (
    <View style={styles.body}>
      <Text>Search Team/League</Text>
      <TextInput
            style={styles.searchInput}/>
    </View>
  
    );
  }
}

const styles = StyleSheet.create({
  body : {
    flex: 1,
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
});
