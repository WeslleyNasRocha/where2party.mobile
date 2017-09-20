import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Image, View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Spinner } from "react-native-loading-spinner-overlay";
import firebase from "firebase";
import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Content,
  Icon,
  Right,
  Card,
  CardItem
} from "native-base";
import MapTools from "./Components/MapTools";
import { loadImages, getMap, backToFeed } from "../../Actions";
import { eventScreen } from "../../Reducers";

class EventScreen extends Component {
  // Todo: throw to actions

  componentWillMount = () => {
    this.props.loadImages(this.props.image);
    this.props.getMap(this.props.Local);
    // console.log(this.props);
  };

  componentDidMount = () => {
    const timeout = 4000;
    let animationTimeout;

    animationTimeout = setTimeout(() => {
      this.focusMap(["inicio", "final"], true);
    }, timeout);
  };

  focusMap(markers, animated) {
    console.log(`Markers received to populate map: ${markers}`);
    this.map.fitToSuppliedMarkers(markers, animated);
  }

  renderMarkers(id, coords) {
    console.log(coords);
    if (coords !== {} && coords !== null && coords !== undefined) {
      return <MapView.Marker identifier={id} coordinate={coords} />;
    }
  }

  render() {
    // console.log(this.state.initialRouteCoords);
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
                this.props.backToFeed();
              }}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ flexDirection: "row", marginRight: 10 }}>
              {this.props.Titulo}
            </Title>
          </Body>
          <Right>
            {/* TODO: ROLDOFO FAÇA ESTA MERDA */}
            <Icon name="ios-chatbubbles" style={{ color: "white" }} />
          </Right>
        </Header>

        <Container style={style.containerStyle}>
          <Content style={{ backgroundColor: "#9c27b0" }}>
            <Card>
              <CardItem cardBody>
                <Image style={style.imageBanner} source={this.props.imgUrl} />
              </CardItem>
              <CardItem>
                <Text style={{ fontSize: 30, alignSelf: "center" }} >{this.props.Titulo}</Text>
              </CardItem>
              <CardItem>
                <Text>{this.props.Descricao}</Text>
              </CardItem>
              <CardItem>
                <Button style={{ width: 200 }}>
                  <Text>Bora</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Body>
                  <MapView
                    style={style.map}
                    ref={ref => {
                      this.map = ref;
                    }}
                    region={this.props.eventPosition}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    zoomEnabled={false}
                    moveOnMarkerPress={false}
                    toolbarEnabled
                    loadingEnabled
                  >
                    {this.renderMarkers("inicio", this.props.currentPosition)}
                    {this.renderMarkers("final", this.props.eventPosition)}
                    <MapView.Polyline
                      coordinates={[...this.props.route]}
                      strokeWidth={3}
                      strokeColor="#9b59b6"
                    />
                    {/* TODO: adicionar botao pra rota no google maps, exibir distancia e duração */}
                  </MapView>
                  <MapTools
                    distance={this.props.routeData.distance}
                    duration={this.props.routeData.duration}
                  />
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}

const style = StyleSheet.create({
  map: {
    height: 200,
    width: 385,
    alignSelf: "stretch",
    flex: 1
  },
  imageBanner: {
    padding: 0,
    margin: 0,
    height: 200,
    width: 300,
    flex: 1,
    alignSelf: "center"
  },
  containerStyle: {
    paddingTop: 0,
    margin: 0
  }
});

//export default EventScreen;

const mapStateToProps = ({ eventScreen }) => {
  const {
    imgUrl,
    currentPosition,
    eventPosition,
    route,
    routeData
  } = eventScreen;
  return {
    imgUrl,
    currentPosition,
    eventPosition,
    route,
    routeData
  };
};

export default connect(mapStateToProps, { loadImages, getMap, backToFeed })(
  EventScreen
);
