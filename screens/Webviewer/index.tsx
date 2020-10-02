import React, { useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {TextInput } from '../../components';
import { withAppContext } from "../../AppContext";
import Webview from 'react-native-webview'

const Webviewer = (props: any) => {
  const [uri, setURL] = useState<string>("");

  const formatUri = (uri : string) => {
      if (!uri.includes("http")){
          return `http://${uri}`
      }
      return uri
  }
  const isValidURL = (url : string) => {
    var pattern = new RegExp(
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  return (
    <View style={{ padding: 16, marginTop: 50, flex : 1 }}>
        <TextInput
            onClear={()=>{ setURL('')}}
            onBlur={() => {}}
            label={"Enter URL"}
            onChangeText={(value) => setURL(value)}
            value={uri}
        />


        <Webview 
         style={{flex : 1, borderColor : "rgba(0,0,0,0.1)" , borderWidth : 1}}
         source={{ uri : formatUri(uri) }}
         renderError={(errorName) => <Error name={errorName} />}
         onShouldStartLoadWithRequest={(request) => {
            // Only allow navigating within this website
            const {url} = request
            console.log({url} , isValidURL(url))
            return isValidURL(url)
          }}
        />

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
export default  withAppContext(Webviewer)

