import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";



const EventScreen = () => {

  const [user, setUser] = useState({ loggedIn: false });


    //Definere navigation til at bruge min StackNavigator
        const navigation = useNavigation ();
    
        function onAuthStateChange(callback) {
            return firebase.auth().onAuthStateChanged(user => {
              if (user) {
                callback({loggedIn: true, user: user});
              } else {
                callback({loggedIn: false});
              }
            });
          }
        
          useEffect(() => {
            const unsubscribe = onAuthStateChange(setUser);
            return () => {
              unsubscribe();
            };
          }, []);
    
        if (!firebase.auth().currentUser) {
            return <View><Text>Not found</Text></View>;
        }
    
        return (
            <SafeAreaView>

                <Text>Events</Text>
    
          
            </SafeAreaView>
    
        )
    
    }
    
    export default EventScreen