import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { createOpenLink } from 'react-native-open-maps';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as WebBrowser from 'expo-web-browser';

const Row = ({
  children, text, icon, button, onPress,
}) => {
  return (
    <View style={styles.row}>
      <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={icon} size={16} color="rgba(0,0,0,0.7)" style={{ marginRight: 8, alignSelf: 'flex-start' }} />
        <Text style={styles.sectionText}>{text}</Text>
      </View>
      {button ? (
        <Button type="clear"
          title={button}
          titleStyle={styles.mapButton}
          onPress={onPress}
        />
      ) : <></>}
      {children}
    </View>
  );
};

const InfoSection = ({ business }) => {
  let address = '';
  if (business.address) address = business.address;
  else if (business.street_address) address = `${business.street_address}, ${business.city}, ${business.state} ${business.zip}`;
  const mapQuery = { query: address };
  const openAddress = createOpenLink(mapQuery);

  const openLink = async (link) => {
    await WebBrowser.openBrowserAsync(link);
  };

  return (
    <View style={styles.background}>
      <Text style={styles.sectionHeader}>Business Info</Text>

      <Row text={address} icon={faCompass} button="Map it" onPress={openAddress} />
      {business.website ? <Row text={business.website} icon={faSearch} button="Open" onPress={() => { openLink(business.website); }} /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 15,
    flex: -1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionHeader: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    color: Colors.BLACK,
    paddingTop: 2,
    maxWidth: wp('75%'),
  },
  row: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
  },
  mapButton: {
    color: '#93DAC0',
    fontSize: 12,
    fontFamily: 'Hiragino W5',
    paddingRight: 20,
    marginLeft: 10,
    paddingTop: 4,
  },
});

export default InfoSection;
