/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Animated,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { getBusiness, clearBusiness } from 'actions';
import { connect } from 'react-redux';
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

  componentDidMount() {
    this.props.getBusiness(this.props.route.params.business.id);
  }

  componentWillUnmount() {
    this.props.clearBusiness();
  }

  render() {
    const rec = this.props.route.params;
    console.log(rec);
    const { business, loading } = this.props;

    return (
      <>
        <AnimatedHeader scrollY={this.state.scrollY} navigation={this.props.navigation} rec={rec} />
        <HeaderImageScrollView
          minHeight={60}
          maxHeight={hp('40%')}
          headerImage={{ uri: rec.business.imageURL || (rec.photos && rec.photos[0]) || '' }}
          minOverlayOpacity={0.3}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
        >
          <View style={styles.background}>
            <TitleSection business={business} rec={rec} />

            {!loading
              ? (
                <>
                  <InfoSection business={business} />
                  <RecSection recommendations={business.recommendations} />
                </>
              )
              : <></>}
          </View>
        </HeaderImageScrollView>
      </>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    business: reduxState.rec.business,
    loading: reduxState.rec.bizLoading,
  }
);

export default connect(mapStateToProps, { getBusiness, clearBusiness })(Business);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    minHeight: hp('50%'),
  },
});
