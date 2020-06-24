import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import TextBubble from 'components/TextBubble';
import { Colors } from 'res';

const EarningsItem = ({ transaction }) => {
  const {
    type, business, amount, user,
  } = transaction;

  if (type === 'earning') {
    return (
      <View style={styles.background}>
        <View style={styles.leftSide}>
          <TextBubble backgroundColor={Colors.WHITE} textStyle={[styles.mainText, { color: user.color }]} minWidth={60} height={25} text={user.name} style={styles.customShadow} />
          <Text style={[styles.subText, { marginLeft: 7, marginRight: 7 }]}>bought from</Text>
          <TextBubble backgroundColor={Colors.WHITE} textStyle={[styles.mainText, { color: '#6D7278' }]} minWidth={60} height={25} text={business} style={styles.customShadow} />
        </View>

        <NumberFormat
          value={amount}
          displayType="text"
          thousandSeparator
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => <Text style={[styles.mainText, styles.amountText, { color: Colors.SECONDARY }]}>{`+ ${value}`}</Text>}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={styles.leftSide}>
          <Text style={[styles.subText, { marginRight: 7 }]}>You just visited</Text>
          <TextBubble backgroundColor={Colors.WHITE} textStyle={[styles.mainText, { color: '#6D7278' }]} minWidth={60} height={25} text={business} style={styles.customShadow} />
        </View>

        <NumberFormat
          value={amount}
          displayType="text"
          thousandSeparator
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => <Text style={[styles.mainText, styles.amountText, { color: Colors.TERTIARY }]}>{`+ ${value}`}</Text>}
        />
      </View>
    );
  }
};

export default EarningsItem;

const styles = StyleSheet.create({
  background: {
    minHeight: 40,
    width: wp('100%'),
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 15,
    marginTop: 10,
  },
  leftSide: {
    maxWidth: wp('75%'),
    flex: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customShadow: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  mainText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
  subText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    paddingTop: 6,
  },
  amountText: {
    position: 'absolute',
    right: 15,
    paddingTop: 6,
  },
});
