import React, {useState} from "react";
import {
  Box,
  Image, 
  extendTheme,
  VStack,
  HStack,
  Text,
  Link,
  Switch,
  useColorMode,
  useSafeArea 
 } from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

// Color Switch Component //toggle dark and light mode 
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={5} alignItems="center">
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

const NativeBaseIcon = () => {
  return (
      <VStack space={0} alignItems="center">
      <HStack space={5} alignItems="center">
      <Image 
      source={ require('../image/comtel-logo.jpg') }
      alt="Alternate Text"
      resizeMode="contain"
      size="md"
    />
    <ToggleDarkMode />
    </HStack>
    </VStack>
  );
};

export default NativeBaseIcon;