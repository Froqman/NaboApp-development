import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import TableScreen from '../TableScreen';


const BookDetailsScreen = ({ route, navigation }) => {
    const { books } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{books.Title}</Text>
        <Text style={styles.author}>{books.Author}</Text>
  
        <TouchableOpacity onPress={() => navigation.navigate('TableScreen')}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
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
    }
})
  

export default BookDetailsScreen
