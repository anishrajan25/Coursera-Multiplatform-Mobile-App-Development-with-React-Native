import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from 'react-native-animatable';

export default class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guest: 1,
            smoking: false,
            date: '',
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));
        //smoking = this.state.smoking ? 'Yes' : 'No';
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guest + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.resetForm()
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guest: 1,
            smoking: false,
            date: '',
        });
    }

    render() {
        return(
            <Animatable.View animation={'zoomIn'} delay={500} duration={1000} >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Number Of Guests</Text>
                    <Picker 
                    style={styles.formItem}
                    selectedValue={this.state.guest}
                    onValueChange={(itemValue, itemIndex) => this.setState({guest: itemValue})}
                    >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Somking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor={{ false: "grey", true: "#512DAC" }}
                        onValueChange={(value) => this.setState({smoking: value})}
                        >

                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Date and Time</Text>
                    <DatePicker
                        style={{flex : 2, marginRight : 10}}
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        placeholder='Selct Date and Time'
                        minDate='2017-01-01'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: -5,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 30
                            }
                        }}
                        onDateChange={(date) => this.setState({date : date })}
                        />
                </View>
                <View style={styles.formRow}>
                    <Button 
                        title='Reserve'
                        color='#512DAB'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'
                        />
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DAB',
        textAlign: "center",
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});