import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
//import BookDetails from '../BookDetailsScreen/BookDetailsScreen';




const TableScreen = ({navigation, route}) => {

  const firestore = firebase.firestore;
  const db = firebase.firestore();

  const [user, setUser] = useState({ loggedIn: false });
  const [books, setBooks] = useState([])


    //Navigation



    //Definere navigation til at bruge min StackNavigator
    
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


          useEffect(() => {
            const listOfBooks = firebase.firestore()
              .collection('books')
              .onSnapshot((querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                  documents.push({ ...doc.data(), id: doc.id });
                });
                setBooks(documents);
              });
        
            return () => listOfBooks();
          }, []);


      

        return (
              <View>
                <Text>Books for sale</Text>

                <FlatList
                    numColumns={2}
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                     <TouchableOpacity
                      style={{ flex: 1, margin: 10 }}
                      onPress={() => navigation.navigate('BookDetails', { books: item })}
                    >
                       <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 10 }}>
                          <Text style={styles.UsersDisplayText}>
                            {item.Title} <Text> made by </Text>{item.Author}
                           </Text>
                        </View>
                    </TouchableOpacity>
  )}
/>
              </View>
        )
    }
    
export default TableScreen






const styles = StyleSheet.create({
  UsersDisplayText:{
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    fontStyle: "black"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },










});