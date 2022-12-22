import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Logo from '../../../assets/Images/Logo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState ('');

    const navigation = useNavigation ()
    
    const onSignInPressed = () => {
        navigation.navigate ('SignIn')
        console.warn ('Going back');
    }
    const onSendPressed = () => {
        navigation.navigate ('ConfirmPassword')
        console.warn ('To do');
    }
   
   
    const {height} = useWindowDimensions();
    return (
        <ScrollView>
        <View style = {styles.root}>
        <Text style= {styles.title}>Reset your password</Text>

   
        <CustomInput placeholder='Username ' 
        value={username} 
        setValue = {setUsername}
        />

        <CustomButton text="Send" onPress= {onSendPressed}/>

    
        <CustomButton 
        text='Back to sign in?' 
        onPress={onSignInPressed} 
        type = 'TERTIARY'
        />
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

export default ForgotPasswordScreen