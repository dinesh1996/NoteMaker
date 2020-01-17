/* eslint-disable react/prop-types */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import SharingScreen from '../screens/SharingScreen';

const createNoteNavigation = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Authentication: { screen: AuthenticationScreen },
        AddNote: { screen: AddNoteScreen },
        Sharing: {
            screen: SharingScreen
        }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5e5ce6'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

export default createAppContainer(createNoteNavigation);
