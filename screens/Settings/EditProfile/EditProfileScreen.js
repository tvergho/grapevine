import React from 'react';
import {
  View, StyleSheet, Image,
} from 'react-native';
import { Colors, Images } from 'res';
import ModalHeader from 'components/ModalHeader';
import HeaderText from 'components/HeaderText';
import AlertDialog from 'components/AlertDialog';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EditProfileScreen = ({ navigation, user }) => {
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Edit profile">
        <HeaderText text="Save" />
      </ModalHeader>

      <Image source={user.profilePic ? { uri: user.profilePic } : Images.blankProfile} style={styles.profilePic} />

      <AlertDialog />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 150,
    marginTop: hp('5%'),
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
  }
);

export default connect(mapStateToProps, null)(EditProfileScreen);
