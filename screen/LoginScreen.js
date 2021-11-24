import React, {useCallback, useEffect, useState, createRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Keyboard, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Image,
  Center,
  View,
  useBreakpointValue
} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';

import axios from 'axios';

const LoginScreenPage = () => {

  const [loginIsReady, setLoginIsReady] = useState(false);
  const navigation = useNavigation();

//Password reference & focusing the password field
const passwordInputRef = createRef();
//loading action ......
const [loading, setLoading] = useState(false);
//formdata array
const [formData, setData] = useState({});
//error data array
const [errors, setErrors] = useState({});
//response error
const [errortext, setErrortext] = useState('');

//validate the form input
const validate = () => {
    setErrors(null); //clear the error array
    if(formData.UserName === undefined  && formData.UserPassword === undefined){
      setErrors({
        ...errors,
        UserName: 'User name is required',
        UserPassword: 'Password is required'
      });
    }
    else if(formData.UserPassword === undefined){
      setErrors({
        ...errors,
        UserPassword: 'Password is required'
      });
    }
    else{
      setErrors(null); //clear the error array
      return true;  
    }
    return false;
 };

//asynchronus function for fetch data
const onSubmit = async () => {
            if(!validate()) return false;
            setErrors({
                ...errors,
                UserName: '',
                UserPassword: ''
            });
            setLoading(true);
            let dataToSend = {username: formData.UserName, password: formData.UserPassword};
            let formBody = [];
            for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');

            
            axios.post('http://192.168.0.143:8080/cservice/v1/musers/login', {
                data: dataToSend,
                headers: {
                    //Header Defination
                    'Access-Control-Allow-Headers':'*', 'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
              .then(function (responseJson) {
                setLoading(false);
                // handle success
                //console.log(response);
                //console.log(responseJson.data);
                AsyncStorage.clear();
                var responsedata=responseJson.data;
                if (responsedata.status === 'success') {
                  //console.log(responsedata.data.username);
                    //console.log(responsedata.data.access_token);
                    AsyncStorage.setItem('user_id', responsedata.data.username);
                    AsyncStorage.setItem('access_token', responsedata.data.access_token);
                    setLoginIsReady(true);
                    //console.log("success");
                }
                else{
                    setLoginIsReady(false);
                    setErrors({
                        ...errors,
                        UserName: '',
                        UserPassword: ''
                    });
                    setErrortext(responsedata.message);
                    //console.log(responsedata.message);
                }
              })
              .catch(function (error) {
                // handle error
                //console.log(error);
                setLoading(false);
                setLoginIsReady(false);
                setErrortext("Network Error");
                //console.log("error");
                setErrors({
                    ...errors,
                    UserName: '',
                    UserPassword: ''
                });
              })
              .then(function () {
                // always executed
                //console.log("exc always");
              });

      setLoginIsReady(false);
    };

//login success navigate    
    if(loginIsReady){
        let timerId = setTimeout(function(){
            AsyncStorage.getItem('user_id').then(
                (value)=>
                navigation.replace('DrawerNavigationRoutes')
                );
        },1000);
    }
 return (
      <Box _dark={{ bg: "primary.900" }} _light={{ bg: "primary.100" }} flex={1}>
           {loading ? <Loader loading={loading} /> : ""}
         <Center mt="10"> 
        <Heading mt="1" color="coolGray.600" fontWeight="semibold" size="lg">
          Sign in to continue!
        </Heading>
        <Box borderWidth="1" borderColor="primary.300" boxSize="xs" space={3} mt="5" alignItems={'center'} h="48" bo>
          <FormControl isRequired isInvalid={'UserName' in errors}>
            <Input
              placeholder="Enter User Name"
              autoCapitalize="none"
              keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              onChangeText={(value) => setData({ ...formData, UserName: value })}
            />
            {'UserName' in errors ?
            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.UserName}</FormControl.ErrorMessage>
            : ''
            }
          </FormControl>
          <FormControl isRequired isInvalid={'UserPassword' in errors}>
            <Input type="password"
              placeholder="Enter Password"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onChangeText={(value) => setData({ ...formData, UserPassword: value })}
            />
            {'UserPassword' in errors ?
            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.UserPassword}</FormControl.ErrorMessage>
            : ''
            }
            </FormControl>
            <VStack>
            {errortext != '' ? (
              <Text fontSize='xs' color='error.500' fontWeight='500' >
                {errortext}
              </Text>
            ) : null}
            </VStack>
            <VStack>
            <TouchableOpacity 
              activeOpacity={0.5} onPress={onSubmit}>
              <Text mt="2" px="2" py="1" fontWeight='500' bg="darkBlue.600" color="darkBlue.50" >LOGIN</Text>
            </TouchableOpacity>
            </VStack>
        </Box>
      </Center>
            {loading ? <Loader loading={loading} /> : ""}
     </Box>
  );
};

export default function() {
  return (
    <LoginScreenPage />
  );
}