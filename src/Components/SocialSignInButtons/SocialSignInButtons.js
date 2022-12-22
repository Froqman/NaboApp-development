import React from "react";
import {view, text} from 'react-native'
import CustomButton from "../CustomButton";


const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn ('Facebook');
    }
    const onSignInGoogle = () => {
        console.warn ('Google');
    }
    const onSignInApple = () => {
        console.warn ('Apple');
    }
    return (
        <>
        <CustomButton 
        text='Sign In With Facebook' 
        onPress={onSignInFacebook} 
        bgColor = "#E7EAF4"
        fgColor= "#4765A9"
        />
         <CustomButton 
        text='Sign In With Google' 
        onPress={onSignInGoogle} 
        bgColor = "#FAE9EA"
        fgColor= "#DD4D44"
        />
         <CustomButton 
        text='Sign In With Apple' 
        onPress={onSignInApple} 
        bgColor="#E3E3E3"
        fgColor="#363636"
        />
        </>
    )
}
export default SocialSignInButtons