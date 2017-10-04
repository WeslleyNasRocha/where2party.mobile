import React, { Component } from "react";

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

  componentDidMount() {
    console.log("mount-feed");
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar closeDrawer={this.closeDrawer.bind(this)} />}
        onClose={() => this.closeDrawer()}
      >
        <Feed openDrawer={this.openDrawer.bind(this)} />
      </Drawer>
    );
  }
}
