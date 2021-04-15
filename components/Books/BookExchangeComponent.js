import React from 'react';
import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'
import Modal from 'react-native-modal';
const windowHeight = Dimensions.get('window').height;
import BooksSearchAPI from '../../screens/BooksSearchAPI'


export default class BookExchangeComponent extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        book: [],
        visible: false,
        isExhangeRequestSent: false,
        exchange: []
    }

    componentDidMount() {
        this.setState({ book: this.props.book });
    }

    static getDerivedStateFromProps(props, state) {
        if (state.book != props.book && props.book != undefined) {
            console.log(props.book)
            return {
                book: props.book
            }
        } else {
            return {
                book: []
            }
        }
    }

    render() {
        return (


            <View>
                <Modal
                    onBackdropPress={() => this.setState({ visible: false })}
                    onBackButtonPress={() => this.setState({ visible: false })}
                    isVisible={this.state.visible}
                    deviceHeight={windowHeight - 20}
                    swipeDirection={['down']}
                    onSwipeComplete={() => { this.setState({ visible: false }) }}>
                    {/* <View style={{ backgroundColor: '#fff', marginTop: 30, padding: 12 }}> */}
                    {/* <CommentWritingBoxComponent commentCallBack={this.commentCallBack} context={this} post={this.props.post} /> */}
                    <BooksSearchAPI book={this.state.book} />
                    {/* </View> */}
                </Modal>

                <TouchableOpacity onPress={() => this.setState({ visible: true })}>

                    <Icon name="repeat-outline" type="ionicon" size={26} />

                </TouchableOpacity>
            </View>
        )
    }

}