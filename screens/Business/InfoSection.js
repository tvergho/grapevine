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
      <View style={{ flex: -1, flexDirection: 'row', alignItems: 'flex-start' }}>
        <FontAwesomeIcon icon={icon} size={16} color="rgba(0,0,0,0.7)" style={{ marginRight: 8 }} />
        <Text style={styles.sectionText}>{text}</Text>
      </View>
      {button ? (
        <Button type="clear"
          title={button}
          titleStyle={styles.mapButton}
          onPress={onPress}
          containerStyle={{ marginTop: -10 }}
        />
      ) : <></>}
      {children}
    </View>
  );
};

const InfoSection = ({ rec, business }) => {
  const address = rec.street_address ? `${rec.street_address}, ${rec.city}, ${rec.state} ${rec.zip}` : `${business.street_address}, ${business.city}, ${business.state} ${business.zip}`;
  const website = rec.website || business.website;
  const mapQuery = { query: address };
  const openAddress = createOpenLink(mapQuery);

  const openLink = async (link) => {
    await WebBrowser.openBrowserAsync(link);
  };

  return (
    <View style={styles.background}>
      <Text style={styles.sectionHeader}>Business Info</Text>

      <Row text={address} icon={faCompass} button="Map it" onPress={openAddress} />
      {website ? <Row text={website} icon={faSearch} button="Open" onPress={() => { openLink(website); }} /> : <></>}
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
    alignItems: 'flex-start',
    width: wp('100%'),
    marginBottom: 5,
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
