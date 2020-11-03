import {StyleSheet} from "react-native"
import * as Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    itemRow:{ 
      height : 42 ,borderColor: "rgba(0,0,0,0.1)",
      alignItems : "center",
      borderBottomWidth : 1,paddingHorizontal : 8
    },
    heartBtn: {
      width : 32, height : 32,
      position : "absolute",
      right : 24, top : 36
    },
    temperatureReading:{
      fontSize : 24, minWidth : 30,
      fontWeight : "600",maxWidth : 80,
      color : "#fff", textAlign : "center"
    },
    loadingText:{
        fontSize : 12,color: "#fff",
        fontWeight : "600", marginTop : 24,
        alignSelf : "center"
    },
    itemEntry: {
      justifyContent : "space-between",
      flexDirection : "row"
    },
    entryText :{
      fontSize : 12,color : "#fff",
      flex : 1, textAlignVertical : "center",
      fontWeight : "400", textAlign : "left"
    },
    loaderWrapper : {
      flex : 1, justifyContent : "center"
    },
    tempRow: { 
      flexDirection : "row", justifyContent : "space-between",
      height : 22,paddingHorizontal : 8 
    },
    tempRowText : {
      fontSize : 12, color : "#fff",
      fontWeight : "300", minWidth : 30,
      textAlign : "center", maxWidth : 70
    },
    sunny : {
      backgroundColor : Colors.sunny
    },
    rainy : {
      backgroundColor : Colors.rainy
    },
    cloudy: {
      backgroundColor : Colors.cloudy
    },
    imgBgWrapper : { 
      width : "100%",height : 350,
      backgroundColor :"white",
    },
    imgBg: {
      width : "100%" , height : "100%",marginBottom:4,
      alignItems :"center" ,justifyContent : "center"
    },
    resultsHeading :{ 
      marginVertical : 8, alignSelf : "center", 
      fontSize : 14,fontWeight : "bold"
    }
  })
  
  export default styles