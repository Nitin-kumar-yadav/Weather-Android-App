// import { Inter_500Medium } from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';


const App = () => {

  const [interCity, setInterCity] = useState<string>('Innichen');
  const [weatherData, setWeatherData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const APIKEY = 'bc9a00ea8c319215cd42d827a5a7d657';

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const dataURL = `https://api.openweathermap.org/data/2.5/weather?q=${interCity.trim()}&appid=${APIKEY}&units=metric`;
      const response = await fetch(dataURL);
      const responseData = await response.json();


      if (responseData.cod !== 200) {
        Snackbar.show({
          text: 'Failed to fetch weather data',
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false);
        setWeatherData(null);
        return;
      }
      setLoading(false);
      setWeatherData(responseData);
    } catch (error) {
      Snackbar.show({
        text: 'Failed to fetch weather data',
        duration: Snackbar.LENGTH_LONG,
      });
      Snackbar.show({
        text: 'Failed to fetch weather data',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };




  useEffect(() => {
    fetchWeather();
  }, []);


  const SearchButton = () => {

    if (interCity.trim()) {
      fetchWeather();
    } else {
      Snackbar.show({
        text: 'Please enter a city name',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }




  return (
    <SafeAreaView style={styles.body}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > <View>
          {weatherData ? (

            <View>
              {loading ? (
                <View style={styles.lodingStyle}>
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              ) : (
                <>
                  <View style={styles.topMenu}>
                    <View style={[styles.topMenu, styles.toMenuItems]}>
                      <Icon name='location-on' size={30} color={'#3C3B99'} />
                      <Text style={styles.locationText}>
                        {weatherData.name}
                      </Text>
                    </View>
                    <View style={[styles.topMenu, styles.toMenuItems]}>
                      <TextInput value={interCity} onChangeText={(interCity) => setInterCity(interCity)} style={[styles.InputStyle]} placeholder='Search' />
                      <Icon onPress={SearchButton} name='search' size={30} color={'#656EEF'} />
                    </View>
                  </View>
                  <View style={styles.Tempereture}>
                    <View>
                      <Text style={styles.TemperetureText} >{(Math.round(weatherData.main.temp))}°</Text>
                      <Image
                        source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                        style={styles.WeatherIcons}
                      />
                      <Text style={styles.WeatherDescription}>{weatherData.weather[0].description}</Text>
                    </View>
                  </View>
                  <View style={styles.descriptionBox} >
                    <View style={[styles.infoCard]} >
                      <Icon name='beach-access' color='#4C4DDB' size={30} />
                      <Text style={styles.infoValue}>30%</Text>
                      <Text style={styles.infoTitle}>Precipitation</Text>
                    </View>
                    <View style={[styles.infoCard]} >
                      <Icon name='water-drop' color='#4C4DDB' size={30} />
                      <Text style={styles.infoValue}>{weatherData.main.humidity}%</Text>
                      <Text style={styles.infoTitle}>Humidity</Text>
                    </View>
                    <View style={[styles.infoCard]}>
                      <Icon name='air' color='#4C4DDB' size={30} />
                      <Text style={styles.infoValue}>{weatherData.wind.speed}km/h</Text>
                      <Text style={styles.infoTitle}>Wind Speed</Text>
                    </View>
                  </View>
                  <View style={[styles.descriptionBox, styles.descriptionBox2]} >
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='light-mode' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Today's High: {(Math.round(weatherData.main.temp_max))}°</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='brightness-6' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Today's Low: {(Math.round(weatherData.main.temp_min))}°</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]}>
                      <Icon name='wb-twilight' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
                    </View>
                  </View>
                  <View style={[styles.descriptionBox, styles.descriptionBox2]} >
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='sunny-snowing' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='thermostat' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>feels like: {(Math.round(weatherData.main.feels_like))}°</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]}>
                      <Icon name='flag' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>country: {weatherData.sys.country}</Text>
                    </View>
                  </View>
                  <View style={[styles.descriptionBox, styles.descriptionBox2]} >
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='visibility' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Visibility: {Math.round(weatherData.visibility) / 1000}km</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='height' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>sea level: {weatherData.main.sea_level}</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]}>
                      <Icon name='compress' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>pressure: {weatherData.main.pressure}</Text>
                    </View>
                  </View>
                  <View style={[styles.descriptionBox, styles.descriptionBox2]} >
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='cloud' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>clouds all: {weatherData.clouds.all}</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]} >
                      <Icon name='calendar-month' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>Today:{(new Date((weatherData.dt) * 1000)).toUTCString()}</Text>
                    </View>
                    <View style={[styles.infoCard, styles.infoCard2]}>
                      <Icon name='wind-power' color='#4C4DDB' size={30} />
                      <Text style={[styles.infoValue, styles.infoValue2]}>wind Direction: {weatherData.wind.deg}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>

          ) : (
            <View style={styles.toMenuItemsSecondSearch}>
              <View style={[styles.toMenuItems]}>
                <Text>City or Country name is incorrect</Text>
                <Text>Please enter a valid city name</Text>
              </View>
              <View style={[styles.toMenuItems, styles.SecondSearch]}>
                <TextInput value={interCity} onChangeText={(interCity) => setInterCity(interCity)} style={[styles.InputStyle]} placeholder='Search' />
                <Icon onPress={SearchButton} name='search' size={30} color={'#656EEF'} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView >
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
    color: '#3A3C8F',
  },
  InputStyle: {
    backgroundColor: '#EAF0F1',
    width: 150,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 15,
    color: 'black',
    borderColor: '#656EEF',
    borderWidth: 1,
    borderRadius: 5,
  },
  SecondSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  toMenuItemsSecondSearch: {

    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 8,
  },


  Tempereture: {
    height: '20%',
    width: '100%',
    // backgroundColor: '#616C6F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  TemperetureText: {
    fontSize: 100,
    fontWeight: 800,
    color: '#5157EB',
    fontFamily: 'Josefin Sans',
  },
  WeatherIcons: {
    position: 'absolute',
    top: 22,
    right: -55,
    transform: [{ rotate: '0deg' }],
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    height: 150,
    width: 150,

  },
  WeatherDescription: {
    marginTop: 10,
    marginBottom: 20,
    color: '#5157EB',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'Inter',
    position: 'absolute',
    top: 110,
    right: 80,
    width: 100,
  },
  descriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E9E7FF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginHorizontal: 20,
    marginVertical: 0,
  },
  infoCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 300,
    color: '#4C4DDB'
  },
  infoTitle: {
    fontSize: 10,
    fontWeight: 200,
    color: '#4C4DDB',
  },
  mainContainer: {
    backgroundColor: '#4C4DDB',
    height: '80%',
  },

  descriptionBox2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 5,
    // marginVertical: -5,
    // backgroundColor: '#616C6F',
    height: 110
  },
  infoCard2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E7FF',
    padding: 5,
    borderRadius: 10,

    shadowRadius: 10,
    height: 100,
  },
  infoValue2: {
    fontSize: 12,
    fontWeight: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  lodingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    height: '100%',
    width: '100%',
    marginTop: '50%',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },

});


export default App;
