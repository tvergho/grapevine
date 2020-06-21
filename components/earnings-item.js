import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';

const EarningsItem = (props) => {
  const {
    type, business, amount,
  } = props.transaction;

  if (type === 'earning') {
    const { user } = props.transaction;
    return (
      <View style={styles.background}>
        <View style={{
          maxWidth: wp('75%'), flex: -1, flexDirection: 'row', flexWrap: 'wrap',
        }}
        >
          <View style={styles.textBubble}><Text style={[styles.mainText, { color: user.color }]}>{user.name}</Text></View>
          <Text style={[styles.subText, { marginLeft: 7, marginRight: 7 }]}>bought from</Text>
          <View style={styles.textBubble}><Text style={[styles.mainText, { color: '#6D7278' }]}>{business}</Text></View>
        </View>

        <NumberFormat
          value={amount}
          displayType="text"
          thousandSeparator
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => <Text style={[styles.mainText, styles.amountText, { color: '#B5EAD7' }]}>{`+ ${value}`}</Text>}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.background}>
        <View style={{
          maxWidth: wp('75%'), flex: -1, flexDirection: 'row', flexWrap: 'wrap',
        }}
        >
          <Text style={[styles.subText, { marginRight: 7 }]}>You just visited</Text>
          <View style={styles.textBubble}><Text style={[styles.mainText, { color: '#6D7278' }]}>{business}</Text></View>
        </View>

        <NumberFormat
          value={amount}
          displayType="text"
          thousandSeparator
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => <Text style={[styles.mainText, styles.amountText, { color: '#E2F0CB' }]}>{`+ ${value}`}</Text>}
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
  textBubble: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 60,
    borderRadius: 12,
    backgroundColor: 'white',
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 2,
    height: 25,
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
