import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ModalHeader = ({ navigation, title }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={goBack}
        activeOpacity={0.5}
        style={styles.backIcon}
        hitSlop={{
          top: 5, bottom: 5, left: 5, right: 5,
        }}
      >
        <Icon name="chevron-left" type="font-awesome" size={16} color="#FFB7B2" />
      </TouchableOpacity>

      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: -1,
    flexDirection: 'row',
    width: wp('100%'),
    minWidth: wp('100%'),
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: hp('6%'),
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  backIcon: {
    position: 'absolute',
    left: 15,
    top: hp('6%'),
  },
  titleText: {
    color: 'black',
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ModalHeader;
