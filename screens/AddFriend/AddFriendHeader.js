import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import SearchBar from 'components/SearchBar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AddFriendHeader = ({
  value, onChange, navigation, loading,
}) => {
  return (
    <>
      <ModalHeader navigation={navigation}>
        <View style={styles.searchBarContainer}>
          <SearchBar placeholder="Search by username..." value={value} onChange={onChange} width={wp('70%')} loading={loading} />
        </View>

      </ModalHeader>

      <View style={[styles.recommendedHeader, { display: value.length > 0 ? 'none' : '' }]}>
        <Text style={styles.recommendedText}>Recommended</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  searchBarContainer: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    marginTop: -1,
  },
  recommendedHeader: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: wp('100%'),
    flex: -1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  recommendedText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.WHITE,
  },
});

export default AddFriendHeader;
