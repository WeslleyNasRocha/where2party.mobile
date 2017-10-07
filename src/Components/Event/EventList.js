import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, FlatList, RefreshControl, Text } from 'react-native';
import { List, ListItem } from 'native-base';
import Event from './Event';

import { eventsFetch } from '../../Actions';
import { feed } from '../../Reducers';

class EventList extends Component {
  componentWillMount = () => {
    this.props.eventsFetch();
    //console.log(this.props);
    //this.createDataSource(this.props);
  };

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.createDataSource(nextProps);
  //   this.setState({ refreshing: false });
  // }

  onRefresh() {
    this.props.eventsFetch();
  }

  // createDataSource({ events }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });

  //   this.dataSource = ds.cloneWithRows(events);
  // }

  _keyExtractor = (item, index) => item.uid;

  renderItem({ item, index }) {
    return <Event eventItem={item} />;
  }

  render() {
    //console.log(this.props);
    return (
      <List>
        <FlatList
          bounces
          data={this.props.events}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
        />
      </List>
    );
  }
}

const mapStateToProps = ({ feed }) => {
  const { events, refreshing } = feed;
  //  console.log(events);
  return { events, refreshing };
};

export default connect(mapStateToProps, { eventsFetch })(EventList);
