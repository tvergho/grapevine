/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Animated,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as Data from 'data';
import AnimatedHeader from './AnimatedHeader';
import TitleSection from './TitleSection';
import InfoSection from './InfoSection';
import RecSection from './RecSection';

class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  // This will become a Redux action once the backend's set up.
  getBusinessById = (id) => {
    if (this.props.route.params.boba) {
      return this.props.route.params;
    } else {
      return Data.BUSINESSES[id];
    }
  }

  render() {
    // Basic rec information will be passed from the previous screen for speedy loading.
    const rec = this.props.route.params;
    const business = this.getBusinessById(rec.business.id);

    return (
      <>
        <AnimatedHeader scrollY={this.state.scrollY} navigation={this.props.navigation} rec={rec} />
        <HeaderImageScrollView
          minHeight={60}
          maxHeight={hp('40%')}
          headerImage={{ uri: business.imageURL || business.photos[0] }}
          minOverlayOpacity={0.3}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
        >
          <View style={styles.background}>
            <TitleSection rec={rec} business={business} />
            <InfoSection business={business} />
            <RecSection recommendations={business.recommendations} />
          </View>
        </HeaderImageScrollView>
      </>
    );
  }
}

export default Business;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    minHeight: hp('50%'),
  },
});
