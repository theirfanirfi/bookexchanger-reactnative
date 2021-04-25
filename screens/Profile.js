import * as React from 'react';
import { Text, Image, View, TouchableOpacity, Platform } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import CircularImage from "../components/Images/CircularImage"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PostSearchTab from '../components/Search/AppSearchTabs/PostSearchTab';
import { Icon, Button } from 'react-native-elements'
import { get, post, put, _delete } from '../apis/index'

import SocialTab from '../components/Profile/SocialTab';
import BooksTab from '../components/Profile/BooksTab';
import StacksTab from '../components/Profile/StacksTab';

export default class Profile extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'social', title: 'Social' },
            { key: 'books', title: 'Books' },
            { key: 'stacks', title: 'Stacks' },
        ],
        user_id: "me",
        isMe: false,
        profile: [],
        token: 'sometoken',
        user: [],
    };

    getProfile = async () => {
        let response = await get(this, `profile/${this.state.user_id}/`)
        if (response.status) {
            let res = response.response
            console.log(res);
            if (res.isLoggedIn && res.isFound) {
                this.setState({ profile: res.profile, refreshing: false, message: 'Profile not found.', isMe: res.isMe }, () => { if (this.state.isMe) { this.setLogoutButton() } });

            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }
    }

    setLogoutButton() {
        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity>
                        <Icon name="log-out-outline" type="ionicon" color="white" size={28} style={{ marginRight: 12 }} />
                    </TouchableOpacity>
                )
            }

        });
    }

    componentDidMount() {
        const { isMe, user_id } = this.props.route.params
        this.setState({ isMe: isMe, user_id: user_id }, async () => {
            this.getProfile();
        });

        if (this.state.isMe) {
            this.setLogoutButton();
        }
    }

    renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'social':
                return <SocialTab jumpTo={jumpTo} profile_id={this.state.user_id} navigation={this.props.navigation} />;
            case 'books':
                return <BooksTab jumpTo={jumpTo} profile_id={this.state.user_id} navigation={this.props.navigation} />;
            case 'stacks':
                return <StacksTab jumpTo={jumpTo} isMe={this.state.isMe} profile_id={this.state.user_id} navigation={this.props.navigation} />;
        }
    };

    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#41cece' }}
        />
    );



    render() {
        let { index, routes } = this.state

        return (
            <Grid>
                <Row size={10} style={{ padding: 18 }}>
                    <Col style={{ flexDirection: 'row' }}>
                        <CircularImage image={null} style={null} size="large" />
                        <Row style={{ flexDirection: 'column', margin: 20 }}>

                            <Text>{this.state.profile.fullname}</Text>
                            {/* <Text>@irfan_irfi</Text> */}
                        </Row>

                    </Col>
                </Row>

                {!this.state.isMe &&
                    <Row style={{ justifyContent: 'center', marginTop: 32 }}>
                        <Col >
                            <Button
                                buttonStyle={{ backgroundColor: '#41cece' }}
                                containerStyle={{ width: '60%', alignSelf: 'center', height: 50 }}
                                icon={<Icon color="white" name="add" type="ionicon" />}
                                title="Follow" />
                        </Col>

                        <Col>
                            <Button
                                type="outline"
                                buttonStyle={{ borderColor: '#41cece' }}
                                containerStyle={{ width: '60%', alignSelf: 'center', borderColor: '#41cece', height: 50 }}
                                icon={<Icon name="chatbubbles-outline" color="#41cece" type="ionicon" />}
                                titleStyle={{ color: '#41cece' }}
                                title=" Chat" />
                        </Col>
                    </Row>
                }

                <Row size={20} style={{ marginTop: 12 }}>
                    <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>Followers</Text>
                            <Text style={{ alignSelf: 'center' }}>{this.state.profile.followers}</Text>
                        </TouchableOpacity>

                    </Col>

                    <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>Following</Text>
                            <Text style={{ alignSelf: 'center' }}>{this.state.profile.followed}</Text>
                        </TouchableOpacity>
                    </Col>

                    {/* <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>Influence points</Text>
                            <Text style={{ alignSelf: 'center' }}>500</Text>
                        </TouchableOpacity>
                    </Col> */}
                </Row>

                <Row size={70}>
                    <Col>

                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={this.renderScene}
                            onIndexChange={(index) => this.setState({ index: index })}
                            renderTabBar={this.renderTabBar}
                        // initialLayout={{ width: layout.width }}
                        />
                    </Col>

                </Row>

            </Grid>
        )
    }
}

