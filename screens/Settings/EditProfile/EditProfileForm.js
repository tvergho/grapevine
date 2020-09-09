import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const EditProfileForm = ({ values, onChange }) => {
  const {
    firstName, lastName, email, username,
  } = values;
  const {
    setFirstName, setLastName, setEmail, setUsername,
  } = onChange;

  return (
    <View style={styles.editContainer}>
      <Input label="First name" labelStyle={styles.label} value={firstName} onChangeText={setFirstName} inputContainerStyle={styles.inputContainer} />
      <Input label="Last name" labelStyle={styles.label} value={lastName} onChangeText={setLastName} inputContainerStyle={styles.inputContainer} />
      <Input label="Email" labelStyle={styles.label} value={email} onChangeText={setEmail} inputContainerStyle={styles.inputContainer} />
      <Input label="Username" labelStyle={styles.label} value={username} onChangeText={setUsername} inputContainerStyle={styles.inputContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    width: wp('100%'),
    padding: 20,
  },
  inputContainer: {
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  label: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
});

export default EditProfileForm;
