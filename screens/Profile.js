import * as React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import CircularImage from "../components/Images/CircularImage"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import UserSearchTab from '../components/Search/AppSearchTabs/UsersSearchTab';
import BooksSearchTab from '../components/Search/AppSearchTabs/BooksSearchTab';
import PostSearchTab from '../components/Search/AppSearchTabs/PostSearchTab';
export default class LocationPicker extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'social', title: 'Social' },
            { key: 'books', title: 'Books' },
            { key: 'stacks', title: 'Stacks' },
        ]
    };
    componentDidMount() {
        // const { term } = this.props.route.params
        // this.setState({ search_term: term }, () => console.log(this.state.search_term))
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
            style={{ backgroundColor: '#7D4DFF' }}
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

                <Row size={20}>
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

