import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text,
} from 'react-native';
import { Colors } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppButton from 'components/AppButton';
import { linkFacebookUser } from 'actions';
import { connect } from 'react-redux';

const LinkScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    props.linkFacebookUser(email, password);
  };

  return (
    <View style={styles.background}>
      <Text style={styles.title}>This account is already associated with an email address. Sign in again to link your accounts.</Text>
      <View>
        <TextInput key="email" value={email} placeholder="Email" placeholderTextColor="#FFFFFF" onChangeText={(text) => setEmail(text)} style={styles.input} />
        <TextInput key="password" value={password} placeholder="Password" placeholderTextColor="#FFFFFF" onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry />
      </View>
      <AppButton
        onPress={submit}
        title="Sign in"
        shadowWidth={1}
        shadowHeight={1}
        backgroundColor={Colors.WHITE}
        width={wp('80%')}
        height={40}
        borderRadius={30}
        textStyle={styles.buttonText}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W5',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
    position: 'absolute',
    top: 60,
    width: wp('80%'),
  },
  input: {
    color: Colors.WHITE,
    width: wp('80%'),
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginBottom: 40,
    fontFamily: 'Hiragino W4',
    alignSelf: 'center',
  },
  buttonText: {
    paddingBottom: 5,
    paddingTop: 8,
    fontSize: 18,
    color: '#FFB7B2',
    fontFamily: 'Hiragino W7',
    marginLeft: 10,
  },
});

export default connect(null, { linkFacebookUser })(LinkScreen);
