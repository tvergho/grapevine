/* eslint-disable eqeqeq */
import React, { useRef } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Animated,
} from 'react-native';
import { Colors } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Swipeable from 'react-native-swipeable-row';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const dateFormat = require('dateformat');

const LoadingCard = () => {
  return (
    <View style={styles.background}>
      <SkeletonPlaceholder height={60} paddingLeft={10} paddingRight={10}>
        <View>
          <SkeletonPlaceholder.Item marginBottom={6} width={100} height={20} borderRadius={10} />
          <SkeletonPlaceholder.Item marginBottom={6} width={200} height={20} borderRadius={10} />
        </View>

        <SkeletonPlaceholder.Item marginBottom={6} width={100} height={20} borderRadius={10} />
      </SkeletonPlaceholder>
    </View>
  );
};

const convertTimestampToDate = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  return dateFormat(date, 'mmmm dS, yyyy');
};

const RecListItem = ({
  rec, onRemove, loading, navigation,
}) => {
  if (!loading) {
    const {
      timestamp, business, message, recommendationID,
    } = rec;
    const { name } = business;

    const leftContent = (
      <View style={{
        backgroundColor: '#EB6660', flex: 1, alignItems: 'flex-end', justifyContent: 'center',
      }}
      >
        <FontAwesomeIcon icon={faTimes} size={40} color="white" style={{ marginRight: 15 }} />
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
      }).start(() => onRemove(recommendationID));
    };

    return (
      <Swipeable leftContent={leftContent} onLeftActionRelease={remove}>
        <TouchableOpacity activeOpacity={0.4} onPress={() => { navigation.navigate('Business', { ...rec, back: 'You' }); }}>
          <Animated.View style={deleteStyles}>
            <Text style={styles.mainText}>{convertTimestampToDate(timestamp)}</Text>

            <View style={{ alignItems: 'flex-end', flex: -1 }}>
              <Text style={styles.mainText}>{name}</Text>
              <Text style={styles.messageText} numberOfLines={1}>{`${message}`}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    );
  } else {
    return <LoadingCard />;
  }
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    flexDirection: 'row',
    minHeight: 60,
    width: wp('100%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
  },
  mainText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Hiragino W5',
    paddingBottom: 5,
  },
  messageText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 12,
    fontFamily: 'Hiragino W4',
    width: wp('100%') - 30,
    paddingBottom: 5,
  },
});

export default RecListItem;
