import React, { Component } from "react";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Container,
  Header,
  Right,
  Button,
  Text,
  Thumbnail,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { profile } from "../../Reducers";
import { profileImageChange, saveProfile, changeField } from "../../Actions";

class ProfileEdit extends Component {
  imagePick() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      const { path, size, data, mime } = image;
      this.props.profileImageChange({ path, size, data, mime });
    });
  }

  onSave() {
    console.log(this.props);
    const {
      ProfileImagePath,
      ProfileImageMime,
      UserName,
      LastName
    } = this.props;

    this.props.saveProfile({
      ProfileImagePath,
      ProfileImageMime,
      UserName,
      LastName
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Right>
            <Button transparent>
              <Text>Pular</Text>
            </Button>
          </Right>
        </Header>
        <Button
          transparent
          style={{
            width: 200,
            height: 200,
            marginTop: 25,
            alignSelf: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            console.log("change image");
            this.imagePick();
          }}
        >
          <Thumbnail
            style={{
              width: 200,
              height: 200,
              borderRadius: 200
            }}
            large
            source={{ uri: this.props.ProfileImagePath }}
          />
        </Button>
        <Form>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input
              onChangeText={Text =>
                this.props.changeField({ prop: "UserName", value: Text })}
              value={this.props.UserName}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Sobrenome</Label>
            <Input
              onChangeText={Text =>
                this.props.changeField({ prop: "LastName", value: Text })}
              value={this.props.LastName}
            />
          </Item>
        </Form>
        <Button
          style={{
            alignSelf: "stretch",
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
            justifyContent: "center"
          }}
          onPress={() => {
            this.onSave();
          }}
        >
          <Text>Salvar</Text>
        </Button>
        <Spinner visible={this.props.Loading} />
      </Container>
    );
  }
}

mapStateToProps = ({ profile }) => {
  const {
    ProfileImagePath,
    ProfileImageData,
    Error,
    ProfileImageMime,
    UserName,
    LastName,
    Loading
  } = profile;
  return {
    ProfileImagePath,
    ProfileImageData,
    Error,
    ProfileImageMime,
    UserName,
    LastName,
    Loading
  };
};

export default connect(mapStateToProps, {
  profileImageChange,
  saveProfile,
  changeField
})(ProfileEdit);
