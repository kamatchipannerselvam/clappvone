import React from 'react';
import { SafeAreaView } from 'react-native'
import {
  Box,
  Text,
  HStack,
  View,
  VStack,
  ScrollView
  } from "native-base";

//import NavigationButton from '../ComponentScreens/MNavigationLink';
export default function App() {
  return (
    <ScrollView _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
    <Box _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <HStack justifyContent="flex-end">
      </HStack>
      <VStack alignItems="center" mt={2}>
      <Text>Screen</Text>
      </VStack>
      <VStack alignItems="center" mt={2}>
      <Text>Awaiting Delivery</Text>
      </VStack>
    </Box>
  </ScrollView>
  );
}