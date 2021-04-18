import * as React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import CircularImage from "../components/Images/CircularImage"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import UserSearchTab from '../components/Search/AppSearchTabs/UsersSearchTab';
import BooksSearchTab from '../components/Search/AppSearchTabs/BooksSearchTab';
import PostSearchTab from '../components/Search/AppSearchTabs/PostSearchTab';
import { Icon, Button } from 'react-native-elements'
export default class LocationPicker extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'social', title: 'Social' },
            { key: 'books', title: 'Books' },
            { key: 'stacks', title: 'Stacks' },
        ],
        user_id: 0
    };
    componentDidMount() {
        // const { user_id } = this.props.route.params
        // this.setState({ user_id: user_id }, () => console.log(this.state.user_id))
    }
    renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'social':
                return <UserSearchTab jumpTo={jumpTo} />;
            case 'books':
                return <BooksSearchTab jumpTo={jumpTo} />;
            case 'stacks':
                return <PostSearchTab jumpTo={jumpTo} />;
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

                            <Text>Irfan Irfi</Text>
                            <Text>@irfan_irfi</Text>
                        </Row>

                    </Col>
                </Row>
                <Row style={{ justifyContent: 'center', marginTop: 32 }}>
                    <Col >
                        <Button
                            buttonStyle={{ backgroundColor: '#41cece' }}
                            containerStyle={{ width: '60%', alignSelf: 'center', }}
                            icon={<Icon color="white" name="add" type="ionicon" />}
                            title="Follow" />
                    </Col>

                    <Col>
                        <Button
                            type="outline"
                            buttonStyle={{ borderColor: '#41cece' }}
                            containerStyle={{ width: '60%', alignSelf: 'center', borderColor: '#41cece' }}
                            icon={<Icon name="chatbubbles-outline" color="#41cece" type="ionicon" />}
                            titleStyle={{ color: '#41cece' }}
                            title=" Chat" />
                    </Col>
                </Row>

                <Row size={20} style={{ marginTop: 12 }}>
                    <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>Followers</Text>
                            <Text style={{ alignSelf: 'center' }}>500</Text>
                        </TouchableOpacity>

                    </Col>

                    <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>Following</Text>
                            <Text style={{ alignSelf: 'center' }}>500</Text>
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

