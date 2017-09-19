import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Image, Text, TouchableWithoutFeedback } from "react-native";
import { Card, CardItem, Right, Icon } from "native-base";
import firebase from "firebase";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: {}
    };
  }
  componentWillMount = () => {
    firebase
      .storage()
      .ref("eventImages")
      .child(`${this.props.eventItem.image}`)
      .getDownloadURL()
      .then(url => {
        // console.log(url);
        this.setState({
          imgUrl: {
            uri: `${url}`
          }
        });
      })
      .catch(error => console.log(error));
    //console.log(this.state);
  };

  openEvent() {
    //console.log(this.props);
    Actions.EventScreen({ ...this.props.eventItem, ...this.state.imgUrl });
  }

  goToMap(local) {
    console.log(local);
  }

  render() {
    const { Titulo, Descricao, Local } = this.props.eventItem;
    // console.log(this.props);
    // FIXME: Refresh not working
    return (
      <TouchableWithoutFeedback onPress={() => this.openEvent()}>
        <Card>
          <CardItem>
            <Image style={style.imageBanner} source={this.state.imgUrl} />
          </CardItem>
          <CardItem>
            <Text>{Titulo}</Text>
          </CardItem>
          <CardItem>
            <Text>{Descricao}</Text>
            <Right>
              <Icon name="pin" onPress={() => this.goToMap(Local)} />
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
const style = {
  imageBanner: {
    height: 200,
    width: 300,
    flex: 1
  }
};

export default Event;
