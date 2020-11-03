import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet,TouchableOpacity as Btn, Image,
   Text, FlatList , ActivityIndicator, ImageBackground } from "react-native";
import { ILocationObject, withAppContext } from "../../AppContext";
import _ from "lodash"
import * as Location from 'expo-location';
import * as assets from '../../assets'
import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons';
import styles from './Styles'
import WeatherView from "./WeatherView";

interface IProps {}

const Home = (props: IProps) => {
  const [weatherObj, setWeather] = useState<any>()
  const [loading , setLoading] = useState<boolean>(false)
  const [forecast , setForecast] = useState<any[]>([])
  const [favs, setFavorites] = useState<ILocationObject[]>([])
  const [coords, setCoords] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const { weatherFetch , fourdayForecast , addToFavs,
    getAllFavLocations} = props.context

  useEffect(() => {
    (async () => {  

      setLoading(true)
      //Location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({})
      const {coords : {longitude,latitude}} = location
      setCoords({lon : longitude, lat : latitude})

      Location.watchPositionAsync({}, (location)=>{
        const {coords : {longitude,latitude}} = location
        setCoords({lon : longitude, lat : latitude})
      })
    })()
    },[])


  return (
    <View style={{ flex : 1 }}> 
      <WeatherView coords={coords} />
    </View>
  )
}

export default  withAppContext(Home)

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']