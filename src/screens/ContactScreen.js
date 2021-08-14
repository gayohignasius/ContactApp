import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Tooltip from 'rn-tooltip';
import {ContactsItem} from '../components';
import * as contactActions from '../redux/actions/contactActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexGrow: 0.1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: '600',
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
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ContactScreen = props => {
  const {colors} = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(state => state.contacts.listContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getContacts() {
      setIsLoading(true);
      await dispatch(contactActions.fetchContacts());
    }
    getContacts();
    setIsLoading(false);
  }, [dispatch]);

  const onDetailPressed = id => {
    props.navigation.navigate('DetailContactScreen', {
      id: id,
    });
  };

  const onAddNewPressed = () => {
    props.navigation.navigate('AddNewContactScreen');
  };

  const onDeletePressed = id => {
    Alert.alert('Warning!', 'Are you sure want to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => dispatch(contactActions.deleteContact(id)),
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator color="#344955" size="large" />
        </View>
      </View>
    );
  }
  if (contacts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text>No contacts found! Insert a new one!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {color: colors.onBackground}]}>
              Contacts
            </Text>
          </View>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menu} onPress={onAddNewPressed}>
              <Icon name="plus" color={colors.onBackground} size={16} />
            </TouchableOpacity>
            <View style={styles.menu}>
              <Tooltip
                width={250}
                popover={<Text>Swipe the list to left to delete!</Text>}>
                <Icon
                  name="question-circle"
                  color={colors.onBackground}
                  size={16}
                />
              </Tooltip>
            </View>
          </View>
        </View>
      </View>
      {!isLoading && (
        <FlatList
          data={contacts}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <ContactsItem
              firstName={item.firstName}
              lastName={item.lastName}
              photo={item.photo}
              onDeletePressed={() => onDeletePressed(item.id)}
              onDetailPressed={() => onDetailPressed(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default ContactScreen;
