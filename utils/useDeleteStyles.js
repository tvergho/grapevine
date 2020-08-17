/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Animated } from 'react-native';

const useDeleteStyles = (styles, remove) => {
  const deleteValue = useRef(new Animated.Value(1)).current;

  const deleteStyles = [
    styles,
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

  return { deleteStyles, onRemove };
};

export default useDeleteStyles;
