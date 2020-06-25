import React from 'react';
import {
  StyleSheet, Text, Dimensions,
} from 'react-native';
import { Colors } from 'res';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from 'react-number-format';
import AppButton from 'components/AppButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const window = Dimensions.get('window');
const small = window.width <= 350;

const MapSection = ({
  location, onRegionChange, markers, balance,
}) => {
  return (
    <>
      <MapView region={location} onRegionChangeComplete={onRegionChange} style={styles.mapStyle}>
        {markers.map((coord, index) => {
          return (
            <Marker coordinate={coord}>
              <FontAwesomeIcon icon={faMapMarker} size={40} color="#FFB7B2" />
              <Text style={{
                fontFamily: 'Hiragino W7', color: 'white', fontSize: 16, position: 'absolute', left: 14, top: 8,
              }}
              >
                {`${index + 1}`}
              </Text>
            </Marker>
          );
        })}
      </MapView>

      <AppButton
        dark
        containerStyle={styles.addFriendContainer}
        style={{ borderColor: Colors.PRIMARY, borderWidth: 1 }}
        width={150}
        height={35}
        backgroundColor={Colors.WHITE}
        borderRadius={25}
        icon={(<Text style={[styles.addFriendText, { fontSize: 24, marginRight: 6, paddingTop: 2 }]}>+</Text>)}
        title="Add Friend"
        textStyle={styles.addFriendText}
        activeOpacity={0.6}
        shadowHeight={2}
        shadowWidth={1}
      />

      <AppButton
        dark
        containerStyle={styles.moneyContainer}
        width={90}
        height={35}
        backgroundColor={Colors.PRIMARY}
        borderRadius={25}
        icon={(<NumberFormat value={balance} displayType="text" thousandSeparator prefix="$" renderText={(value) => <Text style={styles.moneyText}>{value}</Text>} />)}
        activeOpacity={0.6}
        shadowHeight={2}
        shadowWidth={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: window.width,
    height: hp('100%'),
  },
  addFriendContainer: {
    position: 'absolute',
    left: 10,
    top: small ? 30 : 40,
  },
  moneyContainer: {
    position: 'absolute',
    right: 10,
    top: small ? 30 : 40,
  },
  moneyText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: Colors.WHITE,
    paddingTop: 5,
  },
  addFriendText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: Colors.PRIMARY,
    paddingTop: 5,
  },
});

export default MapSection;