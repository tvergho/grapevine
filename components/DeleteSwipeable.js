import React from 'react';
import { Animated, View } from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import useDeleteStyles from 'utils/useDeleteStyles';

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

  const { deleteStyles, onRemove } = useDeleteStyles(backgroundStyle, remove);

  return (
    <Swipeable leftContent={leftContent} onLeftActionRelease={onRemove}>
      <Animated.View style={deleteStyles}>
        {children}
      </Animated.View>
    </Swipeable>
  );
};

export default DeleteSwipeable;
