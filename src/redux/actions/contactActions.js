import axios from 'axios';
import {Alert} from 'react-native';
import {baseUrl} from '../../../env';
import Contact from '../../models/Contact';

export const GET_CONTACTS = 'GET_CONTACTS';
export const GET_CONTACT_BY_ID = 'GET_CONTACT_BY_ID';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';

export const fetchContacts = () => {
  return async (dispatch, getState) => {
    try {
      await axios.get(`${baseUrl}/contact`).then(res => {
        const response = res.data;
        const loadedContacts = [];
        for (const i in response.data) {
          loadedContacts.push(
            new Contact(
              response.data[i].id,
              response.data[i].firstName,
              response.data[i].lastName,
              response.data[i].age,
              response.data[i].photo,
            ),
          );
        }

        dispatch({
          type: GET_CONTACTS,
          payload: loadedContacts,
        });
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchContactByID = contactID => {
  return async (dispatch, getState) => {
    try {
      await axios.get(`${baseUrl}/contact/${contactID}`).then(res => {
        const response = res.data;
        console.log(response.data);
        dispatch({
          type: GET_CONTACT_BY_ID,
          payload: response.data,
        });
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteContact = contactID => {
  return async (dispatch, getState) => {
    await axios
      .delete(`${baseUrl}/contact/${JSON.stringify(contactID)}`)
      .then(res => {
        const response = res;
        console.log(response);
        dispatch({type: DELETE_CONTACT, payload: contactID});
        Alert.alert('Success!', response, [{text: 'Okay'}]);
        return;
      })
      .catch(error => {
        console.log(error);
        dispatch({type: DELETE_CONTACT, payload: null});
        Alert.alert('Error!', error.message, [{text: 'Okay'}]);
        return;
      });
  };
};

export const createContact = (firstName, lastName, age, photo) => {
  return async (dispatch, getState) => {
    await axios
      .post(`${baseUrl}/contact`, {
        firstName: firstName,
        lastName: lastName,
        age: age,
        photo: photo,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          console.log('sukses: ', response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    dispatch({
      type: CREATE_CONTACT,
      payload: {
        firstName,
        lastName,
        age,
        photo,
      },
    });
  };
};

export const editContact = (contactID, firstName, lastName, age, photo) => {
  console.log(contactID);
  const data = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    photo: photo,
  };
  return async (dispatch, getState) => {
    const response = await axios.put(`${baseUrl}/contact/${contactID}`, data);
    console.log(response);

    dispatch({
      type: EDIT_CONTACT,
      cid: contactID,
      contactData: {
        firstName,
        lastName,
        age,
        photo,
      },
    });
  };
};
