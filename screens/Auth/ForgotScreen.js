import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text,
} from 'react-native';
import { Colors } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppButton from 'components/AppButton';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { displayError, sendResetEmail } from 'actions';
import validateEmail from 'utils/validateEmail';
import { MaterialIndicator } from 'react-native-indicators';

const ForgotScreen = ({ navigation, ...props }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (validateEmail(email)) {
      setLoading(true);
      try {
        await sendResetEmail(email);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        navigation.goBack();
      }
    } else {
      props.displayError('Invalid email.');
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.instructions}>Please enter your account email to reset your password.</Text>
      {loading
        ? <MaterialIndicator color="white" size={100} />
        : (
          <TextInput
            style={styles.emailEntry}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCompleteType="email"
          />
        )}
      <AppButton
        shadowWidth={2}
        shadowHeight={1}
        backgroundColor={Colors.WHITE}
        title="Submit"
        width={wp('80%')}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onSubmit}
      />
      <Button type="clear" title="Go back" titleStyle={styles.backButton} containerStyle={{ position: 'absolute', bottom: 50 }} onPress={() => { navigation.goBack(); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailEntry: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.7)',
    height: 40,
    width: wp('80%'),
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginBottom: 40,
  },
  instructions: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W4',
    fontSize: 20,
    position: 'absolute',
    top: 80,
    padding: 15,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    position: 'absolute',
    bottom: 100,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    paddingBottom: 10,
    paddingTop: 15,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Hiragino W4',
    marginTop: 10,
  },
});

export default connect(null, { displayError })(ForgotScreen);
