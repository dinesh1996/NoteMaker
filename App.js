import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainNavigator from './navigation/MainNavigator';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

export default App;
