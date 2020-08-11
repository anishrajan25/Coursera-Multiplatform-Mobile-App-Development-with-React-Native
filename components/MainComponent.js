import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";
import Dishdetail from './DishdetailComponent';
import Reservation from "./ReservationComponent";
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from "../redux/ActionCreaters";

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: ({navigation}) => <Menu navigation={navigation}/>,
      navigationOptions: ({ navigation }) => ({
        title: 'Menu',
        headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} 
        />
      }) 
    },
    // navigationOptions can also be implemented as functions
    // here it recieves navigation props as a parameter
    // here from the navigation props we are extracting navigation
    Dishdetail: { screen: () =>  <Dishdetail /> }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      title: 'Dish Details',
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff', // for icons
      headerTitleStyle: {
          color: "#fff"            
      }
    }
});

const HomeNavigator = createStackNavigator({
  Home: { screen: () => <Home /> },
  },
  {
    navigationOptions: ({ navigation }) => ({
        title: 'Home',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff', // for icons
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} 
        />
    })
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: () => <Contact/> },
  },
  {
    navigationOptions: ({ navigation }) => ({
        title: 'Contact Us',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff', // for icons
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} 
        />
    })
});

const AboutNavigator = createStackNavigator({
  About: { screen: () => <About/> },
  },
  {
    navigationOptions: ({ navigation }) => ({
        title: 'About Us',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff', // for icons
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} 
        />
    })
});

const ReservationNavigator = createStackNavigator({
  About: { screen: () => <Reservation/> },
  },
  {
    navigationOptions: ({ navigation }) => ({
        title: 'Reservation',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff', // for icons
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} 
        />
    })
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container}
    //force inset top always means this side drawer will be displayed on top
    //even covering status bar on top
      forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image source={require('./images/logo.png')}
              style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}} //this will allow it to occupy 2X space as compared to upper view
          >
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Home: { 
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='home'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='info-circle'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='list'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='address-card'
          type='font-awesome'
          size={22}
          color={tintColor}
        />
      )
    }
  },
  Reservation: {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  }
  }, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent, //to specify content layout
  drawerPosition: "left"
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight  }}>
            <MainNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);