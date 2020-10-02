import React from "react"
import { View, StyleSheet,Text } from "react-native"
import { IAppContext, withAppContext } from "../../AppContext"
import {Button} from "native-base"
import _ from "lodash"
import { StackScreenProps } from "@react-navigation/stack"

type IProps =  StackScreenProps<any,any> & {context : IAppContext}

const Screen2 = (props: IProps) => {

  const {logout } = props.context
  
  return (
    <View style={{ padding: 16, justifyContent : "center", flex : 1 , alignItems :"center"}}>
        <Button  
            onPress={()=>{
                props.navigation.navigate("Screen3")
            }}            
            style={styles.saveBtn}
        >
            <Text style={{color : "white"}}>Go To Screen 3</Text> 
        </Button>
        <Button  
            onPress={()=>{
                logout()
            }}            
            style={styles.saveBtn}
        >
            <Text style={{color : "white"}}>Logout</Text> 
        </Button>

    </View>
  )
}

export default  withAppContext(Screen2)

const styles = StyleSheet.create({
  itemRow:{ 
    height : 42 ,justifyContent : "center", 
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth : 1
  },
  saveBtn: {
    width : 200,
    marginVertical : 4,
    alignSelf : "center",
    alignItems : "center",
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

