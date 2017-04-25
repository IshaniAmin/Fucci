import React from 'react'
import Button from 'react-native-animated-button';
import { View, Text, StyleSheet, ListView } from 'react-native'

export default class App extends React.Component {

	render() {
		return (
		<View style={styles.body}>
			<View style={styles.header}>
				<Text style={{fontSize: 60, color: 'black'}}>Fucci</Text>
			</View>
			<View style={styles.container}>
        <Text style={{fontSize: 30, color: 'black'}}>Your Teams</Text>
			</View>
    {/* Your Teams List View*/}
			<View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Club Team Name</Text>
        {/* Buttons: Match Facts, View Stories, and Visit Chat Room */}
        <Text>Previous Match</Text>
        <View style={styles.previousMatch}>
          <Text>Home</Text>
          <Text>Away</Text>

        </View>
        <View style={styles.teamlinks}>
          <Button style={{width: 50, height: 50, backgroundColor: 'powderblue'}} text='Match Facts'/>
          <Button style={{width: 50, height: 50, backgroundColor: 'skyblue'}} text='Stories'/>
          <Button style={{width: 50, height: 50, backgroundColor: 'steelblue'}} text='Chat Room'/>
        </View>
			</View>
		</View>
	
		);
	}
}

const styles = StyleSheet.create({
	body : {
		flex: 1,
	},
  header: {
    flex: .8,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  teamlinks: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  previousMatch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
});
