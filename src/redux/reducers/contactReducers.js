import Contact from '../../models/Contact';
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACTS,
  GET_CONTACT_BY_ID,
} from '../actions/contactActions';

const initialState = {
  listContacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        listContacts: action.payload,
      };
    case GET_CONTACT_BY_ID:
      return {...state, [action.payload.id]: action.payload};
    case CREATE_CONTACT:
      return Object.assign({}, state, {
        listContacts: [...state.listContacts, action.payload],
      });
    case EDIT_CONTACT:
      const contactIndex = state.listContacts.findIndex(
        contact => contact.id === action.cid,
      );
      const updatedContact = new Contact(
        action.cid,
        action.contactData.firstName,
        action.contactData.lastName,
        action.contactData.age,
        action.contactData.photo,
      );
      const updatedListContacts = [...state.listContacts];
      updatedListContacts[contactIndex] = updatedContact;
      return {
        ...state,
        listContacts: updatedListContacts,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        listContacts: state.listContacts.filter(
          contact => contact.id !== action.payload,
        ),
      };
  }
  return state;
};
