import React, { useState, useEffect } from 'react';
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
import FeedDisplayScreen from './FeedDisplayScreen';

export const HEADER_OPTIONS = ['All', 'You'];

const TopSection = ({ setActive, navigation }) => {
  return (
    <MainHeader title="Feed" border>
      <HeaderSwitch labels={HEADER_OPTIONS} start="All" onSwitch={(label) => { setActive(label); }} />

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

  return (
    <View style={styles.background}>
      <TopSection navigation={navigation} setActive={setActive} />
      <FeedDisplayScreen
        display={active === HEADER_OPTIONS[0]}
        recommendations={feed.searchResults}
        active={active}
        loading={loading}
        scroll={scroll}
      />
      <FeedDisplayScreen display={active === HEADER_OPTIONS[1]} recommendations={data.YOU_FEED} active={active} />
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
