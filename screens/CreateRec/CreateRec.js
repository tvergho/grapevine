/* eslint-disable react/no-did-update-set-state */
/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalHeader from 'components/ModalHeader';
import { Colors } from 'res';
import { businessLocationSearch, allBusinessSearch, makeRec } from 'actions';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import PostRecButton from './PostRecButton';

class CreateRec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBusiness: {},
      search: '',
      shadow: false,
      rec: '',
      businesses: [],
      curLoc: {
        latitude: 37.343566,
        longitude: -121.918752,
      },
      errors: {
        business: false,
        rec: false,
      },
    };
  }

  componentDidMount() {
    if (Constants.isDevice) {
      Location.getPermissionsAsync()
        .then((response) => {
          if (response.granted) {
            this.detectLocation();
          }
        });
    } else {
      this.props.allBusinessSearch(this.state.curLoc.latitude, this.state.curLoc.longitude);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.search.businessAll !== prevProps.search.businessAll) {
      this.setState({ businesses: this.props.search.businessAll.searchResults });
    }
  }

  detectLocation = () => {
    Location.getCurrentPositionAsync()
      .then((location) => {
        const newLoc = { ...this.state.location };
        newLoc.latitude = location.coords.latitude;
        newLoc.longitude = location.coords.longitude;
        this.setState(() => { return ({ location: newLoc, curLoc: newLoc }); });
        this.props.allBusinessSearch(location.coords.latitude, location.coords.longitude);
      })
      .catch((error) => {
        console.log(error);
        this.props.allBusinessSearch(this.state.curLoc.latitude, this.state.curLoc.longitude);
      });
  }

  onSelectBusiness = (biz) => {
    this.setState({ selectedBusiness: biz });
  }

  onRemoveBusiness = () => {
    this.setState({ selectedBusiness: {} });
  }

  onSearchChange = (search) => {
    this.setState({ search });
    const { errors } = this.state;
    errors.business = false;
    this.setState({ errors });
  }

  onRecChange = (rec) => {
    this.setState({ rec });
    const { errors } = this.state;
    errors.rec = false;
    this.setState({ errors });
  }

  onFocus = () => {
    this.setState({ shadow: true });
  }

  onBlur = () => {
    this.setState({ shadow: false });
  }

  validateInput = () => {
    let isError = false;
    const { errors } = this.state;
    if (!this.state.selectedBusiness.businessId) {
      errors.business = true;
      isError = true;
    }
    if (this.state.rec.trim().length === 0) {
      errors.rec = true;
      isError = true;
    }

    this.setState({ errors });
    return isError;
  }

  onSubmit = () => {
    if (!this.validateInput()) {
      this.props.makeRec(this.state.selectedBusiness.businessId, this.state.rec, this.props.navigation.goBack);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <ModalHeader navigation={this.props.navigation} title="Write a recommendation" />

        <SearchableDropdown
          multi={false}
          onItemSelect={this.onSelectBusiness}
          onRemoveBusiness={this.onRemoveBusiness}
          items={this.state.businesses}
          placeholder="Location, store, restaurant, boba tea place..."
          containerStyle={this.state.shadow ? styles.searchContainerShadow : styles.searchContainerUnshadowed}
          textInputStyle={this.state.errors.business ? styles.searchInputError : styles.searchInput}
          onTextChange={this.onSearchChange}
          itemTextStyle={styles.itemText}
          itemsContainerStyle={styles.itemContainerStyle}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        <TextInput
          placeholder="Why do you recommend it?"
          style={[styles.recInput, this.state.errors.rec ? { borderColor: 'red', borderWidth: 1 } : {}]}
          value={this.state.rec}
          onChangeText={this.onRecChange}
          multiline
          blurOnSubmit
          scrollEnabled
        />

        <PostRecButton onSubmit={this.onSubmit} loading={this.props.post.loading} />
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
  searchInputError: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    padding: 15,
    backgroundColor: Colors.WHITE,
  },
  itemText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    marginBottom: 5,
  },
  itemContainerStyle: {
    paddingLeft: 15,
    paddingTop: 10,
    width: wp('100%'),
    backgroundColor: Colors.WHITE,
    maxHeight: hp('20%'),
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

const mapStateToProps = (reduxState) => (
  {
    search: reduxState.search,
    post: reduxState.post,
  }
);

export default connect(mapStateToProps, { businessLocationSearch, allBusinessSearch, makeRec })(CreateRec);
