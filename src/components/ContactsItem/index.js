import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
    backgroundColor: '#344955',
    borderRadius: 8,
    justifyContent: 'space-between',
    height: 80,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9AA33',
  },
  icon: {
    marginTop: 3,
    marginRight: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteContainer: {
    marginTop: 5,
    marginHorizontal: 10,
    height: 80,
    right: -10,
    backgroundColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

const defaultImage = require('../../assets/images/default-images.png');

const ContactsItem = ({
  firstName,
  lastName,
  photo,
  age,
  onDetailPressed,
  onDeletePressed,
}) => {
  const rightSwipe = (progress, dragX) => {
    const Scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={onDeletePressed}
        activeOpacity={0.6}
        style={styles.deleteContainer}>
        <Animated.View
          style={{
            transform: [
              {
                scale: Scale,
              },
            ],
          }}>
          <Icon name="trash" size={16} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const {colors} = useTheme();

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableOpacity style={styles.viewContainer} onPress={onDetailPressed}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={photo === 'N/A' ? defaultImage : {uri: photo}}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
            <TouchableOpacity style={styles.icon}>
              <Icon name="chevron-right" color={colors.accent} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ContactsItem;
