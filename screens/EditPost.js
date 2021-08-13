/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Platform, ActivityIndicator, PermissionsAndroid } from 'react-native';
import colors from '../constants/colors'
import * as ImagePicker from 'react-native-image-picker';
import { Input, Button } from 'react-native-elements'
import { Col, Row } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome'
import RBSheet from "react-native-raw-bottom-sheet";
import base64 from 'react-native-base64';
import { postWithImages, get } from '../apis/index'
import { getImage } from '../components/utils'


class EditPost extends React.Component {
    state = {
        isImageSelected: false,
        isPostImageVailable: false,
        post_image: null,
        featured_image: null,
        post_title: "",
        post_description: "",
        token: 'sometoken',
        user: [],
        isLoading: false,
        post: [],
    }


    requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else { return true };
    };

    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else { return true };
    };

    componentDidMount = async () => {
        let { post_id } = this.props.route.params
        const post = await get(this, `post/${post_id}`);
        if (post.status) {
            let p = post.response.post[0];
            this.setState({
                post: p,
                post_title: p.post_title,
                post_description: p.post_description,
                isPostImageVailable: p.post_image !== "" ? true : false,
                post_image: getImage('posts', p.post_image)
            });
        }
    }

    async launchImageLibrary() {
        let granted = await this.requestExternalWritePermission();
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly);
        //    console.log(status);
        if (!granted) {
            alert('Permissions were denied.');
        } else {
            let result = await ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            }, (response) => {
                if (!response.didCancel) {
                    let image = {
                        name: response.fileName,
                        uri: response.uri,
                        type: response.type,
                        height: response.height,
                        width: response.width
                    };

                    this.setState({ featured_image: image, isImageSelected: true, isImageUpdated: true });

                } else {
                    this.setState({ featured_image: null, isImageSelected: false, isImageUpdated: false });

                }

            });
        }
    }

    async launchCamera() {
        let granted = await this.requestCameraPermission();
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly);
        //    console.log(status);
        if (!granted) {
            alert('Permissions were denied.');
        } else {
            let result = await ImagePicker.launchCamera({
                mediaType: 'photo',
                quality: 1,
            }, (response) => {
                if (!response.didCancel) {
                    let image = {
                        name: response.fileName,
                        uri: response.uri,
                        type: response.type,
                        height: response.height,
                        width: response.width
                    };
                    this.setState({ featured_image: image, isImageSelected: true });
                } else {
                    this.setState({ featured_image: null, isImageSelected: false });
                }

            });

            console.log(result);
        }
    }

    async updateStatus() {
        if (this.state.post_title == "" || this.state.post_description == "") {
            alert("Post title and Post description  fields cannot be empty.")
        } else {
            this.setState({ isLoading: true });
            let form = new FormData();
            form.append("post_title", base64.encode(this.state.post_title))
            form.append("description", base64.encode(this.state.post_description));

            if (this.state.featured_image != null) {
                form.append("image", this.state.featured_image)
            }

            let response = await postWithImages(this, `post/update/${this.state.post.post_id}`, form);
            this.setState({ isLoading: false });
            console.log(response)
            if (response.response.isPostUpdated) {
                // this.setState({
                //     post_title: '',
                //     post_description: '',
                //     featured_image: null,
                //     isImageSelected: false,
                // })

                alert('Post Updated');
            } else {
                alert(response.response.message);
            }

        }
    }

    removePicture() {
        this.setState({ featured_image: null, isImageSelected: false });
    }

    render() {
        return (
            <View style={{ flex: 1, height: '100%', flexDirection: 'column' }}>
                <ScrollView style={{ flex: 1, height: '100%', flexDirection: 'column', backgroundColor: colors.screenBackgroundColor, paddingTop: 12, paddingBottom: 18, marginTop: Platform.OS == "ios" ? 40 : 10 }}>
                    {this.state.isLoading &&
                        <Row>
                            <Col>
                                <ActivityIndicator size="large" color="green" />
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col>
                            <Input
                                placeholder="Title"
                                onChangeText={(text) => this.setState({ post_title: text })}
                                value={this.state.post_title}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                style={{
                                    padding: 8,
                                    // borderBottomWidth: 0.5,
                                    // borderColor: 'lightgray',
                                    borderRadius: 12,
                                    marginTop: 28
                                }}
                            />
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            {this.state.isImageSelected ? (
                                <View style={{
                                    height: 150,
                                    borderRadius: 12,
                                    marginHorizontal: 8,
                                    borderBottomWidth: 0.5,
                                    borderColor: 'lightgray',
                                    justifyContent: 'center'
                                }}>

                                    <Image source={{ uri: this.state.featured_image.uri }} style={{ height: 150, width: '100%' }} />
                                    <TouchableOpacity style={{ position: 'absolute', left: '50%' }} onPress={() => this.removePicture()}>
                                        <Icon name="trash" color="black" size={42} />
                                    </TouchableOpacity>

                                </View>
                            ) : (
                                <>
                                    {this.state.isPostImageVailable &&
                                        <View style={{
                                            height: 150,
                                            borderRadius: 12,
                                            marginHorizontal: 8,
                                            borderBottomWidth: 0.5,
                                            borderColor: 'lightgray',
                                            justifyContent: 'center'
                                        }}>

                                            <Image source={{ uri: this.state.post_image }} style={{ height: 150, width: '100%' }} />
                                            <TouchableOpacity style={{ position: 'absolute', left: '50%' }} onPress={() => this.removePicture()}>
                                                <Icon name="trash" color="black" size={42} />
                                            </TouchableOpacity>

                                        </View>
                                    }
                                </>
                            )
                            }



                        </Col>
                    </Row>



                    <Row>
                        <Col>
                            <Input
                                multiline={true}
                                placeholder="Post content"
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                onChangeText={(text) => this.setState({ post_description: text })}
                                value={this.state.post_description}

                                style={{
                                    height: 250,
                                    borderRadius: 12,
                                    marginVertical: 4,
                                    // borderBottomWidth: 0.5,
                                    // borderColor: 'lightgray',
                                    textAlign: 'auto'
                                }}
                            />

                        </Col>
                    </Row>


                    <Row style={{ marginTop: 200 }}>
                        <Col size={1}>

                            <TouchableOpacity onPress={() => this.RBSheet.open()}>
                                <Icon name="image" color="#41cece" size={42} style={{ marginHorizontal: 12 }} />
                            </TouchableOpacity>

                        </Col>
                        <Col size={3}>
                            <Button
                                onPress={() => this.updateStatus()}
                                buttonStyle={{ backgroundColor: '#41cece' }}
                                title="Update Post"
                                containerStyle={{ marginBottom: 22, marginRight: 12 }} />
                        </Col>
                    </Row>

                </ScrollView>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={160}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'flex-start',
                            padding: 12
                        }}>
                        <TouchableOpacity
                            onPress={() => this.launchCamera()}
                            style={{
                                flexDirection: 'row', justifyContent: 'flex-start',
                            }}>
                            <Icon name='camera' color='black' size={25} style={{ alignSelf: 'flex-start', marginVertical: 12 }} />
                            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 20, marginVertical: 12, marginLeft: 6 }}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.launchImageLibrary()}
                            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Icon name='image' color='black' size={25} style={{ alignSelf: 'flex-start', marginVertical: 12 }} />
                            <Text style={{ alignSelf: 'flex-start', fontSize: 20, marginVertical: 12, marginLeft: 6 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View>


        );
    }
}
export default EditPost;