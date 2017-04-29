'use strict'

import React from 'react'

import { StyleSheet, View, Component, Text, TabBarIOS } from 'react-native'

import {handleShowMatchFacts} from './Main'
import Welcome from './welcome.js'
import More from './more.js'

export default class MatchPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedTab: ''
		}
	}

	ComponentDidMount() {
		handleShowMatchFacts()
		.then(match => {
			console.log(match);
		})
	}



	render(){
		return (
			 <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'welcome'}
          // icon={uri:'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'welcome'
            });
          }}>
        	<Welcome />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          // icon={uri:'contacts'}
          text='c'
          onPress={() => {
            this.setState({
              selectedTab: 'more'
            });
          }}>
        <More />
        </TabBarIOS.Item>

      </TabBarIOS>
		)
	}
}