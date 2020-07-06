import React from 'react';
import { Colors } from 'res';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SearchItem = ({ business, onSelect }) => {
  return (
    <View style={{ backgroundColor: Colors.BLACK }}>
      <TouchableOpacity onPress={() => { onSelect(business); }} disabled={!onSelect} activeOpacity={0.9}>
        <View style={searchItemStyles.background}>
          {business ? (
            <Text style={searchItemStyles.nameText}>{business.name}</Text>
          ) : (<></>)}

          {business ? (
            <Text style={searchItemStyles.cityText}>{`${business.city}, ${business.state}`}</Text>
          ) : (<></>)}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const searchItemStyles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    flexDirection: 'column',
    minHeight: 60,
    width: wp('100%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    padding: 15,
  },
  nameText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Hiragino W5',
  },
  cityText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Hiragino W4',
  },
});

export default SearchItem;
