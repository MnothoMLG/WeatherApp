import React, { useRef, useState } from "react";
import { View, StyleSheet,TouchableOpacity as Btn, Modal, Text, FlatList , ActivityIndicator } from "react-native";
import {TextInput } from '../../components';
import { withAppContext } from "../../AppContext";
import Webview from 'react-native-webview'
import _ from "lodash"
import {Ionicons} from "@expo/vector-icons"

type IRow = { 
  title : string;
  link : string;
}

const Wiki = (props: IProps) => {
  const [searchText, setSearchText] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false)
  const [wikiResults , setResults] = useState<any[]>([])
  const [rowOnFocus, setRowOnFocus ] = useState<IRow>({})
  const [showModal, setShowModal] = useState<boolean>(false)
  const { wikiFetch } = props.context
  
  const _renderLoader = () => (
    <View style={styles.loaderWrapper}>
        <ActivityIndicator color="grey" size="large" />
    </View>
  )

  const _renderWikiPage = () => {

    const {title , link} = rowOnFocus

    return(
      <Modal visible={showModal} >
        <View style={{flex : 1,padding : 16}}>
          <View 
            style={styles.navBar}>
            <Btn 
              style={{width : 24,height: 24}}
              onPress={()=>{ setShowModal(false)}}
            >
              <Ionicons name="md-arrow-round-back" size={20} />
            </Btn>
            <Text style={{fontSize : 12}}>{title}</Text>
            <Btn style={{width : 24,height: 24}} />
          </View>
          <Webview 
            style={{flex : 1, borderColor : "rgba(0,0,0,0.1)" , borderWidth : 1}}
            source={{ uri : link }}
            renderError={(errorName) => <Error name={errorName} />}
          />
        </View>
      </Modal>
   )
  }

  return (
    <View style={{ padding: 16, flex : 1 }}>
      <TextInput
        onClear={()=>{ 
          setSearchText('')
          setResults([])
        }}
        onBlur={() => {
          setLoading(true)
          wikiFetch(searchText).then((res : any)=>{ //consider an IResponse generic type
              console.log({res})
              const resultsAndLinks = res[1].map((title : string, index : number)=>(
                { title, link : (res[3])[index]}
              ))
              setResults(resultsAndLinks)
          }).catch((err : Error)=>{
            console.log(err)
          })
          setLoading(false)
        }}
        label={"Enter a search keyword"}
        onChangeText={(value) => {
          setSearchText(value)
        }}
        value={searchText}
      />
       
      {loading && _renderLoader()}
      {!_.isEmpty(wikiResults) && (
      <Text style={styles.resultsHeading}>
         Results
      </Text>)}
      <FlatList 
        data={wikiResults}
        renderItem={({item})=>{
          return (
            <Btn  
              onPress={()=>{
                setRowOnFocus(item)
                setShowModal(true)
              }}
              style={styles.itemRow}
            >
              <Text>{item.title}</Text> 
            </Btn>
          )
        }}
      />
      {_renderWikiPage()}
    </View>
  )
}

const Error = (props : {name?:string}) => {

    const {name} = props
    return (
        <View style={{flex : 1}}>
            {name && <Text>{name}</Text>}
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
  loaderWrapper : {
    flex : 1,
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

