import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Image, Dimensions,
} from 'react-native';
import { Images, Colors } from 'res';
import { DotIndicator } from 'react-native-indicators';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const window = Dimensions.get('window');
const large = window.height >= 800;

const PostRecButton = ({ onSubmit, loading, disabled }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TouchableOpacity style={[styles.submitButton, { backgroundColor: disabled ? 'rgba(255,183,178,0.7)' : 'rgba(255,183,178,1)' }]} onPress={onSubmit} disabled={loading || disabled}>
        {!loading ? (
          <>
            <Text style={styles.buttonText}>Post recommendation</Text>
            <Image source={Images.send} style={{ width: 18, height: 18, marginLeft: 5 }} />
          </>
        ) : (
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
          }}
          >
            <Text style={styles.buttonText}>Posting...</Text>
            <DotIndicator color="white" size={12} count={3} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  submitButton: {
    height: large ? hp('8%') : hp('9%'),
    width: wp('100%'),
    backgroundColor: Colors.PRIMARY,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: 'white',
    paddingTop: 5,
  },
});

export default PostRecButton;
