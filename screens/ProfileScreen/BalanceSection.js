import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BalanceSection = ({ balance }) => {
  return (
    <View style={styles.balanceSection}>
      <View style={styles.balanceHalf}>
        <Text style={styles.balanceHeader}>Current Balance</Text>
        <Text style={styles.balanceTotal}>{`${balance} points`}</Text>
      </View>
      <View style={{ width: 1, minHeight: 60, backgroundColor: '#FFB7B2' }} />
      <View style={styles.balanceHalf}>
        <Text style={styles.balanceHeader}>Lifetime Balance</Text>
        <Text style={styles.balanceTotal}>{`${balance} points`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceSection: {
    flex: -1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  balanceHalf: {
    marginRight: 15,
    marginLeft: 15,
    flex: -1,
    alignItems: 'center',
  },
  balanceHeader: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W4',
    fontSize: 14,
  },
  balanceTotal: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    marginTop: 12,
    paddingBottom: 5,
  },
});

export default BalanceSection;
