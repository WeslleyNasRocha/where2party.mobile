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
import Subs from "./Components/Subs";
import {
  loadImages,
  getMap,
  backToFeed,
  changeSubscription,
  getSubscription
} from "../../Actions";
import { eventScreen } from "../../Reducers";

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIcon: "beer"
    };
  }

  componentWillMount = () => {
    this.props.loadImages(this.props.image);
    this.props.getMap(this.props.Local);
    this.props.getSubscription(this.props.uid);
    // console.log(this.props);
  };

  componentDidMount = () => {
    let timeout = 4000;
    let animationTimeout;

    animationTimeout = setTimeout(() => {
      this.focusMap(["inicio", "final"], true);
    }, 4000);
  };

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
    this.props.changeSubscription(this.props.uid, !this.props.sub);
  }

  renderChatIcon(sub) {
    if (sub) {
      return (
        <Button transparent rounded>
          {/* TODO: ROLDOFO FAÇA ESTA MERDA */}
          <Icon name="ios-chatbubbles" style={{ color: "white" }} />
        </Button>
      );
    } else {
      return (
        <Button transparent rounded>
          {/* TODO: ROLDOFO FAÇA ESTA MERDA */}
          <Icon name="beer" style={{ color: "white" }} />
        </Button>
      );
    }
  }

  renderButton(sub) {
    if (!sub) {
      return (
        <Button
          style={{ justifyContent: "center", alignSelf: "stretch" }}
          onPress={() => this.subscribeButtonPress()}
        >
          <Icon name="beer" />
          <Text style={{ color: "#fff", fontSize: 20 }}>Bora !!!</Text>
        </Button>
      );
    } else {
      return (
        <Button
          style={{ justifyContent: "center", alignSelf: "stretch" }}
          onPress={() => this.subscribeButtonPress()}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Cancelar</Text>
          <Icon name="md-close" />
        </Button>
      );
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
          <Right>{this.renderChatIcon(this.props.sub)}</Right>
        </Header>

        <Container style={style.containerStyle}>
          <Content style={{ backgroundColor: "#9c27b0" }}>
            <Card>
              <CardItem cardBody>
                <View style={{ flex: 1, height: 300 }}>
                  <Image
                    source={this.props.imgUrl}
                    style={{ flex: 1, alignSelf: "stretch" }}
                  />
                </View>
                {/* <ImageBanner imgSource={this.props.imgUrl} /> */}
              </CardItem>
              <CardItem>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>{this.props.Titulo}</Text>
                </View>
              </CardItem>
              <CardItem>
                <Right>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      alignContent: "flex-end",
                      marginRight: -70
                    }}
                  >
                    <Text style={{ paddingRight: 10, fontSize: 20 }}>
                      {this.props.Data}
                    </Text>
                    <Icon name="md-calendar" style={{ color: "#ccc" }} />
                  </View>
                </Right>
              </CardItem>
              <CardItem>
                <Text>{this.props.Descricao}</Text>
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
                <View style={{ flex: 1 }}>
                  {this.renderButton(this.props.sub)}
                </View>
              </CardItem>
              <CardItem>
                <Subs eventId={this.props.uid} />
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
    routeData,
    sub
  } = eventScreen;
  return {
    imgUrl,
    currentPosition,
    eventPosition,
    route,
    routeData,
    sub
  };
};

export default connect(mapStateToProps, {
  loadImages,
  getMap,
  backToFeed,
  changeSubscription,
  getSubscription
})(EventScreen);
