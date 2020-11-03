import AsyncStorage from '@react-native-community/async-storage';
import { ILocationObject } from '../AppContext';

export const addToFavs = async (locationObj : any ) => {
    try {
      const favs = await AsyncStorage.getItem('favs') || "[]"
      const favsArray = JSON.parse(favs)
      
      if (!favsArray.find((location : ILocationObject) => location.name === locationObj.name)){
        favsArray.push(locationObj)
        await AsyncStorage.setItem("favs", JSON.stringify(favsArray))
      }

    } catch (e) { 
        // saving error 
    }
}

export const deleteEntry = async (name : string ) => {
  try {
    const favs = await AsyncStorage.getItem('favs') || "[]"
    const favsArray = JSON.parse(favs).filter(location => location.name !== name)
    await AsyncStorage.setItem("favs", JSON.stringify(favsArray))
  } catch (e) { 
      // saving error 
  }
}

export const getAllFavLocations = async ( ) => {
  try {
    const favs = await AsyncStorage.getItem('favs') || "[]"
    const favsArray = JSON.parse(favs)
    return favsArray
  } catch (e) { 
      // saving error 
  }
}
