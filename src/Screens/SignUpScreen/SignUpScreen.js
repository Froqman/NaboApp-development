import React, {useEffect, useId, useReducer, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView} from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 




//Instantiere alle mine state-variabler til denne screen
const SignUpScreen = () => {
    const db = getFirestore(SignUpScreen)
    const [fullname, setFullname] = useState ('')
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [isCompleted, setCompleted] = useState (false);
    const [errorMessage, setErrorMessage] = useState (null)


//Definere navigation til at bruge min StackNavigator
    const navigation = useNavigation()
    

    const onRegisterPressed = () => {
        return <CustomButton onPress={() => handleSubmit()} text="Opret bruger" />;
    };


    const createUser = async () => {
        try {
        const docRef = await addDoc(collection(db, "users"), {
            fullname: fullname,
            email: email,
            password: password,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

//Metode til oprettelse af en bruger. Prædefineret af FireBase. Anvende to parametre (email,password). Funktionen foretages asynkront
//således flere forespørgsler ikke skaber unødvendig ventetid ved oprettelse af brugerne i Firebase. Brugeren navigeres tilbage til Login-side
//Opfanger også fejl og responderer dem til brugeren. Eksempelvis hvis mail ikke har korrekt format 
        const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
                createUser()
                console.warn ('Account Created')
                navigation.navigate ('SignIn')
            });
        } catch (error){
            setErrorMessage(error.message)
        }
    }
    const onPoliciesPressed = () => {
        console.warn ('TODO');
    }
    const onSignInPressed = () => {
        navigation.navigate ('SignIn')
        console.warn ('OnSignInPressed')
    }

    const {height} = useWindowDimensions();

    return (
        <ScrollView>
        <View style = {styles.root}>
        <Text style= {styles.title}>Create An Account</Text>


        <CustomInput 
        placeholder='Fullname' 
        value={fullname} 
        onChangeText={(fullname) => setFullname(fullname)}
        setValue = {setFullname}
        />

       <CustomInput 
        placeholder='Email' 
        value={email} 
        onChangeText={(email) => setEmail(email)}
        setValue = {setEmail}
        secureTextEntry = {false}

        />

        <CustomInput 
        placeholder='Password' 
        value={password} 
        onChangeText={(password) => setPassword(password)}
        setValue = {setPassword}
        secureTextEntry = {true}
        />


        {errorMessage && (
        <Text style={styles.error}>Error: {errorMessage}</Text>
        )}

        {onRegisterPressed()}

        
        <Text style={styles.text}>
            By registering .... Read more on i own you <Text style={styles.link} onPress={onPoliciesPressed}>Policies</Text> </Text>


        <SocialSignInButtons/>

       
        <CustomButton 
        text='Have an account, sign in?' 
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
        marginVertical: 10
    },
    link: {
        color: '#FDB075'

    }
});

export default SignUpScreen