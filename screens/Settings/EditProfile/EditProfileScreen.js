import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView, StyleSheet, Image,
} from 'react-native';
import { Colors, Images } from 'res';
import ModalHeader from 'components/ModalHeader';
import HeaderText from 'components/HeaderText';
import AlertDialog from 'components/AlertDialog';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { displayError, updateUserInfo, updatePhoto } from 'actions';
import EditProfileForm from './EditProfileForm';

const EditProfileScreen = ({
  navigation, user, error, ...props
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setUsername(user.username);
    setImage(user.profilePic);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [error]);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      props.displayError('Sorry, we need camera roll permissions to change your profile picture!');
      return false;
    } else {
      return true;
    }
  };

  const selectImage = async () => {
    const permission = await getPermissions();
    if (permission) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri);
          setImageChanged(true);
        }

        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const save = () => {
    setLoading(true);

    const updateInfo = (url) => {
      const userInfo = {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
      };
      if (url) userInfo.picture = url;
      props.updateUserInfo(userInfo, onSaveComplete);
    };

    if (imageChanged) {
      props.updatePhoto(image, updateInfo);
    } else {
      updateInfo();
    }
  };

  const onSaveComplete = () => {
    setLoading(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.background} behavior="position">
      <ModalHeader navigation={navigation} title="Edit profile">
        <HeaderText text="Save" loading={loading} onPress={save} />
      </ModalHeader>

      <TouchableOpacity onPress={selectImage}>
        <Image source={image ? { uri: image } : Images.blankProfile} style={styles.profilePic} />
      </TouchableOpacity>

      <EditProfileForm
        values={{
          firstName, lastName, email, username,
        }}
        onChange={{
          setFirstName, setLastName, setEmail, setUsername,
        }}
      />
      <AlertDialog />
    </KeyboardAvoidingView>
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
    alignSelf: 'center',
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
    error: reduxState.lifecycle.errorMessage,
  }
);

export default connect(mapStateToProps, { displayError, updateUserInfo, updatePhoto })(EditProfileScreen);
