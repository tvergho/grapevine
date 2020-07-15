import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';

const SavingsEarningsBar = ({ balance }) => {
  return (
    <View style={styles.savingsEarningsBar}>
      <View style={styles.earningsBarHalf}>
        <Text style={styles.earningsBarHeader}>Savings</Text>
        <View style={[styles.earningsBarBubble, { backgroundColor: Colors.TERTIARY }]}>
          <NumberFormat
            value={balance}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            renderText={(value) => <Text style={styles.earningsBarBalance}>{value}</Text>}
          />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.earningsBarHalf}>
        <Text style={styles.earningsBarHeader}>Earnings</Text>
        <View style={[styles.earningsBarBubble, { backgroundColor: Colors.SECONDARY }]}>
          <NumberFormat
            value={balance}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            renderText={(value) => <Text style={styles.earningsBarBalance}>{value}</Text>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  savingsEarningsBar: {
    flex: -1,
    flexDirection: 'row',
    height: 80,
    width: wp('100%'),
    backgroundColor: Colors.WHITE,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    elevation: 2,
    marginTop: -10,
  },
  earningsBarHalf: {
    flex: -1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
  },
  earningsBarHeader: {
    color: '#6D7278',
    fontFamily: 'Hiragino W7',
    fontSize: 14,
  },
  earningsBarBubble: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 5,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 12,
    minWidth: 70,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsBarBalance: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
  divider: {
    width: 1,
    minHeight: 50,
    maxHeight: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'center',
  },
});

export default SavingsEarningsBar;
