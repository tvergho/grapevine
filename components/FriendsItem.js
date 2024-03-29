/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text, Animated,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { Images, Colors } from 'res';
import TextBubble from 'components/TextBubble';
import { makeFriendRequest, deleteFriendRequest, addFriend } from 'actions';
import { connect } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Swipeable from 'react-native-swipeable-row';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';

const LoadingCard = () => {
  return (
    <View style={styles.background}>
      <SkeletonPlaceholder height={190} paddingLeft={10} paddingRight={10}>
        <SkeletonPlaceholder.Item width={hp('7%')} height={hp('7%')} borderRadius={100} marginRight={10} />
        <View>
          <SkeletonPlaceholder.Item marginBottom={6} width={200} height={20} borderRadius={10} />
          <SkeletonPlaceholder.Item marginBottom={6} width={100} height={20} borderRadius={10} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const FriendsItem = ({
  user, type, loading, userId, shouldRefresh, swipeable, onRemove,
}) => {
  if (loading) {
    return (
      <LoadingCard />
    );
  } else {
    const {
      full_name, username, picture, status, UserID,
    } = user;
    const [accepted, setAccepted] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [sent, setSent] = useState(false);

    const onAccept = () => {
      addFriend(UserID);
      setAccepted(true);
      if (shouldRefresh) shouldRefresh(true);
    };

    const onCancel = () => {
      deleteFriendRequest(UserID);
      setCancelled(true);
      if (shouldRefresh) shouldRefresh(true);
    };

    const onSent = () => {
      makeFriendRequest(UserID);
      setSent(true);
    };

    const friendRequest = () => {
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
    };

    const addRequest = () => {
      return (
        <TouchableOpacity style={[styles.cancelButton, { position: 'absolute', right: 15 }]} onPress={onSent}>
          <Icon name="plus" type="font-awesome" size={20} color="#FFFFFF" iconStyle={{ paddingTop: 2 }} />
        </TouchableOpacity>
      );
    };

    const renderIcon = () => {
      const send = (<Image source={Images.sendPink} style={styles.icon} />);

      if (UserID === userId) return send;

      if (status) {
        switch (status) {
        case 'friends':
          return send;
        case 'requested':
          return (<></>);
        case 'requests':
          return (friendRequest());
        default:
          break;
        }
      }

      switch (type) {
      case 'send':
        return send;
      case 'request': {
        if (!accepted && !cancelled) {
          return (
            friendRequest()
          );
        } else {
          return (<></>);
        }
      }
      case 'add': {
        if (!sent) {
          return (
            addRequest()
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
      if (status && status === 'requested') return 'Friend request sent.';
      else if (!accepted && !cancelled && !sent) return `@${username}`;
      else if (accepted) return 'This friend request has been accepted.';
      else if (sent) return 'Friend request sent.';
      else if (cancelled) return 'This friend request has been cancelled.';
      else return '';
    };

    const leftContent = (
      <View style={{
        backgroundColor: '#EB6660', flex: 1, alignItems: 'flex-end', justifyContent: 'center',
      }}
      >
        <FontAwesomeIcon icon={faUserTimes} size={40} color="white" style={{ marginRight: 15 }} />
      </View>
    );

    const deleteValue = useRef(new Animated.Value(1)).current;

    const deleteStyles = [
      styles.background,
      { opacity: deleteValue },
      {
        transform: [
          { scale: deleteValue },
        ],
      },
    ];

    const remove = () => {
      Animated.timing(deleteValue, {
        toValue: 0,
        duration: 400,
      }).start(() => onRemove(UserID));
    };

    const withSwipeable = (children) => {
      if (swipeable) {
        return (
          <Swipeable leftContent={leftContent} onLeftActionRelease={remove}>
            {children}
          </Swipeable>
        );
      } else return children;
    };

    return withSwipeable(
      <View style={deleteValue == 1 ? { backgroundColor: 'black' } : {}}>
        <TouchableOpacity activeOpacity={0.9}>
          <Animated.View style={swipeable ? deleteStyles : styles.background}>
            <Image source={{ uri: picture }} style={styles.profilePic} />

            <View style={{ marginLeft: 10 }}>
              <TextBubble text={full_name} textStyle={styles.nameText} backgroundColor={Colors.WHITE} style={styles.customShadow} />
              <Text style={styles.usernameText}>{subText()}</Text>
            </View>

            {renderIcon()}
          </Animated.View>
        </TouchableOpacity>
      </View>,
    );
  }
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
  customShadow: {
    minHeight: 25,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
  },
  nameText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: '#6D7278',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  usernameText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: '#6D7278',
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    position: 'absolute',
    right: 15,
    width: 30,
    height: 30,
  },
  acceptButton: {
    backgroundColor: Colors.ACCEPT,
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
    paddingBottom: 5,
  },
  cancelButton: {
    backgroundColor: Colors.DELETE,
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

const mapStateToProps = (reduxState) => (
  {
    userId: reduxState.user.userId,
  }
);

export default connect(mapStateToProps, null)(FriendsItem);
