import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet,TouchableOpacity as Btn, Image,
   Text, FlatList , ActivityIndicator, ImageBackground } from "react-native";
import { ILocationObject, withAppContext } from "../../AppContext";
import _ from "lodash"
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import * as assets from '../../assets'
import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons';
import styles from './Styles'

interface IProps {
    coords : {
        lat : number;
        lon : number;
    }
}

const WeatherView = (props: IProps) => {
  const [weatherObj, setWeather] = useState<any>({})
  const [loading , setLoading] = useState<boolean>(true)
  const [forecast , setForecast] = useState<any[]>([])
  const [favs, setFavorites] = useState<ILocationObject[]>([])
  const { weatherFetch , fourdayForecast , addToFavs,
    getAllFavLocations} = props.context

  const weatherIcons = {
    "clear" :  assets.sunnyIcon,
    "rainy" : assets.rainIcon,
    "clouds" : assets.cloudyIcon
  }

  const getTheme = () => {
    if (_.isEmpty(weatherObj) || !weatherObj.weather) {
      return "sunny"
    }

    switch (weatherObj.weather[0].main){
      case "Clear":
        return "sunny"
      case "Cloudy":
        return "cloudy"
      default : 
        return "rainy"
    }
  }

  const refreshFavs = async () => {
    try{
      const favs = await getAllFavLocations();
      setFavorites(favs)
    }
    catch{

    }
  }

  useEffect(() => {
    (async () => {  

      setLoading(true)
      const {coords : {lon,lat}} = props

      //Persisted
      await refreshFavs();

      //Forecast
      weatherFetch({lat , lon }).then((res)=>{
        setWeather(res)
      }).catch((err)=>{ setLoading(false) })

      fourdayForecast({lat , lon}).then((res)=>{
        res.daily && setForecast(res.daily.slice(4))
        setLoading(false)
      }).catch((err)=>{

      })

    })();
    },[props.coords])

  const _renderLoader = () => (
    <View style={styles.loaderWrapper}>
        
        <ActivityIndicator color="grey" size="large" />
        <Text style={styles.loadingText}> {"Fetching data..."}</Text>
    </View>
  )

  const renderTempReading = (reading: number, fontSize?: number) => (
    <Text style={[styles.temperatureReading, {fontSize}]}>{`${Math.round(reading)}°`}</Text>
  )

  const parseLocationObject = (weather : any) =>{
    const {name , coord} = weatherObj
    return {name,coord}
  }

  const renderHaertBtn = () => {
    const isFav = favs.find((location) => location.name === weatherObj.name)
    console.log(weatherObj.name)
    return(
      <Btn style={styles.heartBtn}
            onPress={()=> {
              addToFavs(parseLocationObject(weatherObj))
              refreshFavs()
            }}
      >
          <AntDesign name={isFav ? "heart" :"hearto"} size={24} color="#fff" />
      </Btn>
    )
  }

  const _renderWeather = () => {
  
    if (_.isEmpty(weatherObj) || !weatherObj.weather)  return null
    const bg = assets[getTheme()]
    const { main : {temp, temp_max, temp_min}} = weatherObj
   
    return(
        <View style={{height: 400}}>
          <View style={styles.imgBgWrapper}>
              <ImageBackground style={styles.imgBg} resizeMode="stretch" source={bg}>            
                {renderTempReading(temp,32)}
                {renderHaertBtn()}
                <Text style={{fontSize : 24, fontWeight : "400" , color : "#fff"}}>{getTheme().toUpperCase()}</Text>
              </ImageBackground>
              <View style={styles.tempRow}>
                {renderTempReading(temp_min,12)}
                {renderTempReading(temp,12)}
                {renderTempReading(temp_max,12)}
              </View>
              <View style={[styles.tempRow, {borderBottomColor : "#fff", borderBottomWidth : 0.5}]}>
                <Text style={styles.tempRowText}>min</Text>
                <Text style={styles.tempRowText}>Current</Text>
                <Text style={styles.tempRowText}>max</Text>
              </View>
          </View>
        </View>
    )
  }

  const getDayUsingIndex = (index : number) => {
    const date = new Date()
    date.setDate(date.getDate() + index + 1)
    return days[date.getDay()]
  }
  
  const renderItem = (item :  any ,index : number) => {
    const main = (item.weather[0].main).toLowerCase()
    const temp = (item.temp.day)
    const source = weatherIcons[main]

    return(
      <Btn onPress={()=>{}}  >
        <Animatable.View key={index} duration={200} delay={100*index} style={[styles.itemRow, styles.itemEntry]} animation="slideInUp">
          <Text style={styles.entryText}>{getDayUsingIndex(index)}</Text>
          <Image source={source} style={{width: 24,height: 24}} />
          <Text style={[styles.entryText,{textAlign : "right"}]}>{`${temp}°`}</Text>
        </Animatable.View>
      </Btn>
    )
  }

  return (
    <View style={[{ flex : 1 }, styles[getTheme()]]}> 
      {loading ? _renderLoader() : [_renderWeather(),
      <FlatList 
        data={forecast}
        contentContainerStyle={{}}
        renderItem={({item , index})=> renderItem(item,index) }
      />
      ]}
    </View>
  )
}

export default  withAppContext(WeatherView)

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']