import React, { useEffect, useState } from "react"
import { View,TouchableOpacity as Btn, Modal, Text, FlatList, Alert, ActivityIndicator, SafeAreaView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { IAppContext, ILocationObject, withAppContext } from "../../AppContext"
import * as Animatable from 'react-native-animatable'
import _ from "lodash"
import { StackScreenProps } from "@react-navigation/stack"
import WeatherView from "../Home/WeatherView"
import { MaterialIcons } from '@expo/vector-icons';
import SwipeableRow from "./SwipabelRow"
import * as Strings from '../../constants/Strings'
import styles from './Styles'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


type IProps =  StackScreenProps<any,any> & {context : IAppContext}

const Favourites : React.FunctionComponent<IProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [favs , setFavs] = useState<ILocationObject[]>([])
  const [selectedLocation , setLocation] = useState<ILocationObject>({})
  const [loading, setLoading ] = useState<boolean>(false)
  const { getAllFavLocations ,deleteEntry } = props.context

  const _renderLoader = () => (
    <View style={styles.loaderWrapper}>
        
        <ActivityIndicator color="grey" size="large" />
        <Text style={styles.loadingText}> {"Fetching data..."}</Text>
    </View>
  )

  async function preLoad() {
    setLoading(true)
    const favs = await getAllFavLocations();
    setFavs(favs)
    setLoading(false)
  }
  
  useEffect(() => {
    preLoad()
    const unsubscribe = props.navigation.addListener('focus', () => {
      preLoad()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
   }, [])
  
    const showAlert = () => {
     Alert.alert("Oops","Some error occured.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => {}}
      ],
      { cancelable: false }
     )
    }
  
    const renderWeatherModal = () =>{

      return(
        <Modal
          visible={showModal}
        >
          <View style={[styles.header, {height: 62,marginBottom :0}]}>
              <Btn onPress={()=> setShowModal(false)} style={styles.backBtn}>
                <Ionicons name={Strings.backIcon} size={24} color="black" />
              </Btn>
              <Text  >
                {selectedLocation.name}
              </Text>
          </View>
          <WeatherView coords={selectedLocation.coord}  />
        </Modal>
      )
    }

    const renderItem = (item :  ILocationObject ,index : number) => {

      return(
          <Animatable.View key={index} duration={200} 
            delay={100*index} style={[styles.itemRow, styles.itemEntry]} 
            animation="slideInUp">
            <SwipeableRow 
                onPress={()=>{ 
                  setLocation(item)
                  setShowModal(true)
                }} 
                onDelete={()=>{
                  deleteEntry(item.name).then(()=>{
                      preLoad()
                  }).catch((e)=>{
                    throw e
                  })
                }} 
               text={item.name} />
          </Animatable.View>
      )
    }
  
    const renderNoLocationData = () => {
      return(
        <View style={styles.noDataContainer}>
          <MaterialIcons name="location-off" size={43} color="black" />
          <Text style={{marginTop : 46 , color: "rgba(0,0,0,0.5)"}}>{Strings.noLocations}</Text>
        </View>
      )
    }

    return (
      loading ? _renderLoader() :
      <SafeAreaView style={styles.mainWrapper}>
        {renderWeatherModal()}
        <View style={styles.header}>
          <Text>{Strings.favLocations}</Text>
        </View>
        <FlatList 
          data={favs}
          ListEmptyComponent={()=> renderNoLocationData()}
          style={{flex : 1,width : "100%"}}
          contentContainerStyle={{flex : 1,alignItems : "center"}}
          renderItem={({item , index})=> renderItem(item,index) }
        />
      </SafeAreaView>
    )
}

export default  withAppContext(Favourites)

