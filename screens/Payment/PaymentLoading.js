import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Images } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PaymentLoading = () => {
  return (
    <View style={styles.background}>
      <LottieView source={Images.squareLoader} autoPlay loop style={{ width: wp('80%'), height: wp('80%') }} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentLoading;
