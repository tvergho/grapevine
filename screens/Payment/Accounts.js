import React from 'react';
import { ScrollView } from 'react-native';
import AccountItem from './AccountItem';

const Accounts = ({ accounts }) => {
  return (
    <ScrollView
      decelerationRate="fast"
      scrollEventThrottle={200}
    >
      {accounts.map((account) => {
        return (
          <AccountItem key={account.last4} account={account} />
        );
      })}
    </ScrollView>
  );
};

export default Accounts;
