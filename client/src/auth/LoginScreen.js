import React from 'react';
import { View, Button } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const LoginScreen = () => {
    const handleFacebookLogin = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Facebook login was cancelled.');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken.toString();
                        fetch(
                            `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
                        )
                            .then((response) => response.json())
                            .then((json) => {
                                const { email, name, id } = json;
                                console.log('Facebook login success: ', json);
                            })
                            .catch((error) => {
                                console.log('Facebook login failed with error: ', error);
                            });
                    });
                }
            },
            (error) => {
                console.log('Facebook login failed with error: ', error);
            },
        );
    };

    return (
        <View>
            <LoginButton
                onLoginFinished={(error, result) => {
                    if (error) {
                        console.log('Facebook login error: ', error);
                    } else if (result.isCancelled) {
                        console.log('Facebook login was cancelled.');
                    } else {
                        AccessToken.getCurrentAccessToken().then((data) => {

                        });
                    }
                }}
                onLogoutFinished={() => console.log('User logged out')}
            />
            <Button title="Login with Facebook" onPress={handleFacebookLogin} />
        </View>
    );
};

export default LoginScreen;
