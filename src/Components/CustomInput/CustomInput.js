import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput,} from 'react-native';


//Laver en CustomInput knap som kan anvendes som en skabelon til forskellige knapper i hele Applikationen

//
const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style = {styles.container}>
            <TextInput 
            value = {value}
            onChangeText = {setValue}
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry}/>
        </View>
    )
}

// Styler hvordan knappen skal se ud

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: 'e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 10,

        marginVertical: 5,


    },
    input: {},
});

export default CustomInput