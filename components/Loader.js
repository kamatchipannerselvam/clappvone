// Import React and Component
import React from 'react';
import {  Box, Spinner,  VStack, View  } from "native-base";
import {StyleSheet, Modal, ActivityIndicator} from 'react-native';
const Loader = (props) => {
  const {loading, ...attributes} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View>
        <View space={10} alignItems="center" mt={200} zIndex="1">
        <Spinner size="lg" color="darkBlue.600"/>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;