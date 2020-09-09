import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from 'res';

const window = Dimensions.get('window');
const large = window.height >= 800;

const ModalHeader = ({
  navigation, title, children, style,
}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.background, style]}>
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
    paddingBottom: large ? 10 : 5,
  },
});

export default ModalHeader;
