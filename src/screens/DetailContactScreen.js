import React, {useState, useEffect} from 'react';
import {useCallback} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as contactActions from '../redux/actions/contactActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    marginBottom: 30,
  },
  input: {
    margin: 10,
  },
  button: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#344955',
  },
  textButton: {
    color: '#F9AA33',
    fontSize: 16,
  },
});

const DetailContactScreen = props => {
  const contactID = props.route.params ? props.route.params.id : null;
  const editedContact = useSelector(state =>
    state.contacts.listContacts.find(c => c.id === contactID),
  );

  const [firstName, setFirstName] = useState(editedContact.firstName);
  const [lastName, setLastName] = useState(editedContact.lastName);
  const [age, setAge] = useState(editedContact.age);
  const [photo, setPhoto] = useState(editedContact.photo);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getContactByID() {
      await dispatch(contactActions.fetchContactByID(contactID));
    }
    getContactByID();
  }, []);

  const {colors} = useTheme();

  const editButton = useCallback(async () => {
    try {
      await dispatch(
        contactActions.editContact(contactID, firstName, lastName, age, photo),
      );
      Alert.alert('Success!', 'Contact edited', [{text: 'Okay'}]);
      props.navigation.goBack();
    } catch (error) {
      Alert.alert('Error!', error.message, [{text: 'Okay'}]);
      props.navigation.goBack();
    }
  }, [dispatch, props.navigation, contactID, firstName, lastName, age, photo]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={100}>
      <View style={styles.header}>
        <Text style={[styles.textHeader, {color: colors.onBackground}]}>
          Edit Contact
        </Text>
      </View>
      <ScrollView style={styles.formContainer}>
        {editedContact ? (
          <TextInput
            mode="outlined"
            label="First Name"
            value={firstName}
            style={styles.input}
            onChangeText={text => setFirstName(text)}
          />
        ) : (
          ''
        )}
        {editedContact ? (
          <TextInput
            mode="outlined"
            label="Last Name"
            value={lastName}
            style={styles.input}
            onChangeText={text => setLastName(text)}
          />
        ) : (
          ''
        )}
        {editedContact ? (
          <TextInput
            mode="outlined"
            label="Age"
            value={age.toString()}
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={text => setAge(text)}
          />
        ) : (
          ''
        )}
        {editedContact ? (
          <TextInput
            mode="outlined"
            label="Photo URL"
            value={photo}
            style={styles.input}
            onChangeText={text => setPhoto(text)}
          />
        ) : (
          ''
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={editButton}>
        <Text style={styles.textButton}>Edit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default DetailContactScreen;
