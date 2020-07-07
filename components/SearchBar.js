import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({
  placeholder, value, onChange, width, containerStyle, border,
}) => {
  return (
    <View style={[{ ...containerStyle, flex: -1, flexDirection: 'row' }, border ? styles.border : {}]}>
      <FontAwesomeIcon icon={faSearch} size={20} color="rgba(0,0,0,0.7)" />
      <TextInput style={[styles.searchBar, { width }]}
        placeholder={placeholder}
        placeholderTextColor="#D8D8D8"
        value={value}
        onChangeText={onChange}
        clearButtonMode="always"
        numberOfLines={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    marginBottom: 20,
    marginTop: -10,
    paddingLeft: 10,
  },
  border: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    maxHeight: 50,
    minHeight: 50,
  },
});

export default SearchBar;
