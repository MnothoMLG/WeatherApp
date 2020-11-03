import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialIcons } from '@expo/vector-icons'
import * as Strings from '../../constants/Strings'

class SwipeableRow extends Component {

  renderLeftActions = (progress, dragX) => {

    const {onDelete} = this.props
    const trans = dragX.interpolate({
      inputRange: [-101,-100,-50,0],
      outputRange: [-20, 0, 0, 1],
    })

    return (
      <RectButton style={styles.rightAction} onPress={()=>{ onDelete && onDelete()}}>
        <Animated.Text
          style={[ styles.actionText,{transform: [{ translateX: trans }]}]}>
          {Strings.commonDelete}
        </Animated.Text>
      </RectButton>
    )
  }

  render() {

    const {onPress } = this.props
    return (
      <Swipeable containerStyle={styles.swipeableContainer} renderRightActions={this.renderLeftActions}>
        <TouchableHighlight onPress={()=> onPress && onPress()} style={styles.innerRow} >
            <>
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text>{this.props.text}</Text>
            </>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

export default SwipeableRow

const styles = StyleSheet.create({
    rightAction:{ 
      width : 92 ,justifyContent : "center", 
      borderColor: "rgba(0,0,0,0.1)",backgroundColor : "red",
      borderBottomWidth : 1, height : "100%"
    },
    swipeableContainer : {
        height : 52, width : "100%"
    },
    innerRow: { 
        width : "100%",height : "100%",
        alignItems : "center", paddingHorizontal : 16,
        justifyContent : "flex-start" ,
        flexDirection :"row"
    },
    actionText :{ 
      marginVertical : 8, alignSelf : "center", 
      fontSize : 14,fontWeight : "600", color: "#fff"
    }
})
  
  