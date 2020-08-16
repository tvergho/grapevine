import React from 'react';
import { View } from 'react-native';
import { Colors } from 'res';
import PlaidLink from 'react-native-plaid-link-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HeaderLink = ({ submit, isSandbox }) => {
  return (
    <View style={{ position: 'absolute', right: 15, top: hp('6%') - 4 }}>
      <PlaidLink
        publicKey="2664ac1ba958fb3db7f51f0e0bb265"
        clientName="BobaMe"
        env={isSandbox ? 'sandbox' : 'development'}
        webhook="https://api.bobame.app/recommendation/plaidWebhook"
        product={['transactions']}
        onSuccess={(data) => submit(data.public_token)}
        onExit={(data) => console.log('exit: ', data)}
      >
        <FontAwesomeIcon icon={faPlus} size={24} color={Colors.PRIMARY} />
      </PlaidLink>
    </View>
  );
};

export default HeaderLink;
