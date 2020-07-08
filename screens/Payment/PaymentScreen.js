import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import PlaidLink from 'react-native-plaid-link-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const PaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Accounts" />

      <View style={styles.linkButton}>
        <PlaidLink
          publicKey="2664ac1ba958fb3db7f51f0e0bb265"
          clientName="BobaMe"
          env="sandbox"
          product={['transactions']}
          onSuccess={(data) => console.log('success: ', data)}
          onExit={(data) => console.log('exit: ', data)}
          componentProps={{
            hitSlop: {
              top: 30, left: 30, bottom: 30, right: 30,
            },
          }}
        >
          <View style={styles.linkButton}>
            <FontAwesomeIcon icon={faPlusSquare} size={45} color={Colors.PRIMARY} />
            <Text style={styles.linkText}>Add Bank Account or Credit Card</Text>
            <Text style={styles.linkSubText}>BobaMe will never charge you.</Text>
          </View>
        </PlaidLink>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  linkButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontFamily: 'Hiragino W7',
    marginTop: 10,
  },
  linkSubText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
  },
});

export default PaymentScreen;
