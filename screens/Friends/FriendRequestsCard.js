/* eslint-disable prefer-destructuring */
import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FriendRequestsCard = ({ requests, navigation }) => {
  if (!requests) return null;

  else {
    const friendRequests = requests.slice(0, 3);

    let friendsText = '';
    switch (friendRequests.length) {
    case 0:
      return null;
    case 1:
      friendsText = `${requests[0].first_name} ${requests[0].last_name}`;
      break;
    case 2:
      friendsText = `${requests[0].first_name} and ${requests[1].first_name}`;
      break;
    default:
      friendsText = `${requests[0].first_name}, ${requests[1].first_name}, and ${requests.length - 2} more`;
      break;
    }

    return (
      <View style={{ backgroundColor: 'black', minHeight: hp('10%') }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('FriendRequests'); }}>
          <View style={cardStyles.background}>

            {friendRequests.map(({ picture, username }) => {
              return (
                <Image style={cardStyles.profileImage} source={{ uri: picture }} key={username} />
              );
            })}

            <View>
              <Text style={cardStyles.title}>Friend Requests</Text>
              <Text style={cardStyles.subTitle}>{friendsText}</Text>
            </View>

            <View style={cardStyles.icon}>
              <Icon name="chevron-right" type="font-awesome" size={16} color="#FFB7B2" />
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const cardStyles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    minHeight: hp('10%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  profileImage: {
    borderRadius: 100,
    height: hp('7%'),
    width: hp('7%'),
    marginRight: -hp('4%'),
  },
  title: {
    fontFamily: 'Hiragino W7',
    color: 'black',
    fontSize: 12,
    marginLeft: hp('4%') + 10,
    paddingBottom: 5,
  },
  subTitle: {
    fontFamily: 'Hiragino W5',
    color: '#6D7278',
    fontSize: 12,
    marginLeft: hp('4%') + 10,
    marginTop: hp('0.7%'),
    paddingBottom: 5,
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
});

export default FriendRequestsCard;
