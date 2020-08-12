import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from "../shared/baseUrl";
import { withNavigation } from "react-navigation";
import { postFavorite, postComment } from "../redux/ActionCreaters";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card
                        featuredTitle={dish.name}
                        image={{ uri: baseUrl + dish.image }}
                    >
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                            <Icon 
                                raised //shows it like a button
                                reverse //icon of one color and surrounding of another
                                name={ props.favourite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favourite ? console.log('Already favourite') : props.onPress() } 
                            />
                            <Icon 
                                raised //shows it like a button
                                reverse //icon of one color and surrounding of another
                                name={ 'pencil'}
                                type='font-awesome'
                                color='#512DAB'
                                onPress={() => props.toggleModal() } 
                            />
                        </View>
                        <Modal
                            animationType={'slide'}
                            transparent={false}
                            visible={props.showModal}
                            onDismiss={() => {props.toggleModal(); props.resetForm()} }
                            onRequestClose={() => {props.toggleModal(); props.resetForm()}} // kind of similar to dismiss
                            >
                            <View style={styles.modal}>
                                <Rating showRating fractions="{1}" startingValue="{3.3}" onFinishRating={(value) => props.comment.rating = value} />
                                <Input
                                    placeholder="Author"
                                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                    onChangeText={(value) => props.comment.author = value}
                                    />
                                <Input
                                    placeholder="Comment"
                                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                    onChangeText={(value) => props.comment.comment = value}
                                    />
                                <View style={{margin: 20}}>
                                    <Button 
                                        raised
                                        onPress={() => {props.toggleModal(); props.submitForm(props.comment)} }
                                        color='#512DAB'
                                        title='SUBMIT'
                                        />
                                </View>
                                <View style={{margin: 20}}>
                                    <Button 
                                        raised
                                        color='grey'
                                        title='CANCEL'
                                        onPress={() => {props.toggleModal(); props.resetForm()}}
                                        />
                                </View>
                            </View>
                        </Modal>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const RenderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <Rating showRating={false} 
                        readonly 
                        startingValue={item.rating}
                        imageSize={12}
                        style={{marginTop: 5, marginBottom: 5, marginRight: 'auto'}} />   
                
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={RenderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}


class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            comment: {
                author: '',
                comment: '',
                rating: '',
                dishId: ''
            }
        }
    }

    markFavourite(dishId) {
        this.props.postFavorite(dishId);
    }

    submitForm(comment) {
        comment.dishId = this.props.navigation.getParam('dishId','');
        console.log(JSON.stringify(comment)); 
        this.props.postComment(comment);
        console.log(JSON.stringify(comment)); 
    }

    resetForm() {
        this.setState({
            showModal: false,
            comment: {
                author: '',
                comment: '',
                rating: '',
                dishId: ''
            }
        });
        
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        console.log(this.props);
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favourite={this.props.favorites.some(el => el === dishId)}//returns true if there exists an item in array if that matches the function
                    onPress={() => this.markFavourite(dishId)}
                    resetForm={() => this.resetForm()}
                    toggleModal={() => this.toggleModal()}
                    submitForm={(comment) => this.submitForm(comment)}
                    comment={this.state.comment}
                    showModal={this.state.showModal}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Dishdetail));


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