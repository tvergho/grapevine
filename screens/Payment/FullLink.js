import React from 'react';
import { Colors } from 'res';
import { View, StyleSheet, Text } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const FullLink = ({
  submit, isSandbox, token, disabled,
}) => {
  return (
    <View style={styles.linkButton}>
      <PlaidLink
        token={token}
        env={isSandbox ? 'sandbox' : 'development'}
        onSuccess={(data) => submit(data)}
        onExit={(data) => console.log('exit: ', data)}
        componentProps={{
          hitSlop: {
            top: 20, left: 20, bottom: 20, right: 20,
          },
          disabled,
        }}
      >
        <View style={styles.linkButton}>
          <FontAwesomeIcon icon={faPlusSquare} size={45} color={Colors.PRIMARY} />
          <Text style={styles.linkText}>Add Bank Account or Credit Card</Text>
          <Text style={styles.linkSubText}>RecTree will never charge you.</Text>
        </View>
      </PlaidLink>
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
    marginBottom: 10,
  },
  linkSubText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    paddingBottom: 5,
  },
});

export default FullLink;
