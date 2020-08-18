/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';
import MainHeader from 'components/MainHeader';
import AppButton from 'components/AppButton';
import HeaderSwitch from 'components/HeaderSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import * as data from 'data';
import { connect } from 'react-redux';
import { getGlobalFeed, globalFeedScroll, setCanLoad } from 'actions';
import Swiper from 'react-native-swiper';
import FeedDisplayScreen from './FeedDisplayScreen';

export const HEADER_OPTIONS = ['All', 'You'];

const TopSection = ({ setActive, navigation, active }) => {
  return (
    <MainHeader title="Feed" border>
      <HeaderSwitch labels={HEADER_OPTIONS} start="All" onSwitch={(label) => { setActive(label); }} active={active} />

      <AppButton
        onPress={() => { navigation.navigate('CreateRec'); }}
        borderRadius={100}
        width={45}
        height={45}
        shadowHeight={2}
        icon={(<FontAwesomeIcon icon={faPencilAlt} size={20} color="rgb(255,255,255)" />)}
        backgroundColor={Colors.PRIMARY}
        style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
      />
    </MainHeader>
  );
};

const FeedScreen = (props) => {
  const { navigation, feed, loading } = props;
  const [active, setActive] = useState('All');
  let swiper = useRef();

  useEffect(() => {
    if (feed.searchResults.length === 0) {
      props.getGlobalFeed();
    }
  }, [active]);

  useEffect(() => {
    props.setCanLoad(true);
  }, [feed.searchResults]);

  const scroll = () => {
    if (feed.scrollId) {
      props.globalFeedScroll(feed.scrollId);
    }
  };

  const onClick = (label) => {
    setActive(label);
    if (label === HEADER_OPTIONS[0]) {
      swiper.scrollBy(-1, true);
    } else if (label === HEADER_OPTIONS[1]) {
      swiper.scrollBy(1, true);
    }
  };

  const onSwipe = (index) => {
    setActive(HEADER_OPTIONS[index]);
  };

  return (
    <View style={styles.background}>
      <TopSection navigation={navigation} setActive={onClick} active={active} />
      <Swiper
        showsButtons={false}
        loop={false}
        onIndexChanged={onSwipe}
        showsPagination={false}
        ref={(ref) => swiper = ref}
      >
        <FeedDisplayScreen
          display
          recommendations={feed.searchResults}
          screenName={HEADER_OPTIONS[0]}
          loading={loading}
          scroll={scroll}
          refresh={() => { props.getGlobalFeed(); }}
        />
        <FeedDisplayScreen display recommendations={data.YOU_FEED} screenName={HEADER_OPTIONS[1]} />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

const mapStateToProps = (reduxState) => (
  {
    feed: reduxState.search.globalFeed,
    loading: reduxState.search.loading,
  }
);

export default connect(mapStateToProps, { getGlobalFeed, globalFeedScroll, setCanLoad })(FeedScreen);
