'use strict'

import React from 'react'
import { StyleSheet, View, Component, Text, TabBarIOS } from 'react-native'
import Welcome from './welcome.js'
import More from './more.js'

export default class MatchPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){

    console.log('mathc facts ' + this.props.matchInfo._bodyInit)
  }



	render(){
		return (
			<View>

      </View>

		)
	}
}  
