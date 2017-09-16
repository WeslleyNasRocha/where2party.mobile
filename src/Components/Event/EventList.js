import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, RefreshControl } from 'react-native';
import Event from './Event';

import { eventsFetch } from '../../Actions';
import { feed } from '../../Reducers';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentWillMount = () => {
    this.props.eventsFetch();

    this.createDataSource(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    this.setState({ refreshing: false });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.eventsFetch();
  }

  createDataSource({ events }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(events);
  }

  renderRow(eventItem) {
    return <Event eventItem={eventItem} />;
  }

  render() {
    //console.log(this.props);
    return (
      <View contentContainerStyle={{ flex: 1 }}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const events = _.map(state.feed, (val, uid) => {
    return { ...val, uid };
  });
  return { events };
};

export default connect(mapStateToProps, { eventsFetch })(EventList);
