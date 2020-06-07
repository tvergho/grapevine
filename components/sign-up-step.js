/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { authUser } from '../actions';

class SignUpStep extends Component {
  constructor(props) {
    super(props);
  }

  buyButtonPress = () => {
    this.props.authUser();
  }

  buttons = () => {
    return (
      <View style={{
        flex: -1, flexDirection: 'row',
      }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={this.buyButtonPress}>
            <Icon name="shopping-cart" type="font-awesome" size={60} color="rgba(0,0,0,0.8)" style={{ paddingRight: 4 }} />
          </TouchableOpacity>
          <Text style={this.props.isFontLoaded ? [styles.header2, styles.buttonText, styles.styled] : [styles.header2, styles.buttonText, styles.unstyled]}>Buyer</Text>
        </View>
        <Text style={this.props.isFontLoaded ? [styles.header2, styles.orText, styles.styled] : [styles.header2, styles.orText, styles.unstyled]}>or</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <FontAwesomeIcon icon={faUserTie} size={60} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
          <Text style={this.props.isFontLoaded ? [styles.header2, styles.buttonText, styles.styled] : [styles.header2, styles.buttonText, styles.unstyled]}>Business</Text>
        </View>
      </View>
    );
  }

  buyOrBiz = () => {
    return (
      <View style={styles.background}>
        <Text style={this.props.isFontLoaded ? [styles.header1, styles.styled] : [styles.header1, styles.unstyled]}>Great! Are you a</Text>
        {this.buttons()}
      </View>
    );
  }

  render() {
    return (
      this.buyOrBiz()
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styled: {
    fontFamily: 'Hiragino W7',
  },
  unstyled: {
    fontFamily: 'System',
  },
  header1: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  header2: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  orText: {
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  buttonContainer: {
    flex: -1,
    flexDirection: 'column',
    maxHeight: 200,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 10,
  },
  imageButton: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    minWidth: 120,
    minHeight: 120,
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 150,
    flex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (reduxState) => (
  {
    isFontLoaded: reduxState.lifecycle.fontsLoaded,
  }
);

export default connect(mapStateToProps, { authUser })(SignUpStep);
