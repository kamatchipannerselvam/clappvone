import React, { Component } from "react";
import {Keyboard, TouchableOpacity, TextInput } from "react-native";
import {Box, HStack, ScrollView, Icon, IconButton, Image, View,ChevronRightIcon, Text, Input,FormControl } from "native-base"
import {getRegionList} from "../../../components/Servicelist";
import Cussearch from "./Selectcomponent";

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      LocationList:[]
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
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps, LocationList } = this.state;
    return (
      <View flex={1} alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
        <View>
          <Text fontSize="22">{`Step ${currentStep} of ${totalSteps}`}</Text>
          <Text fontSize="lg" textAlign="left">Customer details</Text>
        </View>
      <Box alignItems="center" _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} w="80%" >
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="contact_no"
          keyboardType="number-pad"
          returnKeyType="next"
          placeholder={"Contact No"}
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <FormControl isRequired>
        <Input variant="underlined" fontSize="lg" fontWeight="semibold"
          name="name"
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={"Name"}
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="email"
          keyboardType="email-address"
          placeholder={"Email"}
          returnKeyType="next"
          autoCapitalize="none"
          onChangeText={text => this.setState({ text })}
        />
        </FormControl>
        <FormControl isRequired>
        <Input variant="underlined"  fontSize="lg" fontWeight="semibold"
          name="address"
          returnKeyType="next"
          onChangeText={text => this.setState({ text })}
          placeholder={"Address"}
        />
        </FormControl>
        <ScrollView horizontal={true} style={{width: '100%', padding:0, margin:0}} space={5} mx={5}>
        <View w="100%" h="100%" >
        <Cussearch items={LocationList} itemlabel="Location List"/>
        </View>
        </ScrollView>
        <View mx={5} my={10}>
        <TouchableOpacity onPress={this.nextStep}>
          <HStack>
          <Box
          _dark={{ borderColor: "blueGray.50", borderRadius:100, borderWidth:2, width:42 }}
          _light={{ borderColor: "blueGray.900", borderRadius:100, borderWidth:2, width:42 }}
          >
          <ChevronRightIcon mx={1} my={1} />
          </Box>
          <Text mt={2} ml={1} fontSize="20"> Next</Text>
          </HStack>
          </TouchableOpacity>
        </View>
        </Box>
      </View>
    );
  }
  
  componentDidMount() {
    let mounted = true;
    getRegionList()
      .then(items => {
        if(mounted) {
          //console.log(items);
          if(items.status=="success"){
            //console.log(items.data);
            this.setState({LocationList: items.data});
            mounted = false;
          }
        }
      })
  }

}

export default step1;