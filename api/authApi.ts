import AsyncStorage from '@react-native-community/async-storage';


export const storeCredentials = async (username :  string, password : string, onPass : ()=> void,onFail : ()=> {} ) => {
    try {
      await AsyncStorage.setItem(username, password)
      await AsyncStorage.setItem("loggedIn", "true")

      onPass && onPass()
    } catch (e) { 
        // saving error
        onFail && onFail()
    }
}

export const logout = async () => {
  try {
    await AsyncStorage.setItem("loggedIn", "false")
  } catch(e) {
    // error reading value
  }
}


export const isLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn')
      if(value == "true") {
        // value previously stored
        return true
      }
      return false
    } catch(e) {
      // error reading value
    }
  }
  
