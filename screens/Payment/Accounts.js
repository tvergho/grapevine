import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import AccountItem from './AccountItem';

const Accounts = ({ accounts, refresh, loading }) => {
  return (
    <ScrollView
      decelerationRate="fast"
      scrollEventThrottle={200}
      refreshControl={<RefreshControl onRefresh={refresh} refreshing={loading} />}
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
