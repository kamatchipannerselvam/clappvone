import React, {useCallback, useEffect, useState, createRef} from 'react';
import {  Box, Image, Spinner,  VStack  } from "native-base";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getValidLogin} from "../components/Servicelist";
import * as NavigationService from "react-navigation-helpers";
const SplashScreenLoader = () => {
const [isValiduser, setValiduser] = useState(false);

  useEffect(() => {
    let mounted = true;
    getValidLogin()
      .then(items => {
        if(mounted) {
          setValiduser(items)
        }
      })
    return () => mounted = false;
  }, [])

//console.log(isValiduser);
//IF valid user then redirect to homescreen
  const timer = setTimeout(()=>{
    if(isValiduser.status=="success"){
        NavigationService.navigate('DrawerNavigationRoutes')
        }
    }, 500);

//if not valid user redirect to login screen
  const cleartimer = setTimeout(()=>{
    if(isValiduser.status=="error"){
        NavigationService.navigate('Auth')
        }
    }, 1000);

  return (
    <Box _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      safeArea flex={1}>
      <VStack space={10} alignItems="center">
        <Spinner size="lg" />
        <Image alt="splash screen"
        source={require('../assets/splash.png')}
        style={{width: '100%', height:'100%', resizeMode: 'contain'}}
      />
    </VStack>
    </Box>
  );
}

export default () => {
  return (
        <SplashScreenLoader />
  )
}