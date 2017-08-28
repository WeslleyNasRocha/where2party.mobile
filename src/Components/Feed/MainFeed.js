import React, { Component } from "react";
import { AppRegistry, Text } from "react-native";

import { Drawer } from "native-base";
import Sidebar from "./SideBar";
import Feed from "./Feed";

export default class MainFeed extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar />}
        onClose={() => this.closeDrawer()}
      >
        <Feed openDrawer={this.openDrawer.bind(this)} />
      </Drawer>
    );
  }
}
