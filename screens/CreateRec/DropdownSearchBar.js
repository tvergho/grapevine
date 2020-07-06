/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useRef } from 'react';
import {
  View, StyleSheet, TextInput, Animated, Keyboard,
} from 'react-native';
import { Colors } from 'res';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UIActivityIndicator } from 'react-native-indicators';
import SearchItem from './SearchItem';

const DropdownSearchBar = ({
  placeholder, value, onChange, searchResults, loading, onSelect,
}) => {
  const searchViewHeight = useRef(new Animated.Value(0)).current;
  const searchViewScale = searchViewHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, hp('50%')],
  });

  const searchViewStyle = [{ ...styles.itemList, height: searchViewScale }];

  const onFocus = () => {
    Animated.timing(searchViewHeight, {
      toValue: 1,
      duration: 250,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(searchViewHeight, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  const select = (business) => {
    onSelect(business);
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.background}>
        {!loading ? <FontAwesomeIcon icon={faSearch} size={20} color="rgba(0,0,0,0.7)" /> : <UIActivityIndicator size={20} color={Colors.BLACK} />}
        <TextInput placeholder={placeholder}
          style={styles.searchInput}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChange}
          value={value}
        />
      </View>
      <Animated.ScrollView style={searchViewStyle} keyboardShouldPersistTaps="always">
        {
          value.length > 0 ? searchResults.map((item, index) => {
            return (
              <SearchItem key={item.name} business={item} onSelect={select} />
            );
          }) : (<></>)
        }
        { searchResults.length < 10 || value.length === 0 ? (
          Array.from(Array(value.length === 0 ? 10 : 10 - searchResults.length).keys()).map((item, index) => {
            return (
              <SearchItem key={index} />
            );
          })
        ) : (
          <></>
        )}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    flexDirection: 'row',
    width: wp('100%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    padding: 15,
  },
  searchInput: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    backgroundColor: Colors.WHITE,
    paddingLeft: 15,
    width: wp('85%'),
  },
  itemList: {
    zIndex: 99,
    position: 'absolute',
    backgroundColor: 'white',
    minWidth: wp('100%'),
    top: 126,
    marginBottom: 100,
  },
});

export default DropdownSearchBar;
