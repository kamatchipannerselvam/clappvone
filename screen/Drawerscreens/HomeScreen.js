import React, {useEffect, useState} from 'react';
import { Dimensions } from "react-native";
import {
  Box,
  Text,
  HStack,
  VStack,
  useSafeArea,
  ScrollView
  } from "native-base";

import {
  PieChart
} from "react-native-chart-kit";

//import NavigationButton from '../ComponentScreens/MNavigationLink';
import * as NavigationService from "react-navigation-helpers";

//get all cumulative counts for collection & delivery 
import {getAllservices} from "../../components/Servicelist";

function DisplayChart1(){
const data = [
  {
    name: "Mobile",
    population: 100,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Tablet",
    population: 200,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Other",
    population: 300,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
];


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width;

return (
<PieChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  center={[10,15]}
  avoidFalseZero
  absolute
/>)
}

function DisplayChart2(){
const data = [
  {
    name: "Mobile",
    population: 100,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Tablet",
    population: 200,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Other",
    population: 300,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
];


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width;

return (
<PieChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  center={[10,15]}
  avoidFalseZero
  absolute
/>)
}

export default function App(props) {
  return (
  <ScrollView _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
    <Box _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <HStack justifyContent="flex-end">
      </HStack>
      <VStack alignItems="center" mt={2}>
      <Text>Today Collections</Text>
      </VStack>
      <VStack>
      <DisplayChart1 />
      </VStack>
      <VStack alignItems="center" mt={2}>
      <Text>Awaiting Delivery</Text>
      </VStack>
      <VStack>
      <DisplayChart2 />
      </VStack>
    </Box>
  </ScrollView>
  );
}
