import React, { Component } from 'react'
//import { Text, ScrollView, View } from 'react-native'
//import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { LogBox, StyleSheet } from 'react-native';
import {View, Text, Box} from "native-base"
import MultiSelect from 'react-native-multiple-select'

//import {FormControl} from "native-base"

// Options data must contain 'item' & 'id' keys

export default class App extends Component {
  state = {
    selectedItems: []
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems }, () => console.log('Selected Items: ', selectedItems))
  }

  render () {
    const { selectedItems } = this.state
    return (
      <View style={{justifyContent:"center", alignItems:"center"}}>
        <View style={{width:"100%",height:400}} my={10}>
          <MultiSelect
            items={this.props.items}
            uniqueKey='id'
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText={this.props.itemlabel}
            searchInputPlaceholderText='Search Items...'
            onChangeInput={(text) => console.warn(text)}
            tagRemoveIconColor='#CCC'
            tagBorderColor='#CCC'
            tagTextColor='#CCC'
            selectedItemTextColor='#CCC'
            selectedItemIconColor='#CCC'
            itemTextColor='#000'
            displayKey='item'
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor='#CCC'
            submitButtonText='Submit'
            removeSelected
          />
      </View>
      </View>
    )
  }
}