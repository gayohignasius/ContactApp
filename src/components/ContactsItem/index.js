import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
    backgroundColor: '#161616',
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  initialName: {
    color: 'white',
    marginRight: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginHorizontal: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 200,
    right: -10,
    backgroundColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

const ContactsItem = ({firstName, lastName, photo, age, onDetailPressed}) => {
  return (
    <TouchableOpacity style={styles.viewContainer} onPress={onDetailPressed}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: photo === 'N/A' ? null : photo}}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
          <TouchableOpacity style={styles.initialName}>
            <Icon name="chevron-down" color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactsItem;
