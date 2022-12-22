import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmPasswordScreen = () => {
    const [code, setCode] = useState ('');
    const [newPassword, setNewPassword] = useState ('');

    const navigation = useNavigation ()
    
    const onSignInPressed = () => {
        navigation.navigate ('SignIn')
        console.warn ('Going Back');
    }
    const onSubmitPressed = () => {
        navigation.navigate ('Home')
        console.warn ('To Do');
    }
   
   
    const {height} = useWindowDimensions();
    return (
        <ScrollView>
        <View style = {styles.root}>
        <Text style= {styles.title}>Reset your password</Text>
   
        <CustomInput placeholder='Code' value={code} setValue = {setCode}/>

        <CustomInput placeholder='Enter your new password' value={newPassword} setValue = {setNewPassword}/>

        <CustomButton text="Submit" onPress= {onSubmitPressed}/>
    
        <CustomButton text='Back to sign in?' onPress={onSignInPressed} type = 'TERTIARY'/>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '100%',
        height: '80%',
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10

    },
    text: {
        color: 'gray',
        marginVertical: 10,
        
    },
    link: {
        color: '#FDB075'

    }
});

export default ConfirmPasswordScreen