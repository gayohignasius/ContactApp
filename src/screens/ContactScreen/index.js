import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {ContactsItem} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {baseUrl} from '../../../env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    marginLeft: 15,
    fontSize: 24,
    fontWeight: '400',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: 15,
  },
  menu: {
    marginLeft: 20,
    marginTop: 10,
  },
  textName: {
    fontSize: 14,
    color: 'white',
  },
});

const ContactScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/contact`)
      .then(response => response.json())
      .then(resData => (setContacts(resData.data), setIsLoading(false)))
      .catch(err => console.log(err));
  }, []);

  const onDetailPressed = id => {
    props.navigation.navigate('DetailContactScreen', {
      id: id,
    });
  };

  const onAddNewPressed = () => {
    props.navigation.navigate('AddNewContactScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Contacts</Text>
          </View>
          <Animated.View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menu}
              onPress={e => console.log(e.nativeEvent)}>
              <Icon name="search" color="white" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={onAddNewPressed}>
              <Icon name="plus" color="white" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu}>
              <Icon name="ellipsis-v" color="white" size={16} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      {!isLoading && (
        <FlatList
          // keyExtractor={item => item.id}
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemData => (
            <ContactsItem
              firstName={itemData.item.firstName}
              lastName={itemData.item.lastName}
              photo={itemData.item.photo}
              onDetailPressed={() => onDetailPressed(itemData.item.id)}
            />
          )}
        />
      )}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;

/* <FlatList
            data={contacts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: '#161616',
                  flexDirection: 'row',
                  height: 100,
                }}>
                <ContactsItem
                  firstName={itemData.item.firstName}
                  lastName={itemData.item.lastName}
                  photo={itemData.item.photo}
                />
              </TouchableOpacity>
            )}
          /> */
