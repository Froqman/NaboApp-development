import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Logo from '../../../assets/Images/Logo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { AuthContext } from '../../../context';



const LogInScreen = () => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //Sørger for at vindue dimensioner passer til mobilapplikation
    const {height} = useWindowDimensions();

    //Definere navigation til at bruge min StackNavigator
    const navigation = useNavigation ();
    const {signIn} = React.useContext (AuthContext);

    const onSignInPressed = () => {
        return <CustomButton onPress={() => handleSubmit ()} text = 'Login med din bruger' />
    }

    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
                signIn();
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }


    const onForgotPassword = () => {
        navigation.navigate ('ForgotPassword')
    }
    const onSignUpPressed = () => {
        navigation.navigate ('SignUp')
    }

 

    return (
        <ScrollView>
        <View style = {styles.root}>
            <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} 
             resizeMode = "contain" 
            />

        <CustomInput placeholder='Email' 
        value={email} 
        setValue = {setEmail}
        />

        <CustomInput 
        placeholder='Password' 
        value={password} 
        setValue = {setPassword}
        secureTextEntry = {true}
        />

        {onSignInPressed()}


        <CustomButton 
        text='Forgot password?' 
        onPress={onForgotPassword} 
        type = 'TERTIARY'
        />
        


        <CustomButton 
        text='Dont have an account, create one?' 
        onPress={onSignUpPressed} 
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
    }
});

export default LogInScreen