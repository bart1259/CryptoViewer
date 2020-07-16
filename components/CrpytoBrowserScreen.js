import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import CryptoList from './CryptoList'

function CryptoBrowserScreen ({navigation}){


    return (

        <SafeAreaView style = {styles.screen}>
            <CryptoList navigation = {navigation}  />
        </SafeAreaView>

    );


}

export default CryptoBrowserScreen;

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        backgroundColor: "#222",
    }
})