import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import firebase from 'firebase';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: {}
    };
  }
  componentWillMount = () => {
    const ref = firebase
      .storage()
      .ref()
      .child(`/eventImages/${this.props.eventItem.image}`)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        this.setState({
          imgUrl: {
            uri: `${url}`
          }
        });
      });
    console.log(this.state);
  };

  render() {
    const { Titulo } = this.props.eventItem;
    //console.log(image);
    return (
      <Card>
        <CardItem>
          <Image style={style.imageBanner} source={this.state.imgUrl} />
        </CardItem>
        <CardItem>
          <Text>{Titulo}</Text>
        </CardItem>
      </Card>
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
