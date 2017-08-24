import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon } from 'native-base'
import MapView from 'react-native-maps';

import { saveGpsLocation } from "../../Actions";
import { event } from "../../Reducers"

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: new MapView.AnimatedRegion({
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null
            }),
            currentLocale: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            },
            marker: {
                latitude: 37.78825,
                longitude: -122.4324
            }
        }
    }

    componentWillMount = () => {
        this.setState({
            region: {
                latitude: -22.909938399999998,
                longitude: -47.0626332,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }
        });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentLocale: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }
                })
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 });
    }

    getLocale() {
        this.mapa.animateToRegion(this.state.currentLocale, 2000);
    }

    setLocale() {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.currentLocale;
        this.props.saveGpsLocation({ latitude, longitude, latitudeDelta, longitudeDelta });
    }

    render() {
        const { region } = this.props;
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation
                    style={styles.map}
                    region={this.state.region}
                    ref={ref => (this.mapa = ref)}
                >
                    <MapView.Marker coordinate={this.state.marker} />
                </MapView>
                <Button
                    transparent
                    onPress={() => { this.getLocale() }}
                >
                    <Icon name="md-locate" />
                </Button>
                <Button
                    onPress={() => { this.setLocale() }}
                >
                    <Text>Save locale</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const mapStateToProps = ({ event }) => {
    const { Local } = event;
    return {
        Local
    }
}

export default connect(mapStateToProps, { saveGpsLocation })(Map);