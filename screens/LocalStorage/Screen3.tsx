import React from "react";
import { View, StyleSheet,TouchableOpacity as Btn, Modal, Text, FlatList } from "react-native";
import { IAppContext, withAppContext } from "../../AppContext";
import {Button} from "native-base"
import _ from "lodash"
import { StackScreenProps } from "@react-navigation/stack";

type IProps =  StackScreenProps<any,any> & {context : IAppContext}

const Screen3 = (props: IProps) => {


  return (
    <View style={{ padding: 16, justifyContent : "center", flex : 1 , alignItems :"center"}}>      
        <Button  
            onPress={()=>{
              props.navigation.canGoBack() && props.navigation.goBack()
            }}            
            style={styles.saveBtn}
        >
            <Text style={{color : "white"}}>Go back</Text> 
        </Button>

    </View>
  )
}

export default  withAppContext(Screen3)


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

