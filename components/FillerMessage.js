import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppButton from 'components/AppButton';
import { Colors } from 'res';
import PropTypes from 'prop-types';

const FillerMessage = ({ message, refresh, top }) => {
  return (
    <View style={[styles.fillerView, { top: top || hp('25%') }]}>
      <Text style={styles.fillerMessage}>{message}</Text>
      {refresh && (
        <AppButton
          title="Refresh"
          textStyle={styles.refreshText}
          backgroundColor={Colors.PRIMARY}
          width={wp('70%')}
          height={40}
          borderRadius={10}
          onPress={refresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fillerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  fillerMessage: {
    fontFamily: 'Hiragino W5',
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    lineHeight: 25,
    width: wp('80%'),
    paddingBottom: 50,
  },
  refreshText: {
    fontFamily: 'Hiragino W7',
    color: Colors.WHITE,
    fontSize: 14,
    paddingTop: 5,
  },
});

FillerMessage.propTypes = {
  message: PropTypes.string,
  refresh: PropTypes.func,
};

export default FillerMessage;
