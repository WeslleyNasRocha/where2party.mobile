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
import ImageBanner from "./Components/ImageBanner";
import { loadImages, getMap, backToFeed } from "../../Actions";
import { eventScreen } from "../../Reducers";

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIcon: "beer"
    }
  }

  componentWillMount = () => {
    this.props.loadImages(this.props.image);
    this.props.getMap(this.props.Local);
    // console.log(this.props);
  };

  componentDidMount = () => {
    let timeout = 4000;
    let animationTimeout;

    animationTimeout = setTimeout(() => {
      this.focusMap(["inicio", "final"], true);
    }, 4000);
  };

  componentDidUpdate() {

  }

  focusMap(markers, animated) {
    //console.log(`Markers received to populate map: ${markers}`);
    this.map.fitToSuppliedMarkers(markers, animated);
  }

  renderMarkers(id, coords) {
    //console.log(coords);
    if (coords !== {} && coords !== null && coords !== undefined) {
      return <MapView.Marker identifier={id} coordinate={coords} />;
    }
  }

  subscribeButtonPress() {
    console.log("boora porra")
    this.setState({ chatIcon: "ios-chatbubbles" })
    animationTimeout = setTimeout(() => {
      this.focusMap(["inicio", "final"], true);
    }, 4000);
  }

  render() {
    // console.log(this.state.initialRouteCoords);
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button
              transparent
              rounded
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
            <Button
              transparent
              rounded
            >
              {/* TODO: ROLDOFO FAÇA ESTA MERDA */}
              <Icon name={this.state.chatIcon} style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>

        <Container style={style.containerStyle}>
          <Content style={{ backgroundColor: "#9c27b0" }}>
            <Card>
              <CardItem cardBody>
                <View style={{ flex: 1, height: 300 }}>
                  <Image source={this.props.imgUrl} style={{ flex: 1, alignSelf: "stretch" }} />
                </View>
                {/* <ImageBanner imgSource={this.props.imgUrl} /> */}
              </CardItem>
              <CardItem>
                <View style={{ flex: 1, alignItems: "center" }} >
                  <Text style={{ fontSize: 30 }} >{this.props.Titulo}</Text>
                </View>
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
              <CardItem>
                <View style={{ flex: 1 }} >
                  <Button
                    style={{ justifyContent: "center", alignSelf: "stretch" }}
                    onPress={() => this.subscribeButtonPress()}
                  >
                    <Icon name="beer" />
                    <Text style={{ color: "#fff", fontSize: 20 }} >Bora !!!</Text>
                  </Button>
                </View>
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
