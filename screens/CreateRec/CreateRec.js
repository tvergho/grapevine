/* eslint-disable react/no-did-update-set-state */
/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { debounce } from 'lodash';
import {
  StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalHeader from 'components/ModalHeader';
import { Colors } from 'res';
import { makeRec, businessNameSearch } from 'actions';
import { connect } from 'react-redux';
import { withLocation } from 'utils/withLocation';
import DropdownSearchBar from './DropdownSearchBar';
import PostRecButton from './PostRecButton';

class CreateRec extends Component {
  constructor(props) {
    super(props);

    this.onSearchChangeDelayed = debounce(this.search, 0);

    this.state = {
      selectedBusiness: {},
      search: '',
      shadow: false,
      rec: '',
      businesses: [],
    };
  }

  componentDidMount() {
    if (this.props?.route?.params?.businessId && this.props?.route?.params?.name) {
      const { businessId, name } = this.props.route.params;
      this.setState({ selectedBusiness: { businessId, name }, search: name });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.search.businessName !== prevProps.search.businessName) {
      this.setState({ businesses: this.props.search.businessName.searchResults });
    }
  }

  onSelectBusiness = (biz) => {
    this.setState({ selectedBusiness: biz, search: biz.name });
  }

  onRemoveBusiness = () => {
    this.setState({ selectedBusiness: {}, search: '', businesses: [] });
  }

  onSearchChange = (search) => {
    if (!this.state.selectedBusiness.name || search.length >= this.state.selectedBusiness.name.length) {
      this.setState({ search });
      this.onSearchChangeDelayed(search);
    } else {
      this.onRemoveBusiness();
    }

    if (search.length === 0) {
      this.onRemoveBusiness();
    }
  }

  search = (search) => {
    if (search.length > 0) {
      this.props.businessNameSearch(search, this.props.location.latitude, this.props.location.longitude);
    }
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

  validateInput = () => {
    let isError = false;
    if (!this.state.selectedBusiness.businessId) {
      isError = true;
    }
    if (this.state.rec.trim().length === 0) {
      isError = true;
    }
    return isError;
  }

  onSubmit = () => {
    if (!this.validateInput()) {
      const { businessId, name } = this.state.selectedBusiness;
      this.props.makeRec(businessId, name, this.state.rec, this.props.navigation.goBack);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <ModalHeader navigation={this.props.navigation} title="Write a recommendation" />
        <DropdownSearchBar
          placeholder="Location, store, restaurant, boba tea place..."
          onChange={this.onSearchChange}
          value={this.state.search}
          searchResults={this.state.businesses}
          loading={this.props.search.loading}
          onSelect={this.onSelectBusiness}
        />

        <TextInput
          placeholder="Why do you recommend it?"
          style={styles.recInput}
          value={this.state.rec}
          onChangeText={this.onRecChange}
          placeholderTextColor="rgba(0,0,0,0.3)"
          multiline
          blurOnSubmit
          scrollEnabled
        />

        <PostRecButton onSubmit={this.onSubmit} loading={this.props.post.loading} disabled={this.validateInput()} />
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
  recInput: {
    minHeight: 120,
    maxHeight: hp('30%'),
    width: wp('95%'),
    fontSize: 14,
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
});

const mapStateToProps = (reduxState) => (
  {
    search: reduxState.search,
    post: reduxState.post,
  }
);

export default withLocation(connect(mapStateToProps, {
  makeRec, businessNameSearch,
})(CreateRec));
