import * as React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
export default class LocationPicker extends React.Component {
    state = {
        loading: true,
        region: {
            latitude: 10,
            longitude: 10,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
    };
    componentDidMount() {
        // const { term } = this.props.route.params
        // this.setState({ search_term: term }, () => console.log(this.state.search_term))
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props.route.params.term)
    //     if (props.route.params.term != state.search_term && props.route.params.term != undefined) {
    //         return {
    //             search_term: props.route.params.term
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    onRegionChange = region => {
        console.log(region);
        this.setState({ region: region });
    }



    render() {
        return (
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={this.state.region}
                showsUserLocation={true}
                showsCompass={true}
                zoomControlEnabled={true}
                showsTraffic={true}
                // onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}>
                <MapView.Marker
                    coordinate={{
                        "latitude": this.state.region.latitude,
                        "longitude": this.state.region.longitude
                    }}
                    title={"Your Location"}
                    draggable />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

