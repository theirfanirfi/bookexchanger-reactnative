import * as React from 'react';
import { Text, Image, View } from 'react-native';
// import MapPicker from "react-native-map-picker";
// import LocationView from "react-native-location-view";
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
            <View style={{ flex: 1 }}>
                {/* <MapPicker
                    initialCoordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    onLocationSelect={({ latitude, longitude }) => console.log(longitude)}
                /> */}


                {/* <LocationView
                    apiKey={"AIzaSyAbKhNWHZCF87W25x4pPWBXEUQOHr4VviM"}
                    initialLocation={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                /> */}

                {/* <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={this.onRegionChange}
                /> */}

                <MapView
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    onMapReady={this.onMapReady}
                    onRegionChangeComplete={this.onRegionChange}>
                    <MapView.Marker
                        coordinate={{
                            "latitude": this.state.region.latitude,
                            "longitude": this.state.region.longitude
                        }}
                        title={"Your Location"}
                        draggable />
                </MapView>

            </View>
        )
    }
}

