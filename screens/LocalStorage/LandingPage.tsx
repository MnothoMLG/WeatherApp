import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet,TouchableOpacity as Btn, Modal, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import {TextInput } from '../../components';
import { IAppContext, withAppContext } from "../../AppContext";
import {Button} from "native-base"
import Screen2 from './Screen2'
import _ from "lodash"
import { StackScreenProps } from "@react-navigation/stack";

type IProps =  StackScreenProps<any,any> & {context : IAppContext}

const Wiki : React.FunctionComponent<IProps> = (props) => {
  const [username, setUsername] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [loggedIn , setLoggedIn] = useState<boolean>(false)
  const [loading, setLoading ] = useState<boolean>(false)
  const { storeCredentials, isLoggedIn } = props.context


  const _renderLoader = () => (
    <View style={styles.loaderWrapper}>
        <ActivityIndicator color="grey" size="large" />
    </View>
  )
  
  const proceed = () => {
    props.navigation.navigate("Screen2")
  }
  useEffect(() => {
    async function checkLoggedIn() {

      setLoading(true)
      const loggedIn = await isLoggedIn();
      setLoggedIn(loggedIn)
      if (loggedIn) {
        setLoggedIn(true)
        proceed()
      }
      setLoading(false)
    }
    checkLoggedIn();
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
   
  return (
    loading ? _renderLoader() :
    loggedIn ? <Screen2 />  :
    <View style={{ padding: 16, justifyContent : "center", flex : 1 , alignItems :"center"}}>
      <TextInput
        onClear={()=>{ 
            setUsername('')
        }}

        label={"Username"}
        onChangeText={(value) => {
            setUsername(value)
        }}
        value={username}
      />
      <TextInput
        onClear={()=>{  setPassword('')}}
        onBlur={() => {   }}
        label={"Password"}
        password
        onChangeText={(value) => {setPassword(value)}}
        value={password}
      />
      <Button  
          onPress={()=>{
            storeCredentials(username,password,proceed,showAlert)
          }}            
          style={styles.saveBtn}
      >
          <Text style={{color : "white"}}>Save</Text> 
      </Button>

    </View>
  )
}

export default  withAppContext(Wiki)


const styles = StyleSheet.create({
  itemRow:{ 
    height : 42 ,justifyContent : "center", 
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth : 1
  },
  saveBtn: {
    width : 200,
    alignSelf : "center",
    alignItems : "center",
    justifyContent : "center"
  },
  loaderWrapper : {
    flex : 1,
    alignItems : "center",
    width : "100%",
    justifyContent : "center"
  },
  navBar : { 
    width : "100%",height : 42,
    backgroundColor :"white",flexDirection : "row",
    justifyContent : "space-between"
  },
  resultsHeading :{ 
    marginVertical : 8, alignSelf : "center", 
    fontSize : 14,fontWeight : "bold"
  }
})

