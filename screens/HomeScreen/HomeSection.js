import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { Button } from 'react-native-elements';

const HomeSection = ({ children, onPress, title }) => {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionHeader, { paddingBottom: !onPress ? 7 : 0 }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onPress ? <Button type="clear" titleStyle={styles.sectionButton} title="See all" onPress={onPress} /> : <></>}
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionHeader: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    color: Colors.BLACK,
  },
  sectionButton: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: Colors.PRIMARY,
  },
});

export default HomeSection;
