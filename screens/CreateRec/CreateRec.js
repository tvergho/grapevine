/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView, Text, Image,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalHeader from 'components/ModalHeader';
import * as Data from 'data';
import { Images, Colors } from 'res';

class CreateRec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBusiness: {},
      search: '',
      shadow: false,
      rec: '',
    };
  }

  onSelectBusiness = (biz) => {
    this.setState({ selectedBusiness: biz });
  }

  onRemoveBusiness = () => {
    this.setState({ selectedBusiness: {} });
  }

  onSearchChange = (search) => {
    this.setState({ search });
  }

  onRecChange = (rec) => {
    this.setState({ rec });
  }

  onFocus = () => {
    this.setState({ shadow: true });
  }

  onBlur = () => {
    this.setState({ shadow: false });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <ModalHeader navigation={this.props.navigation} title="Write a recommendation" />

        <SearchableDropdown
          multi={false}
          onItemSelect={this.onSelectBusiness}
          onRemoveBusiness={this.onRemoveBusiness}
          items={Data.BUSINESSES}
          placeholder="Location, store, restaurant, boba tea place..."
          containerStyle={this.state.shadow ? styles.searchContainerShadow : styles.searchContainerUnshadowed}
          textInputStyle={styles.searchInput}
          onTextChange={this.onSearchChange}
          itemTextStyle={styles.itemText}
          itemsContainerStyle={styles.itemContainerStyle}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        <TextInput
          placeholder="Why do you recommend it?"
          style={styles.recInput}
          value={this.state.rec}
          onChangeText={this.onRecChange}
          multiline
          blurOnSubmit
          scrollEnabled
        />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>Post recommendation</Text>
            <Image source={Images.send} style={{ width: 18, height: 18, marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainerUnshadowed: {
    width: wp('100%'),
    minHeight: 50,
    zIndex: 99,
  },
  searchContainerShadow: {
    width: wp('100%'),
    minHeight: 50,
    zIndex: 99,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    backgroundColor: Colors.WHITE,
  },
  itemText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    marginBottom: 4,
  },
  itemContainerStyle: {
    paddingLeft: 15,
    paddingTop: 10,
    width: wp('100%'),
    backgroundColor: Colors.WHITE,
    maxHeight: 125,
  },
  recInput: {
    minHeight: 120,
    maxHeight: hp('30%'),
    width: wp('95%'),
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
  },
  submitButton: {
    height: hp('8%'),
    width: wp('100%'),
    backgroundColor: Colors.PRIMARY,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: 'white',
    paddingTop: 5,
  },
});

export default CreateRec;
