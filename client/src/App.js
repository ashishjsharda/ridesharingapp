import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialAppLoad } from './redux/actions';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            dispatch(setInitialAppLoad());
        }, 2000);
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default App;
