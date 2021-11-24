import React, { useState } from "react";
import {Alert, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import {
  VStack,
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

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;
  const [Displayname, setDisplayname] = useState(false);  
      AsyncStorage.getItem('user_id').then((value) =>
          setDisplayname( 
          value === null ? 'Guest' : value
  ))
  return (
    <SafeAreaView flex={1} >
      <DrawerContentScrollView {...props} >
        <VStack>
        <Text> Welcome! Ms {Displayname}</Text>
        </VStack>
        {state.routes.map((route,_index) => {
          const { drawerLabel, activeTintColor,groupName } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <React.Fragment key={_index} >
              {newGroup ? (
                <HStack alignItems="center" mt={5} flex={1}>
                  <Text ml={5} key={groupName}>
                    {groupName}
                  </Text>
                  <Divider />
                </HStack>
              ) : null}
              <DrawerItem key={route.key}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </React.Fragment>
          );
        })}
          <DrawerItem 
            label={({color}) => 
            <Text style={{color}}>
              Logout
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;