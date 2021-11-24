import React,{useEffect} from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  NativeBaseProvider,
  VStack,
  Code,
  Image,
  View,
  extendTheme,
  useColorMode,
  } from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//app logo common component for all pages [logo, and menu]

import { isReadyRef, navigationRef } from "react-navigation-helpers";

import NativeBaseIcon from "./components/NativeBaseIcon";

import DrawerNavigationRoutes from './screen/DrawerNavigationRoutes';
import SplashScreen from './screen/SplashScreen';
import LoginScreen from "./screen/LoginScreen";

// Define the config
const config = {
  colors: {
      // Add new color
      primary: {
        50: '#dbf4ff',
        100: '#addbff',
        200: '#7cc2ff',
        300: '#0891b2',
        400: '#1a91ff',
        500: '#0077e6',
        600: '#005db4',
        700: '#004282',
        800: '#002851',
        900: '#000e21',
      },
    },
    useSystemColorMode: false,
    initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });

// Color Switch Component //toggle dark and light mode 
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {

useEffect((): any => {
  return () => (isReadyRef.current = false);
}, []);

  return (
    <NativeBaseProvider theme={theme}>
      <VStack _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} flex={1} >
      <NativeBaseIcon />
      <NavigationContainer ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <Stack.Navigator initialRouteName="SplashScreen" >
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="Auth" component={HomeScreen} options={{headerShown: false}} theme={theme}/>
          <Stack.Screen name="DrawerNavigationRoutes" component={DrawerNavigationRoutes} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      </VStack>
    </NativeBaseProvider>
  );
}

export default App;