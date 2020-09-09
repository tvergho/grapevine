import React, { useState, useEffect } from 'react';
import {
  View, Modal, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import posed from 'react-native-pose';
import { Colors } from 'res';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Overlay = posed.View({
  open: { x: 30 },
  closed: { x: '100vw' },
});

const SlidePane = ({ children, isVisible, close }) => {
  const [delayOpen, setDelayOpen] = useState(isVisible);
  const [delayClose, setDelayClose] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setDelayClose(true);
      setTimeout(() => {
        setDelayOpen(true);
      }, 150);
    } else {
      setDelayOpen(false);
      setTimeout(() => {
        setDelayClose(false);
      }, 300);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={delayClose || isVisible}
      transparent
    >
      <TouchableWithoutFeedback onPress={close}>
        <View
          style={styles.backdrop}
        />
      </TouchableWithoutFeedback>

      <Overlay style={styles.background} pose={delayOpen ? 'open' : 'closed'}>
        {children}
      </Overlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    width: wp('70%'),
    height: hp('100%'),
    paddingRight: 30,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
});

export default SlidePane;
