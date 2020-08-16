import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import { addAccountToken, getAccounts, setPaymentLoading } from 'actions';
import { connect } from 'react-redux';
import FullLink from './FullLink';
import PaymentLoading from './PaymentLoading';
import Accounts from './Accounts';
import HeaderLink from './HeaderLink';

const IS_SANDBOX = true;

const PaymentScreen = (props) => {
  const { navigation, loading, accounts } = props;

  useEffect(() => {
    if (!accounts || accounts.length === 0) props.getAccounts(IS_SANDBOX);
  }, []);

  const submit = (token) => {
    props.setPaymentLoading();
    addAccountToken(token, () => {
      props.getAccounts(IS_SANDBOX);
    }, IS_SANDBOX);
  };

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Accounts">
        <HeaderLink submit={submit} isSandbox={IS_SANDBOX} />
      </ModalHeader>

      {loading && <PaymentLoading />}
      {!loading && accounts?.length === 0 && <FullLink submit={submit} isSandbox={IS_SANDBOX} />}
      {!loading && accounts?.length > 0 && <Accounts accounts={accounts} />}

    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  linkButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontFamily: 'Hiragino W7',
    marginTop: 10,
    marginBottom: 10,
  },
  linkSubText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    paddingBottom: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    loading: reduxState.user.paymentLoading,
    accounts: reduxState.user.accounts,
  }
);

export default connect(mapStateToProps, { getAccounts, setPaymentLoading })(PaymentScreen);
