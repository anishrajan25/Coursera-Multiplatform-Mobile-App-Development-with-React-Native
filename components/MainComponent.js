import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {

    const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff', // for icons
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
    );
 
    return (
        <View style={{flex:1}}>
            <MenuNavigator />
        </View>
    );
  }
}
  
export default Main;