import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import LogInScreen from './src/Screens/LogInScreen/LogInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from './src/Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ConfirmPasswordScreen from './src/Screens/ConfirmPasswordScreen/ConfirmPasswordScreen';
import ApartmentScreen from './src/Screens/ApartmentScreen';
import ArchiveScreen from './src/Screens/ArchiveScreen';
import ContactScreen from './src/Screens/ContactScreen';
import EventScreen from './src/Screens/EventScreen';
import SupportScreen from './src/Screens/SupportScreen';
import TableScreen from './src/Screens/TableScreen';
import BookDetails from './src/Screens/BookDetailsScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import {initializeApp} from 'firebase/app'
import firebase from 'firebase/compat';
import { getFirestore } from "firebase/firestore";
import HomeScreen from './src/Screens/HomeSceen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from './src/Screens/SettingScreen';
import Splash from './src/Screens/SplashScreen';
import { set } from 'react-native-reanimated';
import { AuthContext } from './context';
import CameraScreen from "./src/Screens/CameraScreen/Camera";
import ImageScreen from "./src/Screens/CameraScreen/Image";



//Add SDKs for the i want to use 


//Applikationen Firebase konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBC6Gh06IFiHbTovgyMQznav5o_jIeZkLs",
  authDomain: "awesomeproject-2f66b.firebaseapp.com",
  projectId: "awesomeproject-2f66b",
  storageBucket: "awesomeproject-2f66b.appspot.com",
  messagingSenderId: "11773658731",
  appId: "1:11773658731:web:309017ed98e341a3ad132e",
  databaseURL: "https://awesomeproject-2f66b-default-rtdb.europe-west1.firebasedatabase.app"
};

const db = getFirestore(App)


const AuthStack = createNativeStackNavigator ();
const HomeStack = createNativeStackNavigator ();
const NotifactionStack = createNativeStackNavigator ();
const TableStack = createNativeStackNavigator ();
const EventStack = createNativeStackNavigator ();
const ArchiveStack = createNativeStackNavigator ();


const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const App = () => {


  const [user, setUser] = useState({ loggedIn: false });

  //Inspiration fra øvelsesholdene
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



    //Inspiration fra øvelsesholdene
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

    //Inspiration fra øvelsesholdene
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="ContactScreen" component={ContactScreen}/>
      <HomeStack.Screen name="ApartmentScreen" component={ApartmentScreen}/>
      <HomeStack.Screen name="SupportScreen" component={SupportScreen}/> 
      <HomeStack.Screen name="EventScreen" component={EventScreen}/> 
      <HomeStack.Screen name="ArchiveScreen" component={ArchiveScreen}/> 
      <HomeStack.Screen name="TableScreen" component={TableScreen}/> 
      <HomeStack.Screen name="SettingScreen" component={SettingScreen}/>
        <HomeStack.Screen name={'camera'} component={CameraScreen} options={{headerShown: false}} />
        <HomeStack.Screen name={'image'} component={ImageScreen} />
    </HomeStack.Navigator>
  )

  const NotificationStackScreen = () => (
    <NotifactionStack.Navigator>
      <NotifactionStack.Screen name="Notifications" component={NotificationScreen}/>
        <HomeStack.Screen name={'camera'} component={CameraScreen} options={{headerShown: false}} />
        <HomeStack.Screen name={'image'} component={ImageScreen} />
    </NotifactionStack.Navigator>
  )

  const TableStackScreen = () => (
    <TableStack.Navigator>
      <TableStack.Screen name="Tables" component={TableScreen}/>
      <TableStack.Screen name="BookDetails" component={BookDetails}/>
    </TableStack.Navigator>
  )

  const CameraStackScreen = () => (
    <EventStack.Navigator>
      <EventStack.Screen name="Camera" component={CameraScreen}/>
    </EventStack.Navigator>
  )

  const ArchiveStackScreen = () => (
    <ArchiveStack.Navigator>
      <ArchiveStack.Screen name="Archives" component={ArchiveScreen}/>
    </ArchiveStack.Navigator>
  )

  const TabsScreen = () => (
    <Tabs.Navigator >
        <Tabs.Screen name='HomeScreen' component={HomeStackScreen}/>
        <Tabs.Screen name='NotificationScreen' component={NotificationStackScreen}/>
        <Tabs.Screen name='TableScreen' component={TableStackScreen}/>
        <Tabs.Screen name='Event' component={CameraStackScreen} />
        <Tabs.Screen name='ArchiveScreen' component={ArchiveStackScreen}/>
    </Tabs.Navigator>
  )

  //https://www.youtube.com/watch?v=nQVCkqvU1uE anvendt til at styre navigationen med en splash screen når der loades og userToken til at afgøre om brugeren er logget ind eller ej. 
  //
  
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState (null);

  const authContext = React.useMemo (() => {
    return {
      signIn: () => {
        setIsLoading (false);
        setUserToken ("asdf");
      },
      signUp: () => {
        setIsLoading (false);
        setUserToken ("asdf");
      },
      signOut: () => {
        setIsLoading (false);
        setUserToken (null);
        },

}})


  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);

    }, 1000);
  }, []);

  if (isLoading) {
    return <NavigationContainer><Splash/></NavigationContainer>
  }
//https://www.youtube.com/watch?v=nQVCkqvU1uE Anvendt som inspiration til hele navigationsdelen i applikationen.
  return(
    <AuthContext.Provider value = {authContext}>
    <NavigationContainer>
      {userToken ? (
         <Drawer.Navigator>
         <Drawer.Screen name="Home" component={TabsScreen} />
         <Drawer.Screen name = "Notifikationer" component={NotificationStackScreen} />
         <Drawer.Screen name = "Opslagstavle" component={TableStackScreen} />
         <Drawer.Screen name = "Begivenheder" component={CameraStackScreen} />
         <Drawer.Screen name = "Arkiver" component={ArchiveStackScreen} />
       </Drawer.Navigator>
      ) : (
      <AuthStack.Navigator>
        <AuthStack.Screen name= "SignIn" component={LogInScreen} options={{title: 'Log In'}}/>
        <AuthStack.Screen name= "SignUp" component={SignUpScreen} options={{title: 'Create an account'}}/>
        <AuthStack.Screen name= "ConfirmEmail" component={ConfirmEmailScreen}/> 
        <AuthStack.Screen name= "ForgotPassword" component={ForgotPasswordScreen}/> 
        <AuthStack.Screen name= "ConfirmPassword" component={ConfirmPasswordScreen}/> 
    
      </AuthStack.Navigator>
      )}
   </NavigationContainer>
   </AuthContext.Provider>

      )}
         
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'White'
  }
});

export default App