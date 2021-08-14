/* eslint-disable no-unreachable */
import React, {useCallback, useState} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
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
  saveButton: {
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

const AddNewContactScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const colors = useTheme();

  const dispatch = useDispatch();

  const saveButton = useCallback(async () => {
    if (firstName === '' || lastName === '' || age === '' || photo === '') {
      Alert.alert('Error!', 'Harap isi form dengan benar', [{text: 'Okay'}]);
      return;
    } else {
      try {
        if (isLoading) {
          await dispatch(
            contactActions.createContact(firstName, lastName, age, photo),
          );
        }
        setIsLoading(false);

        Alert.alert('Success!', 'Contact saved', [{text: 'Okay'}]);
        setFirstName(''), setLastName(''), setAge(''), setPhoto('');
        navigation.goBack();
        return;
      } catch (error) {
        Alert.alert('Error!', error.message, [{text: 'Okay'}]);
        return;
      }
    }
  }, [firstName, lastName, age, photo, navigation, dispatch, isLoading]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={100}>
      <View style={styles.header}>
        <Text style={[styles.textHeader, {color: colors.onBackground}]}>
          Add New Contact
        </Text>
      </View>
      <ScrollView style={styles.formContainer}>
        <TextInput
          label="First Name"
          style={styles.input}
          mode="outlined"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          label="Last Name"
          style={styles.input}
          mode="outlined"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          label="Age"
          style={styles.input}
          mode="outlined"
          keyboardType="number-pad"
          value={age}
          onChangeText={text => setAge(text)}
        />
        <TextInput
          label="Photo Url"
          style={styles.input}
          mode="outlined"
          value={photo}
          onChangeText={text => setPhoto(text)}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.6}
        onPress={saveButton}>
        <Text style={styles.textButton}>Simpan</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddNewContactScreen;
