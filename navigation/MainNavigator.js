/* eslint-disable react/prop-types */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AddNote from '../screens/AddNoteScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import AddFavoriteScreen from '../screens/AddFavoriteScreen';
const createNoteNavigation = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        AddNote: { screen: AddNote }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#555'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

export default createAppContainer(createNoteNavigation);
