import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    mainWrapper: {  
      justifyContent : "center", 
      flex : 1 , 
      alignItems :"center"
    },
    itemRow:{ 
      height : 42 ,justifyContent : "center", 
      borderColor: "rgba(0,0,0,0.1)",
      borderBottomWidth : 1
    },
    noDataContainer: {
      flex : 1 , paddingTop : 42, 
      alignItems : "center"
    },
    loadingText:{
      fontSize : 12,color: "#fff",
      fontWeight : "600", marginTop : 24,
      alignSelf : "center"
    },
    backBtn:{
      position:"absolute",
      left : 24 , width : 26,
      height: 26
    },
    header : {
      height : 42, shadowColor : 'rgba(0,0,0,0.2)',
      shadowOffset : {width : 8, height : 4},
      shadowRadius : 3, elevation : 5, 
      shadowOpacity : 0.6, backgroundColor : "#fff",
      width : "100%",justifyContent : "center", 
      alignItems : "center",marginBottom : 42 
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
    itemEntry: {
      justifyContent : "center",width :"96%",height : 52,
      flexDirection : "row",alignItems : "center",
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
export default styles
  
  