import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from 'res';

const ModalHeader = ({ navigation, title, children }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={goBack}
        activeOpacity={0.5}
        style={styles.backIcon}
        hitSlop={{
          top: 8, bottom: 8, left: 8, right: 8,
        }}
      >
        <Icon name="chevron-left" type="font-awesome" size={16} color={Colors.PRIMARY} />
      </TouchableOpacity>

      <Text style={styles.titleText}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
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
    color: Colors.BLACK,
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ModalHeader;
