import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import BusinessRecCard from './BusinessRecCard';

const RecSection = ({ recommendations }) => {
  if (recommendations) {
    return (
      <View style={styles.background}>
        <Text style={styles.sectionHeader}>Recommendations</Text>
        {recommendations.map((rec) => {
          return (
            <BusinessRecCard name={rec.from_user} color={rec.color} message={rec.message} />
          );
        })}
      </View>
    );
  } else {
    return (<></>);
  }
};

const styles = StyleSheet.create({
  background: {
    padding: 15,
    flex: -1,
    flexDirection: 'column',
  },
  sectionHeader: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
  },
});

export default RecSection;
