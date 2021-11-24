import React, { useState } from "react";
import { TouchableOpacity } from 'react-native';
import {
  VStack,
  Box,
  Text,
  HStack,
  HamburgerIcon,
  Pressable,
  Divider,
  View,
  Button,
  Link
  } from "native-base";

import { useNavigation } from '@react-navigation/native'

  export default App = () =>{
    const navigation = useNavigation();
      return (
          <Box mt={3} mb={3} >
            <TouchableOpacity>
            <Link bg="#0077e6" _text={{color:"#fff"}} p={1} pl={2} pr={2} onPress={() => navigation.navigate('Acollection') }>New Job Collections</Link>
            </TouchableOpacity>
          </Box>
      )
  }