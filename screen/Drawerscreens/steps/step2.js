import React, { Component,useEffect, useState } from "react";
import {Keyboard, TouchableOpacity, TextInput } from "react-native";
import {SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import {Box,HStack,Radio,Select, Icon, CheckIcon,WarningOutlineIcon, IconButton, 
Image, View,ChevronLeftIcon, ChevronRightIcon, Text, Input,FormControl } from "native-base";
import {getBrandList} from "../../../components/Servicelist";

import Cussearch from "./Selectcomponent";
//import Cussearch from "./Cussearchdropdown";

import AsyncStorage from '@react-native-async-storage/async-storage';

class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      BrandList:[],
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
    const {currentStep, totalSteps, BrandList} = this.state;
    return (
      <View flex={1} alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
        <View>
          <Text fontSize="22">{`Step ${currentStep} of ${totalSteps}`}</Text>
          <Text fontSize="lg" textAlign="left">Device details</Text>
        </View>
        <Box alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} w="80%" >
        <FormControl isRequired>
        <Radio.Group
        name="deviceType"
        defaultValue="1"
        accessibilityLabel="pick a type"
        >
        <HStack>
        <Radio value="1" color="primary.900" size="md" my={1} mx={1}>
          Mobile
        </Radio>
        <Radio value="2" color="primary.900" size="md" my={1} mx={1}>
          Tablet
        </Radio>
        <Radio value="3" color="primary.900" size="md" my={1} mx={1}>
          Other
        </Radio>
        </HStack>
        </Radio.Group>        
        </FormControl>
        <Cussearch items={BrandList} itemlabel="Brand List"/>
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="Modelname"
          keyboardType="email-address"
          placeholder={"Model Name"}
          returnKeyType="next"
          autoCapitalize="none"
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="partno" 
          keyboardType="email-address"
          placeholder={"Part No"}
          returnKeyType="next"
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="serialno"
          keyboardType="email-address"
          placeholder={"Serial No/IMEI No"}
          returnKeyType="next"
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <HStack>
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
    getBrandList()
      .then(items => {
        if(mounted) {
          //console.log(items);
          if(items.status=="success"){
            //console.log(items.data);
            this.setState({BrandList: items.data});
            mounted = false;
          }
        }
      })
}

}

export default step2;