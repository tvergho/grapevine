import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, Animated,
} from 'react-native';
import { Colors } from 'res';
import Swipeable from 'react-native-swipeable-row';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useDeleteStyles from 'utils/useDeleteStyles';
import { deleteAccount } from 'actions';
import { connect } from 'react-redux';

const AccountItem = ({ account, isSandbox, ...props }) => {
  const {
    last4, bankName, logo, accountId,
  } = account;

  const deleteItem = () => {
    props.deleteAccount(accountId, isSandbox);
  };

  const { deleteStyles, onRemove } = useDeleteStyles({}, deleteItem);

  const leftButtons = [
    <TouchableOpacity style={styles.deleteButton} onPress={onRemove}><FontAwesomeIcon icon={faTrash} size={30} color="white" /></TouchableOpacity>,
  ];

  return (
    <Animated.View style={deleteStyles}>
      <Swipeable leftButtons={leftButtons}>
        <View style={styles.background}>
          <Image source={{ uri: `data:image/png;base64,${logo}` }} style={styles.bankLogo} />
          <View>
            <Text style={styles.accountText}>{bankName}</Text>
            <Text style={styles.accountText}>{`xxxxxxxx${last4}`}</Text>
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  accountText: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: Colors.BLACK,
    paddingBottom: 3,
    paddingTop: 3,
  },
  deleteButton: {
    backgroundColor: Colors.DELETE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    width: '100%',
    paddingRight: 25,
  },
});

export default connect(null, { deleteAccount })(AccountItem);
