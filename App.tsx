import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
    <View style={styles.body}>
      <Text>
        <Icon name='location-on' size={50} color='black' />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  }
})

export default App;
