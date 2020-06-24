import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';

const Template = (props) => {
  return (
    <View style={styles.background} />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

export default Template;
