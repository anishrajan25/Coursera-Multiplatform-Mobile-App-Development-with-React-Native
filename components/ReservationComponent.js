import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";

export default class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guest: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guest: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    render() {
        return(
            <ScrollView>
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
                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()} }
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}} // kind of similar to dismiss
                    >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guest}</Text>
                        <Text style={styles.modalText}>Somking? : {this.state.smoking ? 'Yes' : 'No' }</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button 
                            onPress={() => {this.toggleModal(); this.resetForm()} }
                            color='#512DAB'
                            title='Close'
                            />
                    </View>
                </Modal>
            </ScrollView>
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