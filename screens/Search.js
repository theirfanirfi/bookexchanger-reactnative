import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const nosearch = require('../assets/graphics/nostack.png');
import UserSearchTab from '../components/Search/AppSearchTabs/UsersSearchTab';
import BooksSearchTab from '../components/Search/AppSearchTabs/BooksSearchTab';
import PostSearchTab from '../components/Search/AppSearchTabs/PostSearchTab';
export default class Search extends React.Component {
    state = {
        search_term: null,
        index: 0,
        routes: [
            { key: 'users', title: 'Users' },
            { key: 'books', title: 'Books' },
            { key: 'posts', title: 'Posts' },
        ],
    }
    componentDidMount() {
        const { term } = this.props.route.params
        this.setState({ search_term: term }, () => console.log(this.state.search_term))
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.route.params.term)
        if (props.route.params.term != state.search_term && props.route.params.term != undefined) {
            return {
                search_term: props.route.params.term,
            }
        } else {
            return null;
        }
    }

    // renderScene = SceneMap({
    //     users: <UserSearchTab />,
    //     books: <BooksSearchTab />,
    //     posts: <PostSearchTab />
    // });

    renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'users':
                return <UserSearchTab jumpTo={jumpTo} term={this.state.search_term} />;
            case 'books':
                return <BooksSearchTab jumpTo={jumpTo} term={this.state.search_term} />;
            case 'posts':
                return <PostSearchTab jumpTo={jumpTo} term={this.state.search_term} />;
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
        if (this.state.search_term == undefined || this.state.search_term == null) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                    <Image source={nosearch} style={{ width: 200, height: 210, alignSelf: 'center', }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }} >
                        Type something to search
                        </Text>
                </View>
            )
        }
        else {
            let { index, routes } = this.state
            return (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this.setState({ index: index })}
                    renderTabBar={this.renderTabBar}
                // initialLayout={{ width: layout.width }}
                />
            );
        }
    }
}

