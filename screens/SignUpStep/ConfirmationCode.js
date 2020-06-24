/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import {
  CodeField, Cursor, useClearByFocusCell, useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ConfirmationCode = (props) => {
  const [value, setValue] = useState('');
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    ref.current.focus();

    if (value.length >= CELL_COUNT) {
      props.confirm(props.username, value, props.onFulfill);
      setValue('');
    }

    if (value.length > 0) {
      props.resetError();
    }
  }, [value]);

  return (
    <CodeField
      ref={ref}
      {...cellProps}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={{ width: wp('80%') }}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}
        >
          <Text style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

export default ConfirmationCode;

const styles = StyleSheet.create({
  cellRoot: {
    width: wp('12%'),
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  focusCell: {
    borderBottomWidth: 4,
  },
  cellText: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Hiragino W7',
  },
});
