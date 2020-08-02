import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';
import MainHeader from 'components/MainHeader';
import AppButton from 'components/AppButton';
import HeaderSwitch from 'components/HeaderSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import * as data from 'data';
import FeedDisplayScreen from './FeedDisplayScreen';

export const HEADER_OPTIONS = ['All', 'You'];

const TopSection = ({ setActive, navigation }) => {
  return (
    <MainHeader title="Feed" border>
      <HeaderSwitch labels={HEADER_OPTIONS} start="All" onSwitch={(label) => { setActive(label); }} />

      <AppButton
        onPress={() => { navigation.navigate('CreateRec'); }}
        borderRadius={100}
        width={45}
        height={45}
        shadowHeight={2}
        icon={(<FontAwesomeIcon icon={faPencilAlt} size={20} color="rgb(255,255,255)" />)}
        backgroundColor={Colors.PRIMARY}
        style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
      />
    </MainHeader>
  );
};

const FeedScreen = ({ navigation }) => {
  const [active, setActive] = useState('All');

  return (
    <View style={styles.background}>
      <TopSection navigation={navigation} setActive={setActive} />
      <FeedDisplayScreen display={active === HEADER_OPTIONS[0]} recommendations={data.ALL_FEED} active={active} />
      <FeedDisplayScreen display={active === HEADER_OPTIONS[1]} recommendations={data.YOU_FEED} active={active} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

export default FeedScreen;
