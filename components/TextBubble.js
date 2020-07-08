import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';

const TextBubble = ({
  backgroundColor, paddingTop, paddingBottom, paddingLeft, paddingRight, textStyle, style, text, width, minWidth, height, numLines, borderRadius, shadowWidth, shadowHeight,
}) => {
  const shadow = (shadowWidth || shadowHeight) ? {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: shadowHeight, width: shadowWidth },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  } : {};

  return (
    <View style={[styles.bubble, {
      backgroundColor: backgroundColor || Colors.WHITE,
      paddingTop: paddingTop || 5,
      paddingLeft: paddingLeft || 10,
      paddingRight: paddingRight || 10,
      paddingBottom: paddingBottom || 0,
      width: width || null,
      height: height || null,
      minWidth: minWidth || null,
      borderRadius: borderRadius || 10,
      ...shadow,
      ...style,
    }]}
    >
      <Text style={textStyle} numberOfLines={numLines || null}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

export default TextBubble;
