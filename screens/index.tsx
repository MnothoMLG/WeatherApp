import React from "react";
import { View, StyleSheet , Text } from "react-native";
import { withAppContext } from "../AppContext";
import {Button} from "native-base"
import _ from "lodash"


const AllScreens = (props: any) => {
 
  
  const nav = (screen : string) => {
    props.navigation.navigate(screen)
  }

  return (
    <View style={styles.main}>

        <Text style={styles.title}>
          Mnotho Gumede - wiGroup Assessment
        </Text>
        <Button  
            onPress={()=>{
              nav("Webviewer")
            }}            
            style={styles.navBtn}
        >
            <Text style={{color : "white"}}>WebViewer</Text> 
        </Button>
        <Button  
            onPress={()=>{
              nav("Wiki")
            }}            
            style={styles.navBtn}
        >
            <Text style={{color : "white"}}>Wiki</Text> 
        </Button>
        <Button  
            onPress={()=>{ nav("LocalStorage") }}            
            style={styles.navBtn}
        >
            <Text style={{color : "white"}}>Local Storage</Text> 
        </Button>
    </View>
  )
}


export default  withAppContext(AllScreens)


const styles = StyleSheet.create({
  itemRow:{ 
    height : 42 ,justifyContent : "center", 
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth : 1
  },
  title : {
    position : "absolute", 
    left: 24, top: 24 , 
    fontSize : 12
  },
  main:{ 
    padding: 16,width : "100%",
    justifyContent : "center",
    flex : 1 , alignItems :"center"
  },
  navBtn: {
    width : 200,
    alignSelf : "center",
    alignItems : "center",
    marginTop : 8,
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

