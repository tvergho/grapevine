/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';
import {
  addAccountToken, getAccounts, getLinkToken, setPaymentLoading,
} from 'actions';
import { connect } from 'react-redux';
import FullLink from './FullLink';
import PaymentLoading from './PaymentLoading';
import Accounts from './Accounts';
import HeaderLink from './HeaderLink';

const IS_SANDBOX = true;

const PaymentScreen = (props) => {
  const [fullLoading, setFullLoading] = useState(false);
  const {
    navigation, loading, accounts, paymentToken,
  } = props;

  useEffect(() => {
    props.getLinkToken(IS_SANDBOX);
    if (!accounts || accounts.length === 0) props.getAccounts(IS_SANDBOX);
  }, []);

  useEffect(() => {
    setFullLoading(false);
  }, [accounts]);

  const submit = (data) => {
    const { public_token } = data;
    const last4 = data.accounts[0].mask;
    const bankName = data.institution.name;

    const fields = { public_token, last4, bankName };

    props.setPaymentLoading();
    setFullLoading(true);
    addAccountToken(fields, () => {
      props.getAccounts(IS_SANDBOX);
    }, IS_SANDBOX);
  };

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Accounts">
        <HeaderLink submit={submit} isSandbox={IS_SANDBOX} token={paymentToken} />
      </ModalHeader>

      {(fullLoading || (loading && accounts?.length === 0) || !paymentToken) && <PaymentLoading />}
      {!loading && !fullLoading && !!paymentToken && accounts?.length === 0 && <FullLink submit={submit} isSandbox={IS_SANDBOX} token={paymentToken} />}
      {!fullLoading && accounts?.length > 0 && !!paymentToken && (
        <Accounts
          accounts={accounts}
          refresh={() => { props.getAccounts(IS_SANDBOX); }}
          loading={loading}
          isSandbox={IS_SANDBOX}
        />
      )}

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
    paymentToken: reduxState.user.paymentLinkToken,
  }
);

export default connect(mapStateToProps, { getAccounts, getLinkToken, setPaymentLoading })(PaymentScreen);
