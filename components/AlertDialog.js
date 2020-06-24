/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { resetError } from '../actions';

class AlertDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      if (this.props.message && this.props.message !== undefined && this.props.message.length > 0 && this.state.message !== this.props.message) {
        this.setState({ message: this.props.message }, () => { this.createDialog(); });
      } else if (this.props.message.length === 0) {
        this.setState({ message: '' });
      }
    }
  }

  reset = () => {
    this.props.resetError();
  };

  createDialog = () => {
    Alert.alert('Error', this.props.message, [{ text: 'OK', onPress: this.reset }]);
  };

  render() {
    return (
      <View />

    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    message: reduxState.lifecycle.errorMessage,
  }
);

export default connect(mapStateToProps, { resetError })(AlertDialog);
