import React, {useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import axios from 'axios';
import MyAxios from "./Axiosapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getValidLogin(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('/musers/',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}

export async function getBrandList(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('mcollections/fetchbrand',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}

export async function getRegionList(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('mcollections/fetchregion',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}

export async function getModelList(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('mcollections/fetchmodal',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}

export async function getFaultList(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('mcollections/fetchfaults',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}

export async function getDcList(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');
  //console.log("accessToken " + token);
  return MyAxios.get('mcollections/fetchdc',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(response =>  response.data )
  .catch(error => { console.log(error); return defaultdetails; }  )
}


export async function getAllservices(){
  let defaultdetails = { status: "error"};

  let token = await AsyncStorage.getItem('access_token');

  const requestOne = MyAxios.get('mcollections/fetchregion', { headers: {"Authorization" : `Bearer ${token}`}});
  const requestTwo = MyAxios.get('mcollections/fetchbrand', { headers: {"Authorization" : `Bearer ${token}`}});
  const requestThree = MyAxios.get('mcollections/fetchmodal', { headers: {"Authorization" : `Bearer ${token}`}});
  const requestFour = MyAxios.get('mcollections/fetchfaults', { headers: {"Authorization" : `Bearer ${token}`}});
  const requestFive = MyAxios.get('mcollections/fetchdc', { headers: {"Authorization" : `Bearer ${token}`}});

  //console.log("accessToken " + token);
  return  axios.all([requestOne, requestTwo, requestThree, requestFour,requestFive])
        .then(axios.spread((...responses) => {
          const responseOne = responses[0]
          const responseTwo = responses[1]
          const responesThree = responses[2]
          const responesFour = responses[3]
          const responesFive = responses[4]
          //AsyncStorage.setItem('dclist',responseFive.data.data);
          // use/access the results 
        })).catch(errors => {
          // react on errors.
            defaultdetails
        })

}