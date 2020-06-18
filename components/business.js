/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text, Animated, Dimensions,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { createOpenLink } from 'react-native-open-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import * as Data from '../data';

const window = Dimensions.get('window');
const small = window.width <= 350;

const BusinessRecCard = (props) => {
  const { name, color, message } = props;
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ flex: -1, flexDirection: 'row' }}>
        <View style={recCardStyles.fromBubble}>
          <Text style={[recCardStyles.fromName, { color }]}>{name}</Text>
        </View>

        <Text style={{
          fontFamily: 'Hiragino W4', fontSize: 16, marginLeft: 10, paddingTop: 5,
        }}
        >
          said
        </Text>
      </View>

      <View style={recCardStyles.messageBubble}>
        <Text style={recCardStyles.messageText} numberOfLines={3}>{message}</Text>
      </View>
    </View>
  );
};

const recCardStyles = StyleSheet.create({
  fromBubble: {
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  fromName: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
  },
  messageBubble: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10,
  },
  messageText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
  },
});

class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  // This will become a Redux action once the backend's set up.
  getBusinessById = (id) => {
    return Data.BUSINESSES[id];
  }

  header = () => {
    const rec = this.props.route.params;

    // This is the distance the user needs to scroll for the image to disappear completely.
    const HEADER_SCROLL_DISTANCE = hp('40%') - 60;

    // Based on the scroll distance, calculate the corresponding color and other props for each of the header components.
    const background = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      extrapolate: 'clamp',
    });
    const text = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(0,0,0)'],
      extrapolate: 'clamp',
    });
    const bottomBorder = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
      extrapolate: 'clamp',
    });
    const commissionSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [small ? 14 : 16, small ? 14 : 16, 13],
      extrapolate: 'clamp',
    });
    const bizName = this.state.scrollY.interpolate({
      inputRange: [0, (HEADER_SCROLL_DISTANCE / 3) * 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
      extrapolate: 'clamp',
    });
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    return (
      <Animated.View style={[styles.header, { backgroundColor: background, borderBottomWidth: 1, borderBottomColor: bottomBorder }]}>
        {/* Back button navigation. */}
        <View style={{ marginTop: 4 }}>
          <TouchableOpacity style={{ flex: -1, flexDirection: 'row', justifyContent: 'center' }} onPress={() => { this.props.navigation.goBack(); }} activeOpacity={0.7}>
            <AnimatedIcon name="chevron-left" type="font-awesome" size={16} color={text} />
            <Animated.Text style={[styles.backButtonText, { color: text }]}>{rec.back}</Animated.Text>
          </TouchableOpacity>
        </View>

        {/* Center business name (only appears on scroll). */}
        <Animated.Text style={[styles.headerBusinessName, { color: bizName }]} numberOfLines={1}>{rec.business.name}</Animated.Text>

        {/* Commission bubble (upper right corner). */}
        <View style={[styles.commissionBubble, { backgroundColor: rec.fromUser.color }]}>
          <Animated.Text style={[styles.commissionText, { fontSize: commissionSize }]}>{rec.commission}</Animated.Text>
        </View>
      </Animated.View>
    );
  }

  titleSection = (rec, business) => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: -50,
        left: 15,
        width: wp('100%'),
      }}
      >
        <View style={{
          flex: -1,
          flexDirection: 'row',
        }}
        >
          <Text style={styles.businessName} numberOfLines={1}>{business.name}</Text>
          {rec.personal ? <Image source={require('../assets/personal.png')} style={{ width: 25, height: 25, marginLeft: 3 }} /> : <></>}
        </View>

        <Text style={styles.businessCategory} numberOfLines={1}>{business.category.join(', ')}</Text>

        {/* Like section (bottom right). */}
        <View>
          <Image source={require('../assets/like.png')}
            style={{
              width: 17, height: 15, position: 'absolute', bottom: 5, right: 35,
            }}
          />
          <Text style={styles.likeText}>{rec.likes}</Text>
        </View>
      </View>
    );
  }

  infoSection = (business) => {
    const { address } = business;
    const mapQuery = { query: address };
    const openAddress = createOpenLink(mapQuery);

    return (
      <View style={{
        padding: 15, flex: -1, flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)',
      }}
      >
        <Text style={styles.sectionHeader}>Business Info</Text>

        <View style={{
          flex: -1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: wp('100%'),
        }}
        >
          <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCompass} size={16} color="rgba(0,0,0,0.7)" style={{ marginBottom: 3, marginRight: 8 }} />
            <Text style={styles.sectionText}>{address}</Text>
          </View>
          <Button type="clear"
            title="Map it"
            titleStyle={{
              color: '#93DAC0', fontSize: 12, fontFamily: 'Hiragino W5', paddingRight: 20,
            }}
            onPress={openAddress}
          />
        </View>
      </View>
    );
  }

  recSection = (business) => {
    if (business.recommendations) {
      return (
        <View style={{ padding: 15, flex: -1, flexDirection: 'column' }}>
          <Text style={styles.sectionHeader}>Recommendations</Text>

          {business.recommendations.map((rec) => {
            return (
              <BusinessRecCard name={rec.fromUser.name} color={rec.fromUser.color} message={rec.message} />
            );
          })}
        </View>
      );
    } else {
      return (<></>);
    }
  }

  render() {
    // Basic rec information will be passed from the previous screen for speedy loading.
    const rec = this.props.route.params;
    const business = this.getBusinessById(rec.business.id);

    return (
      <>
        {this.header()}
        <HeaderImageScrollView
          minHeight={60}
          maxHeight={hp('40%')}
          headerImage={{ uri: business.imageURL }}
          minOverlayOpacity={0.3}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
        >
          <View style={styles.background}>
            {this.titleSection(rec, business)}
            {this.infoSection(business)}
            {this.recSection(business)}
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
  header: {
    minHeight: 70,
    width: wp('100%'),
    maxWidth: wp('100%'),
    flexDirection: 'row',
    flex: -1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: hp('4%'),
    position: 'absolute',
    top: 0,
    zIndex: 5,
  },
  headerBusinessName: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    paddingTop: 3,
  },
  backButtonText: {
    fontFamily: 'Hiragino W4',
    fontSize: small ? 14 : 16,
    marginLeft: 5,
    marginBottom: 1,
  },
  commissionBubble: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    borderRadius: 20,
    marginBottom: 3,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    color: '#FFF',
  },
  businessName: {
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    color: '#FFF',
  },
  businessCategory: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: '#FFF',
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 0,
    right: 22,
  },
  sectionHeader: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    color: 'black',
    paddingTop: 2,
    maxWidth: wp('75%'),
  },
});
