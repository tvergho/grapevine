/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const FriendsItem = ({ user, type }) => {
  const { name, username, imageURL } = user;
  const [accepted, setAccepted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const onAccept = () => {
    setAccepted(true);
  };

  const onCancel = () => {
    setCancelled(true);
  };

  const renderIcon = () => {
    switch (type) {
    case 'send':
      return (<Image source={require('../assets/send_pink.png')} style={styles.icon} />);
    case 'request': {
      if (!accepted && !cancelled) {
        return (
          <View style={{
            position: 'absolute', right: 15, flex: -1, flexDirection: 'row',
          }}
          >
            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Icon name="times" type="font-awesome" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        );
      } else {
        return (<></>);
      }
    }
    case 'disabled':
      return null;
    default:
      return null;
    }
  };

  const subText = () => {
    if (!accepted && !cancelled) return username;
    else if (accepted) return 'This friend request has been accepted.';
    else return 'This friend request has been cancelled.';
  };

  return (
    <View style={{ backgroundColor: 'black' }}>
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.background}>
          <Image source={{ uri: imageURL }} style={styles.profilePic} />

          <View style={{ marginLeft: 10 }}>
            <View style={styles.nameBubble}>
              <Text style={styles.nameText}>{name}</Text>
            </View>

            <Text style={styles.usernameText}>{subText()}</Text>
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
    alignSelf: 'flex-start',
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
  acceptButton: {
    backgroundColor: '#BED894',
    padding: 5,
    paddingTop: 10,
    minWidth: 75,
    borderRadius: 10,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Hiragino W7',
  },
  cancelButton: {
    backgroundColor: '#EB6660',
    borderRadius: 100,
    width: 32,
    height: 32,
    marginTop: 2,
    marginLeft: 10,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
});

export default FriendsItem;
