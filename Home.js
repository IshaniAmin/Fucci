import React from 'react';
import Button from 'react-native-animated-button';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {

  render() {
    return (
    <View>
    <View>
      <View style={{styles.header}}>
        <Text style={{fontSize: 40, color 'red'}}>Fucci</Text>
      </View>
      <View style={styles.container}>
        <Button
        style={{marginTop:10,alignSelf:'center', height: 55,width:80, backgroundColor: 'white', borderColor: '#0033FF', borderRadius: 5}}
        text="Go To Stories"
        onLongPress={() => {
          console.log('onLongPress...');
        }}
            onPress={() => {
          console.log('onPress...');
        }}
            onPressIn={() => {
          console.log('onPressIn...');
        }}
            onPressOut={() => {
          console.log('onPressOut...');
        }}
        >
        </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

