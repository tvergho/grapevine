import React from 'react';
import { View } from 'react-native';
import { Colors } from 'res';
import PlaidLink from 'react-native-plaid-link-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HeaderLink = ({
  submit, isSandbox, token, disabled,
}) => {
  return (
    <View style={{ position: 'absolute', right: 15, top: hp('6%') - 4 }}>
      <PlaidLink
        token={token}
        env={isSandbox ? 'sandbox' : 'development'}
        componentProps={{ disabled: !token || disabled }}
        onSuccess={(data) => submit(data)}
        onExit={(data) => console.log('exit: ', data)}
      >
        <FontAwesomeIcon icon={faPlus} size={24} color={Colors.PRIMARY} />
      </PlaidLink>
    </View>
  );
};

export default HeaderLink;
