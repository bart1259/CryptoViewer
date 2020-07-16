import React, { useState, useEffect } from 'react'
import {SafeAreaView, StyleSheet, Text, Image, View } from 'react-native'
import {ButtonGroup} from 'react-native-elements'
import CryptoPriceGraph from './CryptoPriceGraph'

function CryptoInfoScreen ({navigator, route}){

    const currency = route.params.currency;
    const [daysIndex, setDaysIndex] = useState(1);
    const [daysShowingData, setDaysShowingData] = useState(365);
    const [allPriceData, setAllPriceData] = useState({});
    const [loadedPriceData, setLoadedPriceData] = useState(false);

    const fetchPriceData = function (id) {
        //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max
        console.log("Fetching price data");
        fetch('https://api.coingecko.com/api/v3/coins/' + id + '/market_chart?vs_currency=usd&days=max')
        .then((response) => response.json())
        .then((responce)=>{
            setAllPriceData(responce);
            setLoadedPriceData(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    const timePeriodChanged = function (index) {
        setDaysIndex(index);
        switch (index) {
            case 0:
                setDaysShowingData(Number.MAX_SAFE_INTEGER);
                break;
            case 1:
                setDaysShowingData(365);
                break;
            case 2:
                setDaysShowingData(30);
                break;
            case 3:
                setDaysShowingData(7);
                break;
            default:
                setDaysShowingData(Number.MAX_SAFE_INTEGER);
                break;
        }
    }

    const buttons = ['Max', '1 yr', '1 mo', '1 wk'];

    useEffect(() => {
        fetchPriceData(currency.id);
    }, []);

    const textColor = (currency.price_change_24h > 0 ? 'rgb(0,255,0)' : 'rgb(255,0,0)');

    return (

        <SafeAreaView style = {styles.screen} navigator = {navigator}>
            <Text style = {styles.coinNameText}>{currency.name}</Text>
            <Text style = {styles.coinSymbolText}>{currency.symbol.toUpperCase()}</Text>
            <Image style = {styles.coinLogo} source = {{uri: currency.image}}/>
            <View style = {styles.dayUpdate}>
                <Text style={{color: 'white', fontSize: 20}}>24 hrs:</Text>
                <Text style={{color: textColor, fontSize: 20}}>{currency.price_change_24h}</Text>
                <Text style={{color: textColor, fontSize: 20}}>{currency.price_change_percentage_24h}%</Text>
            </View>
            <View style = {styles.chartContainer}>
            {
                loadedPriceData == true && <CryptoPriceGraph allPriceData = {allPriceData} days = {daysShowingData}/>
            }
            {
                loadedPriceData == false &&  <Text style = {styles.loadingText}>Getting Price Data...</Text>
            }
            </View>
            <ButtonGroup
                onPress={timePeriodChanged}
                selectedIndex={daysIndex}
                buttons={buttons}
                buttonStyle = {styles.button}
                containerStyle={styles.buttonGroup} 
                textStyle={styles.buttonText}
                selectedButtonStyle = {styles.selectedButton}/>
        </SafeAreaView>

    );


}

export default CryptoInfoScreen;

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        backgroundColor: "#222",
    }, 
    loadingText: {
        color: 'white',
        fontSize: 20,
    },
    coinNameText: {
        width: 300,
        color: 'white',
        fontSize: 38,
        marginTop: 20,
        marginLeft: 20,
    },
    coinSymbolText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    },
    coinLogo : {
        position: 'absolute',
        width: 80,
        height: 80,
        top: 20,
        right: 20,
    },
    dayUpdate: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    chartContainer : {
        marginTop: 65,
        marginBottom: 5,
        backgroundColor: 'black',
        height: 300,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonGroup: {
        height: 30,
        justifyContent: 'center',
        borderRadius: 0,
        borderColor: '#111',
        marginTop: 60
    },
    button: {
        height: 30,
        backgroundColor: '#111',
    },
    buttonText: {
        color: '#fff'
    },
    selectedButton: {
        backgroundColor: '#0f0'
    },
})