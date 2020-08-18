import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const HeaderSwitch = ({
  labels, start, onSwitch, active,
}) => {
  const [internalActive, setInternalActive] = useState(start || labels[0]);

  const handlePress = (label) => {
    setInternalActive(label);
    onSwitch(label);
  };

  const activeLink = active || internalActive;

  return (
    <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
      {labels.map((label) => {
        return (
          <Button
            type="clear"
            key={label}
            titleStyle={activeLink === label ? styles.activeLink : styles.inactiveLink}
            title={label}
            onPress={() => { handlePress(label); }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inactiveLink: {
    fontFamily: 'Hiragino W4',
    color: '#6D7278',
    fontSize: 14,
  },
  activeLink: {
    fontFamily: 'Hiragino W7',
    color: '#FFB7B2',
    fontSize: 14,
  },
});

export default HeaderSwitch;
