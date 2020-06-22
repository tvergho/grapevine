/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, StyleSheet, FlatList, Image, TouchableOpacity, Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import ModalHeader from './modal-header';
import FriendsItem from './friends-item';
import * as Data from '../data';

const FriendRequestsCard = ({ requests, navigation }) => {
  const friendRequests = requests.slice(0, 3);

  const friendsText = `${requests[0].name.split(' ')[0]}, ${requests[1].name.split(' ')[0]}, and ${requests.length - 2} more`;

  return (
    <View style={{ backgroundColor: 'black', minHeight: hp('10%') }}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('FriendRequests'); }}>
        <View style={cardStyles.background}>

          {friendRequests.map(({ imageURL, username }) => {
            return (
              <Image style={cardStyles.profileImage} source={{ uri: imageURL }} key={username} />
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
  },
  subTitle: {
    fontFamily: 'Hiragino W5',
    color: '#6D7278',
    fontSize: 12,
    marginLeft: hp('4%') + 10,
    marginTop: hp('0.7%'),
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
});

const FriendsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />
      <FriendRequestsCard requests={Data.FRIEND_REQUESTS} navigation={navigation} />
      <FlatList data={Data.FRIENDS} renderItem={({ item }) => (<FriendsItem user={item} type="send" />)} keyExtractor={(friend) => friend.username} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default FriendsScreen;
