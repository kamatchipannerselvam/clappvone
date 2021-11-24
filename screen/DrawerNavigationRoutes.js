import React, { useState } from "react";
import {Alert, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import {
  VStack,
  Button,
  Box,
  Text,
  HStack,
  HamburgerIcon,
  Pressable,
  Divider,
  View
  } from "native-base";

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import CustomSidebar from './ComponentScreens/CustomeSidebarMenu';
import HomeScreen from './Drawerscreens/HomeScreen';
import SecondScreen from './Drawerscreens/CollectionScreen';
import AdeliveryScreen from './Drawerscreens/AdeliveryScreen';
import AddcollectionScreen from './Drawerscreens/AddcollectionScreen';

const CHamburgerIcon = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  }
  return (
      <Pressable onPress={toggleDrawer} zIndex="1">
        <HamburgerIcon mx={5} mb={0} color="darkBlue.50"/>
      </Pressable>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
        title: 'Dashboard',  
        safeAreaInsets: {top:0},
        headerLeft: () => (
          <CHamburgerIcon navigationProps={navigation}/>
        ),
        headerStyle: {
          backgroundColor: '#0077e6',
          height:50
          },
          headerTitleContainerStyle: {
          marginBottom: 0,
          },
        headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function SecondStack({ navigation }) {
  return (
    <Stack.Navigator
    screenOptions={{
    headerStyle: { elevation: 0 }
  }}
    >
      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
        title: 'Today Collections',
        safeAreaInsets: {top:0},
        headerLeft: () => (
          <CHamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0077e6',
          height:50
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          marginBottom: 0,
        },
        }}
      />
    </Stack.Navigator>
  );
}

function ThirdStack({ navigation }) {
  return (
    <Stack.Navigator
    screenOptions={{
    headerStyle: { elevation: 0 }
  }}
    >
      <Stack.Screen
        name="AdScreen"
        component={AdeliveryScreen}
        options={{
        title: 'Awaiting for delivery',
        safeAreaInsets: {top:0},
        headerLeft: () => (
          <CHamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0077e6',
          height:50
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          marginBottom: 0,
        },
        }}
      />
    </Stack.Navigator>
  );
}

function FourthStack({ navigation }) {
  return (
    <Stack.Navigator
    screenOptions={{
    headerStyle: { elevation: 0 }
  }}
    >
      <Stack.Screen
        name="AcScreen"
        component={AddcollectionScreen}
        options={{
        title: 'Add New Collection',
        safeAreaInsets: {top:0},
        headerLeft: () => (
          <CHamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0077e6',
          height:50
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          marginBottom: 0,
        },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Box _dark={{ bg: "primary.900" }} _light={{ bg: "primary.100" }} flex={1}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#dbf4ff',
          },
        }}
        drawerContent={(props) => <CustomSidebar {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Dashboard',
            groupName: 'Logistics',
            activeTintColor: '#4aa9ff',
            headerShown: false
          }}
          component={HomeStack}
        />
       <Drawer.Screen
          name="Second"
          options={{
            drawerLabel: 'Today Collections',
            groupName: 'Logistics',
            activeTintColor: '#4aa9ff',
            headerShown: false
          }}
          component={SecondStack}
        />
       <Drawer.Screen
          name="Adelivery"
          options={{
            drawerLabel: 'Awaiting for Delivery',
            groupName: 'Logistics',
            activeTintColor: '#4aa9ff',
            headerShown: false
          }}
          component={ThirdStack}
        />
       <Drawer.Screen
          name="Acollection"
          options={{
            drawerLabel: 'Add New Collections',
            groupName: 'Logistics',
            activeTintColor: '#4aa9ff',
            headerShown: false
          }}
          component={FourthStack}
        />
      </Drawer.Navigator>
      </Box>
  );
}