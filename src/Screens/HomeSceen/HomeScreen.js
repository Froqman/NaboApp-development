import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { AuthContext } from '../../../context';


const HomeScreen = () => {

    const onSettingScreen = () => {
        navigation.navigate ('SettingScreen')
    }
    const onTable = () => {
        navigation.navigate ('TableScreen')
    }
    const onArchive = () => {
        navigation.navigate ('ArchiveScreen')
    }
    const onEvents = () => {
        navigation.navigate ('EventScreen')
    }
    const onContacts = () => {
        navigation.navigate ('ContactScreen')
    }
    const onApartments = () => {
        navigation.navigate ('ApartmentScreen')
    }
    const onSupport = () => {
        navigation.navigate ('SupportScreen')
    }


//Definere navigation til at bruge min StackNavigator
    const navigation = useNavigation ();
//Definere SignOut og anvender useContext for at gøre dataen tilgåeligt fra flere komponenter (eks. LogIn)
    const {signOut} = React.useContext (AuthContext);


    const handleLogOut = async () => {
        await firebase.auth().signOut().then((data)=>{
            signOut()
        });
    }

//Hvis den nuværende bruger ikke er FireBase autoriseret, så skal den returne Not Found
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

//Ellers returneres følgende:
    return (
        <SafeAreaView style = {styles.root}>
            <ScrollView>

        <Text style={styles.Menu}>Menu</Text>


        <Text style={styles.CurrentUser}>{firebase.auth().currentUser.fullname}</Text>

        <CustomButton  
        text= 'Indstillinger'
        onPress={onSettingScreen}

        />

        <Text style={styles.CurrentUser}>{firebase.auth().currentUser.email}</Text>


        <Text style={styles.Ejendommen}>Ejendommen</Text>


        <CustomButton  
        text= 'Opslagstavle'
        onPress={onTable}
        />

        <CustomButton
        text= 'Arkiv'
        onPress={onArchive}
        />

        <CustomButton
        text= 'Begivenheder'
        onPress={onEvents}
    
        />
        <CustomButton
        text= 'Kontakter'
        onPress={onContacts}

        
        />
        <CustomButton
        text= 'Lejligheder & Beboere'
        onPress={onApartments}


        
        />
        <CustomButton
        text= 'Support'
        onPress={onSupport}


        
        />
        <CustomButton onPress={() => handleLogOut()} text= "Log ud" />



    </ScrollView>
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    root: {
        padding: 20,
        marginVertical: 0,
        backgroundColor: 'white',
    },
    Menu: {
        fontSize: 25,
        fontWeight: 'bold', 
        textAlign: 'left',
        margin: 10,
    },
    Ejendommen: {
        fontSize: 25,
        fontWeight: 'bold', 
        textAlign: 'left',
        margin: 20,
    },
    CurrentUser: {
        fontSize: 10
    

    }

})

export default HomeScreen