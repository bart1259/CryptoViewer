import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

function CryptoList ({navigation}) {

    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [currencyData, setCurrencyData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    const fetchData = function (pageNumber) {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=' + pageNumber + '&sparkline=false&price_change_percentage=24h')
            .then((response) => response.json())
            .then((responce)=>{
                setCurrencyData([...currencyData, ...responce]);
                setLoaded(true);
            }).catch((error) => {
                console.log(error);
            })

        console.log("Featching data");
    }
    
    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <React.Fragment>
            {/*Loading message jsx*/}
            {
                loaded == false && 
                <View style = {styles.loadingContainer}>
                    <Text style = {styles.loadingText}>Loading...</Text>
                </View>
            }
            {
                loaded == true && 
                <ScrollView style = {styles.listContainer}>
                    {
                        currencyData.map((item, index) => {
                            const percentColor = (item.price_change_percentage_24h > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
                            return <ListItem 
                                key = {index}
                                containerStyle = {styles.listItemStyle}
                                title = {item.name}
                                titleStyle = {styles.coinListTitle}
                                subtitle = {item.symbol.toUpperCase()}
                                subtitleStyle = {styles.coinListTitle}
                                leftAvatar = {{source: {uri: item.image}}}
                                rightTitle = {item.price_change_percentage_24h + "%"}
                                rightTitleStyle = {{color: percentColor}}
                                bottomDivider
                                chevron={{ color: 'white' }}
                                onPress={()=> {
                                    console.log(item.name);
                                    navigation.navigate("Info", {
                                        currency: item,
                                    });
                                }}
                            />
                        })
                    }
                    {
                        currentPageNumber <= 20 && 
                        <ListItem 
                            containerStyle = {styles.listItemStyle}
                            title = "Load More"
                            titleStyle = {styles.coinListTitle}
                            chevron={{ color: 'white' }}
                            onPress={()=> {
                                console.log("Loading more...");
                                fetchData(currentPageNumber+1);
                                setCurrentPageNumber(currentPageNumber+1);
                            }}
                        />
                    }
                </ScrollView>
            }
        </React.Fragment>
    );
}

export default CryptoList;

const styles = StyleSheet.create({

    loadingText: {
        color: 'white',
        fontSize: 30,
    },
    loadingContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flexGrow: 1,
    },
    coinListTitle: {
        color: 'white',
    },
    listItemStyle : {
        backgroundColor: '#222'
    }

});