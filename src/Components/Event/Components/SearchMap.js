import React, { Component } from 'react';
import { View, Icon, Text, Button } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { saveGpsLocation } from '../../../Actions';
import { event } from '../../../Reducers';

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latlng: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 200.911,
          longitudeDelta: 200.911
        },
        title: ''
      }
    };
  }

  setLocale = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.location.latlng;
    this.props.saveGpsLocation({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      Address: this.state.location.title
    });
  };

  renderMap = location => {
    console.log('changed');
    return (
      <MapView
        style={{ flex: 1 }}
        region={location.latlng}
        ref={ref => (this.mapa = ref)}
        rotateEnabled={false}
        scrollEnabled={false}
        scrollEnabled={false}
        loadingEnabled
        toolbarEnabled
      >
        <MapView.Marker coordinate={location.latlng} title={location.title} />
      </MapView>
    );
  };

  render() {
    const apiGooglePlaces = 'AIzaSyBHA0EjLHKYsO4J-vm34zWlrpL40sMUf9I';
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            flex: 1,
            minHeight: 300,
            zIndex: 1
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              const location = details.geometry.location;
              const address = details.formatted_address;
              console.log(details);
              this.setState({
                location: {
                  latlng: {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  },
                  title: address
                }
              });
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: apiGooglePlaces,
              language: 'pt-BR' // language of the results
            }}
            styles={{
              backgroundColor: 'rgba(0,0,0,0)',
              textInputContainer: {
                marginTop: 10,
                width: '100%',
                height: '20%',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
              },
              listView: {
                backgroundColor: 'rgba(0,0,0,0.5)'
              },
              textInput: {
                paddingTop: 0,
                marginTop: 0
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
            ref={instance => {
              this.GooglePlacesRef = instance;
            }}
            currentLocation // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food'
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderLeftButton={() => (
              <Button transparent style={{ alignSelf: 'center' }}>
                <Icon
                  style={{ fontSize: 35 }}
                  onPress={() => {
                    console.log('clear');
                    this.GooglePlacesRef.setAddressText('');
                  }}
                  name="ios-backspace"
                />
              </Button>
            )}
            renderRightButton={() => (
              <Button
                style={{ alignSelf: 'center' }}
                onPress={() => {
                  this.setLocale();
                }}
                transparent
              >
                <Icon name="md-checkbox-outline" style={{ fontSize: 35 }} />
              </Button>
            )}
          />
        </View>
        <View
          style={{
            flex: 0,
            width: '100%',
            height: '100%',
            marginTop: -300,
            zIndex: -1
          }}
        >
          {this.renderMap(this.state.location)}
        </View>
      </View>
    );
  }
}

export default connect(() => ({}), { saveGpsLocation })(SearchMap);
