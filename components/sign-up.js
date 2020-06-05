/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { connect } from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  logoHeader = () => {
    return (
      <View style={styles.logoHeader}>
        <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogo} />
        <View style={styles.appTextContainer}>
          <Text style={this.props.isFontLoaded ? styles.appTextStyled : styles.appTextUnstyled}>rec</Text>
          <Text style={this.props.isFontLoaded ? styles.appTextStyled : styles.appTextUnstyled}>room</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.logoHeader()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
    maxHeight: 100,
  },
  imageLogo: {
    width: 85,
    height: 85,
    marginRight: 20,
  },
  appTextContainer: {
    paddingTop: 10,
  },
  appTextStyled: {
    fontFamily: 'Hiragino W7',
    fontSize: 48,
    color: '#FFFFFF',
    marginTop: -20,
  },
  appTextUnstyled: {
    fontFamily: 'System',
    fontSize: 48,
    color: '#FFFFFF',
    marginTop: -20,
  },
});

const mapStateToProps = (reduxState) => (
  {
    isFontLoaded: reduxState.lifecycle.fontsLoaded,
  }
);

export default connect(mapStateToProps, null)(SignUp);
