import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements'
import GetLocation from 'react-native-get-location'
import { put } from '../apis/index'

export default class LocationPicker extends React.Component {
    state = {
        user: [],
        token: 'sometoken',
        loading: true,
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
    };
    componentDidMount() {
        // const { term } = this.props.route.params
        // this.setState({ search_term: term }, () => console.log(this.state.search_term))

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                let region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }
                this.setState({ region: region });
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
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
        // console.log(region);
        this.setState({ region: region });
    }

    saveLocation = async () => {
        let formdata = new FormData()
        formdata.append("location_longitude", this.state.region.longitude)
        formdata.append("location_latitude", this.state.region.latitude);

        const response = await put(this, `location`, formdata);
        if (response.status) {
            let res = response.response
            if (res.isUpdated) {
                alert('Location saved.');
            } else {
                alert('Unable to Save location. Please try again.')
            }
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider="google" // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.region}
                    // onRegionChange={this.onRegionChange}
                    onPress={(e) => {
                        let region = {
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001
                        }
                        this.setState({
                            region: region,

                        })
                    }}
                    moveOnMarkerPress
                    followsUserLocation
                    showsUserLocation
                    showsMyLocationButton
                    showsCompass
                    loadingEnabled
                    cacheEnabled
                    showsBuildings
                    showsIndoors


                >
                    <Marker
                        coordinate={this.state.region}
                        draggable
                        isPreselected={true}
                        onDragEnd={(e) => {
                            let region = {
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.001
                            }
                            this.setState({
                                region: region,

                            })
                        }
                        }
                    />
                </MapView >

                <Button
                    onPress={() => this.saveLocation()}
                    title="Save Location"
                    containerStyle={{ position: 'absolute', bottom: 12, left: '35%' }} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

