import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import TextBubble from 'components/TextBubble';
import { Colors } from 'res';

const BusinessRecCard = (props) => {
  const { name, color, message } = props;
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ flex: -1, flexDirection: 'row' }}>
        <TextBubble
          text={name}
          backgroundColor={Colors.WHITE}
          shadowHeight={2}
          shadowWidth={1}
          textStyle={[recCardStyles.fromName, { color }]}
        />
        <Text style={recCardStyles.saidText}>said</Text>
      </View>

      <TextBubble
        text={message}
        textStyle={recCardStyles.messageText}
        backgroundColor={Colors.WHITE}
        style={{ marginTop: 10 }}
        paddingTop={10}
        paddingBottom={10}
        shadowHeight={2}
        shadowWidth={1}
      />
    </View>
  );
};

const recCardStyles = StyleSheet.create({
  fromName: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
  },
  messageText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingBottom: 5,
  },
  saidText: {
    fontFamily: 'Hiragino W4',
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 5,

  },
});

export default BusinessRecCard;
