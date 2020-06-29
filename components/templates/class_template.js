import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';

class Template extends Component {
  render() {
    return (
      <View style={styles.background} />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

export default Template;
