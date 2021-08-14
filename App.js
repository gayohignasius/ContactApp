import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import contactsReducer from './src/redux/reducers/contactReducers';
import Route from './src/route';

const rootReducers = combineReducers({
  contacts: contactsReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#344955',
    accent: '#F9AA33',
    error: '#B00020',
    onBackground: '#000000',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
