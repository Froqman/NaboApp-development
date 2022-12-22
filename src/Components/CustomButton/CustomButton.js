import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native';

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return (
        <Pressable 
        onPress={onPress}  
        style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {}
            ]}>

        <Text 
        style={[
            styles.text, 
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {}
            ]}>{text}</Text>
                
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffacd',

        width: '100%',

        padding: 15,

        marginVertical: 5,

        alignItems: "center",

        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#fffacd',
    }, 
    container_SECONDARY: {
        backgroundColor:'#ffff00',
        borderColor: 'white',
        borderwidth: 2
    },
    container_TERTIARY:{
        backgroundColor: 'white',

    },
    text: {
        fontWeight: "bold",
        color: "black"
    },
    text_TERTIARY: {
        color: 'grey'
    },
    text_SECONDARY: {
        color: 'black'
    }


});


export default CustomButton