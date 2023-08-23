import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteListScreen from './components/NoteListScreen';
import NoteDetailScreen from './components/NoteDetailScreen';
// import { library } from '@fortawesome/fontawesome-svg-core';
import store from './store/store';
// import { useSelector } from 'react-redux';

//colors
import colors from './colors/colors';

import RootNavigation from './navigations/RootNavigation'; // Import RootNavigation

//redux
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
// let store = createStore(allReducers);
const App = () => {
  // const colorScheme = useSelector(state => state.value);
  const colorScheme = useColorScheme() === 'dark';
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>

      <NavigationContainer ref={RootNavigation.setTopLevelNavigator}>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Stack.Navigator
          initialRouteName="NoteList"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme ? colors.DARK : colors.LM_LIGHT, // Set your desired background color
            },
            headerTintColor: 'white',// Set the color of the text/icons in the navigation bar
            // headerTintColor: colorScheme ? colors.DARK : colors.LM_LIGHT, // Set the color of the text/icons in the navigation bar
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
          }}>
          <Stack.Screen
            name="NoteList"
            component={NoteListScreen}
            options={{ title: '', headerTitleStyle: { display: 'none' } }}
          />
          <Stack.Screen
            name="NoteDetail"
            component={NoteDetailScreen}
            options={{ title: '', headerTitleStyle: { display: 'none' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
