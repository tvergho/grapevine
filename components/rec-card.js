/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const RecCard = (props) => {
  const {
    commission, business, id, message, likes, timestamp, personal,
  } = props.rec;
  const user = props.rec.fromUser;

  // Gets bigger if it's a feed card.
  const width = props.feed ? wp('90%') : 250;
  const height = props.feed ? 180 : 130;

  const convertMillesecondsToTime = (ms) => {
    const curTime = new Date().getTime();
    const millis = curTime - ms; // Get the difference in milliseconds.

    // First, attempt to convert to minutes.
    const min = millis / 60000;
    if (min < 60) return `${Math.round(min)} min`;

    // Convert that to hours.
    const hours = min / 60;
    if (Math.round(hours) === 1) return '1 hr';
    else if (hours < 24) return `${Math.round(hours)} hrs`;

    // Finally, display it in days.
    const days = hours / 24;
    if (Math.round(days) === 1) return '1 day';
    return `${Math.round(days)} days`;
  };

  // Describes the card that's displayed on the home screen.
  if (!props.feed) {
    return (
      <View style={[recCardStyles.container, { width, height, marginRight: 20 }]} key={id}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { props.navigation.navigate('Business', { ...props.rec, back: 'Home' }); }}>
          <Image source={{ uri: business.imageURL }}
            style={{
              width, height, borderRadius: 15, opacity: 0.8,
            }}
          />
          <View style={[recCardStyles.commissionBubble, { backgroundColor: user.color }]}>
            <Text style={recCardStyles.commissionText}>{commission}</Text>
          </View>

          <Text style={[recCardStyles.bizName, { bottom: 30, left: 10 }]}>
            {business.name}
          </Text>

          <View style={{
            flex: -1,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
            left: 10,
          }}
          >
            <Text style={recCardStyles.from}>from</Text>
            <View style={recCardStyles.fromBubble}>
              <Text style={[recCardStyles.fromName, { color: user.color }]}>{user.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else { // More detailed card for the feed screen.
    return (
      <View style={[recCardStyles.container, { width, height, marginBottom: 20 }]} key={id}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { props.navigation.navigate('Business', { ...props.rec, back: 'Feed' }); }}>
          <Image source={{ uri: business.imageURL }}
            style={{
              width, height, borderRadius: 15, opacity: 0.8,
            }}
          />

          <Text style={[recCardStyles.bizName, { top: 13, left: 10 }]} numberOfLines={1}>
            {business.name}
          </Text>

          <View style={[recCardStyles.commissionBubble, { backgroundColor: user.color }]}>
            <Text style={recCardStyles.commissionText}>{commission}</Text>
          </View>

          <View style={{
            flex: -1,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 32,
            left: 10,
          }}
          >
            <Text style={recCardStyles.from}>from</Text>
            <View style={recCardStyles.fromBubble}>
              <Text style={[recCardStyles.fromName, { color: user.color }]}>{user.name}</Text>
            </View>
            {personal ? <Image source={require('../assets/personal.png')} style={{ width: 25, height: 25, marginLeft: 3 }} /> : <></>}
          </View>

          <View style={[recCardStyles.messageBubble, { width: width - 20 }]}>
            <Text style={recCardStyles.messageText} numberOfLines={3}>{message}</Text>
          </View>

          <View>
            <Image source={require('../assets/like.png')}
              style={{
                width: 17, height: 15, position: 'absolute', bottom: 10, left: 10,
              }}
            />
            <Text style={recCardStyles.likeText}>{likes}</Text>
          </View>

          <View style={recCardStyles.timeBubble}>
            <Text style={recCardStyles.timeText}>{convertMillesecondsToTime(timestamp)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const recCardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
  },
  bizName: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: '#FFF',
    position: 'absolute',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  from: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: '#FFF',
    paddingTop: 2,
  },
  commissionBubble: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 10,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: '#FFF',
  },
  fromBubble: {
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  fromName: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
  messageBubble: {
    position: 'absolute',
    top: 65,
    left: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 5,
    left: 30,
  },
  timeBubble: {
    position: 'absolute',
    bottom: 7,
    right: 10,
    backgroundColor: 'white',
    minWidth: 70,
    borderRadius: 20,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
  },
  timeText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: 'black',
    paddingTop: 5,
  },
});

export default RecCard;
