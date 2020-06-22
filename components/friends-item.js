/* eslint-disable global-require */
import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FriendsItem = ({ user, type }) => {
  const { name, username, imageURL } = user;

  const renderIcon = () => {
    switch (type) {
    case 'send':
      return (<Image source={require('../assets/send_pink.png')} style={styles.icon} />);
    default:
      return null;
    }
  };

  return (
    <View style={{ backgroundColor: 'black' }}>
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.background}>
          <Image source={{ uri: imageURL }} style={styles.profilePic} />

          <View style={{ marginLeft: 20 }}>
            <View style={styles.nameBubble}>
              <Text style={styles.nameText}>{name}</Text>
            </View>

            <Text style={styles.usernameText}>{username}</Text>
          </View>

          {renderIcon()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  profilePic: {
    borderRadius: 100,
    height: hp('7%'),
    width: hp('7%'),
  },
  nameBubble: {
    minHeight: 20,
    minWidth: 60,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    paddingBottom: 2,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 12,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nameText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: '#6D7278',
    alignSelf: 'center',
  },
  usernameText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: '#6D7278',
  },
  icon: {
    position: 'absolute',
    right: 15,
    width: 30,
    height: 30,
  },
});

export default FriendsItem;
