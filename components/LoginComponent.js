import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import baseUrl from '../shared/baseUrl';
import { NavigationContainer } from '@react-navigation/native';

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if(userinfo != null) {
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
            }
        })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    //the key used for storing and retireving the info from secure store should be same
    // ie userinfo in getItemAsync and setItemAsync

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log("Could not save userinfo", error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log("Could not delete userinfo", error))
        }
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={ <Icon name='sign-in' type='font-awesome' color='white' size={24} /> }
                        buttonStyle={{ backgroundColor :  "#512DA8" }}
                        />
                </View>
                <View>
                    <Button
                            onPress={() => this.props.navigation.navigate('Register')}
                            title="Register"
                            clear
                            icon={ <Icon name='user-plus' type='font-awesome' color='blue' size={24} /> }
                            titleStyle={{ color: "blue" }}
                            buttonStyle={{ backgroundColor: 'null'}}
                            />
                </View>
            </View>
            </ScrollView>
        );
    }

}


const Login = () => {
    const TabNavigator = createBottomTabNavigator();

    // const toMenu = this.props.navigation.navigate('Menu');

    return(
        <NavigationContainer>
           <TabNavigator.Navigator
            initialRouteName = 'LoginTab'
            tabBarOptions = {{
                activeBackgroundColor : '#9575CD',
                inactiveBackgroundColor : '#D1C4E9',
                activeTintColor : '#ffffff',
                inactiveTintColor : 'gray'
            }}
           >
               <TabNavigator.Screen
                name = 'Login'
                component = {LoginTab}
                options = {{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                          name='sign-in'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      )
                }}
               >
               </TabNavigator.Screen>
               <TabNavigator.Screen
                name = 'Register'
                component = {RegisterTab}
                options = {{
                    title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon
                              name='user-plus'
                              type='font-awesome'            
                              size={24}
                              iconStyle={{ color: tintColor }}
                            />
                          )
                }}
               >
               </TabNavigator.Screen>
           </TabNavigator.Navigator>
        </NavigationContainer>
        
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        marginTop: 20,
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
});

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: './images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            
            if(!capturedImage.cancelled) {
                this.setState({
                    imageUrl: capturedImage.uri
                });
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log("Could not save userinfo", error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log("Could not delete userinfo", error))
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    render() {
        return(
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: this.state.imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                </View>
                <View style={styles.container}>
                    <Input
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Firstname"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Lastname"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        />
                    <CheckBox title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                        />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title="Register"
                            icon={ <Icon name='user-plus' type='font-awesome' color='white' size={24} /> }
                            buttonStyle={{ backgroundColor : "#512DA8" }}
                            />
                    </View>
                </View>
            </ScrollView>
        );
    }

}

export default Login;