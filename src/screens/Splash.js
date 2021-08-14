import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: '900',
  },
});

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('ContactScreen');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/friends.png')}
      />
      <Text style={styles.text}>Contact App</Text>
    </View>
  );
};

export default Splash;
