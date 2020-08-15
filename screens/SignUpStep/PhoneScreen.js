import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, TextInput,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from 'res';
import { formatPhone, stripPhone } from 'utils/formatPhone';
import AppButton from 'components/AppButton';
import { addPhone } from 'actions';
import { connect } from 'react-redux';

const PhoneScreen = (props) => {
  const [phone, setPhone] = useState('');

  let phoneInput = null;

  useEffect(() => {
    if (phoneInput) {
      phoneInput.focus();
    }
  }, [phoneInput]);

  useEffect(() => {
    if (phone.length >= 14) {
      phoneInput.blur();
    }
  }, [phone]);

  return (
    <View style={styles.background}>
      <Text style={styles.instructions}>Please enter your phone number.</Text>
      <TextInput
        keyboardType="phone-pad"
        style={styles.phoneEntry}
        value={phone}
        onChangeText={(text) => { setPhone(formatPhone(text, phone)); }}
        ref={(input) => { phoneInput = input; }}
      />
      <AppButton
        shadowWidth={2}
        shadowHeight={1}
        backgroundColor={Colors.WHITE}
        title="Submit"
        width={wp('80%')}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => { props.addPhone(stripPhone(phone)); }}
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
  phoneEntry: {
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
    fontFamily: 'Hiragino W5',
    fontSize: 20,
    position: 'absolute',
    top: 80,
    padding: 15,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    paddingBottom: 10,
    paddingTop: 15,
  },
});

export default connect(null, { addPhone })(PhoneScreen);
