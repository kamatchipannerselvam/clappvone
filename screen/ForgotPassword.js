import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  Spinner,
  VStack,
  Heading,
  Center,
  NativeBaseProvider,
  Text
} from "native-base"

import AsyncStorage from '@react-native-async-storage/async-storage';
const Forgotpassword = () => {
    return (
    <VStack space={4} alignItems="center">
      <Text>Forgot Password Page</Text>
    </VStack>
    )
}

export default () => {
  return (
        <Forgotpassword />
  )
}