import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Colors } from 'res';

const AccountItem = ({ account }) => {
  const { last4, bankName, logo } = account;

  return (
    <View style={styles.background}>
      <Image source={{ uri: `data:image/png;base64,${logo}` }} style={styles.bankLogo} />
      <View>
        <Text style={styles.accountText}>{bankName}</Text>
        <Text style={styles.accountText}>{`xxxxxxxx${last4}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  accountText: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: Colors.BLACK,
    paddingBottom: 3,
    paddingTop: 3,
  },
});

export default AccountItem;
