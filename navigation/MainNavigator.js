/* eslint-disable react/prop-types */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import SharingScreen from '../screens/SharingScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import AddFavoriteScreen from '../screens/AddFavoriteScreen';
const createNoteNavigation = createStackNavigator(
    {
        Home: { screen: HomeScreen },
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
