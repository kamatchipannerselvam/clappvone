import React, { Component,useEffect, useState } from "react";
import {Keyboard, TouchableOpacity, TextInput } from "react-native";
import {SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import {Box,HStack,Radio,Select, Icon, CheckIcon,WarningOutlineIcon, IconButton, 
Image, View,ChevronLeftIcon, ChevronRightIcon, Text, Input,FormControl } from "native-base";
import {getFaultList, getDcList} from "../../../components/Servicelist";

//import Cussearch from "./Selectcomponent";
import Cussearch from "./Cussearchdropdown";

import AsyncStorage from '@react-native-async-storage/async-storage';

class step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      FaultList:[],
      DCList:[]
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ email: "sam@test.com" });

    // Go to next step
    next();
  };


  render() {
    const {currentStep, totalSteps,Faultlist, DCList } = this.state;
    return (
      <View flex={1} alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
        <View>
          <Text fontSize="22">{`Step ${currentStep} of ${totalSteps}`}</Text>
          <Text fontSize="lg" textAlign="left">Fault & Device Condition</Text>
        </View>
        <Box alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} w="80%" >
        <FormControl>
        <Cussearch  items={DCList} itemlabel="Device Condtion"/>
        </FormControl>
        <HStack my={6}>
        <TouchableOpacity onPress={this.props.back}>
          <HStack mx={10} my={2}>
          <Text mt={2} mr={1} fontSize="18">Back</Text>
          <Box
          _dark={{ borderColor: "blueGray.50", borderRadius:100, borderWidth:2, width:42 }}
          _light={{ borderColor: "blueGray.900", borderRadius:100, borderWidth:2, width:42 }}
          >
          <ChevronLeftIcon mx={1} my={1} />
          </Box>
          </HStack>
          </TouchableOpacity>
        <TouchableOpacity onPress={this.nextStep}>
          <HStack mx={10} my={2}>
          <Box
          _dark={{ borderColor: "blueGray.50", borderRadius:100, borderWidth:2, width:42 }}
          _light={{ borderColor: "blueGray.900", borderRadius:100, borderWidth:2, width:42 }}
          >
          <ChevronRightIcon mx={1} my={1} />
          </Box>
          <Text mt={2} ml={1} fontSize="18"> Next</Text>
          </HStack>
          </TouchableOpacity>
        </HStack>
        </Box>
        </View>
    );
  }

componentDidMount() {
    let mounted = true;
    getDcList()
      .then(items => {
        if(mounted) {
          //console.log(items);
          if(items.status=="success"){
            console.log(items.data);
            this.setState({DCList: items.data});
            mounted = false;
          }
        }
      })
}

}

export default step3;