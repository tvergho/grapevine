import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ProfileListItem = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity style={styles.listButton} onPress={onPress} activeOpacity={0.9}>
      {icon}
      <Text styles={styles.listText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listButton: {
    backgroundColor: Colors.WHITE,
    width: wp('100%'),
    height: hp('8%'),
    flex: -1,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomColor: 'rgba(151,151,151,0.25)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  listText: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    paddingTop: 5,
  },
});

export default ProfileListItem;
