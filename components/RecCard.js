/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextBubble from 'components/TextBubble';
import { Colors, Images } from 'res';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import convertMillesecondsToTime from 'utils/convertMillesecondsToTime';
import DeleteSwipeable from 'components/DeleteSwipeable';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { acceptRec } from 'actions';

const LoadingCard = ({ width, height, feed }) => {
  return (
    <View style={[recCardStyles.container, {
      width, height, marginRight: 20, backgroundColor: 'white',
    }, feed ? { marginRight: 0 } : {}]}
    >
      <SkeletonPlaceholder height={height} paddingLeft={10} paddingRight={10}>
        <SkeletonPlaceholder.Item height={feed ? 160 : 120} width={width} marginTop={10} marginBottom={10} alignSelf="center" borderRadius={10} />
      </SkeletonPlaceholder>
    </View>
  );
};

const HomeCard = ({
  navigation, user, rec, width, height,
}) => {
  const { business } = rec;
  return (
    <View style={[recCardStyles.container, { width, height, marginRight: 20 }]}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('Business', { ...rec, back: 'Home' }); }}>
        <Image source={{ uri: business.imageURL }} style={[recCardStyles.image, { width, height }]} />

        <TextBubble
          textStyle={recCardStyles.commissionText}
          text={`${rec?.commission}% back`}
          backgroundColor={user?.color || Colors.SECONDARY}
          style={recCardStyles.commissionBubble}
        />

        <Text style={[recCardStyles.bizName, { bottom: 35, left: 10 }]}>
          {business.name}
        </Text>

        <View style={recCardStyles.lowerLeft}>
          <Text style={recCardStyles.from}>from</Text>
          <TextBubble textStyle={[recCardStyles.fromName, { color: user.color }]} text={user.name} backgroundColor={Colors.WHITE} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FeedCard = ({
  width, height, rec, navigation, user, accept,
}) => {
  const {
    commission, business, message, likes, timestamp, personal, recommendationID,
  } = rec;

  const leftContent = (
    <View style={{
      backgroundColor: '#9EBF68', flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 20,
    }}
    >
      <FontAwesomeIcon icon={faCheck} size={40} color="white" style={{ marginRight: 15 }} />
    </View>
  );

  return (
    <DeleteSwipeable
      leftContent={leftContent}
      backgroundStyle={[recCardStyles.container, { width, height, marginBottom: 20 }]}
      remove={() => { accept(recommendationID); }}
      enabled={accept}
    >
      <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('Business', { ...rec, back: 'Feed' }); }}>
        <Image source={{ uri: business.imageURL }} style={[recCardStyles.image, { width, height }]} />

        <Text style={[recCardStyles.bizName, { top: 13, left: 10 }]} numberOfLines={1}>
          {business.name}
        </Text>

        <TextBubble textStyle={recCardStyles.commissionText} text={`${commission}% back`} backgroundColor={user.color} style={recCardStyles.commissionBubble} />

        <View style={recCardStyles.upperLeft}>
          <Text style={recCardStyles.from}>from</Text>
          <TextBubble textStyle={[recCardStyles.fromName, { color: user.color }]} text={user.name} backgroundColor={Colors.WHITE} />
          {personal ? <Image source={Images.personal} style={{ width: 25, height: 25, marginLeft: 3 }} /> : <></>}
        </View>

        <TextBubble
          text={message}
          textStyle={recCardStyles.messageText}
          numLines={3}
          width={width - 20}
          backgroundColor={Colors.WHITE}
          style={recCardStyles.messageBubble}
          paddingTop={10}
          paddingBottom={10}
        />

        <View style={recCardStyles.lowerLeft}>
          <Image source={Images.like} style={{ width: 17, height: 15 }} />
          <Text style={recCardStyles.likeText}>{likes}</Text>
        </View>

        <TextBubble
          text={convertMillesecondsToTime(timestamp)}
          backgroundColor={Colors.WHITE}
          width={70}
          style={recCardStyles.timeBubble}
          textStyle={recCardStyles.timeText}
          borderRadius={20}
          paddingTop={2}
          paddingBottom={5}
          paddingLeft={8}
          paddingRight={8}
        />
      </TouchableOpacity>
    </DeleteSwipeable>
  );
};

const RecCard = ({
  rec, feed, navigation, loading, acceptable, acceptRec: accept,
}) => {
  // Gets bigger if it's a feed card.
  const width = feed ? wp('90%') : 250;
  const height = feed ? 180 : 130;

  if (loading) {
    return (<LoadingCard width={width} height={height} feed={feed} />);
  }

  const user = rec.from_user;

  // Describes the card that's displayed on the home screen.
  if (!feed) {
    return (
      <HomeCard
        navigation={navigation}
        user={user}
        rec={rec}
        width={width}
        height={height}
      />
    );
  }

  // More detailed card for the feed screen.
  return (
    <FeedCard
      width={width}
      height={height}
      navigation={navigation}
      user={user}
      rec={rec}
      accept={acceptable ? accept : null}
    />
  );
};

const recCardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
  },
  image: {
    borderRadius: 15,
    opacity: 0.8,
  },
  bizName: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: Colors.WHITE,
    position: 'absolute',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  from: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: Colors.WHITE,
    paddingBottom: 2,
    marginRight: 5,
  },
  fromName: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
  commissionBubble: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.WHITE,
  },
  lowerLeft: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  upperLeft: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 32,
    left: 10,
  },
  messageBubble: {
    position: 'absolute',
    top: 65,
    left: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    paddingBottom: 5,
    lineHeight: 15,
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: 'white',
    marginTop: 2,
    marginLeft: 3,
  },
  timeBubble: {
    position: 'absolute',
    bottom: 7,
    right: 10,
  },
  timeText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: Colors.BLACK,
    paddingTop: 5,
  },
});

export default connect(null, { acceptRec })(RecCard);
