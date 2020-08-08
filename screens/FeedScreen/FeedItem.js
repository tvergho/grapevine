/* eslint-disable camelcase */
import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import { Colors, Images } from 'res';
import TextBubble from 'components/TextBubble';
import AppButton from 'components/AppButton';
import convertMillesecondsToTime from 'utils/convertMillesecondsToTime';
import { createOpenLink } from 'react-native-open-maps';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const Loading = () => {
  return (
    <View style={styles.background}>
      <SkeletonPlaceholder>
        <View>
          <SkeletonPlaceholder.Item width={130} height={20} borderRadius={15} />
          <SkeletonPlaceholder.Item width={100} height={20} borderRadius={15} marginTop={10} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <SkeletonPlaceholder.Item width={100} height={15} borderRadius={15} />
          <SkeletonPlaceholder.Item width={80} height={25} borderRadius={15} marginTop={10} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const LeftSection = ({ rec, active }) => {
  const navigation = useNavigation();

  let verbText = '';
  if (active === 'All') verbText = 'recommended';
  else if (active === 'You') {
    if (!rec.from_user) verbText = 'just visited';
    else verbText = 'bought from';
  }

  return (
    <View>
      <View style={styles.row}>
        <TextBubble
          text={rec?.from_user?.name || 'You'}
          shadowWidth={2}
          shadowHeight={1}
          textStyle={styles.nameText}
        />
        <Text style={styles.normalText}>{verbText}</Text>
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate('Business', { ...rec, back: 'Feed' }); }}>
        <View style={styles.row}>
          <TextBubble
            text={rec?.business?.name}
            shadowWidth={2}
            shadowHeight={1}
            textStyle={styles.businessText}
          />

          {rec.likes
        && (
          <>
            <Image source={Images.likePink} style={styles.like} />
            <Text style={styles.likeText}>{rec.likes}</Text>
          </>
        )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const RightSection = ({ active, rec }) => {
  const { business } = rec;
  const address = business.street_address ? `${business?.street_address} ${business?.city}, ${business?.state} ${business?.zip}` : '';
  const open = createOpenLink({ query: address });

  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Text style={styles.normalText}>{convertMillesecondsToTime(parseInt(rec?.timestamp, 10))}</Text>
      {active === 'All'
    && (
      <AppButton
        backgroundColor={Colors.PRIMARY}
        shadowWidth={2}
        shadowHeight={1}
        textStyle={styles.buttonText}
        title="Map it"
        style={styles.button}
        onPress={open}
      />
    )}

      {active === 'You'
    && (
      <TextBubble
        backgroundColor={Colors.PRIMARY}
        shadowWidth={2}
        shadowHeight={1}
        textStyle={styles.buttonText}
        text={`+ ${rec?.points} ✨`}
        borderRadius={30}
        paddingTop={0}
        paddingBottom={0}
        style={{ marginTop: 5 }}
      />
    )}
    </View>
  );
};

const FeedItem = ({
  active, rec, loading,
}) => {
  if (loading) return <Loading />;
  return (
    <View style={styles.background}>
      <LeftSection rec={rec} active={active} />
      <RightSection active={active} rec={rec} />
    </View>
  );
};

FeedItem.propTypes = {
  active: PropTypes.string,
  loading: PropTypes.bool,
  rec: PropTypes.shape({
    business: PropTypes.shape({
      city: PropTypes.string,
      name: PropTypes.string,
      state: PropTypes.string,
      street_address: PropTypes.string,
      zip: PropTypes.string,
      businessId: PropTypes.string,
    }),
    from_user: PropTypes.shape({
      name: PropTypes.string,
    }),
    likes: PropTypes.number,
    recommendationID: PropTypes.string,
    timestamp: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    minHeight: 60,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flex: -1,
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.GRAY,
    paddingBottom: 5,
  },
  businessText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.PRIMARY,
    paddingBottom: 5,
  },
  normalText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: Colors.GRAY,
    marginLeft: 10,
    paddingBottom: 5,
  },
  like: {
    width: 18,
    height: 16,
    marginLeft: 10,
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
  buttonText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.WHITE,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default FeedItem;
