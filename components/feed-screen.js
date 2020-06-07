import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class FeedScreen extends Component {
  render() {
    return (
      <View style={styles.background} />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default FeedScreen;
