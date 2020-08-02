import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import Swipeable from 'react-native-swipeable-row';

const DeleteSwipeable = ({
  leftContent, remove, children, backgroundStyle, enabled,
}) => {
  if (!enabled) {
    return (
      <View style={backgroundStyle}>
        {children}
      </View>
    );
  }

  const deleteValue = useRef(new Animated.Value(1)).current;

  const deleteStyles = [
    backgroundStyle,
    { opacity: deleteValue },
    {
      transform: [
        { scale: deleteValue },
      ],
    },
  ];

  const onRemove = () => {
    Animated.timing(deleteValue, {
      toValue: 0,
      duration: 400,
    }).start(() => remove());
  };

  return (
    <Swipeable leftContent={leftContent} onLeftActionRelease={onRemove}>
      <Animated.View style={deleteStyles}>
        {children}
      </Animated.View>
    </Swipeable>
  );
};

export default DeleteSwipeable;
