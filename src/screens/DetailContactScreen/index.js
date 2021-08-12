import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const DetailContactScreen = props => {
  const contactID = props.route.params.id;
  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>{contactID}</Text>
    </View>
  );
};

export default DetailContactScreen;
