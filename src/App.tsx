import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime({
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    }, 1000); // update every second

    return () => clearInterval(interval); // clean up the interval on component unmount
  }, []);


  const SearchButton = () => {

  }

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <View style={styles.topMenu}>
          <View style={[styles.topMenu, styles.toMenuItems]}>
            <Icon name='location-on' size={30} color={'#3498DB'} />
            <Text style={styles.locationText}>
              Location
            </Text>
          </View>
          <View style={[styles.topMenu, styles.toMenuItems]}>
            <TextInput style={[styles.InputStyle]} placeholder='Search' />
            <Icon onPress={SearchButton} name='search' size={30} color={'#3498DB'} />
          </View>
        </View>
        <View>
          <Text style={styles.dateTime}>
            {currentDateTime.time} || {currentDateTime.date}
          </Text>

        </View>
        <View>
          <View style={styles.Tempereture}>
            <View>
              <Text style={styles.TemperetureText} >25°</Text>
              <Icon name='cloud' style={styles.WeatherIcons} size={100} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  topMenu: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  toMenuItems: {
    textAlign: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 26,
    fontWeight: 600,
    fontFamily: 'Segoe Print',
    color: '#3498DB',
  },
  InputStyle: {
    backgroundColor: '#EAF0F1',
    width: 150,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 15,
    color: 'black',

  },
  dateTime: {
    fontSize: 15,
    fontWeight: 300,
    color: '#7B8788',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  Tempereture: {
    height: '70%',
    width: '100%',
    backgroundColor: '#616C6F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  TemperetureText: {
    fontSize: 100,
    fontWeight: 800,
    color: '#3498DB',
    fontFamily: 'Segoe Print',
  },
  WeatherIcons: {
    position: 'absolute',
    top: 60,
    right: -35,
    transform: [{ rotate: '0deg' }],
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  }


});


export default App;
