import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { Actions } from "react-native-router-flux";

class MainFeed extends Component {

    logout() {
        AsyncStorage.removeItem("user_data")
            .then(Actions.auth({ type: "replace" }))
    }

    render() {
        return (
            <View>
                <Text
                    onPress={() => this.logout()}
                >
                    Log Out
                </Text>
            </View>
        );
    }
}

export default MainFeed;