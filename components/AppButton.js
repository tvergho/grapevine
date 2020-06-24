import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View,
} from 'react-native';
import { Colors } from 'res';

const AppButton = ({
  onPress, shadowWidth, shadowHeight, backgroundColor, width, height, borderRadius, icon, textStyle, containerStyle, title, style, dark, activeOpacity,
}) => {
  const shadow = (shadowWidth || shadowHeight) ? {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: shadowHeight, width: shadowWidth },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  } : {};

  const viewWrapper = (component) => {
    if (dark) {
      return (<View style={{ backgroundColor: Colors.BLACK, ...containerStyle, borderRadius }}>{component}</View>);
    } else return component;
  };

  const button = () => {
    return (
      <TouchableOpacity
        style={[styles.button, {
          width,
          height,
          borderRadius: borderRadius || 30,
          backgroundColor: backgroundColor || Colors.WHITE,
          ...shadow,
          ...style,
        }]}
        onPress={onPress}
        activeOpacity={activeOpacity || 0.2}
      >
        {icon}
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    viewWrapper(button())
  );
};

const styles = StyleSheet.create({
  button: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default AppButton;
