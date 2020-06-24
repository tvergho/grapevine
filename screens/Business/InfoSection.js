import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { createOpenLink } from 'react-native-open-maps';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Row = ({ children, text, icon }) => {
  return (
    <View style={styles.row}>
      <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={icon} size={16} color="rgba(0,0,0,0.7)" style={{ marginBottom: 3, marginRight: 8 }} />
        <Text style={styles.sectionText}>{text}</Text>
      </View>

      {children}
    </View>
  );
};

const InfoSection = ({ business }) => {
  const { address } = business;
  const mapQuery = { query: address };
  const openAddress = createOpenLink(mapQuery);

  return (
    <View style={styles.background}>
      <Text style={styles.sectionHeader}>Business Info</Text>

      <Row text={address} icon={faCompass}>
        <Button type="clear"
          title="Map it"
          titleStyle={styles.mapButton}
          onPress={openAddress}
        />
      </Row>
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
